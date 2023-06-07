import "./globals.css";

import Menu from "./components/menu";
import Footer from "./components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen mx-1 font-helvetica-neue">
        <div className="bg"></div>
        <Menu />
        <div className="mb-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
