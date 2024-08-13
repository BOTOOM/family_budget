import type { Metadata } from "next";
import { i18nConfig } from "../../i18n/settings";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    // <html lang={lng} className={GeistSans.className}>
    <html lang={lng}>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {/* className="bg-neutral-50 text-black selection:bg-teal-300" */}
        {/* <main className=""> */}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
