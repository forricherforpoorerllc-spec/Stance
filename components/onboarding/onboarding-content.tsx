"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContractViewer } from "@/components/onboarding/contract-viewer"
import { SignaturePad } from "@/components/onboarding/signature-pad"
import { FileUpload } from "@/components/onboarding/file-upload"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Loader2,
  FileText,
  Shield,
  ClipboardList,
  Upload,
  PenTool,
  Camera,
} from "lucide-react"
import { type CompensationExhibit } from "@/lib/exhibits"
import { jsPDF } from "jspdf"

// ── Helpers ──

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

// ── Types ──

const PROGRAM_LABELS: Record<string, string> = {
  referral: "Referral Partner",
  "sales-agent": "Sales Agent",
  business: "Business Partnership",
  "spectrum-event": "Spectrum Event Team",
  "tmobile-d2d": "T-Mobile Fiber D2D",
  "verizon-d2d": "Verizon Fios D2D",
}

interface OnboardingData {
  // from application
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  company: string
  partnerType: string
  token: string
  // contractor details
  legalName: string
  dbaName: string
  entityType: string
  address: string
  city: string
  zipCode: string
  einLast4: string
  // signature
  signatureDataUrl: string
  isAcknowledged: boolean
  isContractRead: boolean
  // uploads
  idDocUrl: string
  idDocName: string
  badgePhotoUrl: string
  badgePhotoName: string
  // W-9
  tinType: "ssn" | "ein" | ""
  w9Certified: boolean
  exemptPayeeCode: string
}

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

const ENTITY_TYPES = [
  "Individual / Sole Proprietor",
  "Single-Member LLC",
  "Multi-Member LLC",
  "S Corporation",
  "C Corporation",
  "Partnership",
  "Other",
]

const TOTAL_STEPS = 7

const STEP_LABELS = [
  "Details",
  "Agreement",
  "Signature",
  "W-9",
  "ID Upload",
  "Badge Photo",
  "Review",
]

// ── Component ──

interface OnboardingContentProps {
  token: string
  prefill?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    state?: string
    company?: string
    partnerType?: string
  }
  exhibits?: CompensationExhibit[]
}

export function OnboardingContent({ token, prefill, exhibits }: OnboardingContentProps) {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [data, setData] = useState<OnboardingData>({
    firstName: prefill?.firstName || "",
    lastName: prefill?.lastName || "",
    email: prefill?.email || "",
    phone: prefill?.phone || "",
    state: prefill?.state || "",
    company: prefill?.company || "",
    partnerType: prefill?.partnerType || "",
    token,
    legalName: "",
    dbaName: "",
    entityType: "",
    address: "",
    city: "",
    zipCode: "",
    einLast4: "",
    signatureDataUrl: "",
    isAcknowledged: false,
    isContractRead: false,
    idDocUrl: "",
    idDocName: "",
    badgePhotoUrl: "",
    badgePhotoName: "",
    tinType: "",
    w9Certified: false,
    exemptPayeeCode: "",
  })

  const effectiveDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const programLabel = PROGRAM_LABELS[data.partnerType] || data.partnerType || "Partner Program"
  const contractorName = data.legalName || `${data.firstName} ${data.lastName}`.trim()

  const updateField = useCallback(
    (name: string, value: string | boolean) => {
      setData((prev) => ({ ...prev, [name]: value }))
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
    },
    [errors]
  )

  const validateStep = useCallback((): boolean => {
    const e: Record<string, string> = {}

    if (step === 1) {
      if (!data.legalName.trim()) e.legalName = "Required"
      if (!data.address.trim()) e.address = "Required"
      if (!data.city.trim()) e.city = "Required"
      if (!data.state) e.state = "Required"
      if (!data.zipCode.trim()) e.zipCode = "Required"
      if (!data.einLast4.trim()) {
        e.einLast4 = "Required"
      } else if (!/^\d{9}$/.test(data.einLast4)) {
        e.einLast4 = "Enter exactly 9 digits"
      }
    }

    if (step === 2) {
      if (!data.isContractRead) {
        e.contract = "You must read the full agreement to continue"
      }
    }

    if (step === 3) {
      if (!data.signatureDataUrl) e.signature = "Please provide your signature"
      if (!data.isAcknowledged) e.acknowledge = "Acknowledgment is required"
    }

    if (step === 4) {
      if (!data.tinType) e.tinType = "Please select SSN or EIN"
      if (!data.w9Certified) e.w9Certified = "You must certify your W-9 information"
    }

    if (step === 5) {
      if (!data.idDocUrl) e.idDoc = "Government ID is required"
    }

    if (step === 6) {
      if (!data.badgePhotoUrl) e.badgePhoto = "Badge photo is required"
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }, [step, data])

  const goNext = useCallback(() => {
    if (!validateStep()) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }, [validateStep])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!validateStep()) return

    setIsSubmitting(true)
    try {
      let onboardingPdfUrl = ""
      try {
        onboardingPdfUrl = await uploadOnboardingPDF(data, programLabel, contractorName, effectiveDate)
      } catch {
        // Non-fatal — continue without PDF URL
      }

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          taxId: data.einLast4,
          effectiveDate,
          programLabel,
          contractorName,
          onboardingPdfUrl,
        }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setIsComplete(true)
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }, [data, effectiveDate, programLabel, contractorName, validateStep])

  // ── Completion Screen ──
  const [isDownloading, setIsDownloading] = useState(false)

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#edf1f7] flex flex-col">
        <div className="border-b border-slate-800/30 bg-slate-900/95 shadow-lg shadow-slate-900/20">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={140} height={32} className="h-7 w-auto" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 border-2 border-green-300">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Onboarding Complete</h1>
            <p className="text-slate-700 text-base mb-3 leading-relaxed">
              Welcome to Stance Marketing, <span className="font-bold text-slate-900">{data.firstName}</span>.
            </p>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Your signed agreement and documents have been received. Check your email for a copy. Your manager will be in touch within 24 hours.
            </p>

            <div className="mb-8 space-y-3 text-left">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
                  <FileText className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-base text-slate-800 font-medium">Signed contract sent to your email</p>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-base text-slate-800 font-medium">W-9 tax certification on file</p>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-base text-slate-800 font-medium">Documents securely stored and encrypted</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                disabled={isDownloading}
                onClick={async () => {
                  setIsDownloading(true)
                  try {
                    await downloadOnboardingPDF(data, programLabel, contractorName, effectiveDate)
                  } finally {
                    setIsDownloading(false)
                  }
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl px-6 h-11 disabled:opacity-60"
              >
                {isDownloading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating PDF…</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" />Download PDF</>
                )}
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-100 rounded-xl text-base px-6 h-11 w-full sm:w-auto">
                  Return Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── Slide animation ──
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
  }

  const isContractStep = step === 2

  // ── Landing Page ──
  if (!started) {
    return (
      <div className="min-h-screen bg-[#edf1f7] flex flex-col">
        <div className="border-b border-slate-800/30 bg-slate-900/95 shadow-lg shadow-slate-900/20">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={140} height={32} className="h-7 w-auto" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
              <ClipboardList className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Welcome, {data.firstName || "Partner"}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Complete your onboarding to finalize your {programLabel} agreement. You&apos;ll review and sign your contract, upload documents, and be ready to start.
            </p>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 text-left shadow-xl shadow-slate-300/60">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">What you&apos;ll need</p>
              <div className="space-y-4">
                {[
                  { icon: ClipboardList, label: "Your legal name, address, and full 9-digit EIN/SSN", color: "text-red-500 bg-red-500/10" },
                  { icon: FileText, label: "Review and agree to the contractor agreement", color: "text-slate-600 bg-slate-100" },
                  { icon: PenTool, label: "Provide your electronic signature", color: "text-slate-600 bg-slate-100" },
                  { icon: FileText, label: "Complete your W-9 tax certification", color: "text-slate-600 bg-slate-100" },
                  { icon: Upload, label: "Government-issued ID (front side)", color: "text-slate-600 bg-slate-100" },
                  { icon: Camera, label: "Professional headshot for your badge", color: "text-slate-600 bg-slate-100" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-base text-slate-800 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStarted(true)}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-10 h-12 shadow-lg shadow-red-500/30 transition-all"
            >
              Begin Onboarding
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-slate-500 text-sm mt-4">Takes about 5–10 minutes</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${isContractStep ? "h-[100dvh] overflow-hidden" : "min-h-screen"} bg-[#edf1f7] flex flex-col`}>
      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-40 border-b border-slate-800/30 bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-900/20">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <Image src="/images/stance-logo-white.png" alt="Stance Marketing" width={120} height={28} className="h-6 w-auto" />
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-0.5 text-[11px] font-semibold tracking-[0.25em] text-slate-200 uppercase">
                Onboarding
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200">
              Step {step} <span className="text-slate-400">/ {TOTAL_STEPS}</span>
            </p>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-red-500"
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── Step Content ── */}
      {isContractStep ? (
        /* Contract step — full-width, fill remaining viewport height */
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Instruction header */}
          <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 pt-3 pb-2 shrink-0">
            <p className="text-xs text-red-500 uppercase tracking-widest font-semibold mb-0.5">
              Step 2 of {TOTAL_STEPS} — Contract Review
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Review Your Agreement</h2>
          </div>
          {/* Contract card — fills remaining space */}
          <div className="flex-1 min-h-0 mx-auto w-full max-w-5xl px-3 sm:px-4 pb-2 flex flex-col">
            <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-300/60 overflow-hidden flex flex-col">
            <ContractViewer
              contractorName={contractorName}
              contractorAddress={data.address}
              contractorCity={data.city}
              contractorState={data.state}
              contractorZip={data.zipCode}
              contractorPhone={data.phone}
              contractorEmail={data.email}
              contractorEin={data.einLast4}
              contractorEntity={data.entityType}
              contractorDba={data.dbaName}
              programLabel={programLabel}
              effectiveDate={effectiveDate}
              onReadComplete={() => updateField("isContractRead", true)}
              onAcknowledgeChange={(checked) => updateField("isContractRead", checked)}
              isReadComplete={data.isContractRead}
              exhibits={exhibits}
            />
            </div>
          </div>
          {errors.contract && (
            <p className="mx-auto w-full max-w-5xl px-3 sm:px-4 text-red-500 text-sm mt-1">{errors.contract}</p>
          )}
        </div>
      ) : (
        <div className="flex-1 mx-auto w-full max-w-3xl px-4 pt-6 sm:pt-10 pb-28 sm:pb-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-300/60">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {step === 1 && (
                  <StepDetails data={data} errors={errors} onChange={updateField} />
                )}
                {step === 3 && (
                  <StepSignature data={data} errors={errors} onChange={updateField} />
                )}
                {step === 4 && (
                  <StepW9 data={data} errors={errors} onChange={updateField} />
                )}
                {step === 5 && (
                  <StepIdUpload data={data} errors={errors} onChange={updateField} />
                )}
                {step === 6 && (
                  <StepBadgePhoto data={data} errors={errors} onChange={updateField} />
                )}
                {step === 7 && (
                  <StepReview
                    data={data}
                    programLabel={programLabel}
                    contractorName={contractorName}
                    effectiveDate={effectiveDate}
                    exhibits={exhibits}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className={`z-50 border-t border-slate-900/40 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-slate-900/30 shrink-0 ${isContractStep ? "sticky bottom-0" : "fixed sm:sticky bottom-0 left-0 right-0"}`}>
        <div className={`mx-auto ${isContractStep ? "max-w-5xl" : "max-w-3xl"} px-4 py-4 flex items-center justify-between gap-3`}>
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={goBack}
              className="text-slate-200 hover:text-white hover:bg-slate-800 rounded-xl px-5 h-11"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {errors.submit && (
            <p className="text-red-400 text-sm">{errors.submit}</p>
          )}

          {step < TOTAL_STEPS ? (
            <Button
              onClick={goNext}
              disabled={step === 2 && !data.isContractRead}
              className="flex-1 sm:flex-none bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl px-8 h-11 shadow-lg shadow-red-500/40 transition-all disabled:opacity-50"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl px-8 h-11 shadow-lg shadow-red-500/40 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting</>
              ) : (
                <><Check className="mr-2 h-4 w-4" />Complete Onboarding</>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Step 1: Contractor Details ──

function FormField({
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
    <div>
      <Label className="text-base text-slate-700 mb-2 block font-semibold">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  )
}

function StepDetails({
  data,
  errors,
  onChange,
}: {
  data: OnboardingData
  errors: Record<string, string>
  onChange: (name: string, value: string | boolean) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 1 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Contractor Details
        </h2>
        <p className="text-base text-slate-600">
          Enter your legal name as it should appear on the contract.
        </p>
      </div>

      <div className="space-y-5">
        <FormField label="Legal name (individual or entity)" required error={errors.legalName}>
          <Input
            value={data.legalName}
            onChange={(e) => onChange("legalName", e.target.value)}
            placeholder={`${data.firstName} ${data.lastName}`.trim() || "Full legal name"}
            className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Business / DBA name">
            <Input
              value={data.dbaName}
              onChange={(e) => onChange("dbaName", e.target.value)}
              placeholder="If applicable"
              className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
            />
          </FormField>
          <FormField label="Entity type">
            <div className="relative">
              <select
                value={data.entityType}
                onChange={(e) => onChange("entityType", e.target.value)}
                className="w-full h-12 bg-white border border-slate-300 text-slate-900 rounded-xl px-4 pr-12 text-base appearance-none focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              >
                <option value="">Select if applicable</option>
                {ENTITY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </FormField>
        </div>

        <FormField label="Street address" required error={errors.address}>
          <Input
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="123 Main Street"
            className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
          />
        </FormField>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <FormField label="City" required error={errors.city}>
            <Input
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="City"
              className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
            />
          </FormField>
          <FormField label="State" required error={errors.state}>
            <div className="relative">
              <select
                value={data.state}
                onChange={(e) => onChange("state", e.target.value)}
                className="w-full h-12 bg-white border border-slate-300 text-slate-900 rounded-xl px-4 pr-12 text-base appearance-none focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              >
                <option value="">State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </FormField>
          <FormField label="ZIP code" required error={errors.zipCode}>
            <Input
              value={data.zipCode}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 5)
                onChange("zipCode", v)
              }}
              placeholder="ZIP"
              inputMode="numeric"
              className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400"
            />
          </FormField>
        </div>

        <FormField label="Phone number" error={errors.phone}>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", formatPhone(e.target.value))}
            placeholder="(555) 555-5555"
            className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400 max-w-xs"
          />
        </FormField>

        <FormField label="EIN or SSN (9 digits)" required error={errors.einLast4}>
          <Input
            value={data.einLast4}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 9)
              onChange("einLast4", v)
            }}
            placeholder="9 digits"
            maxLength={9}
            className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400 max-w-xs"
          />
        </FormField>

        <div className="border border-slate-200 bg-slate-50 p-4 mt-5 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600 leading-relaxed">
              Your information is handled confidentially and used solely for
              contractor onboarding, identity verification, and tax compliance
              as described in the agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step 3: Signature ──

function StepSignature({
  data,
  errors,
  onChange,
}: {
  data: OnboardingData
  errors: Record<string, string>
  onChange: (name: string, value: string | boolean) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 3 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Sign your agreement
        </h2>
        <p className="text-base text-slate-600">
          Draw or type your legal name to apply your electronic signature.
        </p>
      </div>

      {errors.signature && (
        <p className="text-red-500 text-sm mb-4">{errors.signature}</p>
      )}
      {errors.acknowledge && (
        <p className="text-red-500 text-sm mb-4">{errors.acknowledge}</p>
      )}

      <SignaturePad
        contractorName={data.legalName || `${data.firstName} ${data.lastName}`.trim()}
        onSignatureComplete={(url) => onChange("signatureDataUrl", url)}
        onAcknowledge={(v) => onChange("isAcknowledged", v)}
        isAcknowledged={data.isAcknowledged}
        signatureDataUrl={data.signatureDataUrl}
      />
    </div>
  )
}

// ── Step 4: ID Upload ──

function StepIdUpload({
  data,
  errors,
  onChange,
}: {
  data: OnboardingData
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 5 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Government-issued ID
        </h2>
        <p className="text-base text-slate-600">
          Upload a clear photo of the front of your driver&apos;s license or government-issued ID.
        </p>
      </div>

      {errors.idDoc && (
        <p className="text-red-500 text-sm mb-4">{errors.idDoc}</p>
      )}

      <FileUpload
        label="Government ID"
        description="Front side only. Must be valid and not expired."
        onFileUploaded={(url, name) => {
          onChange("idDocUrl", url)
          onChange("idDocName", name)
        }}
        uploadedUrl={data.idDocUrl}
        uploadedName={data.idDocName}
      />

      <div className="border border-slate-200 bg-slate-50 p-4 mt-6 rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-600 leading-relaxed">
            Your ID is stored securely with encryption at rest and is used
            exclusively for identity verification, credentialing, and compliance
            as described in Section 10 of your agreement.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Step 5: Badge Photo ──

function StepBadgePhoto({
  data,
  errors,
  onChange,
}: {
  data: OnboardingData
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 6 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Upload your photo
        </h2>
        <p className="text-base text-slate-600">
          A clear, professional headshot for your identification badge.
        </p>
      </div>

      {errors.badgePhoto && (
        <p className="text-red-500 text-sm mb-4">{errors.badgePhoto}</p>
      )}

      <FileUpload
        label="Badge Photo"
        description="Professional headshot. Clear, well-lit, front-facing."
        accept="image/jpeg,image/png"
        onFileUploaded={(url, name) => {
          onChange("badgePhotoUrl", url)
          onChange("badgePhotoName", name)
        }}
        uploadedUrl={data.badgePhotoUrl}
        uploadedName={data.badgePhotoName}
      />

      <div className="mt-6 border border-slate-200 bg-slate-50 p-5 rounded-2xl">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Photo Guidelines
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-green-700 text-sm mb-2 font-semibold">Recommended</p>
            <ul className="text-slate-600 space-y-1.5 text-sm">
              <li>Front-facing, centered</li>
              <li>Even lighting, no shadows</li>
              <li>Solid or neutral background</li>
              <li>Professional appearance</li>
            </ul>
          </div>
          <div>
            <p className="text-red-600 text-sm mb-2 font-semibold">Avoid</p>
            <ul className="text-slate-600 space-y-1.5 text-sm">
              <li>Sunglasses or hats</li>
              <li>Group photos or cropped images</li>
              <li>Blurry or low-resolution</li>
              <li>Filters or heavy editing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step 6: Review ──

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-base text-slate-900 font-semibold">{value}</span>
    </div>
  )
}

function ReviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-[0.2em]">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  )
}

function StepReview({
  data,
  programLabel,
  contractorName,
  effectiveDate,
  exhibits,
}: {
  data: OnboardingData
  programLabel: string
  contractorName: string
  effectiveDate: string
  exhibits?: CompensationExhibit[]
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 7 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Review and complete
        </h2>
        <p className="text-base text-slate-600">
          Confirm everything is correct before finalizing.
        </p>
      </div>

      <div className="space-y-4">
        <ReviewSection title="Contractor Details">
          <ReviewRow label="Legal name" value={contractorName} />
          {data.dbaName && <ReviewRow label="DBA" value={data.dbaName} />}
          {data.entityType && <ReviewRow label="Entity type" value={data.entityType} />}
          <ReviewRow label="Address" value={`${data.address}, ${data.city}, ${data.state} ${data.zipCode}`} />
          <ReviewRow label="Email" value={data.email} />
          <ReviewRow label="Phone" value={data.phone} />
          <ReviewRow
            label="EIN/SSN"
            value={
              data.einLast4
                ? data.tinType === "ssn"
                  ? data.einLast4.replace(/^(\d{3})(\d{2})(\d{4})$/, "$1-$2-$3")
                  : data.einLast4.replace(/^(\d{2})(\d{7})$/, "$1-$2")
                : "N/A"
            }
          />
        </ReviewSection>

        <ReviewSection title="W-9 Tax Information">
          <ReviewRow
            label="TIN type"
            value={data.tinType === "ssn" ? "Social Security Number (SSN)" : data.tinType === "ein" ? "Employer ID Number (EIN)" : "—"}
          />
          <ReviewRow label="W-9 Certification" value={data.w9Certified ? "Certified ✓" : "Not certified"} />
          {data.exemptPayeeCode ? <ReviewRow label="Exempt payee code" value={data.exemptPayeeCode} /> : null}
        </ReviewSection>

        <ReviewSection title="Agreement">
          <ReviewRow label="Program" value={programLabel} />
          <ReviewRow label="Effective date" value={effectiveDate} />
          <ReviewRow label="Agreement reviewed" value={data.isContractRead ? "Yes" : "No"} />
          <ReviewRow label="Signature" value={data.signatureDataUrl ? "Provided" : "Missing"} />
          <ReviewRow label="Acknowledgment" value={data.isAcknowledged ? "Accepted" : "Pending"} />
          {exhibits && exhibits.length > 0 && (
            <ReviewRow
              label="Compensation exhibits"
              value={exhibits.map((e) => e.name).join("; ")}
            />
          )}
        </ReviewSection>

        <ReviewSection title="Documents">
          <ReviewRow label="Government ID" value={data.idDocName || "Not uploaded"} />
          <ReviewRow label="Badge photo" value={data.badgePhotoName || "Not uploaded"} />
        </ReviewSection>

        {data.signatureDataUrl && (
          <div className="border border-slate-200 bg-slate-50 p-5 rounded-2xl">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Your Signature
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.signatureDataUrl}
              alt="Signature"
              className="max-h-16 w-auto"
            />
          </div>
        )}

        <p className="text-slate-500 text-sm pt-2">
          By completing onboarding, your electronic signature is applied to the
          Independent Contractor Agreement with Stance Marketing LLC, effective{" "}
          {effectiveDate}. A signed copy will be emailed to you.
        </p>
      </div>
    </div>
  )
}

// ── Step 4: W-9 Tax Information ──

function formatTin(tin: string, type: "ssn" | "ein" | ""): string {
  if (!tin || tin.length !== 9) return tin
  if (type === "ssn") return `${tin.slice(0, 3)}-${tin.slice(3, 5)}-${tin.slice(5)}`
  if (type === "ein") return `${tin.slice(0, 2)}-${tin.slice(2)}`
  return tin
}

function StepW9({
  data,
  errors,
  onChange,
}: {
  data: OnboardingData
  errors: Record<string, string>
  onChange: (name: string, value: string | boolean) => void
}) {
  const fullName = data.legalName || `${data.firstName} ${data.lastName}`.trim()

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-red-500 uppercase tracking-widest mb-1 font-semibold">
          Step 4 of {TOTAL_STEPS}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">W-9 Tax Information</h2>
        <p className="text-base text-slate-600">
          Complete your W-9 for tax reporting. Your details have been pre-filled from Step 1.
        </p>
      </div>

      <div className="space-y-5">
        {/* Pre-filled info confirmation */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">Pre-filled from your details</p>
            <span className="text-xs text-slate-400">Tap Back to edit</span>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="text-sm text-slate-500">Name on tax return</span>
              <span className="text-sm font-semibold text-slate-900">{fullName || "—"}</span>
            </div>
            {data.dbaName && (
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-sm text-slate-500">Business / DBA name</span>
                <span className="text-sm font-semibold text-slate-900">{data.dbaName}</span>
              </div>
            )}
            {data.entityType && (
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-sm text-slate-500">Federal tax classification</span>
                <span className="text-sm font-semibold text-slate-900">{data.entityType}</span>
              </div>
            )}
            <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="text-sm text-slate-500">Address</span>
              <span className="text-sm font-semibold text-slate-900 sm:text-right">
                {[data.address, data.city, data.state, data.zipCode].filter(Boolean).join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* TIN type selection */}
        <FormField label="Taxpayer Identification Number (TIN) type" required error={errors.tinType}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {(["ssn", "ein"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange("tinType", type)}
                className={`h-16 rounded-xl border-2 text-sm font-semibold transition-all px-4 text-left flex flex-col justify-center ${
                  data.tinType === type
                    ? "border-red-400 bg-red-50 text-red-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="block">{type === "ssn" ? "Social Security Number" : "Employer ID Number"}</span>
                <span className="block text-xs font-normal mt-0.5 opacity-60">{type === "ssn" ? "SSN — for individuals" : "EIN — for businesses / LLCs"}</span>
              </button>
            ))}
          </div>
        </FormField>

        {/* TIN masked display */}
        {data.tinType && data.einLast4 && (
          <div className="border border-slate-200 bg-slate-50 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wide">
                Your {data.tinType === "ssn" ? "SSN" : "EIN"}
              </p>
              <p className="text-lg font-mono font-bold text-slate-900 tracking-widest">
                {formatTin(data.einLast4, data.tinType)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Encrypted</span>
            </div>
          </div>
        )}

        {/* Exempt payee code */}
        <FormField label="Exempt payee code (if applicable)">
          <Input
            value={data.exemptPayeeCode}
            onChange={(e) => onChange("exemptPayeeCode", e.target.value)}
            placeholder="Leave blank if not applicable"
            className="bg-white border border-slate-300 text-slate-900 h-12 rounded-xl text-base shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-slate-400 max-w-xs"
          />
          <p className="text-xs text-slate-400 mt-1.5">Most individual contractors leave this blank.</p>
        </FormField>

        {/* W-9 Certification */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onChange("w9Certified", !data.w9Certified)}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") onChange("w9Certified", !data.w9Certified) }}
          className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
            errors.w9Certified
              ? "border-red-300 bg-red-50"
              : data.w9Certified
              ? "border-red-400 bg-red-50"
              : "border-slate-200 bg-slate-50 hover:border-slate-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${
              data.w9Certified ? "bg-red-500 border-red-500" : "bg-white border-slate-300"
            }`}>
              {data.w9Certified && <Check className="h-3 w-3 text-white" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-1.5">W-9 Certification</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Under penalties of perjury, I certify that: (1) the number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); (2) I am not subject to backup withholding; and (3) I am a U.S. citizen or other U.S. person.
              </p>
            </div>
          </div>
          {errors.w9Certified && (
            <p className="text-red-500 text-xs mt-2 ml-9">{errors.w9Certified}</p>
          )}
        </div>

        {/* Reference PDF link — official IRS document */}
        <a
          href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm transition-colors"
        >
          <FileText className="h-4 w-4 flex-shrink-0" />
          <span>View official IRS W-9 form PDF for reference</span>
        </a>
      </div>
    </div>
  )
}

// ── Download helpers ──

async function buildOnboardingPDF(
  data: OnboardingData,
  programLabel: string,
  contractorName: string,
  effectiveDate: string,
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentW = pageW - margin * 2
  let y = margin

  const tinFormatted = data.einLast4
    ? data.tinType === "ssn"
      ? `**-**-${data.einLast4.slice(-4)}`
      : `**-***${data.einLast4.slice(-4)}`
    : "—"

  // ── helpers ──
  const addPage = () => {
    doc.addPage()
    y = margin
  }
  const checkPageBreak = (needed = 10) => {
    if (y + needed > pageH - margin) addPage()
  }
  const line = (x1: number, y1: number, x2: number, y2: number, color = "#e2e8f0") => {
    doc.setDrawColor(color)
    doc.line(x1, y1, x2, y2)
  }
  const text = (
    str: string,
    x: number,
    ty: number,
    options?: { align?: "left" | "center" | "right"; color?: string; size?: number; bold?: boolean },
  ) => {
    if (options?.color) doc.setTextColor(options.color)
    if (options?.size) doc.setFontSize(options.size)
    doc.setFont("helvetica", options?.bold ? "bold" : "normal")
    doc.text(str, x, ty, { align: options?.align || "left" })
    doc.setTextColor("#1e293b")
    doc.setFont("helvetica", "normal")
  }
  const sectionHeader = (title: string) => {
    checkPageBreak(14)
    doc.setFillColor("#f8fafc")
    doc.setDrawColor("#e2e8f0")
    doc.rect(margin, y, contentW, 8, "FD")
    text(title, margin + 4, y + 5.5, { size: 8, bold: true, color: "#64748b" })
    y += 8
  }
  const row = (label: string, value: string) => {
    const rowH = 9
    checkPageBreak(rowH + 1)
    text(label, margin + 4, y + 6, { size: 9, color: "#64748b" })
    text(value, pageW - margin - 4, y + 6, { align: "right", size: 9, bold: true, color: "#1e293b" })
    line(margin, y + rowH, pageW - margin, y + rowH)
    y += rowH
  }

  // ── Header ──
  doc.setFillColor("#ef4444")
  doc.rect(0, 0, pageW, 18, "F")
  text("STANCE MARKETING LLC", margin, 11, { size: 14, bold: true, color: "#ffffff" })
  text("Independent Contractor Onboarding", pageW - margin, 11, { align: "right", size: 9, color: "#fecaca" })
  y = 26

  text("Onboarding Summary", margin, y, { size: 16, bold: true })
  y += 6
  text(effectiveDate, margin, y, { size: 9, color: "#64748b" })
  y += 10
  line(margin, y, pageW - margin, y)
  y += 8

  // ── Contractor Details ──
  sectionHeader("CONTRACTOR DETAILS")
  row("Legal name", contractorName)
  if (data.dbaName) row("Business / DBA", data.dbaName)
  if (data.entityType) row("Entity type", data.entityType)
  row("Address", `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`)
  row("Email", data.email)
  if (data.phone) row("Phone", data.phone)
  y += 6

  // ── W-9 Tax Information ──
  sectionHeader("W-9 TAX INFORMATION")
  row("TIN type", data.tinType === "ssn" ? "Social Security Number (SSN)" : data.tinType === "ein" ? "Employer ID Number (EIN)" : "—")
  row("TIN (masked)", tinFormatted)
  row("W-9 certified", data.w9Certified ? "Yes — certified under penalties of perjury" : "No")
  if (data.exemptPayeeCode) row("Exempt payee code", data.exemptPayeeCode)
  y += 6

  // ── Agreement ──
  sectionHeader("INDEPENDENT CONTRACTOR AGREEMENT")
  row("Program", programLabel)
  row("Effective date", effectiveDate)
  row("Agreement reviewed", data.isContractRead ? "Yes" : "No")
  row("Acknowledgment", data.isAcknowledged ? "Accepted" : "Pending")
  y += 6

  // ── Documents ──
  sectionHeader("UPLOADED DOCUMENTS")
  row("Government-issued ID", data.idDocName || "Not uploaded")
  row("Badge photo", data.badgePhotoName || "Not uploaded")
  y += 8

  // ── Signature ──
  if (data.signatureDataUrl) {
    checkPageBreak(50)
    doc.setDrawColor("#e2e8f0")
    doc.setFillColor("#f8fafc")
    doc.rect(margin, y, contentW, 8, "FD")
    text("ELECTRONIC SIGNATURE", margin + 4, y + 5.5, { size: 8, bold: true, color: "#64748b" })
    y += 8

    const sigMaxW = 90
    const sigMaxH = 28
    try {
      doc.addImage(data.signatureDataUrl, "PNG", margin + 4, y + 4, sigMaxW, sigMaxH, "", "FAST")
    } catch {
      text("(Signature on file)", margin + 4, y + 16, { size: 9, color: "#64748b" })
    }

    y += sigMaxH + 6

    // Signature line + name
    line(margin + 4, y, margin + 100, y, "#1e293b")
    y += 5
    text(contractorName, margin + 4, y, { size: 8, color: "#64748b" })
    y += 4
    text(`Signed electronically on ${effectiveDate}`, margin + 4, y, { size: 7, color: "#94a3b8" })
    y += 10
  }

  // ── Footer ──
  checkPageBreak(18)
  line(margin, y, pageW - margin, y)
  y += 6
  const footerLines = [
    `This document confirms the onboarding of ${contractorName} with Stance Marketing LLC, effective ${effectiveDate}.`,
    `A signed copy of the Independent Contractor Agreement was sent to ${data.email}.`,
    "For questions, contact your Stance Marketing manager.",
  ]
  for (const fl of footerLines) {
    const wrapped = doc.splitTextToSize(fl, contentW)
    for (const wl of wrapped) {
      checkPageBreak(5)
      text(wl, margin, y, { size: 8, color: "#94a3b8" })
      y += 4.5
    }
  }

  // ── Page numbers ──
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 8, {
      align: "right",
      size: 7,
      color: "#94a3b8",
    })
  }

  return doc
}

async function downloadOnboardingPDF(
  data: OnboardingData,
  programLabel: string,
  contractorName: string,
  effectiveDate: string,
): Promise<void> {
  const doc = await buildOnboardingPDF(data, programLabel, contractorName, effectiveDate)
  doc.save(`Stance-Onboarding-${contractorName.replace(/\s+/g, "-")}.pdf`)
}

async function uploadOnboardingPDF(
  data: OnboardingData,
  programLabel: string,
  contractorName: string,
  effectiveDate: string,
): Promise<string> {
  const doc = await buildOnboardingPDF(data, programLabel, contractorName, effectiveDate)
  const pdfBlob = doc.output("blob")
  const file = new File(
    [pdfBlob],
    `Stance-Onboarding-${contractorName.replace(/\s+/g, "-")}.pdf`,
    { type: "application/pdf" },
  )
  const formData = new FormData()
  formData.append("file", file)
  formData.append("category", "contracts")
  const res = await fetch("/api/upload", { method: "POST", body: formData })
  if (!res.ok) throw new Error("PDF upload failed")
  const json = await res.json() as { url: string }
  return json.url
}
