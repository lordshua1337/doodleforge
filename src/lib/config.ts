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
  replicate: {
    apiToken: process.env.REPLICATE_API_TOKEN || "",
  },
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || "",
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    bucketName: process.env.R2_BUCKET_NAME || "doodie-images",
    publicUrl: process.env.R2_PUBLIC_URL || "",
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
