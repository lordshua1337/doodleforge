import { config } from "./config";

// -- Etsy API Integration --
// Handles creating print orders on an Etsy shop for physical prints.
// Requires ETSY_API_KEY, ETSY_SHOP_ID, and ETSY_ACCESS_TOKEN in .env.local
//
// Etsy API docs: https://developer.etsy.com/documentation/

const ETSY_BASE = "https://api.etsy.com/v3";

function getHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "x-api-key": config.etsy.apiKey,
    Authorization: `Bearer ${config.etsy.accessToken}`,
  };
}

export interface PrintOrder {
  imageUrl: string;
  printType: "canvas" | "framed" | "poster";
  size: string;
  quantity: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// List active listings from the shop
export async function getShopListings() {
  if (!config.etsy.apiKey || !config.etsy.shopId) {
    throw new Error("Etsy not configured. Set ETSY_API_KEY and ETSY_SHOP_ID in .env.local");
  }

  const res = await fetch(
    `${ETSY_BASE}/application/shops/${config.etsy.shopId}/listings/active`,
    { headers: getHeaders() }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Etsy API error: ${res.status} ${error}`);
  }

  return res.json();
}

// Create a draft listing for a custom print
export async function createPrintListing(order: PrintOrder) {
  if (!config.etsy.apiKey || !config.etsy.shopId) {
    throw new Error("Etsy not configured");
  }

  const printTypeNames: Record<string, string> = {
    canvas: "Canvas Print",
    framed: "Framed Print",
    poster: "Art Poster",
  };

  const printTypePrices: Record<string, number> = {
    canvas: 2999, // cents
    framed: 4999,
    poster: 1499,
  };

  // Create a draft listing
  const res = await fetch(
    `${ETSY_BASE}/application/shops/${config.etsy.shopId}/listings`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        quantity: order.quantity,
        title: `Doodie Custom ${printTypeNames[order.printType]} - ${order.size}`,
        description:
          "Custom art print created by Doodie AI. Original child's drawing transformed into professional artwork.",
        price: printTypePrices[order.printType] / 100,
        who_made: "someone_else",
        when_made: "made_to_order",
        taxonomy_id: 69150433, // Art & Collectibles > Prints
        is_digital: false,
        shipping_profile_id: null, // Will need to be set up in Etsy shop
        type: "physical",
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Etsy create listing error: ${res.status} ${error}`);
  }

  return res.json();
}

// Upload an image to a listing
export async function uploadListingImage(
  listingId: string,
  imageBuffer: Buffer,
  filename: string
) {
  if (!config.etsy.apiKey || !config.etsy.shopId) {
    throw new Error("Etsy not configured");
  }

  const formData = new FormData();
  formData.append("image", new Blob([new Uint8Array(imageBuffer)]), filename);

  const res = await fetch(
    `${ETSY_BASE}/application/shops/${config.etsy.shopId}/listings/${listingId}/images`,
    {
      method: "POST",
      headers: {
        "x-api-key": config.etsy.apiKey,
        Authorization: `Bearer ${config.etsy.accessToken}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Etsy upload image error: ${res.status} ${error}`);
  }

  return res.json();
}
