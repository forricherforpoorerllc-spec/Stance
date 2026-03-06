import type { Metadata } from "next"
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
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
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
