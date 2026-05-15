// ── Types ────────────────────────────────────────────────────────────────────

export interface CompensationRow {
  service: string
  amount: number
}

export interface CompensationExhibit {
  id: string
  provider: string
  /** Display name used in review step and contract */
  name: string
  payStructure: CompensationRow[]
}

export type RoleKey = "referral" | "salesAgent" | "manager" | "ibo"

export interface OnboardingPayload {
  name: string
  email: string
  phone?: string
  partnerType: string
  exhibitIds: string[]
  /** Per-exhibit row-index → dollar override */
  overrides?: Record<string, Record<number, number>>
  /** When true, company is providing leads — commission is 20% less */
  leadsProvided?: boolean
}

// ── Master compensation data ──────────────────────────────────────────────────

interface MasterRow {
  service: string
  price: number   // monthly customer price ($/mo)
  referral: number
  salesAgent: number
  manager: number
  ibo: number
}

export interface ProviderDef {
  id: string
  provider: string
  rows: MasterRow[]
}

export const PROVIDERS: ProviderDef[] = [
  {
    id: "att",
    provider: "AT&T",
    rows: [
      { service: "Internet 1 Gig",      price: 80,  referral: 100,  salesAgent: 200,  manager: 50,    ibo: 350   },
      { service: "Internet 500Mbps",     price: 65,  referral: 80,   salesAgent: 160,  manager: 40,    ibo: 280   },
      { service: "Internet 300Mbps",     price: 55,  referral: 80,   salesAgent: 160,  manager: 40,    ibo: 280   },
      { service: "Internet 100Mbps",     price: 55,  referral: 30,   salesAgent: 60,   manager: 15,    ibo: 105   },
      { service: "Internet 50–75Mbps",   price: 45,  referral: 30,   salesAgent: 60,   manager: 15,    ibo: 105   },
      { service: "Internet <50 Mbps",    price: 35,  referral: 25,   salesAgent: 50,   manager: 12.5,  ibo: 87.5  },
      { service: "AT&T Air Internet",    price: 55,  referral: 32,   salesAgent: 64,   manager: 16,    ibo: 112   },
      { service: "Mobile – Finance",     price: 50,  referral: 30,   salesAgent: 60,   manager: 15,    ibo: 105   },
      { service: "Mobile – BYOD",        price: 35,  referral: 25,   salesAgent: 50,   manager: 12.5,  ibo: 87.5  },
    ],
  },
  {
    id: "frontier",
    provider: "Frontier",
    rows: [
      { service: "Fiber 7 Gig",              price: 200, referral: 140, salesAgent: 280, manager: 70,   ibo: 490   },
      { service: "Fiber 5 Gig",              price: 155, referral: 120, salesAgent: 240, manager: 60,   ibo: 420   },
      { service: "Fiber 2 Gig",              price: 100, referral: 100, salesAgent: 200, manager: 50,   ibo: 350   },
      { service: "Fiber 1 Gig",              price: 80,  referral: 85,  salesAgent: 170, manager: 42.5, ibo: 297.5 },
      { service: "Fiber 500M",               price: 55,  referral: 45,  salesAgent: 90,  manager: 22.5, ibo: 157.5 },
      { service: "HSI Internet (DSL/Copper)", price: 45,  referral: 10,  salesAgent: 20,  manager: 5,    ibo: 35    },
      { service: "Unlimited Voice",          price: 25,  referral: 25,  salesAgent: 50,  manager: 12.5, ibo: 87.5  },
    ],
  },
  {
    id: "tmobile",
    provider: "T-Mobile",
    rows: [
      { service: "2 GB",   price: 70, referral: 105, salesAgent: 210, manager: 52.5, ibo: 367.5 },
      { service: "1 GB",   price: 50, referral: 85,  salesAgent: 170, manager: 42.5, ibo: 297.5 },
      { service: "500 MB", price: 35, referral: 55,  salesAgent: 110, manager: 27.5, ibo: 192.5 },
    ],
  },
  {
    id: "brightspeed",
    provider: "Brightspeed",
    rows: [
      { service: "Internet 3G+",       price: 130, referral: 110, salesAgent: 220, manager: 55,   ibo: 385   },
      { service: "Internet 2G",        price: 110, referral: 100, salesAgent: 200, manager: 50,   ibo: 350   },
      { service: "Internet 700M–1G",   price: 85,  referral: 90,  salesAgent: 180, manager: 45,   ibo: 315   },
      { service: "Internet 300M–600M", price: 65,  referral: 65,  salesAgent: 130, manager: 32.5, ibo: 227.5 },
      { service: "Internet 200M",      price: 55,  referral: 45,  salesAgent: 90,  manager: 22.5, ibo: 157.5 },
      { service: "Internet 100M+",     price: 45,  referral: 40,  salesAgent: 80,  manager: 20,   ibo: 140   },
      { service: "Home Phone",         price: 20,  referral: 6,   salesAgent: 12,  manager: 3,    ibo: 21    },
    ],
  },
  {
    id: "kinetic",
    provider: "Kinetic",
    rows: [
      { service: "Fiber 2 Gig+",    price: 100, referral: 100, salesAgent: 200, manager: 50,   ibo: 350   },
      { service: "Fiber 1 Gig",     price: 80,  referral: 90,  salesAgent: 180, manager: 45,   ibo: 315   },
      { service: "Fiber Sub-Gig",   price: 60,  referral: 65,  salesAgent: 130, manager: 32.5, ibo: 227.5 },
      { service: "Internet Copper", price: 45,  referral: 35,  salesAgent: 70,  manager: 17.5, ibo: 122.5 },
      { service: "Secure VAS",      price: 10,  referral: 5,   salesAgent: 10,  manager: 2.5,  ibo: 17.5  },
    ],
  },
  {
    id: "spectrum",
    provider: "Spectrum",
    rows: [
      { service: "2 Gig Internet",         price: 130, referral: 100, salesAgent: 200, manager: 50,   ibo: 350   },
      { service: "1 Gig Internet",         price: 110, referral: 90,  salesAgent: 180, manager: 45,   ibo: 315   },
      { service: "Premier Internet",       price: 90,  referral: 80,  salesAgent: 160, manager: 40,   ibo: 280   },
      { service: "Advantage Internet",     price: 50,  referral: 24,  salesAgent: 48,  manager: 12,   ibo: 84    },
      { service: "Select Stream",          price: 35,  referral: 15,  salesAgent: 30,  manager: 7.5,  ibo: 52.5  },
      { service: "Stream",                 price: 20,  referral: 8,   salesAgent: 16,  manager: 4,    ibo: 28    },
      { service: "Home Phone",             price: 15,  referral: 4,   salesAgent: 8,   manager: 2,    ibo: 14    },
      { service: "Mobile Line 1",          price: 20,  referral: 20,  salesAgent: 40,  manager: 10,   ibo: 70    },
      { service: "Mobile Line 2–10",       price: 15,  referral: 35,  salesAgent: 70,  manager: 17.5, ibo: 122.5 },
      { service: "Mobile Unlimited L1",    price: 30,  referral: 25,  salesAgent: 50,  manager: 12.5, ibo: 87.5  },
      { service: "Mobile Unlimited L2–10", price: 25,  referral: 40,  salesAgent: 80,  manager: 20,   ibo: 140   },
    ],
  },
  {
    id: "optimum",
    provider: "Optimum",
    rows: [
      { service: "Broadband 5G+",  price: 110, referral: 80,  salesAgent: 160, manager: 40,   ibo: 280   },
      { service: "Broadband 2G",   price: 90,  referral: 65,  salesAgent: 130, manager: 32.5, ibo: 227.5 },
      { service: "Broadband 1G",   price: 70,  referral: 45,  salesAgent: 90,  manager: 22.5, ibo: 157.5 },
      { service: "Broadband 500M", price: 55,  referral: 35,  salesAgent: 70,  manager: 17.5, ibo: 122.5 },
      { service: "Mobile Line 1",  price: 30,  referral: 20,  salesAgent: 40,  manager: 10,   ibo: 70    },
      { service: "Mobile Line 2+", price: 25,  referral: 5,   salesAgent: 10,  manager: 2.5,  ibo: 17.5  },
      { service: "Video Premier",  price: 80,  referral: 10,  salesAgent: 20,  manager: 5,    ibo: 35    },
      { service: "Video Basic",    price: 40,  referral: 5,   salesAgent: 10,  manager: 2.5,  ibo: 17.5  },
    ],
  },
  {
    id: "earthlink",
    provider: "EarthLink",
    rows: [
      { service: "Internet 100M+",         price: 80, referral: 55, salesAgent: 110, manager: 27.5, ibo: 192.5 },
      { service: "Internet <100M",          price: 60, referral: 35, salesAgent: 70,  manager: 17.5, ibo: 122.5 },
      { service: "Wireless Home Internet",  price: 50, referral: 30, salesAgent: 60,  manager: 15,   ibo: 105   },
    ],
  },
  {
    id: "altafiber",
    provider: "Altafiber",
    rows: [
      { service: "Fioptics 750M–1G",  price: 75, referral: 27, salesAgent: 54, manager: 13.5, ibo: 94.5 },
      { service: "Fioptics 100–500M", price: 55, referral: 23, salesAgent: 46, manager: 11.5, ibo: 80.5 },
      { service: "Phone",             price: 20, referral: 5,  salesAgent: 10, manager: 2.5,  ibo: 17.5 },
    ],
  },
  {
    id: "verizon",
    provider: "Verizon",
    rows: [
      { service: "5G + 1 Line",  price: 70,  referral: 125, salesAgent: 250, manager: 62.5,  ibo: 437.5  },
      { service: "5G + 2 Lines", price: 120, referral: 175, salesAgent: 350, manager: 87.5,  ibo: 612.5  },
      { service: "5G + 3 Lines", price: 160, referral: 225, salesAgent: 450, manager: 112.5, ibo: 787.5  },
      { service: "5G + 4 Lines", price: 200, referral: 275, salesAgent: 550, manager: 137.5, ibo: 962.5  },
    ],
  },
]

// ── Role helpers ──────────────────────────────────────────────────────────────

const PARTNER_TYPE_TO_ROLE: Record<string, RoleKey> = {
  referral:         "referral",
  "sales-agent":    "salesAgent",
  business:         "ibo",
  "spectrum-event": "salesAgent",
  "tmobile-d2d":    "salesAgent",
  "verizon-d2d":    "salesAgent",
}

export function getDefaultRole(partnerType: string): RoleKey {
  return PARTNER_TYPE_TO_ROLE[partnerType] ?? "salesAgent"
}

/** Return default per-row amounts for a provider + role combination. */
export function getDefaultAmountsForProvider(providerId: string, role: RoleKey): number[] {
  const def = PROVIDERS.find((p) => p.id === providerId)
  if (!def) return []
  return def.rows.map((r) => r[role])
}

// ── Public exhibit API ────────────────────────────────────────────────────────

/**
 * Returns a CompensationExhibit with salesAgent amounts as defaults.
 * The onboarding page applies payload overrides on top of these.
 */
export function getExhibitById(id: string): CompensationExhibit | null {
  const def = PROVIDERS.find((p) => p.id === id)
  if (!def) return null
  return {
    id: def.id,
    provider: def.provider,
    name: def.provider,
    payStructure: def.rows.map((r) => ({ service: r.service, amount: r.salesAgent })),
  }
}

// ── Payload encoding ──────────────────────────────────────────────────────────

function toBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1: string) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  )
}

function fromBase64(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )
}

export function encodePayload(payload: OnboardingPayload): string {
  return toBase64(JSON.stringify(payload))
}

export function decodePayload(encoded: string): OnboardingPayload | null {
  try {
    return JSON.parse(fromBase64(encoded)) as OnboardingPayload
  } catch {
    return null
  }
}
