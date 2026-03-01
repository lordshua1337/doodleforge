import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const style = formData.get("style") as string | null;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!style || !STYLE_PROMPTS[style]) {
      return NextResponse.json({ error: "Invalid style selected" }, { status: 400 });
    }

    // Check for API key
    if (!config.imageGen.apiKey) {
      // Demo mode: return a placeholder
      return NextResponse.json({
        imageUrl: `/api/generate/demo?style=${style}`,
        mode: "demo",
        message:
          "Running in demo mode. Set STABILITY_API_KEY in .env.local for real generation.",
      });
    }

    // Convert file to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Call Stability AI (Stable Diffusion) API
    const prompt = STYLE_PROMPTS[style];

    const stabilityForm = new FormData();
    stabilityForm.append("prompt", prompt);
    stabilityForm.append("image", new Blob([bytes], { type: image.type }), "input.png");
    stabilityForm.append("strength", "0.7");
    stabilityForm.append("output_format", "png");
    stabilityForm.append("mode", "image-to-image");

    const response = await fetch(config.imageGen.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.imageGen.apiKey}`,
        Accept: "image/*",
      },
      body: stabilityForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Stability API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: 500 }
      );
    }

    // Return the generated image as a data URL
    const imageBuffer = await response.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    return NextResponse.json({ imageUrl, mode: "live" });
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

  // Return a simple SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#1A1A1A"/>
    <text x="256" y="240" font-family="sans-serif" font-size="16" fill="#666" text-anchor="middle">Demo Mode</text>
    <text x="256" y="270" font-family="sans-serif" font-size="13" fill="#444" text-anchor="middle">Style: ${style}</text>
    <text x="256" y="300" font-family="sans-serif" font-size="11" fill="#333" text-anchor="middle">Set STABILITY_API_KEY for real output</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
