// -- Configuration --
// All API keys and secrets come from environment variables.
// Copy .env.example to .env.local and fill in your values.

export const config = {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    prices: {
      single: process.env.STRIPE_PRICE_SINGLE || "",
      pack: process.env.STRIPE_PRICE_PACK || "",
      unlimited: process.env.STRIPE_PRICE_UNLIMITED || "",
    },
  },
  etsy: {
    apiKey: process.env.ETSY_API_KEY || "",
    shopId: process.env.ETSY_SHOP_ID || "",
    accessToken: process.env.ETSY_ACCESS_TOKEN || "",
  },
  imageGen: {
    // Stability AI (Stable Diffusion) API
    apiKey: process.env.STABILITY_API_KEY || "",
    apiUrl:
      process.env.STABILITY_API_URL ||
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  },
} as const;

export function validateConfig(keys: string[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const key of keys) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  return { valid: missing.length === 0, missing };
}
