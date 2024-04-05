import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Provider } from "../utils/provider";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { siteConfig } from "../constants";
import Navbar from "@/components/Navbar";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.siteTitle}`,
    default: siteConfig.siteTitle,
  },
  description: siteConfig.siteDescription,
  metadataBase: new URL(siteConfig.siteURL),
  creator: siteConfig.siteCreator,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar className="fixed top-0 left-0" />
        <Provider>
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
