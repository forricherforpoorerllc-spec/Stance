import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SalesAgentProgramContent } from "@/components/sales-agent-program-content"

export const metadata: Metadata = {
  title: "Sales Agent & Manager Opportunities | Online & Field Positions | Stance Marketing",
  description:
    "Join Stance Marketing as an online or field sales agent or manager. Sell AT&T, Frontier, T-Mobile, Spectrum, Brightspeed, Kinetic, Optimum, Earthlink & Altafiber internet services. Uncapped commissions. Work from home or in the field.",
  keywords:
    "sales agent jobs, field sales agent, online sales agent, sales manager jobs, commission based sales, independent contractor, internet sales jobs, telecom sales careers, door to door sales, remote sales jobs, multi-carrier sales agent",
  openGraph: {
    title: "Sales Agent & Manager Opportunities | Online & Field Positions",
    description:
      "Represent 9 leading internet providers including Frontier, AT&T, T-Mobile, Spectrum & more. Uncapped commissions. Online and field positions available nationwide.",
    type: "website",
    images: [
      {
        url: "/images/sales-team-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Stance Marketing Sales Agent Team - Internet Provider Sales Representatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Agent & Manager Opportunities | Online & Field Positions",
    description:
      "Represent 9 leading internet providers including Frontier, AT&T, T-Mobile, Spectrum & more. Uncapped commissions.",
    images: ["/images/sales-team-hero.jpg"],
  },
  alternates: {
    canonical: "/sales-agent-program",
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

export default function SalesAgentProgramPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Independent Sales Agent & Manager - Internet Services",
    description:
      "Join Stance Marketing as an independent sales agent or manager. Sell internet services from 9 leading providers: AT&T, Frontier, T-Mobile, Spectrum, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber. Uncapped commissions with manager override opportunities. Online and field positions available.",
    identifier: {
      "@type": "PropertyValue",
      name: "Stance Marketing",
      value: "sales-agent-program-2026",
    },
    datePosted: "2026-01-01",
    validThrough: "2026-12-31",
    employmentType: ["CONTRACTOR", "PART_TIME", "FULL_TIME"],
    hiringOrganization: {
      "@type": "Organization",
      name: "Stance Marketing",
      sameAs: "https://stance-marketing.com",
      logo: "https://stance-marketing.com/images/stance-logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
        addressRegion: ["Nationwide", "Remote"],
      },
    },
    workHours: "Flexible schedule - set your own hours",
    occupationalCategory: ["41-3099.00", "Sales and Related Occupations"],
    responsibilities:
      "Sell fiber internet, cable broadband, and 5G home internet services from leading providers. Generate leads through door-to-door canvassing, online marketing, or phone sales. Close sales and coordinate installations.",
    qualifications:
      "Self-motivated with strong communication skills. Sales experience preferred but not required. Must be 18+ years old. Reliable transportation for field agents.",
    benefits:
      "Unlimited earning potential with commission-based pay. Flexible work schedule. Work from home or in the field. Comprehensive training provided. Represent multiple top-tier internet providers.",
    jobLocationType: ["TELECOMMUTE", "FIELD_WORK"],
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
      <SalesAgentProgramContent />
      <Footer />
    </main>
  )
}
