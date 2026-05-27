import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Kraftify — We Craft Visual Stories",
  description:
    "Kraftify is a cinematic photography and videography brand telling authentic visual stories.",
  authors: [{ name: "Kraftify" }],
  openGraph: {
    title: "Kraftify — We Craft Visual Stories",
    description:
      "Kraftify is a cinematic photography and videography brand telling authentic visual stories.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6baf5fe6-6261-46b4-8feb-1aa1c0e16b7c/id-preview-cdad3d93--fe8e92bb-c68a-4814-bb4b-f2cd4e499639.lovable.app-1779271151537.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shotbykraft",
    title: "Kraftify — We Craft Visual Stories",
    description:
      "Kraftify is a cinematic photography and videography brand telling authentic visual stories.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6baf5fe6-6261-46b4-8feb-1aa1c0e16b7c/id-preview-cdad3d93--fe8e92bb-c68a-4814-bb4b-f2cd4e499639.lovable.app-1779271151537.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
