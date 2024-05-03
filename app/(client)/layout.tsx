import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";
import { siteConfig } from "../constants";
import { eastSeaDokdo, inter, karla, raleway } from "../utils/fonts";
import { Provider } from "../utils/provider";
import "./globals.css";

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
      <meta
        name="google-adsense-account"
        content="ca-pub-9861112713684008"
      ></meta>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          karla.variable,
          eastSeaDokdo.variable,
          raleway.variable,
          inter.variable
        )}
      >
        <main className="font-raleway">
          <React.StrictMode>
            <Navbar className="fixed top-0 left-0" />
            <Provider>
              {children}
              <Footer />
            </Provider>
          </React.StrictMode>
        </main>
      </body>
    </html>
  );
}
