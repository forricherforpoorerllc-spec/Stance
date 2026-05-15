// ── Agent Profile ─────────────────────────────────────────────────────────────

export interface AgentProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  partnerType: string
  createdAt: string
  source: "manual" | "onboarding"
}

// ── Order ─────────────────────────────────────────────────────────────────────

export type OrderStatus = "submitted" | "pending" | "complete" | "paid" | "cancelled"

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  submitted: "Submitted",
  pending:   "Pending",
  complete:  "Complete",
  paid:      "Paid",
  cancelled: "Cancelled",
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  submitted: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  pending:   "bg-amber-500/15 text-amber-300 border-amber-500/30",
  complete:  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  paid:      "bg-violet-500/15 text-violet-300 border-violet-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
}

export const ORDER_STATUS_COLORS_LIGHT: Record<OrderStatus, string> = {
  submitted: "bg-blue-100 text-blue-800 border-blue-300",
  pending:   "bg-amber-100 text-amber-800 border-amber-300",
  complete:  "bg-emerald-100 text-emerald-800 border-emerald-300",
  paid:      "bg-violet-100 text-violet-800 border-violet-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
}

export interface Order {
  id: string
  agentId: string
  agentName: string
  agentEmail: string
  partnerType: string
  customerFirstName: string
  customerLastName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  customerCity: string
  customerState: string
  customerZip: string
  customerDob: string
  customerSsn: string
  customerCcNumber: string
  customerCcExpiry: string
  customerCcCvv: string
  carrier: string
  service: string
  orderNumber: string
  saleDate: string
  installDate: string
  installTime: string
  notes: string
  status: OrderStatus
  submittedAt: string
  updatedAt: string
  adminNotes: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

import { PROVIDERS, type RoleKey } from "@/lib/exhibits"

const PARTNER_TO_ROLE: Record<string, RoleKey> = {
  "referral":       "referral",
  "sales-agent":    "salesAgent",
  "business":       "ibo",
  "spectrum-event": "salesAgent",
  "tmobile-d2d":    "salesAgent",
  "verizon-d2d":    "salesAgent",
}

/**
 * Returns the commission amount for a given order based on the agent's
 * partnerType, the carrier, and the service. Returns 0 if no match.
 */
export function lookupCommission(order: Pick<Order, "carrier" | "service" | "partnerType">): number {
  const role: RoleKey = PARTNER_TO_ROLE[order.partnerType] ?? "salesAgent"
  const provider = PROVIDERS.find(
    (p) => p.provider.toLowerCase() === order.carrier.toLowerCase()
  )
  if (!provider) return 0
  const row = provider.rows.find(
    (r) => r.service.toLowerCase() === order.service.toLowerCase()
  )
  if (!row) return 0
  return row[role] ?? 0
}
