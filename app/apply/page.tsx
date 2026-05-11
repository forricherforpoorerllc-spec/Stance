import type { Metadata } from "next"
import dynamic from "next/dynamic"

const ApplyContent = dynamic(
  () => import("@/components/apply/apply-content").then((m) => ({ default: m.ApplyContent })),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Apply | Stance Marketing",
  description:
    "Apply to join Stance Marketing's partner network. Choose your program — referral, sales agent, business partnership, or carrier-specific teams — and start your application.",
  keywords:
    "apply, Stance Marketing, partner application, sales agent, referral partner, business partnership, telecom sales",
  openGraph: {
    title: "Apply | Stance Marketing",
    description:
      "One application. Multiple programs. Join Stance Marketing and represent leading internet providers nationwide.",
    type: "website",
    url: "https://stance-marketing.com/apply",
    images: [
      {
        url: "https://stance-marketing.com/images/apply-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Apply | Stance Marketing",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/apply",
  },
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ApplyContent />
    </main>
  )
}
