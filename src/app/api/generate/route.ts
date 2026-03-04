import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { uploadToR2 } from "@/lib/r2";

const STYLE_PROMPTS: Record<string, string> = {
  oil: "Transform this child's drawing into a museum-quality oil painting. Rich brushstrokes, classical composition, dramatic lighting. Maintain the original subject and scene but elevate it to fine art quality.",
  watercolor:
    "Transform this child's drawing into a beautiful watercolor painting. Soft washes of color, delicate details, dreamy atmosphere. Keep the same subject but make it elegant and artistic.",
  anime:
    "Transform this child's drawing into high-quality anime art. Clean lines, vibrant colors, expressive characters, Studio Ghibli inspired backgrounds. Same scene, anime style.",
  cyberpunk:
    "Transform this child's drawing into cyberpunk digital art. Neon colors, futuristic elements, dark atmospheric lighting, sci-fi details. Same subject, cyberpunk aesthetic.",
  "pop-art":
    "Transform this child's drawing into bold pop art. Bright primary colors, halftone dots, thick outlines, Warhol/Lichtenstein inspired. Same subject, pop art treatment.",
  pixel:
    "Transform this child's drawing into detailed pixel art. 16-bit style, clean pixel-perfect shapes, vibrant colors, retro game aesthetic. Same subject, pixel art style.",
  ghibli:
    "Transform this child's drawing into Studio Ghibli style art. Soft colors, magical atmosphere, detailed nature elements, warm and whimsical. Same subject, Ghibli magic.",
  realistic:
    "Transform this child's drawing into a photorealistic image. Hyper-detailed, realistic textures and lighting, as if photographed. Same subject, photorealistic rendering.",
};

const REPLICATE_API = "https://api.replicate.com/v1/predictions";

// Poll interval and max attempts for async Replicate API
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 2 minutes max

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const style = formData.get("style") as string | null;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, GIF, or WebP allowed." },
        { status: 400 }
      );
    }

    const maxSize = 20 * 1024 * 1024; // 20MB
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: "Image too large. Maximum size is 20MB." },
        { status: 413 }
      );
    }

    if (!style || !STYLE_PROMPTS[style]) {
      return NextResponse.json({ error: "Invalid style selected" }, { status: 400 });
    }

    // Check for API key
    if (!config.replicate.apiToken) {
      // Demo mode: return a placeholder
      return NextResponse.json({
        imageUrl: `/api/generate/demo?style=${style}`,
        mode: "demo",
        message:
          "Running in demo mode. Set REPLICATE_API_TOKEN in .env.local for real generation.",
      });
    }

    // Convert file to base64 data URI for Replicate
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${image.type};base64,${base64}`;

    const prompt = STYLE_PROMPTS[style];

    // Create prediction using Replicate's ControlNet Scribble model
    // This preserves the child's original composition (85%+ fidelity)
    const createRes = await fetch(REPLICATE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.replicate.apiToken}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          image: dataUri,
          prompt,
          num_samples: "1",
          image_resolution: "512",
          ddim_steps: 30,
          scale: 9,
          a_prompt: "best quality, extremely detailed, masterpiece",
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
        },
      }),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      console.error("Replicate create error:", createRes.status, errorText);
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: 500 }
      );
    }

    let prediction = await createRes.json();

    // If the prediction is still processing, poll for the result
    if (prediction.status !== "succeeded" && prediction.status !== "failed") {
      for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

        const pollRes = await fetch(prediction.urls.get, {
          headers: {
            Authorization: `Bearer ${config.replicate.apiToken}`,
          },
        });

        if (!pollRes.ok) {
          console.error("Replicate poll error:", pollRes.status);
          continue;
        }

        prediction = await pollRes.json();

        if (prediction.status === "succeeded" || prediction.status === "failed") {
          break;
        }
      }
    }

    if (prediction.status === "failed") {
      console.error("Replicate generation failed:", prediction.error);
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: 500 }
      );
    }

    if (prediction.status !== "succeeded" || !prediction.output) {
      return NextResponse.json(
        { error: "Generation timed out. Please try again." },
        { status: 500 }
      );
    }

    // Replicate returns an array of output URLs
    const outputUrl = Array.isArray(prediction.output)
      ? prediction.output[0]
      : prediction.output;

    // Try to upload to R2 CDN if configured, otherwise return Replicate URL directly
    let finalUrl = outputUrl;
    if (config.r2.accountId && config.r2.accessKeyId) {
      try {
        const imageRes = await fetch(outputUrl);
        const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
        const fileName = `${style}-${Date.now()}.png`;
        finalUrl = await uploadToR2(imageBuffer, fileName, "image/png");
      } catch (r2Error) {
        // R2 upload failed, fall back to Replicate URL
        console.error("R2 upload failed, using Replicate URL:", r2Error);
      }
    }

    return NextResponse.json({ imageUrl: finalUrl, mode: "live" });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Demo endpoint for when no API key is configured
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || "oil";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#1A1A1A"/>
    <text x="256" y="220" font-family="sans-serif" font-size="18" fill="#888" text-anchor="middle">Demo Mode</text>
    <text x="256" y="260" font-family="sans-serif" font-size="14" fill="#666" text-anchor="middle">Style: ${style}</text>
    <text x="256" y="300" font-family="sans-serif" font-size="12" fill="#444" text-anchor="middle">Set REPLICATE_API_TOKEN for real output</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
