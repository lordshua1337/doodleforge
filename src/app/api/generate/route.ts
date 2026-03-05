import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { uploadToR2 } from "@/lib/r2";
import { getUser } from "@/lib/auth/server";
import { getCredits, useCredit, refundCredit } from "@/lib/credits/system";
import { adminClient } from "@/lib/supabase/client";

// -- Style Metadata (exported for use by create page) --

export interface StyleMeta {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly category: "classic" | "digital" | "special";
  readonly isEpic: boolean;
}

export const STYLE_META: readonly StyleMeta[] = [
  { id: "oil", name: "Oil Painting", tagline: "Museum-quality brushstrokes", category: "classic", isEpic: false },
  { id: "watercolor", name: "Watercolor", tagline: "Dreamy transparent washes", category: "classic", isEpic: false },
  { id: "pencil-sketch", name: "Pencil Sketch", tagline: "Fine art graphite detail", category: "classic", isEpic: false },
  { id: "anime", name: "Anime", tagline: "Clean cel-shaded perfection", category: "digital", isEpic: false },
  { id: "cyberpunk", name: "Cyberpunk", tagline: "Neon-lit future vibes", category: "digital", isEpic: false },
  { id: "pop-art", name: "Pop Art", tagline: "Bold Warhol treatment", category: "digital", isEpic: false },
  { id: "pixel", name: "Pixel Art", tagline: "Retro 16-bit glory", category: "digital", isEpic: false },
  { id: "ghibli", name: "Studio Ghibli", tagline: "Magical pastel wonder", category: "digital", isEpic: false },
  { id: "realistic", name: "Photorealistic", tagline: "As if it were real", category: "classic", isEpic: false },
  { id: "stained-glass", name: "Stained Glass", tagline: "Cathedral jewel tones", category: "special", isEpic: false },
  { id: "cartoon", name: "Cartoon", tagline: "Saturday morning energy", category: "digital", isEpic: false },
  { id: "fantasy", name: "Fantasy Epic", tagline: "Cinematic golden hour", category: "special", isEpic: false },
  { id: "epic", name: "EPIC MODE", tagline: "Maximum everything. Turned to 11.", category: "special", isEpic: true },
];

// -- Prompts: 3-part structure per style --
// 1. Preservation directive (shared prefix)
// 2. Style-specific rendering instructions
// 3. Scene enhancement

const PRESERVATION = "Faithfully preserve the child's original drawing composition, shapes, and character placement.";

const STYLE_PROMPTS: Record<string, string> = {
  oil: `${PRESERVATION} Classical oil painting technique with visible brushstrokes following the child's linework. Warm golden gallery lighting, rich color depth with layered glazes, dramatic chiaroscuro shadows. Canvas texture visible throughout, museum-quality finish with impasto highlights.`,
  watercolor: `${PRESERVATION} Wet-on-wet watercolor technique with soft color bleeding at edges. Transparent layered washes building depth, cold-pressed paper texture showing through the paint. Delicate detail work with fine brushes, luminous and airy color palette with subtle granulation.`,
  anime: `${PRESERVATION} Clean crisp anime cel-shading with bold defined outlines following original shapes. Flat vibrant color fills with subtle gradient shading, expressive detailed eyes on any characters. Detailed anime-style background with atmospheric perspective, professional key visual quality.`,
  cyberpunk: `${PRESERVATION} Neon-lit cyberpunk rendering with glowing neon outlines tracing original shapes. Dark atmospheric cityscape background with rain, holographic effects and digital glitches. Rain-slicked reflective surfaces with purple and cyan color scheme, volumetric fog and lens flares.`,
  "pop-art": `${PRESERVATION} Bold Lichtenstein and Warhol pop art treatment with thick black outlines. Ben-Day halftone dot patterns filling color areas, limited primary color palette of red, blue, yellow, and black. Comic book panel aesthetic with bold graphic impact, screen-printed texture quality.`,
  pixel: `${PRESERVATION} Detailed 16-bit pixel art rendering with clean pixel-perfect edges following original shapes. Vibrant retro color palette limited to 32 colors, game sprite aesthetic with subtle dithering. Each pixel intentionally placed, retro console art quality with clean anti-aliasing on key edges.`,
  ghibli: `${PRESERVATION} Studio Ghibli watercolor background art style with soft pastel colors throughout. Lush nature details with hand-painted foliage, magical atmospheric lighting with golden hour warmth. Whimsical and warm mood with painted clouds in a detailed sky, Miyazaki-quality environmental storytelling.`,
  realistic: `${PRESERVATION} Photorealistic rendering as if the child's scene were a real photograph. Hyperdetailed textures on every surface, realistic natural lighting with soft diffused shadows. Shallow depth of field background blur, professional DSLR photo quality with accurate color science.`,
  "stained-glass": `${PRESERVATION} Medieval stained glass window design with thick dark leading lines following original shapes. Jewel-tone translucent colors in ruby, sapphire, emerald, and amber. Backlit luminous glow effect as if sunlight streams through, cathedral rose window craftsmanship.`,
  cartoon: `${PRESERVATION} Professional Saturday-morning animation quality with bold clean outlines. Flat vibrant colors with subtle cel-shading, energetic dynamic composition with slight motion blur. Fun exaggerated proportions staying true to the child's shapes, broadcast animation polish.`,
  "pencil-sketch": `${PRESERVATION} Fine art graphite pencil drawing with detailed cross-hatching and stippling for shading. Elegant confident linework following original shapes, full tonal range from light 2H to dark 6B graphite. White drawing paper visible in highlights, museum-quality observational drawing technique.`,
  fantasy: `${PRESERVATION} Epic cinematic fantasy art with dramatic golden-hour lighting from a low sun. Magical particle effects and softly glowing elements throughout the scene. Sweeping dramatic sky with volumetric clouds, detailed fantasy environment surrounding and expanding the original scene.`,
  epic: `${PRESERVATION} The most dramatic, cinematic, jaw-dropping transformation possible. Maximum detail on every surface, dramatic storm lighting with god rays and atmospheric haze. Environment expansion beyond original edges adding epic scale. If it's a stick figure, make it a warrior in a lightning storm. If it's a sun, make it a supernova. Same composition, turned up to 11.`,
};

// -- Per-style positive prompts (a_prompt) --

const STYLE_A_PROMPTS: Record<string, string> = {
  oil: "best quality, masterpiece, museum painting, oil on canvas, gallery lighting, impasto",
  watercolor: "best quality, masterpiece, watercolor painting, art paper texture, transparent washes, luminous",
  anime: "best quality, masterpiece, anime key visual, clean lineart, cel shaded, vibrant",
  cyberpunk: "best quality, masterpiece, cyberpunk art, neon glow, rain, volumetric lighting",
  "pop-art": "best quality, masterpiece, pop art, bold graphic, screen print, halftone",
  pixel: "best quality, masterpiece, pixel art, 16-bit, retro game, clean pixels",
  ghibli: "best quality, masterpiece, ghibli style, pastel watercolor, magical, warm lighting",
  realistic: "best quality, masterpiece, photorealistic, DSLR photo, natural lighting, sharp focus",
  "stained-glass": "best quality, masterpiece, stained glass, jewel tones, backlit, cathedral",
  cartoon: "best quality, masterpiece, cartoon, animation cel, bold outlines, vibrant colors",
  "pencil-sketch": "best quality, masterpiece, graphite drawing, pencil sketch, cross-hatching, fine art",
  fantasy: "best quality, masterpiece, fantasy art, cinematic, epic, golden hour, magical",
  epic: "best quality, masterpiece, epic cinematic, ultra detailed, dramatic lighting, 8k, god rays",
};

// -- Per-style negative prompts --

const BASE_NEGATIVE = "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";

const STYLE_N_PROMPTS: Record<string, string> = {
  oil: `${BASE_NEGATIVE}, flat colors, digital art, anime, smooth texture, 3d render`,
  watercolor: `${BASE_NEGATIVE}, sharp edges, digital art, heavy outlines, opaque colors, photorealistic`,
  anime: `${BASE_NEGATIVE}, photorealistic, blurry, painterly, rough sketch, 3d render`,
  cyberpunk: `${BASE_NEGATIVE}, bright daylight, pastoral, watercolor, soft colors, cartoon`,
  "pop-art": `${BASE_NEGATIVE}, photorealistic, gradient, soft shading, watercolor, painterly`,
  pixel: `${BASE_NEGATIVE}, smooth gradients, photorealistic, blurry, anti-aliased, painterly`,
  ghibli: `${BASE_NEGATIVE}, photorealistic, dark, horror, cyberpunk, sharp edges, 3d render`,
  realistic: `${BASE_NEGATIVE}, cartoon, anime, painting, illustration, drawing, sketch`,
  "stained-glass": `${BASE_NEGATIVE}, photorealistic, smooth gradients, anime, cartoon, blurry`,
  cartoon: `${BASE_NEGATIVE}, photorealistic, dark, gritty, painterly, sketch, pencil`,
  "pencil-sketch": `${BASE_NEGATIVE}, color, painted, digital, anime, cartoon, vibrant`,
  fantasy: `${BASE_NEGATIVE}, modern, urban, minimalist, cartoon, flat colors`,
  epic: `${BASE_NEGATIVE}, boring, flat, simple, minimalist, soft, gentle, calm`,
};

// EPIC mode uses higher settings -- costs 2 credits
const EPIC_STYLES = new Set(["epic"]);

const REPLICATE_API = "https://api.replicate.com/v1/predictions";

// Poll interval and max attempts for async Replicate API
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 2 minutes max

function getStyleSettings(style: string) {
  const isEpic = EPIC_STYLES.has(style);
  return {
    image_resolution: isEpic ? "768" : "768",
    ddim_steps: isEpic ? 40 : 30,
    scale: isEpic ? 12 : 9,
    a_prompt: STYLE_A_PROMPTS[style] ?? STYLE_A_PROMPTS.oil,
    n_prompt: STYLE_N_PROMPTS[style] ?? BASE_NEGATIVE,
  };
}

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
    const settings = getStyleSettings(style);

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
          image_resolution: settings.image_resolution,
          ddim_steps: settings.ddim_steps,
          scale: settings.scale,
          a_prompt: settings.a_prompt,
          n_prompt: settings.n_prompt,
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
