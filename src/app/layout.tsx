
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SyntaxHeist 2027 — 24-Hour Hackathon",
    template: "%s | SyntaxHeist 2027",
  },
  description:
    "SyntaxHeist is a 24-hour hackathon organized by IEEE FISAT Student Branch. " +
    "Break the code. Build the future. 20–21 March 2027, FISAT Angamaly, Kerala.",
  keywords: [
    "hackathon",
    "SyntaxHeist",
    "IEEE",
    "FISAT",
    "coding",
    "innovation",
    "Angamaly",
    "Kerala",
    "24-hour",
  ],
  authors: [{ name: "IEEE FISAT Student Branch" }],
  openGraph: {
    title: "SyntaxHeist 2027 — 24-Hour Hackathon",
    description:
      "Break the code. Build the future. 20–21 March 2027 · FISAT, Angamaly.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base text-white font-sans">
        <a
          href="#main-content"
          className={[
            "sr-only",
            "focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]",
            "focus:px-4 focus:py-2 focus:bg-primary focus:text-[#080b08]",
            "focus:font-bold focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase",
            "focus:rounded-sm focus:shadow-lg",
          ].join(" ")}
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
