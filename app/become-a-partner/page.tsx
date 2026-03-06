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
    "@id": "https://stance-marketing.com/become-a-partner#webpage",
    name: "Become a Partner - Stance Marketing",
    description:
      "Apply to join Stance Marketing's partner network. Multiple partnership opportunities available for referral partners, sales agents, business partners, event team members, and Verizon/T-Mobile D2D agents.",
    url: "https://stance-marketing.com/become-a-partner",
    isPartOf: {
      "@id": "https://stance-marketing.com/#website",
    },
    about: {
      "@id": "https://stance-marketing.com/#organization",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Partnership Programs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Referral Partner Program", url: "https://stance-marketing.com/referral-program" },
        { "@type": "ListItem", position: 2, name: "Sales Agent Program", url: "https://stance-marketing.com/sales-agent-program" },
        { "@type": "ListItem", position: 3, name: "Business Partnership", url: "https://stance-marketing.com/business-partnerships" },
        { "@type": "ListItem", position: 4, name: "Spectrum Event Team", url: "https://stance-marketing.com/spectrum-event-team" },
        { "@type": "ListItem", position: 5, name: "T-Mobile Fiber D2D", url: "https://stance-marketing.com/tmobile-fiber-partners" },
        { "@type": "ListItem", position: 6, name: "Verizon Fios D2D", url: "https://stance-marketing.com/verizon-d2d-partners" },
      ],
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
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://stance-marketing.com" },
              { "@type": "ListItem", position: 2, name: "Become a Partner", item: "https://stance-marketing.com/become-a-partner" },
            ],
          }),
        }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <PartnerSignupContent />
      <Footer />
    </main>
  )
}
