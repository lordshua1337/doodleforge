import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { createPrintListing } from "@/lib/etsy";
import type { PrintOrder } from "@/lib/etsy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, printType, size, quantity, shippingAddress } = body;

    if (!imageUrl || !printType || !size || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!config.etsy.apiKey) {
      return NextResponse.json(
        {
          error: "Etsy not configured. Set ETSY_API_KEY in .env.local",
          demo: true,
        },
        { status: 503 }
      );
    }

    const order: PrintOrder = {
      imageUrl,
      printType,
      size,
      quantity: quantity || 1,
      shippingAddress,
    };

    const listing = await createPrintListing(order);

    return NextResponse.json({
      success: true,
      listingId: listing.listing_id,
      message: "Print order created on Etsy",
    });
  } catch (error) {
    console.error("Etsy order error:", error);
    return NextResponse.json(
      { error: "Failed to create print order" },
      { status: 500 }
    );
  }
}
