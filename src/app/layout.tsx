import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "./theme-toggle.css"
import Providers from "@/app/provider";
import NavBar from "@/components/layout/navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Crypto Price Tracker',
    description: 'Track cryptocurrency prices in real-time',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
          <NavBar />
          <main className="container mx-auto px-4 pb-8">
              <Script
                  src="/theme-toggle.js"
                  strategy="beforeInteractive"
                  type="text/javascript"
              />
              {children}
          </main>
      </Providers>
      </body>
    </html>
  );
}
