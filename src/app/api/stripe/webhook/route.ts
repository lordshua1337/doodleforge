import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";

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
        console.log("Payment completed:", session.id);
        // TODO: Grant credits, send confirmation email, etc.
        // For now, log the event
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object;
        console.log("Subscription created:", subscription.id);
        // TODO: Activate unlimited plan
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Subscription canceled:", subscription.id);
        // TODO: Deactivate unlimited plan
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Payment failed:", invoice.id);
        // TODO: Notify user, handle failed payment
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
