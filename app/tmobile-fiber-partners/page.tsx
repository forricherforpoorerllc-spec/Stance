import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TMobileFiberHero } from "@/components/tmobile-fiber-hero"
import { TMobileFiberBenefits } from "@/components/tmobile-fiber-benefits"
import { TMobileFiberForm } from "@/components/tmobile-fiber-form"
import { TMobileFiberCoverage } from "@/components/tmobile-fiber-coverage"
import { TMobileFiberCTA } from "@/components/tmobile-fiber-cta"

export const metadata: Metadata = {
  title: "T-Mobile Fiber D2D Partnership | Exclusive Master Agent Program | Stance",
  description:
    "Join Stance, partnered with the only Master Agent for T-Mobile Fiber door-to-door sales. Exclusive dealer, contractor, and sales agent opportunities. Competitive contracts and commissions available.",
  keywords:
    "T-Mobile Fiber partner, T-Mobile Fiber dealer, T-Mobile Fiber contractor, T-Mobile Fiber D2D, door-to-door sales T-Mobile, T-Mobile Fiber agent, T-Mobile Fiber Master Agent, T-Mobile Fiber partnership, T-Mobile Fiber sales opportunity, T-Mobile Fiber contract",
  openGraph: {
    title: "T-Mobile Fiber D2D Partnership | Exclusive Master Agent Program",
    description:
      "Partner with Stance - working with the only Master Agent for T-Mobile Fiber D2D campaigns. Join our dealer and contractor network today.",
    type: "website",
    url: "https://stance-marketing.com/tmobile-fiber-partners",
    images: [
      {
        url: "/images/tmobile-d2d-team.png",
        width: 1200,
        height: 630,
        alt: "T-Mobile Fiber D2D Sales Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T-Mobile Fiber D2D Partnership | Exclusive Master Agent Program",
    description:
      "Partner with Stance - working with the only Master Agent for T-Mobile Fiber D2D campaigns. Join our dealer and contractor network today.",
    images: ["/images/tmobile-d2d-team.png"],
  },
  alternates: {
    canonical: "/tmobile-fiber-partners",
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

export default function TMobileFiberPartnersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <TMobileFiberHero />
      <TMobileFiberBenefits />
      <TMobileFiberCoverage />
      <TMobileFiberForm />
      <TMobileFiberCTA />
      <Footer />

      {/* Structured Data for SEO */}
      <Script
        id="page-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Stance",
            description:
              "Partnered with the only Master Agent for T-Mobile Fiber D2D campaigns. Join us for dealer, contractor, and sales agent opportunities.",
            url: "https://stance-marketing.com/tmobile-fiber-partners",
            logo: "https://stance-marketing.com/images/stance-logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Partnership Inquiries",
              areaServed: "US",
              availableLanguage: "English",
            },
            offers: {
              "@type": "Offer",
              name: "T-Mobile Fiber D2D Partnership Program",
              description:
                "Exclusive partnership opportunities for dealers, contractors, and sales agents in T-Mobile Fiber door-to-door sales campaigns.",
              category: "Business Partnership",
            },
          }),
        }}
      />
    </main>
  )
}
