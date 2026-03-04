import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";
import { grantCredits } from "@/lib/credits/system";
import { adminClient } from "@/lib/supabase/client";
import type { CreditTier } from "@/lib/credits/system";

async function updateSubscriptionTier(userId: string, tier: CreditTier | "free") {
  await adminClient
    .from("user_profiles")
    .update({ subscription_tier: tier })
    .eq("id", userId);
}

export async function POST(request: NextRequest) {
  try {
    if (!config.stripe.secretKey || !config.stripe.webhookSecret) {
      return NextResponse.json(
        { error: "Stripe webhooks not configured" },
        { status: 503 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        const tier = session.metadata?.tier as CreditTier | undefined;
        const credits = parseInt(session.metadata?.credits || "0", 10);

        if (!userId) {
          console.error("Webhook: checkout.session.completed missing user_id in metadata");
          break;
        }

        console.log(`Payment completed: session=${session.id} user=${userId} tier=${tier} credits=${credits}`);

        if (tier === "addiction") {
          // Subscription -- set tier (credits are unlimited)
          await updateSubscriptionTier(userId, "addiction");
          console.log(`Activated unlimited tier for user ${userId}`);
        } else if (credits > 0) {
          // One-time credit pack purchase
          const newBalance = await grantCredits(
            userId,
            credits,
            "purchase",
            `Purchased ${tier} pack (${credits} credits)`
          );
          console.log(`Granted ${credits} credits to user ${userId}, new balance: ${newBalance}`);
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.user_id;
        console.log("Subscription created:", subscription.id);

        if (userId) {
          await updateSubscriptionTier(userId, "addiction");
          console.log(`Activated subscription for user ${userId}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.user_id;
        console.log("Subscription canceled:", subscription.id);

        if (userId) {
          await updateSubscriptionTier(userId, "free");
          console.log(`Deactivated subscription for user ${userId}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Payment failed:", invoice.id);
        // Could notify user via email here in the future
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
