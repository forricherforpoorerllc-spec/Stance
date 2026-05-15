import { NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { type Order, ORDER_STATUS_LABELS } from "@/lib/order-types"

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

const COLUMNS: { key: keyof Order | "statusLabel"; label: string }[] = [
  { key: "submittedAt",       label: "Submitted At" },
  { key: "updatedAt",         label: "Updated At" },
  { key: "id",                label: "Order ID" },
  { key: "statusLabel",       label: "Status" },
  { key: "agentName",         label: "Agent" },
  { key: "agentEmail",        label: "Agent Email" },
  { key: "partnerType",       label: "Program" },
  { key: "customerFirstName", label: "Customer First" },
  { key: "customerLastName",  label: "Customer Last" },
  { key: "customerPhone",     label: "Customer Phone" },
  { key: "customerEmail",     label: "Customer Email" },
  { key: "customerAddress",   label: "Address" },
  { key: "customerCity",      label: "City" },
  { key: "customerState",     label: "State" },
  { key: "customerZip",       label: "Zip" },
  { key: "carrier",           label: "Carrier" },
  { key: "service",           label: "Service" },
  { key: "orderNumber",       label: "Order #" },
  { key: "saleDate",          label: "Sale Date" },
  { key: "installDate",       label: "Install Date" },
  { key: "notes",             label: "Agent Notes" },
  { key: "adminNotes",        label: "Admin Notes" },
]

// ── GET /api/orders/export — CSV download ───────────────────────────────────────
export async function GET() {

  try {
    const { blobs } = await list({ prefix: "orders/" })
    const orders = await Promise.all(
      blobs.map(async (b) => {
        const r = await fetch(b.url)
        return r.json() as Promise<Order>
      })
    )
    orders.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    const header = COLUMNS.map((c) => csvEscape(c.label)).join(",")
    const rows = orders.map((o) =>
      COLUMNS.map((c) => {
        if (c.key === "statusLabel") return csvEscape(ORDER_STATUS_LABELS[o.status])
        return csvEscape(o[c.key as keyof Order])
      }).join(",")
    )
    const csv = [header, ...rows].join("\n")
    const stamp = new Date().toISOString().slice(0, 10)

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="stance-orders-${stamp}.csv"`,
      },
    })
  } catch (err) {
    console.error("Export error:", err)
    return NextResponse.json({ error: "Failed to export" }, { status: 500 })
  }
}
