import { NextResponse } from "next/server";

const GOLD_API =
  "https://api.goldprice.dev/v1/carat?currency=INR";

export async function GET() {
  try {
    const response = await fetch(GOLD_API, {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      throw new Error("Gold price API failed");
    }

    const data = await response.json();

    return NextResponse.json({
      currency: data.currency,
      timestamp: data.timestamp,
      price24k: Number(data.price_gram_24k),
      price22k: Number(data.price_gram_22k)
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to fetch gold price"
      },
      {
        status: 500
      }
    );
  }
}
