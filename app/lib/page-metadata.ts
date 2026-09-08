import type { Metadata } from "next";
import { headers } from "next/headers";

export async function pageMetadata(
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
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
    alternates: { canonical: `${origin}${path}` },
    openGraph: {
      type: "website",
      url: `${origin}${path}`,
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
    robots: { index: true, follow: true },
  };
}
