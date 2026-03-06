import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VerizonD2DHero } from "@/components/verizon-d2d-hero"
import { VerizonD2DBenefits } from "@/components/verizon-d2d-benefits"
import { VerizonD2DCoverage } from "@/components/verizon-d2d-coverage"
import { VerizonD2DForm } from "@/components/verizon-d2d-form"
import { VerizonD2DCTA } from "@/components/verizon-d2d-cta"

export const metadata: Metadata = {
  title: "Verizon Fios D2D Partnership | Fiber & Wireless Sales Program | Stance",
  description:
    "Join Stance as an authorized Verizon partner for Fios fiber and 5G Home Internet door-to-door sales. Dealer, contractor, and sales agent programs available. Competitive contracts and commissions.",
  keywords:
    "Verizon Fios partner, Verizon D2D sales, Verizon fiber dealer, Verizon 5G Home Internet agent, door-to-door Verizon, Verizon contractor program, Verizon authorized partner, Verizon Fios D2D, Verizon sales agent, Verizon partnership",
  openGraph: {
    title: "Verizon Fios D2D Partnership | Fiber & Wireless Sales Program",
    description:
      "Partner with Stance — an authorized Verizon partner for Fios fiber and 5G Home Internet D2D campaigns. Join our dealer and contractor network today.",
    type: "website",
    url: "https://stance-marketing.com/verizon-d2d-partners",
    images: [
      {
        url: "/images/verizon-d2d-team.png",
        width: 1200,
        height: 800,
        alt: "Verizon Fios D2D Sales Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verizon Fios D2D Partnership | Fiber & Wireless Sales Program",
    description:
      "Partner with Stance — authorized Verizon partner for Fios fiber and 5G Home Internet D2D campaigns.",
    images: ["/images/verizon-d2d-team.png"],
  },
  alternates: {
    canonical: "/verizon-d2d-partners",
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

export default function VerizonD2DPartnersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <VerizonD2DHero />
      <VerizonD2DBenefits />
      <VerizonD2DCoverage />
      <VerizonD2DForm />
      <VerizonD2DCTA />
      <Footer />

      {/* Structured Data for SEO */}
      <Script
        id="verizon-page-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Stance",
            description:
              "Authorized Verizon partner for Fios fiber and 5G Home Internet D2D sales campaigns. Dealer, contractor, and sales agent programs available.",
            url: "https://stance-marketing.com/verizon-d2d-partners",
            logo: "https://stance-marketing.com/images/stance-logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Partnership Inquiries",
              areaServed: "US",
              availableLanguage: "English",
            },
            offers: {
              "@type": "Offer",
              name: "Verizon Fios D2D Partnership Program",
              description:
                "Authorized partnership opportunities for dealers, contractors, and sales agents in Verizon Fios fiber and 5G Home Internet door-to-door sales campaigns.",
              category: "Business Partnership",
            },
          }),
        }}
      />
    </main>
  )
}
