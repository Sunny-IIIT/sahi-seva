import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sahi-seva-34by.vercel.app'),
  title: "SahiSeva - Find Trusted Workers Across India",
  description: "Book verified and background-checked maids, plumbers, electricians, and more instantly. Hire trusted blue-collar professionals with Aadhaar verification.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SahiSeva",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "SahiSeva | India's Most Trusted Home Services Platform",
    description: "2,400+ Aadhaar-verified maids, plumbers, cooks & more.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sahi-seva-34by.vercel.app',
    siteName: "SahiSeva",
    images: [{ url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200&h=630" }],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-[100dvh] bg-slate-50 text-slate-900 flex flex-col md:flex-row overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
        <LanguageProvider>
          {/* Main Navigation: Sidebar (desktop) / Bottom Bar (mobile) */}
          <Navigation />
          
          {/* Main Content Area: Pushed right on desktop, padded bottom on mobile */}
          <main className="flex-1 flex flex-col w-full md:pl-64 pb-[calc(60px+env(safe-area-inset-bottom))] md:pb-0 transition-all duration-300 min-h-[100dvh] relative">
            
            {/* Top Header only visible on Mobile (Desktop has Sidebar) */}
            <div className="md:hidden">
              <Header />
            </div>

            <div className="flex-1 flex flex-col relative w-full h-full">
              {children}
            </div>
            
            {/* Legacy Footer removed to prevent Native App dashboard layout glitches */}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
