import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BusinessPartnershipsHero } from "@/components/business-partnerships-hero"
import { BusinessPartnershipsBrands } from "@/components/business-partnerships-brands"
import { BusinessPartnershipsBenefits } from "@/components/business-partnerships-benefits"
import { BusinessPartnershipsForm } from "@/components/business-partnerships-form"

export const metadata: Metadata = {
  title: "Business Partnerships | Stance - Telecom & Internet Provider Partner Program",
  description:
    "Partner with Stance to grow your business through our established telecom relationships. Access AT&T, Frontier, Spectrum, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber programs with dedicated support and competitive commissions.",
  keywords:
    "internet provider partnership, fiber internet reseller, ISP channel partner, telecom partnership program, broadband reseller, Frontier partner program, AT&T authorized retailer, T-Mobile home internet partner, Spectrum authorized dealer, Brightspeed partner, Kinetic reseller, Optimum partner program, EarthLink affiliate, Altafiber partner, MSP partnership, retail partnership, authorized internet retailer, telecom sales opportunity, fiber optic reseller, cable internet partner, 5G home internet reseller, ISP sales representative, telecommunications partnership",
  openGraph: {
    title: "Business Partnerships | Stance - Telecom & Internet Provider Partner Program",
    description:
      "Join Stance's channel partner program. Offer Frontier, Brightspeed, AT&T, T-Mobile, Kinetic, Optimum, Spectrum, EarthLink, and Altafiber services with full training and support.",
    type: "website",
    images: [
      {
        url: "/images/partnership-hero.png",
        width: 1200,
        height: 630,
        alt: "Stance Business Partnership Team - Internet Provider Channel Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Partnerships | Stance - Telecom & Internet Provider Partner Program",
    description:
      "Join Stance's channel partner program. Access AT&T, Frontier, Spectrum, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber.",
    images: ["/images/partnership-hero.png"],
  },
  alternates: {
    canonical: "/business-partnerships",
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

export default function BusinessPartnershipsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Stance Marketing - Internet Provider Partnership Program",
    description:
      "Authorized channel partner program for 9 leading internet service providers including Frontier, Brightspeed, AT&T, T-Mobile, Kinetic, Optimum, Spectrum, EarthLink, and Altafiber",
    url: "https://stance-marketing.com/business-partnerships",
    logo: "https://stance-marketing.com/images/stance-logo.png",
    image: "https://stance-marketing.com/images/partnership-hero.png",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Internet Provider Partnership Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frontier Communications Partnership",
            description: "Sell Frontier fiber internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brightspeed Partnership",
            description: "Sell Brightspeed fiber internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Optimum Partnership",
            description: "Sell Optimum fiber and cable internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Spectrum Partnership",
            description: "Sell Spectrum cable internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AT&T Fiber Partnership",
            description: "Sell AT&T fiber internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "T-Mobile Home Internet Partnership",
            description: "Sell T-Mobile 5G home internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kinetic by Windstream Partnership",
            description: "Sell Kinetic fiber internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EarthLink Partnership",
            description: "Sell EarthLink internet services as an authorized channel partner",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Altafiber Partnership",
            description: "Sell Altafiber fiber internet services as an authorized channel partner",
          },
        },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f1419] to-[#1a1f2e] text-white">
      <Script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://stance-marketing.com" },
              { "@type": "ListItem", position: 2, name: "Business Partnerships", item: "https://stance-marketing.com/business-partnerships" },
            ],
          }),
        }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <BusinessPartnershipsHero />
      <BusinessPartnershipsBrands />
      <BusinessPartnershipsBenefits />
      <BusinessPartnershipsForm />
      <Footer />
    </main>
  )
}
