import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth/server";
import { CREDIT_TIERS, type CreditTier } from "@/lib/credits/system";

// Map Stripe price IDs to credit tiers
function tierFromPriceId(priceId: string): CreditTier | null {
  if (priceId === config.stripe.prices.single) return "dip";
  if (priceId === config.stripe.prices.pack) return "binge";
  if (priceId === config.stripe.prices.unlimited) return "addiction";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { priceId, mode } = body;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID required" }, { status: 400 });
    }

    if (!config.stripe.secretKey) {
      return NextResponse.json(
        {
          error: "Stripe not configured. Set STRIPE_SECRET_KEY in .env.local",
          demo: true,
        },
        { status: 503 }
      );
    }

    const tier = tierFromPriceId(priceId);
    const tierInfo = tier ? CREDIT_TIERS[tier] : null;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode === "subscription" ? "subscription" : "payment",
      success_url: `${config.app.url}/create?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.app.url}/pricing?canceled=true`,
      metadata: {
        source: "doodleforge",
        user_id: user.id,
        tier: tier || "unknown",
        credits: String(tierInfo?.credits ?? 0),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
