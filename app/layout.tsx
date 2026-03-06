import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://stance-marketing.com"),
  title: {
    default: "Stance | Internet Provider Partnership Programs & Sales Opportunities",
    template: "%s | Stance",
  },
  description:
    "Join Stance's partner network and represent leading internet providers including AT&T, Spectrum, Frontier, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber. Multiple partnership opportunities: referral programs, sales agent positions, business partnerships, and event team roles. Competitive commissions and nationwide coverage.",
  keywords:
    "internet provider partnership, telecom sales jobs, ISP channel partner, fiber internet sales, sales agent jobs, referral program, business partnership, authorized dealer, internet sales opportunities, commission based sales, online sales jobs, field sales agent, door to door sales, independent contractor, remote sales jobs, multi-carrier sales, broadband reseller, AT&T partner, Spectrum dealer, Frontier partner, T-Mobile partner, Brightspeed partner, Kinetic partner, Optimum dealer, Earthlink affiliate, Altafiber partner, telecommunications sales, internet referral partner, property manager referral, realtor referral program, insurance agent referral, event sales team, retail sales jobs, network marketing, partnership program, sales representative jobs, telecom partnership program",
  authors: [{ name: "Stance" }],
  creator: "Stance",
  publisher: "Stance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stance-marketing.com",
    siteName: "Stance",
    title: "Stance | Internet Provider Partnership Programs & Sales Opportunities",
    description:
      "Join Stance's partner network. Represent AT&T, Spectrum, Frontier, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber. Multiple partnership opportunities with competitive commissions.",
    images: [
      {
        url: "/images/partnership-hero.png",
        width: 1200,
        height: 630,
        alt: "Stance - Internet Provider Partnership Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stance | Internet Provider Partnership Programs & Sales Opportunities",
    description:
      "Join Stance's partner network. Represent leading internet providers. Multiple partnership opportunities with competitive commissions.",
    images: ["/images/partnership-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />

        {/* Preload critical LCP image */}
        <link rel="preload" href="/images/hero-background.png" as="image" fetchPriority="high" />

        {/* DNS prefetch for any external services */}
        <link rel="dns-prefetch" href="//api.resend.com" />

        {/* PWA theme color */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
