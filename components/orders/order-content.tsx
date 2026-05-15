"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  ChevronDown,
} from "lucide-react"
import { PROVIDERS } from "@/lib/exhibits"
import type { AgentProfile } from "@/lib/order-types"

// ── Types ──────────────────────────────────────────────────────────

const PROGRAM_OPTIONS = [
  { value: "referral",       label: "Referral Partner" },
  { value: "sales-agent",    label: "Sales Agent" },
  { value: "business",       label: "Business (IBO)" },
  { value: "spectrum-event", label: "Spectrum Event Team" },
  { value: "tmobile-d2d",    label: "T-Mobile Fiber D2D" },
  { value: "verizon-d2d",    label: "Verizon Fios D2D" },
]

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
]

// AT&T is excluded from the order form
const CARRIERS = PROVIDERS.filter((p) => p.id !== "att")
const CARRIER_NAMES = [...CARRIERS.map((p) => p.provider), "Other"]

// Carriers that do NOT require SSN
const SSN_EXEMPT = new Set(["T-Mobile", "Frontier", "EarthLink"])
// Carriers that require credit card info instead of SSN
const REQUIRES_CC  = new Set(["EarthLink"])

function needsSsn(carrier: string): boolean {
  return !!carrier && carrier !== "Other" && !SSN_EXEMPT.has(carrier)
}
function needsCc(carrier: string): boolean {
  return REQUIRES_CC.has(carrier)
}

interface FormValues {
  // Step 1 — Agent
  agentFirstName: string
  agentLastName: string
  agentEmail: string
  agentPhone: string
  partnerType: string
  // Step 2 — Customer
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
  // Step 3 — Order
  carrier: string
  service: string
  saleDate: string
  installDate: string
  installTime: string
  notes: string
}

function makeInitial(): FormValues {
  return {
    agentFirstName: "",
    agentLastName: "",
    agentEmail: "",
    agentPhone: "",
    partnerType: "sales-agent",
    customerFirstName: "",
    customerLastName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    customerCity: "",
    customerState: "",
    customerZip: "",
    customerDob: "",
    customerSsn: "",
    customerCcNumber: "",
    customerCcExpiry: "",
    customerCcCvv: "",
    carrier: "",
    service: "",
    saleDate: todayIso(),
    installDate: "",
    installTime: "",
    notes: "",
  }
}

const TOTAL_STEPS_MANUAL  = 4 // Your Info, Customer, Order, Review
const TOTAL_STEPS_LINKED  = 3 // Customer, Order, Review (agent pre-loaded)

const STEP_LABELS_MANUAL = ["Your Info", "Customer", "Order", "Review"]
const STEP_LABELS_LINKED = ["Customer", "Order", "Review"]

const PROGRAM_LABELS: Record<string, string> = {
  referral:        "Referral Partner",
  "sales-agent":   "Sales Agent",
  business:        "Business (IBO)",
  "spectrum-event":"Spectrum Event Team",
  "tmobile-d2d":   "T-Mobile Fiber D2D",
  "verizon-d2d":   "Verizon Fios D2D",
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
}

// ── Helpers ────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function formatSsn(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 9)
  if (d.length < 4) return d
  if (d.length < 6) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`
}

function formatCcNumber(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 16)
  return d.replace(/(.{4})(?=.)/g, "$1 ").trim()
}

function formatCcExpiry(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

function todayIso(): string {
  return new Date().toISOString().split("T")[0]
}

function formatDob(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

// ── Install Calendar helpers ──────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const CAL_DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const INSTALL_TIME_OPTIONS = [
  { value: "8am–11am",  label: "8:00 AM – 11:00 AM" },
  { value: "11am–2pm",  label: "11:00 AM – 2:00 PM" },
  { value: "2pm–5pm",   label: "2:00 PM – 5:00 PM" },
]

function getInstallRange(): { min: Date; max: Date } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const min = new Date(today)
  min.setDate(today.getDate() + 2)
  const max = new Date(today)
  max.setDate(today.getDate() + 15)
  return { min, max }
}

function toIso(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${dd}`
}

function InstallCalendar({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const { min, max } = getInstallRange()
  const [viewMonth, setViewMonth] = useState(
    () => new Date(min.getFullYear(), min.getMonth(), 1)
  )
  const year  = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow    = new Date(year, month, 1).getDay()

  const canPrev = viewMonth > new Date(min.getFullYear(), min.getMonth(), 1)
  const canNext = viewMonth < new Date(max.getFullYear(), max.getMonth(), 1)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedLabel = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric",
      })
    : null

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
          disabled={!canPrev}
          className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed text-xl leading-none"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-slate-900">{MONTH_NAMES[month]} {year}</span>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          disabled={!canNext}
          className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed text-xl leading-none"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 px-3 pt-2">
        {CAL_DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1.5">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5 px-3 pb-3">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`blank-${idx}`} className="h-9" />
          const dt        = new Date(year, month, day)
          const iso       = toIso(dt)
          const available = dt >= min && dt <= max
          const selected  = value === iso
          return (
            <button
              key={iso}
              type="button"
              disabled={!available}
              onClick={() => onChange(selected ? "" : iso)}
              className={`h-9 w-full rounded-lg text-sm font-medium transition-colors ${
                selected
                  ? "bg-green-600 text-white shadow-sm"
                  : available
                  ? "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200"
                  : "text-gray-300 cursor-default"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {selectedLabel && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between rounded-xl bg-green-50 border border-green-200 px-3 py-2">
            <span className="text-xs text-green-700 font-medium">{selectedLabel}</span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-green-600 hover:text-green-800 font-semibold ml-3"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Field wrapper ──────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div data-error={!!error || undefined}>
      <Label className="text-slate-700 text-sm font-medium mb-1.5 block">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

// ── Select ─────────────────────────────────────────────────────────

function SelectField({
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
  error?: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-11 rounded-xl border bg-white px-4 pr-10 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-colors ${
          error ? "border-red-400" : "border-gray-300 focus:border-red-400"
        } ${!value ? "text-gray-400" : "text-slate-900"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  )
}

// ── Review row ─────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-slate-500 text-sm shrink-0">{label}</span>
      <span className="text-slate-900 text-sm font-medium text-right">{value}</span>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────

const LS_AGENT_KEY = "stance_agent"

// ── Component ──────────────────────────────────────────────────────────────────

export function OrderContent({ agentId }: { agentId: string | null }) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<FormValues>(makeInitial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [agentSaved, setAgentSaved] = useState(false)
  const [agentProfile, setAgentProfile] = useState<AgentProfile | null>(null)
  const [agentLoading, setAgentLoading] = useState(!!agentId)

  // Derived config based on whether an agent is linked via URL
  const isLinked    = !!agentProfile
  const isReferral  = (agentProfile?.partnerType ?? form.partnerType) === "referral"
  const TOTAL_STEPS = isLinked ? TOTAL_STEPS_LINKED  : TOTAL_STEPS_MANUAL
  const STEP_LABELS = isLinked ? STEP_LABELS_LINKED  : STEP_LABELS_MANUAL
  // Internal step when linked starts at 2 (skip "Your Info"); display step is 1-based vs TOTAL_STEPS
  const minStep     = isLinked ? 2 : 1
  const displayStep = step - (isLinked ? 1 : 0)

  // Available services for the selected carrier, labelled with monthly customer price
  const carrierServiceOpts = useMemo(() => {
    if (!form.carrier || form.carrier === "Other") return []
    const provider = CARRIERS.find((p) => p.provider === form.carrier)
    if (!provider) return []
    return provider.rows.map((r) => ({
      value: r.service,
      label: `${r.service}  ·  $${r.price}/mo`,
    }))
  }, [form.carrier])

  const update = useCallback(
    (name: keyof FormValues, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [name]: value }
        // Reset service when carrier changes
        if (name === "carrier") next.service = ""
        return next
      })
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    },
    []
  )

  const phone = useCallback(
    (name: "agentPhone" | "customerPhone", raw: string) => update(name, formatPhone(raw)),
    [update]
  )

  const validateStep = useCallback((): boolean => {
    const e: Record<string, string> = {}

    if (step === 1) {
      if (!form.agentFirstName.trim()) e.agentFirstName = "Required"
      if (!form.agentLastName.trim()) e.agentLastName = "Required"
      if (!form.agentEmail.trim()) {
        e.agentEmail = "Required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.agentEmail)) {
        e.agentEmail = "Enter a valid email"
      }
      if (!form.agentPhone.trim()) e.agentPhone = "Required"
      if (!form.partnerType) e.partnerType = "Required"
    }

    if (step === 2) {
      if (!form.customerFirstName.trim()) e.customerFirstName = "Required"
      if (!form.customerLastName.trim()) e.customerLastName = "Required"
      if (!form.customerPhone.trim()) e.customerPhone = "Required"
      if (!form.customerEmail.trim()) {
        e.customerEmail = "Required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
        e.customerEmail = "Enter a valid email"
      }
      if (!form.customerAddress.trim()) e.customerAddress = "Required"
      if (!form.customerCity.trim()) e.customerCity = "Required"
      if (!form.customerState) e.customerState = "Required"
      if (!form.customerZip.trim()) e.customerZip = "Required"
      else if (!/^\d{5}(-\d{4})?$/.test(form.customerZip.trim())) e.customerZip = "Enter a valid ZIP code"
      if (!form.customerDob) e.customerDob = "Required"
    }

    if (step === 3) {
      if (!form.carrier.trim()) e.carrier = "Required"
      if (!isReferral && !form.service.trim()) e.service = "Required"
      if (!form.saleDate) e.saleDate = "Required"
      if (!isReferral && needsSsn(form.carrier) && !form.customerSsn.trim()) e.customerSsn = "Required"
      if (!isReferral && needsCc(form.carrier)) {
        if (!form.customerCcNumber.trim()) e.customerCcNumber = "Required"
        if (!form.customerCcExpiry.trim()) e.customerCcExpiry = "Required"
        if (!form.customerCcCvv.trim()) e.customerCcCvv = "Required"
      }
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }, [step, form])

  const goNext = useCallback(() => {
    if (!validateStep()) {
      setTimeout(() => {
        const el = document.querySelector("[data-error]")
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 60)
      return
    }
    setDirection(1)
    setStep((s) => Math.min(s + 1, 4))
  }, [validateStep])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, minStep))
  }, [minStep])

  // Load agent profile from URL param (personal order link)
  useEffect(() => {
    if (!agentId) return
    fetch(`/api/agents/${agentId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: AgentProfile | null) => {
        if (data) {
          setAgentProfile(data)
          setForm((prev) => ({
            ...prev,
            agentFirstName: data.firstName,
            agentLastName: data.lastName,
            agentEmail: data.email,
            agentPhone: data.phone,
            partnerType: data.partnerType,
          }))
          setStep(2)
        }
      })
      .catch(() => { /* fall back to manual entry */ })
      .finally(() => setAgentLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load saved agent info from localStorage (manual-entry flow only)
  useEffect(() => {
    if (agentId) return // profile link takes precedence
    try {
      const saved = localStorage.getItem(LS_AGENT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormValues>
        setForm((prev) => ({
          ...prev,
          agentFirstName: parsed.agentFirstName || prev.agentFirstName,
          agentLastName: parsed.agentLastName || prev.agentLastName,
          agentEmail: parsed.agentEmail || prev.agentEmail,
          agentPhone: parsed.agentPhone || prev.agentPhone,
          partnerType: parsed.partnerType || prev.partnerType,
        }))
        setAgentSaved(true)
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try { window.scrollTo({ top: 0, behavior: "smooth" }) } catch { window.scrollTo(0, 0) }
  }, [step])

  const isStepReady = useMemo(() => {
    // When agent is linked, step 1 is auto-skipped so always consider it ready
    if (step === 1) {
      if (isLinked) return true
      return !!(
        form.agentFirstName.trim() &&
        form.agentLastName.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.agentEmail) &&
        form.agentPhone.trim() &&
        form.partnerType
      )
    }
    if (step === 2) {
      return !!(
        form.customerFirstName.trim() &&
        form.customerLastName.trim() &&
        form.customerPhone.trim() &&
        form.customerEmail.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail) &&
        form.customerAddress.trim() &&
        form.customerCity.trim() &&
        form.customerState &&
        /^\d{5}(-\d{4})?$/.test(form.customerZip.trim()) &&
        (isReferral || !!form.customerDob)
      )
    }
    if (step === 3) {
      const idOk = isReferral || (
        needsCc(form.carrier)
          ? !!(form.customerCcNumber.trim() && form.customerCcExpiry.trim() && form.customerCcCvv.trim())
          : needsSsn(form.carrier)
            ? !!form.customerSsn.trim()
            : true
      )
      const serviceOk = isReferral || !!form.service.trim()
      return !!(form.carrier.trim() && serviceOk && form.saleDate && idOk)
    }
    return true
  }, [step, form])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, agentId: agentProfile?.id || "" }),
      })
      if (!res.ok) {
        const parsed = await res.json().catch(() => null) as { error?: string } | null
        throw new Error(parsed?.error || "Submission failed. Please try again.")
      }
      // Persist agent info for next submission
      try {
        localStorage.setItem(LS_AGENT_KEY, JSON.stringify({
          agentFirstName: form.agentFirstName,
          agentLastName: form.agentLastName,
          agentEmail: form.agentEmail,
          agentPhone: form.agentPhone,
          partnerType: form.partnerType,
        }))
      } catch { /* ignore */ }
      setIsComplete(true)
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Something went wrong." })
    } finally {
      setIsSubmitting(false)
    }
  }, [form])

  const programLabel =
    PROGRAM_LABELS[form.partnerType] ||
    PROGRAM_OPTIONS.find((p) => p.value === form.partnerType)?.label ||
    form.partnerType

  // ── Loading (fetching linked agent profile) ──
  if (agentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-slate-600 text-sm">Loading your profile…</p>
        </div>
      </div>
    )
  }

  // ── Completion ──
  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#090d14] relative overflow-hidden flex flex-col">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(59,130,246,0.28), transparent 35%), radial-gradient(circle at 85% 80%, rgba(99,102,241,0.18), transparent 32%), linear-gradient(180deg, #0b111d 0%, #090d14 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between">
            <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={140} height={32} className="h-7 w-auto" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/65 font-semibold">Order Submitted</span>
          </div>
        </div>

        <div className="relative z-10 flex-1 px-5 py-10 sm:py-14 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <div className="rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-300/25 px-3 py-1.5 mb-5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.22em] text-emerald-100 font-bold">Order Received</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-bold text-white leading-[1.05] mb-4">
                    Order<br />Submitted
                  </h1>
                  <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                    Thanks {form.agentFirstName}. Your order for{" "}
                    <span className="text-white font-semibold">
                      {form.customerFirstName} {form.customerLastName}
                    </span>{" "}
                    ({form.carrier} — {form.service}) has been logged.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Carrier", value: form.carrier },
                      { label: "Plan", value: form.service },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/15 bg-black/25 px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-1">{item.label}</p>
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-7 sm:p-9 bg-slate-950/35">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80 font-bold mb-4">What&apos;s Next</p>
                  <div className="space-y-4 mb-7">
                    {[
                      "Your order has been emailed to the Stance team.",
                      "Commission will be tracked against this submission.",
                      "Reach out if you need to update or correct this order.",
                    ].map((line, idx) => (
                      <div key={line} className="flex gap-3 items-start">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 border border-blue-300/30 text-blue-100 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-white/80 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        // Keep agent info, jump straight to customer step
                        setForm((prev) => ({
                          ...makeInitial(),
                          agentFirstName: prev.agentFirstName,
                          agentLastName: prev.agentLastName,
                          agentEmail: prev.agentEmail,
                          agentPhone: prev.agentPhone,
                          partnerType: prev.partnerType,
                        }))
                        setStep(minStep)
                        setDirection(1)
                        setIsComplete(false)
                      }}
                      className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Submit Another Order
                    </Button>
                    {agentId && (
                      <Link href={`/orders/history?a=${agentId}`} className="block">
                        <Button variant="outline" className="w-full h-11 rounded-xl border-white/15 text-white/70 hover:bg-white/5 hover:text-white">
                          View My Order History
                        </Button>
                      </Link>
                    )}
                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full h-11 rounded-xl border-white/15 text-white/70 hover:bg-white/5 hover:text-white">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── Multi-step form ──
  const inputCls = (err?: string) =>
    `h-11 rounded-xl border bg-white text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30 transition-colors ${
      err ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-blue-400"
    }`

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Desktop left panel */}
      <div className="relative hidden lg:flex lg:w-[320px] xl:w-[360px] flex-shrink-0 bg-[#0a0e13] flex-col overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
          <Link href="/">
            <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={140} height={32} className="h-7 w-auto mb-10" />
          </Link>

          <div className="flex flex-col gap-2 mt-auto mb-10">
            {STEP_LABELS.map((label, i) => {
              const done   = (i + 1) < displayStep
              const active = (i + 1) === displayStep
              return (
                <div key={label} className="flex items-center gap-3">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                    done
                      ? "bg-emerald-500 text-white"
                      : active
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white/30"
                  }`}>
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${
                    active ? "text-white" : done ? "text-emerald-400" : "text-white/30"
                  }`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-white/20 text-xs">© 2026 Stance Marketing LLC</p>
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 bg-gray-50 flex flex-col">

        {/* Mobile header */}
        <div className="lg:hidden border-b border-gray-200 bg-white px-5 py-4 flex items-center justify-between">
          <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={110} height={25} className="h-6 w-auto brightness-0" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Order Submission</span>
        </div>

        {/* Progress bar (mobile) */}
        <div className="lg:hidden h-1 bg-gray-200">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(displayStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex items-start justify-center px-5 py-8 sm:px-8 sm:py-10 lg:py-14">
          <div className="w-full max-w-[560px]">

            {/* Agent identity banner (linked flow) */}
            {isLinked && agentProfile && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  {agentProfile.firstName[0]}{agentProfile.lastName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-blue-900">
                    {agentProfile.firstName} {agentProfile.lastName}
                  </p>
                  <p className="text-xs text-blue-600">{programLabel}</p>
                </div>
                <Link href={`/orders/history?a=${agentId}`} className="text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap">
                  My Orders →
                </Link>
              </div>
            )}

            {/* Step label */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 mb-1">
                Step {displayStep} of {TOTAL_STEPS}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {step === 1 && "Your Information"}
                {step === 2 && "Customer Details"}
                {step === 3 && "Order Details"}
                {step === 4 && "Review & Submit"}
              </h2>
            </div>

            {/* Animated step content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >

                {/* ── Step 1: Agent Info ── */}
                {step === 1 && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
                    {agentSaved && (
                      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm text-emerald-700">Profile pre-filled from your last submission. Update if anything changed.</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First name" required error={errors.agentFirstName}>
                        <Input
                          value={form.agentFirstName}
                          onChange={(e) => update("agentFirstName", e.target.value)}
                          placeholder="Jane"
                          className={inputCls(errors.agentFirstName)}
                        />
                      </Field>
                      <Field label="Last name" required error={errors.agentLastName}>
                        <Input
                          value={form.agentLastName}
                          onChange={(e) => update("agentLastName", e.target.value)}
                          placeholder="Smith"
                          className={inputCls(errors.agentLastName)}
                        />
                      </Field>
                    </div>
                    <Field label="Email address" required error={errors.agentEmail}>
                      <Input
                        value={form.agentEmail}
                        onChange={(e) => update("agentEmail", e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                        className={inputCls(errors.agentEmail)}
                      />
                    </Field>
                    <Field label="Phone number" required error={errors.agentPhone}>
                      <Input
                        value={form.agentPhone}
                        onChange={(e) => phone("agentPhone", e.target.value)}
                        type="tel"
                        placeholder="(555) 555-5555"
                        className={inputCls(errors.agentPhone)}
                      />
                    </Field>
                    <Field label="Your program / role" required error={errors.partnerType}>
                      <SelectField
                        value={form.partnerType}
                        onChange={(v) => update("partnerType", v)}
                        placeholder="Select program"
                        options={PROGRAM_OPTIONS}
                        error={errors.partnerType}
                      />
                    </Field>
                  </div>
                )}

                {/* ── Step 2: Customer Info ── */}
                {step === 2 && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First name" required error={errors.customerFirstName}>
                        <Input
                          value={form.customerFirstName}
                          onChange={(e) => update("customerFirstName", e.target.value)}
                          placeholder="John"
                          className={inputCls(errors.customerFirstName)}
                        />
                      </Field>
                      <Field label="Last name" required error={errors.customerLastName}>
                        <Input
                          value={form.customerLastName}
                          onChange={(e) => update("customerLastName", e.target.value)}
                          placeholder="Doe"
                          className={inputCls(errors.customerLastName)}
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Phone" required error={errors.customerPhone}>
                        <Input
                          value={form.customerPhone}
                          onChange={(e) => phone("customerPhone", e.target.value)}
                          type="tel"
                          placeholder="(555) 555-5555"
                          className={inputCls(errors.customerPhone)}
                        />
                      </Field>
                      <Field label="Email" required error={errors.customerEmail}>
                        <Input
                          value={form.customerEmail}
                          onChange={(e) => update("customerEmail", e.target.value)}
                          type="email"
                          placeholder="customer@example.com"
                          className={inputCls(errors.customerEmail)}
                        />
                      </Field>
                    </div>
                    <Field label="Service address" required error={errors.customerAddress}>
                      <Input
                        value={form.customerAddress}
                        onChange={(e) => update("customerAddress", e.target.value)}
                        placeholder="123 Main St"
                        className={inputCls(errors.customerAddress)}
                      />
                    </Field>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <Field label="City" required error={errors.customerCity}>
                          <Input
                            value={form.customerCity}
                            onChange={(e) => update("customerCity", e.target.value)}
                            placeholder="City"
                            className={inputCls(errors.customerCity)}
                          />
                        </Field>
                      </div>
                      <div className="col-span-1">
                        <Field label="State" required error={errors.customerState}>
                          <SelectField
                            value={form.customerState}
                            onChange={(v) => update("customerState", v)}
                            placeholder="State"
                            options={US_STATES.map((s) => ({ value: s, label: s }))}
                            error={errors.customerState}
                          />
                        </Field>
                      </div>
                      <div className="col-span-1">
                        <Field label="ZIP" required error={errors.customerZip}>
                          <Input
                            value={form.customerZip}
                            onChange={(e) => update("customerZip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                            placeholder="00000"
                            className={inputCls(errors.customerZip)}
                          />
                        </Field>
                      </div>
                    </div>
                    {!isReferral && (
                      <Field label="Date of Birth" required error={errors.customerDob}>
                        <Input
                          value={form.customerDob}
                          onChange={(e) => update("customerDob", formatDob(e.target.value))}
                          type="text"
                          placeholder="MM/DD/YYYY"
                          maxLength={10}
                          className={inputCls(errors.customerDob)}
                        />
                      </Field>
                    )}
                  </div>
                )}

                {/* ── Step 3: Order Details ── */}
                {step === 3 && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
                    <Field label="Carrier" required error={errors.carrier}>
                      <SelectField
                        value={form.carrier}
                        onChange={(v) => update("carrier", v)}
                        placeholder="Select carrier"
                        options={CARRIER_NAMES.map((n) => ({ value: n, label: n }))}
                        error={errors.carrier}
                      />
                    </Field>

                    {!isReferral && (
                      <Field label="Service / Plan" required error={errors.service}>
                        {carrierServiceOpts.length > 0 ? (
                          <SelectField
                            value={form.service}
                            onChange={(v) => update("service", v)}
                            placeholder="Select service / plan"
                            options={carrierServiceOpts}
                            error={errors.service}
                          />
                        ) : (
                          <Input
                            value={form.service}
                            onChange={(e) => update("service", e.target.value)}
                            placeholder="e.g. Internet 1 Gig, Fiber 500M"
                            className={inputCls(errors.service)}
                          />
                        )}
                      </Field>
                    )}

                    {/* ── Carrier-specific identity fields (not shown for referrals) ── */}
                    {!isReferral && form.carrier && form.carrier !== "Other" && (needsSsn(form.carrier) || needsCc(form.carrier)) && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                          Customer Identity — Required by {form.carrier}
                        </p>

                        {needsSsn(form.carrier) && (
                          <Field label="Social Security Number" required error={errors.customerSsn}>
                            <Input
                              value={form.customerSsn}
                              onChange={(e) => update("customerSsn", formatSsn(e.target.value))}
                              placeholder="XXX-XX-XXXX"
                              className={inputCls(errors.customerSsn)}
                              maxLength={11}
                            />
                          </Field>
                        )}

                        {needsCc(form.carrier) && (
                          <>
                            <Field label="Card number" required error={errors.customerCcNumber}>
                              <Input
                                value={form.customerCcNumber}
                                onChange={(e) => update("customerCcNumber", formatCcNumber(e.target.value))}
                                placeholder="XXXX XXXX XXXX XXXX"
                                className={inputCls(errors.customerCcNumber)}
                                maxLength={19}
                              />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                              <Field label="Expiry (MM/YY)" required error={errors.customerCcExpiry}>
                                <Input
                                  value={form.customerCcExpiry}
                                  onChange={(e) => update("customerCcExpiry", formatCcExpiry(e.target.value))}
                                  placeholder="MM/YY"
                                  className={inputCls(errors.customerCcExpiry)}
                                  maxLength={5}
                                />
                              </Field>
                              <Field label="CVV" required error={errors.customerCcCvv}>
                                <Input
                                  value={form.customerCcCvv}
                                  onChange={(e) => update("customerCcCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                                  placeholder="XXX"
                                  className={inputCls(errors.customerCcCvv)}
                                  maxLength={4}
                                />
                              </Field>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <Field label="Sale date" required error={errors.saleDate}>
                      <Input
                        value={form.saleDate}
                        onChange={(e) => update("saleDate", e.target.value)}
                        type="date"
                        max={todayIso()}
                        className={inputCls(errors.saleDate)}
                      />
                    </Field>

                    <Field label="Install date" error={errors.installDate}>
                      <InstallCalendar
                        value={form.installDate}
                        onChange={(v) => {
                          update("installDate", v)
                          if (!v) update("installTime", "")
                        }}
                      />
                    </Field>

                    {form.installDate && (
                      <Field label="Install time window" error={errors.installTime}>
                        <SelectField
                          value={form.installTime}
                          onChange={(v) => update("installTime", v)}
                          placeholder="Select a time window"
                          options={INSTALL_TIME_OPTIONS}
                        />
                      </Field>
                    )}

                    <Field label="Notes" error={errors.notes}>
                      <Textarea
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Any additional info about this order…"
                        rows={3}
                        className="rounded-xl border border-gray-300 bg-white text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors resize-none"
                      />
                    </Field>
                  </div>
                )}

                {/* ── Step 4: Review ── */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Your Info</p>
                      <ReviewRow label="Name" value={`${form.agentFirstName} ${form.agentLastName}`} />
                      <ReviewRow label="Email" value={form.agentEmail} />
                      <ReviewRow label="Phone" value={form.agentPhone} />
                      <ReviewRow label="Program" value={programLabel} />
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Customer</p>
                      <ReviewRow label="Name" value={`${form.customerFirstName} ${form.customerLastName}`} />
                      <ReviewRow label="Phone" value={form.customerPhone} />
                      {form.customerEmail && <ReviewRow label="Email" value={form.customerEmail} />}
                      <ReviewRow
                        label="Address"
                        value={[form.customerAddress, form.customerCity, form.customerState, form.customerZip].filter(Boolean).join(", ")}
                      />
                      {form.customerDob && !isReferral && <ReviewRow label="Date of Birth" value={form.customerDob} />}
                      {form.customerSsn && !isReferral && <ReviewRow label="SSN" value={`XXX-XX-${form.customerSsn.slice(-4)}`} />}
                      {form.customerCcNumber && !isReferral && <ReviewRow label="Card" value={`•••• •••• •••• ${form.customerCcNumber.replace(/\s/g, "").slice(-4)}`} />}
                      {form.customerCcExpiry && !isReferral && <ReviewRow label="Card Expiry" value={form.customerCcExpiry} />}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Order</p>
                      <ReviewRow label="Carrier" value={form.carrier} />
                      {!isReferral && form.service && <ReviewRow label="Service / Plan" value={form.service} />}
                      <ReviewRow label="Sale Date" value={form.saleDate} />
                      {form.installDate && <ReviewRow label="Install Date" value={form.installDate} />}
                      {form.installTime && <ReviewRow label="Install Time" value={form.installTime} />}
                      {form.notes && <ReviewRow label="Notes" value={form.notes} />}
                    </div>

                    {errors.submit && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-red-600 text-sm">{errors.submit}</p>
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className={`flex mt-6 gap-3 ${step > minStep ? "justify-between" : "justify-end"}`}>
              {step > minStep && (
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={isSubmitting}
                  className="h-12 px-6 rounded-xl border-gray-300 text-slate-700 hover:bg-gray-100 font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {displayStep < TOTAL_STEPS ? (
                <Button
                  onClick={goNext}
                  className={`h-12 px-8 rounded-xl font-semibold text-white shadow-lg transition-all ${
                    isStepReady
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Order
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
