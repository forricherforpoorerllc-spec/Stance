import type React from "react"
import type { Metadata, Viewport } from "next"
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
    default: "Stance | Managed Sales Organization for Internet Service Providers",
    template: "%s | Stance",
  },
  description:
    "Stance is a managed sales organization that deploys field teams, event campaigns, referral networks, and channel programs to drive subscriber growth for internet service providers. We also offer structured sales and referral programs for independent professionals and businesses.",
  keywords:
    "managed sales organization, ISP channel development, internet provider sales partner, field marketing organization, telecom sales organization, ISP subscriber acquisition, door-to-door ISP sales, fiber internet field sales, event sales team, referral network telecom, ISP channel partner, broadband sales channel, internet sales organization, telecom D2D sales, ISP marketing partner, cable internet sales team, fiber sales agent, internet sales representative, carrier channel partner, telecom field sales, ISP partner program, internet provider partnership, authorized dealer program, referral partner program, sales agent jobs telecom, commission based sales, independent contractor telecom, internet referral program, property manager referral, realtor referral program, D2D broadband sales, retail internet sales, AT&T sales partner, Spectrum sales channel, Frontier sales partner, T-Mobile internet sales, authorized ISP dealer, broadband subscriber growth, residential internet sales, business internet sales",
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
    title: "Stance | Managed Sales Organization for Internet Service Providers",
    description:
      "Stance deploys field sales teams, event campaigns, referral networks, and channel programs to grow subscriber volume for internet service providers. Structured programs also available for sales professionals and businesses.",
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
    title: "Stance | Managed Sales Organization for Internet Service Providers",
    description:
      "Stance deploys field sales teams, event campaigns, referral networks, and channel programs to drive subscriber growth for internet service providers nationwide.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
