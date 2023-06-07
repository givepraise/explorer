import "./globals.css";

import Footer from "./components/footer";
import Menu from "./components/menu";
import { Metadata } from "next";

const SITE_URL = "https://explorer.givepraise.xyz";
const SITE_NAME = "Building a culture of giving and gratitude | Praise 🙏";
const SITE_DESCRIPTION =
  "Praise is a rewards system allowing communities to acknowledge and reward member contributions.";
const SITE_IMAGE = "/img/preview.png";
const SOCIAL_TWITTER = "@givepraise";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: SITE_IMAGE,
        width: 500,
        height: 250,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: SOCIAL_TWITTER,
    images: [SITE_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen font-helvetica-neue">
        <div className="bg"></div>
        <Menu />
        <div className="mb-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
