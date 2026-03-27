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
  title: "SahiSeva - Find Trusted Workers Across India",
  description: "Book verified and background-checked maids, plumbers, electricians, and more instantly. Hire true blue-collar professionals with trust.",
  keywords: ["sahiseva", "maids", "plumbers", "electricians", "blue collar jobs india", "hire workers", "trusted workers"],
  openGraph: {
    title: "SahiSeva | India's Trusted Worker Platform",
    description: "Book verified blue-collar professionals instantly. Fast, reliable, and secure hiring.",
    url: "https://sahiseva.in", // Placeholder for actual prod URL
    siteName: "SahiSeva",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200&h=630", // Placeholder generic image
        width: 1200,
        height: 630,
        alt: "SahiSeva Platform Cover",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SahiSeva | Reliable Workers on Demand",
    description: "Connect with verified maids, plumbers, and more in your city.",
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
