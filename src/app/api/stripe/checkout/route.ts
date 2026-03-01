import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
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
