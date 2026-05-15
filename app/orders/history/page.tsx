import dynamic from "next/dynamic"
import type { Metadata } from "next"

const OrderHistory = dynamic(
  () => import("@/components/orders/order-history").then((m) => m.OrderHistory),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Order History · Stance",
  description: "View your submitted orders, statuses, and earnings.",
}

interface PageProps {
  searchParams: Promise<{ a?: string }>
}

export default async function OrderHistoryPage({ searchParams }: PageProps) {
  const { a: agentId } = await searchParams
  return (
    <main className="min-h-screen bg-gray-50">
      <OrderHistory agentId={agentId || null} />
    </main>
  )
}
