import type { Metadata } from "next"
import { AdminLinkGenerator } from "@/components/admin/link-generator"

export const metadata: Metadata = {
  title: "Admin — Generate Onboarding Link | Stance Marketing",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0a0e13]">
      <AdminLinkGenerator />
    </main>
  )
}
