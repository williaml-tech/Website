import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// UI font similar to the reference site's navbar style
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://klinikka.com.au'),
  title: "Klinik.KA Aesthetic Clinic - Premium Beauty Treatments in Australia",
  description: "Experience world-class aesthetic treatments at Klinik.KA. Specializing in advanced skincare, anti-aging, and cosmetic procedures. Book your consultation today.",
  keywords: "aesthetic clinic, beauty treatments, skincare, anti-aging, cosmetic procedures, Australia, dermal fillers, botox, facial treatments",
  icons: {
    icon: [
      { url: '/icon.svg?v=1', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=1', sizes: 'any', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-icon.png?v=1', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: "Klinik.KA Aesthetic Clinic - Premium Beauty Treatments",
    description: "Experience world-class aesthetic treatments at Klinik.KA. Specializing in advanced skincare, anti-aging, and cosmetic procedures.",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/icon.svg?v=1",
        width: 512,
        height: 512,
        alt: "Klinik.KA Logo",
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik.KA Aesthetic Clinic - Premium Beauty Treatments",
    description: "Experience world-class aesthetic treatments at Klinik.KA. Specializing in advanced skincare, anti-aging, and cosmetic procedures.",
    images: ["/icon.svg?v=1"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} antialiased`}
      >
        <Script id="organization-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Klinik.KA Aesthetic Clinic",
            url: "https://klinikka.com.au",
            logo: {
              "@type": "ImageObject",
              url: "https://klinikka.com.au/icon.svg"
            }
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
