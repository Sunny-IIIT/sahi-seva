import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase is REQUIRED in App Router — without it, relative OG image URLs break
  // and WhatsApp/LinkedIn previews show a blank card.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://sahi-seva-34by.vercel.app'
  ),
  title: "SahiSeva - Find Trusted Workers Across India",
  description: "Book verified and background-checked maids, plumbers, electricians, and more instantly. Hire trusted blue-collar professionals with Aadhaar verification.",
  keywords: ["sahiseva", "maids", "plumbers", "electricians", "blue collar jobs india", "hire workers", "trusted workers", "Aadhaar verified"],
  openGraph: {
    title: "SahiSeva | India's Most Trusted Home Services Platform",
    description: "2,400+ Aadhaar-verified maids, plumbers, cooks & more — background-checked and ready to hire. Book in 2 minutes, anywhere in India.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sahi-seva-34by.vercel.app',
    siteName: "SahiSeva",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "SahiSeva — India's Trusted Home Services Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SahiSeva | Hire Verified Workers in 2 Minutes",
    description: "Aadhaar-verified maids, plumbers, cooks & more. 100% background-checked. Book anywhere in India.",
    images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#0f172a' }}>
        <LanguageProvider>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
