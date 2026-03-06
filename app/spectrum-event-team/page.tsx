import type { Metadata } from "next"
import Script from "next/script"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SpectrumEventHero } from "@/components/spectrum-event-hero"
import { SpectrumEventBenefits } from "@/components/spectrum-event-benefits"
import { SpectrumEventGallery } from "@/components/spectrum-event-gallery"
import { SpectrumEventCoverage } from "@/components/spectrum-event-coverage"
import { SpectrumEventForm } from "@/components/spectrum-event-form"

export const metadata: Metadata = {
  title: "Spectrum Event Sales Team | Retail Sales Jobs | Stance Marketing",
  description:
    "Join Stance Marketing's elite Spectrum event sales team. Experienced sales reps wanted for retail locations nationwide. Competitive commissions with performance bonuses.",
  keywords:
    "spectrum sales jobs, event sales team, retail sales, spectrum representative, sales agent jobs, spectrum dealer, spectrum contractor",
  openGraph: {
    title: "Join Our Elite Spectrum Event Sales Team - Experienced Reps Only",
    description: "Represent Spectrum at high-traffic retail events. Competitive pay, immediate openings nationwide.",
    type: "website",
    images: [
      {
        url: "/images/spectrum-team.png",
        width: 1200,
        height: 630,
        alt: "Stance Marketing Spectrum Event Sales Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Our Elite Spectrum Event Sales Team - Experienced Reps Only",
    description: "Represent Spectrum at high-traffic retail events. Competitive pay, immediate openings nationwide.",
    images: ["/images/spectrum-team.png"],
  },
  alternates: {
    canonical: "/spectrum-event-team",
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

export default function SpectrumEventTeamPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stance-marketing.com" },
      { "@type": "ListItem", position: 2, name: "Spectrum Event Team", item: "https://stance-marketing.com/spectrum-event-team" },
    ],
  }

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Spectrum Event Sales Representative",
    description:
      "Join Stance Marketing's elite Spectrum event sales team. Represent Spectrum at high-traffic indoor retail locations nationwide. Experienced sales reps earn competitive commissions with performance bonuses. Immediate openings available.",
    identifier: {
      "@type": "PropertyValue",
      name: "Stance Marketing",
      value: "spectrum-event-rep-2026",
    },
    datePosted: "2026-01-01",
    validThrough: "2026-12-31",
    employmentType: ["CONTRACTOR", "PART_TIME", "FULL_TIME"],
    hiringOrganization: {
      "@id": "https://stance-marketing.com/#organization",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
        addressRegion: "Nationwide",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "United States",
    },
    workHours: "Flexible — event schedules vary",
    skills: "Sales, Customer Service, Retail, Cable & Internet Sales",
    qualifications: "Prior sales experience required. Knowledge of Spectrum products preferred.",
    jobBenefits: "Competitive base pay, commission per sale, performance bonuses, immediate payout",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "COMMISSION",
        description: "Commission-based compensation with competitive base structure",
      },
    },
  }

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="jobposting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <SpectrumEventHero />
      <SpectrumEventBenefits />
      <SpectrumEventGallery />
      <SpectrumEventCoverage />
      <SpectrumEventForm />
      <Footer />
    </main>
  )
}
