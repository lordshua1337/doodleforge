import Stripe from "stripe";
import { config } from "./config";

// Lazy-initialize Stripe only when key is available
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!config.stripe.secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to .env.local to enable payments."
      );
    }
    stripeInstance = new Stripe(config.stripe.secretKey, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}
