import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth/server";
import { CREDIT_TIERS, type CreditTier } from "@/lib/credits/system";

// Map tier name strings (sent by pricing page) to CreditTier + real Stripe price IDs
// The pricing page sends "single", "pack", or "unlimited" -- NOT the Stripe price ID.
function tierFromName(tierName: string): {
  tier: CreditTier;
  stripePriceId: string;
  mode: "payment" | "subscription";
} | null {
  switch (tierName) {
    case "single":
      return { tier: "dip", stripePriceId: config.stripe.prices.single, mode: "payment" };
    case "pack":
      return { tier: "binge", stripePriceId: config.stripe.prices.pack, mode: "payment" };
    case "unlimited":
      return { tier: "addiction", stripePriceId: config.stripe.prices.unlimited, mode: "subscription" };
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { priceId } = body;

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

    // Resolve the tier -- priceId is actually a tier name from the pricing page
    const resolved = tierFromName(priceId);
    if (!resolved) {
      return NextResponse.json({ error: "Invalid pricing tier" }, { status: 400 });
    }

    if (!resolved.stripePriceId) {
      return NextResponse.json(
        {
          error: `Stripe price not configured for ${priceId}. Set STRIPE_PRICE_${priceId.toUpperCase()} in .env.local`,
          demo: true,
        },
        { status: 503 }
      );
    }

    const tierInfo = CREDIT_TIERS[resolved.tier];
    // Use the mode from the resolved tier -- never trust client-supplied mode
    const checkoutMode = resolved.mode;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: resolved.stripePriceId,
          quantity: 1,
        },
      ],
      mode: checkoutMode,
      success_url: `${config.app.url}/create?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.app.url}/pricing?canceled=true`,
      metadata: {
        source: "doodie",
        user_id: user.id,
        tier: resolved.tier,
        credits: String(tierInfo.credits),
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
