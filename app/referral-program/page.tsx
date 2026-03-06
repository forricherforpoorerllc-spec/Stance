import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReferralProgramContent } from "@/components/referral-program-content"

export const metadata: Metadata = {
  title: "Internet Referral Partner Program | Earn Commissions | Stance Marketing",
  description:
    "Join the Stance Marketing referral program. Earn commissions for every verified installation by referring customers for AT&T, Spectrum, Frontier, T-Mobile, and more. Easy signup, no selling required.",
  keywords:
    "internet referral program, earn commissions, referral partner, passive income, realtor referral program, property manager referral, insurance agent referral",
  openGraph: {
    title: "Earn Commissions with Our Internet Referral Partner Program",
    description:
      "Perfect for Realtors, Property Managers, Insurance Agents. Refer clients needing internet and earn commissions without selling.",
    type: "website",
    images: [
      {
        url: "/person-referring-customer-with-handshake-and-smil.jpg",
        width: 1200,
        height: 630,
        alt: "Stance Marketing Referral Partner Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Commissions with Our Internet Referral Partner Program",
    description: "Perfect for Realtors, Property Managers, Insurance Agents. Refer clients and earn commissions.",
    images: ["/person-referring-customer-with-handshake-and-smil.jpg"],
  },
  alternates: {
    canonical: "/referral-program",
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
}

export default function ReferralProgramPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stance-marketing.com" },
      { "@type": "ListItem", position: 2, name: "Referral Program", item: "https://stance-marketing.com/referral-program" },
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://stance-marketing.com/referral-program#service",
    name: "Internet Referral Partner Program",
    serviceType: "Referral Affiliate Program",
    description:
      "Earn commissions for every verified internet installation by referring customers to leading providers including AT&T, Spectrum, Frontier, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber. No selling required — just connect customers.",
    url: "https://stance-marketing.com/referral-program",
    provider: {
      "@id": "https://stance-marketing.com/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Realtors, Property Managers, Insurance Agents, Mortgage Brokers, and anyone with a relevant network",
    },
    offers: {
      "@type": "Offer",
      name: "Referral Commission",
      description: "Earn commissions per verified customer installation. No sales experience required.",
      priceCurrency: "USD",
      eligibleCustomerType: "Individual",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Referral Partner Benefits",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commission per verified installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "No selling experience required" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom referral links and tracking" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Access to 9 major internet providers" } },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-[#0a0e13] text-white">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <ReferralProgramContent />
      <Footer />
    </main>
  )
}
