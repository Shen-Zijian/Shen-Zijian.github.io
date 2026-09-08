import type { Viewport } from "next";
import { pageMetadata } from "./lib/page-metadata";
import "./globals.css";

export function generateMetadata() {
  return pageMetadata(
    "/",
    "Zijian Shen | Intelligent Mobility Research",
    "Zijian Shen is a Ph.D. student in Civil Engineering at The University of Hong Kong, researching intelligent transportation, reinforcement learning, and LLM-enhanced travel data generation.",
  );
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#12383d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
