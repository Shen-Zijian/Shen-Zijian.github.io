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
    applicationName: "Shen Zijian Academic Profile",
    alternates: { canonical: `${origin}${path}` },
    openGraph: {
      type: "website",
      url: `${origin}${path}`,
      title,
      description,
      siteName: "Shen Zijian Academic Profile",
      images: [
        {
          url: `${origin}/zijian-shen-portrait.jpg`,
          width: 720,
          height: 960,
          alt: "Shen Zijian - Intelligent Mobility Research",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${origin}/zijian-shen-portrait.jpg`],
    },
    robots: { index: true, follow: true },
  };
}
