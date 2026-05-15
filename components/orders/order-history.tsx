"use client"

import React, { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Loader2,
  Package,
  UserCircle,
} from "lucide-react"
import {
  type Order,
  type OrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS_LIGHT,
  lookupCommission,
} from "@/lib/order-types"

interface PublicAgent {
  id: string
  firstName: string
  lastName: string
  phone: string
  partnerType: string
  source: string
}

const PROGRAM_LABELS: Record<string, string> = {
  "referral":       "Referral Partner",
  "sales-agent":    "Sales Agent",
  "business":       "Business Partner",
  "spectrum-event": "Spectrum Event Team",
  "tmobile-d2d":    "T-Mobile D2D",
  "verizon-d2d":    "Verizon D2D",
}

function fmtDate(s: string): string {
  if (!s) return "—"
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function fmtMoney(n: number): string {
  if (n === 0) return "$0"
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] ${ORDER_STATUS_COLORS_LIGHT[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  )
}

export function OrderHistory({ agentId }: { agentId: string | null }) {
  const [agent, setAgent]         = useState<PublicAgent | null>(null)
  const [orders, setOrders]       = useState<Order[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [expanded, setExpanded]   = useState<string | null>(null)

  useEffect(() => {
    if (!agentId) {
      setError("Missing agent link. Please use your personal order link.")
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchOrders = () => {
      fetch(`/api/orders/agent/${agentId}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((o) => { if (!cancelled && o) setOrders(o) })
        .catch(() => {})
    }

    Promise.all([
      fetch(`/api/agents/${agentId}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`/api/orders/agent/${agentId}`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([a, o]) => {
        if (cancelled) return
        if (!a) {
          setError("This link is invalid or expired. Please contact your admin.")
          return
        }
        setAgent(a)
        setOrders(o)
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load your order history.")
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    // Silently re-fetch orders every 30 seconds so status changes from admin are reflected
    const interval = setInterval(fetchOrders, 30_000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [agentId])

  // Build stats with commission lookup
  const stats = useMemo(() => {
    if (!agent) return null

    let total = 0
    let paid = 0
    let pending = 0
    let earned = 0
    let estimated = 0
    let monthCount = 0
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

    for (const o of orders) {
      total++
      if (o.status === "paid")      paid++
      if (o.status === "pending" || o.status === "submitted" || o.status === "complete") pending++

      const commission = lookupCommission({ ...o, partnerType: agent.partnerType })
      if (o.status === "paid")                                     earned    += commission
      if (o.status !== "cancelled" && o.status !== "paid")         estimated += commission

      if (new Date(o.submittedAt).getTime() > thirtyDaysAgo) monthCount++
    }

    return { total, paid, pending, earned, estimated, monthCount }
  }, [orders, agent])

  // ── States ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Can&apos;t open history</h1>
          <p className="text-gray-600 mb-6">{error || "Unknown error."}</p>
          <Link href="/">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to site
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const programLabel = PROGRAM_LABELS[agent.partnerType] ?? agent.partnerType

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">

      {/* ── Header: Identity ── */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6 mb-6 flex items-center gap-4 flex-wrap">
        <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {agent.firstName[0]}{agent.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-blue-600 mb-1">Order History</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            {agent.firstName} {agent.lastName}
          </h1>
          <p className="text-sm text-gray-600">{programLabel}</p>
        </div>
        <Link href={`/orders?a=${agent.id}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 px-4 text-sm font-semibold">
            <Package className="mr-1.5 h-4 w-4" />
            Submit New Order
          </Button>
        </Link>
      </div>

      {/* ── Stats grid ── */}
      {stats && stats.total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard icon={<Package className="h-4 w-4" />} color="blue" label="Total Orders" value={String(stats.total)} sub={`${stats.monthCount} this month`} />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} color="emerald" label="Paid" value={String(stats.paid)} sub={`${stats.pending} in progress`} />
          <StatCard icon={<DollarSign className="h-4 w-4" />} color="violet" label="Earned" value={fmtMoney(stats.earned)} sub="From paid orders" />
          <StatCard icon={<Calendar className="h-4 w-4" />} color="amber" label="Estimated Pipeline" value={fmtMoney(stats.estimated)} sub="From open orders" />
        </div>
      )}

      {/* ── Orders list ── */}
      {orders.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <UserCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h2>
          <p className="text-gray-500 text-sm mb-6">Submit your first order to start tracking your pipeline.</p>
          <Link href={`/orders?a=${agent.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Submit Your First Order
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">All Orders</h2>
            <span className="text-xs text-gray-500">{orders.length} total</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {orders.map((o) => {
              const isOpen = expanded === o.id
              return (
                <li key={o.id} className={`transition-colors ${isOpen ? "bg-blue-50/60" : "hover:bg-gray-50"}`}>
                  {/* Summary row — always visible */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : o.id)}
                    className="w-full text-left px-5 py-4"
                  >
                    <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">
                            {o.customerFirstName} {o.customerLastName}
                          </p>
                          <StatusBadge status={o.status} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {o.carrier}{o.service ? ` — ${o.service}` : ""}
                          {o.orderNumber && <span className="text-gray-400"> · #{o.orderNumber}</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-semibold">Sale Date</p>
                          <p className="text-xs text-gray-700">{fmtDate(o.saleDate)}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 grid sm:grid-cols-2 gap-4 border-t border-blue-100">
                      {/* Customer info */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Customer</p>
                        <p className="text-sm font-semibold text-gray-900">{o.customerFirstName} {o.customerLastName}</p>
                        {o.customerPhone && <p className="text-xs text-gray-500 mt-0.5">{o.customerPhone}</p>}
                        {o.customerEmail && <p className="text-xs text-gray-500">{o.customerEmail}</p>}
                        {o.customerAddress && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {[o.customerAddress, o.customerCity, o.customerState, o.customerZip].filter(Boolean).join(", ")}
                          </p>
                        )}
                      </div>

                      {/* Order info */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-2">Order</p>
                        <DetailRow label="Carrier" value={o.carrier} />
                        {o.service && <DetailRow label="Plan" value={o.service} />}
                        <DetailRow label="Sale Date" value={fmtDate(o.saleDate)} />
                        {o.installDate && <DetailRow label="Install Date" value={fmtDate(o.installDate)} />}
                        {o.orderNumber && <DetailRow label="Order #" value={o.orderNumber} />}
                      </div>

                      {/* Notes spanning full width */}
                      {(o.notes || o.adminNotes) && (
                        <div className="sm:col-span-2 space-y-2">
                          {o.notes && (
                            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-1">Notes</p>
                              <p className="text-xs text-gray-600 leading-relaxed">{o.notes}</p>
                            </div>
                          )}
                          {o.adminNotes && (
                            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-amber-600 mb-1">Message from Admin</p>
                              <p className="text-xs text-amber-800 leading-relaxed">{o.adminNotes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Bookmark this page · <Link href={`/orders?a=${agent.id}`} className="underline hover:text-gray-600">Submit a new order</Link>
      </p>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-xs mt-1">
      <span className="text-gray-400 w-20 flex-shrink-0">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon, color, label, value, sub,
}: {
  icon: React.ReactNode
  color: "blue" | "emerald" | "violet" | "amber"
  label: string
  value: string
  sub: string
}) {
  const colorMap = {
    blue:    "from-blue-50 to-white border-blue-100 text-blue-600",
    emerald: "from-emerald-50 to-white border-emerald-100 text-emerald-600",
    violet:  "from-violet-50 to-white border-violet-100 text-violet-600",
    amber:   "from-amber-50 to-white border-amber-100 text-amber-600",
  }
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 ${colorMap[color]}`}>
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
    </div>
  )
}
