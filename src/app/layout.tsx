import "./globals.css";

import Footer from "./components/footer";
import Menu from "./components/menu";
import { Metadata } from "next";

const WEBSITE_URL = "https://explorer.givepraise.xyz";
const IMAGE_URL = "/img/preview.png";
const NAME = " Praise 🙏 | Building a culture of giving and gratitude";
const TITLE = "Explorer: Access all communities on Praise";
const DESCRIPTION =
  "Praise is a rewards system allowing communities to acknowledge and reward member contributions.";
const SOCIAL_TWITTER = "@givepraise";

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: WEBSITE_URL,
    siteName: NAME,
    images: [
      {
        url: IMAGE_URL,
        width: 500,
        height: 250,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: SOCIAL_TWITTER,
    images: [IMAGE_URL],
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
