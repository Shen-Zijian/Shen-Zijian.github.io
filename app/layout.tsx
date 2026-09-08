import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Zijian Shen | Intelligent Mobility Research";
const description =
  "Academic profile of Zijian Shen, an HKU civil engineering researcher working on reinforcement learning, deep learning, large language models, and multimodal transportation.";

export async function generateMetadata(): Promise<Metadata> {
  let origin = "https://shen-zijian.github.io";

  if (process.env.STATIC_EXPORT !== "true") {
    const requestHeaders = await headers();
    const host =
      requestHeaders.get("x-forwarded-host") ??
      requestHeaders.get("host") ??
      "localhost:3000";
    const protocol =
      requestHeaders.get("x-forwarded-proto") ??
      (host.startsWith("localhost") ? "http" : "https");
    origin = `${protocol}://${host}`;
  }

  return {
    title,
    description,
    applicationName: "Zijian Shen Academic Profile",
    alternates: {
      canonical: origin,
    },
    openGraph: {
      type: "website",
      url: origin,
      title,
      description,
      siteName: "Zijian Shen Academic Profile",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1730,
          height: 909,
          alt: "Zijian Shen - Intelligent Mobility Research",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#12383d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
