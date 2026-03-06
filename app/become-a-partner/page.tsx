import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PartnerSignupContent } from "@/components/partner-signup-content"

export const metadata: Metadata = {
  title: "Become a Partner | Join Stance Marketing's Partner Network",
  description:
    "Apply to become a Stance Marketing partner. Whether you're a referral partner, sales agent, business partner, or event team member, start your application here. Represent AT&T, Spectrum, Frontier, T-Mobile, and more.",
  keywords:
    "become a partner, Stance Marketing partner, internet sales partner, telecom referral program, sales agent application, business partnership, authorized dealer",
  openGraph: {
    title: "Become a Partner | Stance Marketing",
    description:
      "One application, multiple opportunities. Join Stance Marketing's partner network and represent leading internet providers nationwide.",
    type: "website",
    images: [
      {
        url: "/partners-hub-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Become a Stance Marketing Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Partner | Stance Marketing",
    description: "One application, multiple opportunities. Join our partner network and represent leading internet providers.",
    images: ["/partners-hub-hero.jpg"],
  },
  alternates: {
    canonical: "/become-a-partner",
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

export default function BecomeAPartnerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Become a Partner - Stance Marketing",
    description:
      "Apply to join Stance Marketing's partner network. Multiple partnership opportunities available for referral partners, sales agents, business partners, and event team members.",
    url: "https://stance-marketing.com/become-a-partner",
    mainEntity: {
      "@type": "Organization",
      name: "Stance Marketing",
      description:
        "Leading marketing agency specializing in internet service provider partnerships and sales channel development.",
    },
  }

  return (
    <main className="min-h-screen bg-[#0a0e13] text-white">
      <Script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <PartnerSignupContent />
      <Footer />
    </main>
  )
}
