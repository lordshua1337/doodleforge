import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { uploadToR2 } from "@/lib/r2";
import { getUser } from "@/lib/auth/server";
import { getCredits, useCredit, refundCredit } from "@/lib/credits/system";
import { adminClient } from "@/lib/supabase/client";

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
  "stained-glass":
    "Transform this child's drawing into a stained glass window design. Rich jewel tones, lead-line outlines, cathedral window patterns, luminous backlit colors. Same subject, stained glass art style.",
  cartoon:
    "Transform this child's drawing into a professional cartoon illustration. Bold outlines, vibrant flat colors, Saturday morning animation quality, fun and energetic. Same subject, cartoon style.",
  "pencil-sketch":
    "Transform this child's drawing into a refined pencil sketch. Detailed graphite shading, cross-hatching, elegant line work, fine art quality. Same subject, pencil sketch style.",
  fantasy:
    "Transform this child's drawing into epic fantasy art. Dramatic lighting, magical elements, cinematic composition, Lord of the Rings quality. Same subject, fantasy epic style.",
};

// EPIC mode uses higher settings -- costs 2 credits
const EPIC_STYLES = new Set(["epic"]);

const REPLICATE_API = "https://api.replicate.com/v1/predictions";

// Poll interval and max attempts for async Replicate API
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 2 minutes max

export async function POST(request: NextRequest) {
  try {
    // Auth check -- user must be signed in
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Sign in to generate art" },
        { status: 401 }
      );
    }

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

    // Credit check -- verify user has enough credits before generating
    const isEpic = EPIC_STYLES.has(style);
    const cost = isEpic ? 2 : 1;
    const credits = await getCredits(user.id);

    if (credits < cost) {
      return NextResponse.json(
        {
          error: "Not enough credits",
          credits_remaining: credits,
          cost,
          upgrade_url: "/pricing",
        },
        { status: 402 }
      );
    }

    // Check for API key
    if (!config.replicate.apiToken) {
      // Demo mode: return a placeholder (don't deduct credits)
      return NextResponse.json({
        imageUrl: `/api/generate/demo?style=${style}`,
        mode: "demo",
        message:
          "Running in demo mode. Set REPLICATE_API_TOKEN in .env.local for real generation.",
      });
    }

    // Create a forge record before generation starts
    const { data: forge } = await adminClient
      .from("forges")
      .insert({
        user_id: user.id,
        style,
        is_epic: isEpic,
        status: "generating",
        prompt_used: STYLE_PROMPTS[style],
      })
      .select("id")
      .single();

    const forgeId = forge?.id ?? `forge-${Date.now()}`;

    // Deduct credit before generation
    const creditUsed = await useCredit(user.id, forgeId, isEpic);
    if (!creditUsed) {
      // Credits depleted between check and use
      if (forge) {
        await adminClient
          .from("forges")
          .update({ status: "failed" })
          .eq("id", forgeId);
      }
      return NextResponse.json(
        { error: "Credits depleted. Please purchase more.", upgrade_url: "/pricing" },
        { status: 402 }
      );
    }

    // Convert file to base64 data URI for Replicate
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${image.type};base64,${base64}`;

    const prompt = STYLE_PROMPTS[style];

    // Upload original to R2 if configured
    let originalUrl = "";
    if (config.r2.accountId && config.r2.accessKeyId) {
      try {
        const originalFileName = `originals/${user.id}/${Date.now()}-${image.name}`;
        originalUrl = await uploadToR2(Buffer.from(bytes), originalFileName, image.type);
      } catch (r2Error) {
        console.error("R2 original upload failed:", r2Error);
      }
    }

    // Create drawing record
    let drawingId: string | null = null;
    if (originalUrl) {
      const { data: drawing } = await adminClient
        .from("drawings")
        .insert({
          user_id: user.id,
          original_url: originalUrl,
          file_name: image.name,
          file_size: image.size,
        })
        .select("id")
        .single();

      drawingId = drawing?.id ?? null;
    }

    // Link forge to drawing
    if (drawingId && forge) {
      await adminClient
        .from("forges")
        .update({ drawing_id: drawingId })
        .eq("id", forgeId);
    }

    // Create prediction using Replicate's ControlNet Scribble model
    const startTime = Date.now();
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
      // Refund credit on generation failure
      await refundCredit(user.id, cost, "Generation failed (API error)");
      if (forge) {
        await adminClient
          .from("forges")
          .update({ status: "failed" })
          .eq("id", forgeId);
      }
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: 500 }
      );
    }

    let prediction = await createRes.json();

    // If the prediction is still processing, poll for the result
    if (prediction.status !== "succeeded" && prediction.status !== "failed" && prediction.urls?.get) {
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
      await refundCredit(user.id, cost, "Generation failed (model error)");
      if (forge) {
        await adminClient
          .from("forges")
          .update({ status: "failed" })
          .eq("id", forgeId);
      }
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: 500 }
      );
    }

    if (prediction.status !== "succeeded" || !prediction.output) {
      await refundCredit(user.id, cost, "Generation timed out");
      if (forge) {
        await adminClient
          .from("forges")
          .update({ status: "failed" })
          .eq("id", forgeId);
      }
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
        const fileName = `forges/${user.id}/${style}-${Date.now()}.png`;
        finalUrl = await uploadToR2(imageBuffer, fileName, "image/png");
      } catch (r2Error) {
        // R2 upload failed, fall back to Replicate URL
        console.error("R2 upload failed, using Replicate URL:", r2Error);
      }
    }

    const generationTimeMs = Date.now() - startTime;

    // Update forge record with result
    if (forge) {
      await adminClient
        .from("forges")
        .update({
          result_url: finalUrl,
          status: "complete",
          generation_time_ms: generationTimeMs,
        })
        .eq("id", forgeId);
    }

    const remainingCredits = await getCredits(user.id);

    return NextResponse.json({
      imageUrl: finalUrl,
      mode: "live",
      credits_remaining: remainingCredits,
      forge_id: forgeId,
    });
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
