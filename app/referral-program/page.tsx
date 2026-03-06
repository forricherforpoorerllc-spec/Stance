import type { Metadata } from "next"
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
  return (
    <main className="min-h-screen bg-[#0a0e13] text-white">
      <Navbar />
      <ReferralProgramContent />
      <Footer />
    </main>
  )
}
