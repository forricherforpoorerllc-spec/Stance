import type { Metadata } from "next"
import dynamic from "next/dynamic"

const OrderContent = dynamic(
  () => import("@/components/orders/order-content").then((m) => ({ default: m.OrderContent })),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Submit Order | Stance Marketing",
  description:
    "Submit a customer order for your internet service activation. Log carrier, plan, and customer details to ensure your commission is tracked.",
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams: Promise<{ a?: string }>
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const { a: agentId } = await searchParams
  return (
    <main className="min-h-screen bg-gray-50">
      <OrderContent agentId={agentId || null} />
    </main>
  )
}
