import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

// Self-hosted variable fonts (no runtime request to Google).
const grotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-grotesk",
  weight: "300 700",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.tagline,
  metadataBase: new URL(site.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // No `h-full` on <html>: Lenis observes the documentElement to derive its
  // scroll limit, and pinning it to 100% means that box never changes size when
  // a client-side route swaps in taller content — the limit goes stale and
  // scrolling dies partway down. Body uses dvh for the sticky footer so it
  // doesn't depend on a fixed html height.
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable} antialiased`}
    >
      <body className="noise min-h-dvh flex flex-col">
        <SmoothScroll>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
