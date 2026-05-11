import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { decodePayload, getExhibitById, type OnboardingPayload } from "@/lib/exhibits"

const OnboardingContent = dynamic(
  () => import("@/components/onboarding/onboarding-content").then((m) => ({ default: m.OnboardingContent })),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Onboarding | Stance Marketing",
  description:
    "Complete your onboarding with Stance Marketing. Review and sign your Independent Contractor Agreement, upload required documents, and get started.",
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams: Promise<{ d?: string; token?: string }>
}

export default async function OnboardingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const encoded = params.d || ""
  const legacyToken = params.token || ""

  // Decode the self-contained payload from the URL
  const payload: OnboardingPayload | null = encoded ? decodePayload(encoded) : null

  // If a param was provided but decoded to null, the link is corrupt/invalid
  if (encoded && !payload) {
    return (
      <main className="min-h-screen bg-[#edf1f7] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl border border-slate-200 shadow-xl p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 border border-red-200">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Invalid Link</h1>
          <p className="text-slate-600 text-base leading-relaxed mb-6">
            This onboarding link is invalid or has expired. Please contact your Stance manager for a new link.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-red-500 text-white font-semibold text-base hover:bg-red-600 transition-colors"
          >
            Return Home
          </a>
        </div>
      </main>
    )
  }

  // Resolve exhibits from the payload
  const resolvedExhibits = payload
    ? payload.exhibitIds
        .map((id) => {
          const exhibit = getExhibitById(id)
          if (!exhibit) return null
          // Apply any admin overrides to pay amounts
          const overrides = payload.overrides?.[id]
          if (overrides) {
            const updatedPay = exhibit.payStructure.map((row, i) => ({
              ...row,
              amount: overrides[i] || row.amount,
            }))
            return { ...exhibit, payStructure: updatedPay }
          }
          return exhibit
        })
        .filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-gray-50">
      <OnboardingContent
        token={encoded || legacyToken}
        prefill={
          payload
            ? {
                firstName: payload.name.split(" ")[0] || "",
                lastName: payload.name.split(" ").slice(1).join(" ") || "",
                email: payload.email,
                phone: payload.phone || "",
                legalName: payload.name || "",
                partnerType: payload.partnerType,
              }
            : {}
        }
        exhibits={resolvedExhibits as import("@/lib/exhibits").CompensationExhibit[]}
      />
    </main>
  )
}
