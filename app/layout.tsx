import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoldCalc India | Gold Price Calculator",
  description:
    "Calculate jewellery cost using today's 22K and 24K gold prices, wastage and making charges."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
