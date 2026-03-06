import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PartnersHub } from "@/components/partners-hub"

export const metadata: Metadata = {
  title: "Partner Programs | Earn Selling Internet Services | Stance Marketing",
  description:
    "Explore Stance Marketing's partner programs. Multiple ways to earn representing AT&T, Spectrum, Frontier, Optimum, T-Mobile, Brightspeed, Kinetic, Earthlink, and Altafiber. Referral, Sales Agent, Business, and Event opportunities available.",
  keywords:
    "internet sales partner, telecom referral program, sales agent opportunities, business partnership, commission based sales, authorized dealer, internet provider partner",
  openGraph: {
    title: "Partner with Stance: Multiple Ways to Earn Selling Essential Internet Services",
    description:
      "Represent top internet brands like AT&T, Spectrum, Frontier, Kinetic, Optimum, Brightspeed, Earthlink, and Altafiber. Choose your partnership path.",
    type: "website",
    images: [
      {
        url: "/images/partnership-hero.png",
        width: 1200,
        height: 630,
        alt: "Stance Marketing Partnership Programs Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner with Stance: Multiple Ways to Earn Selling Essential Internet Services",
    description:
      "Represent top internet brands like AT&T, Spectrum, Frontier, Kinetic, Optimum, Brightspeed, Earthlink, and Altafiber.",
    images: ["/images/partnership-hero.png"],
  },
  alternates: {
    canonical: "/partners",
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

export default function PartnersPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stance-marketing.com" },
      { "@type": "ListItem", position: 2, name: "Partner Programs", item: "https://stance-marketing.com/partners" },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0e13] text-white">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <PartnersHub />
      <Footer />
    </main>
  )
}
