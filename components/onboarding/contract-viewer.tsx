"use client"

import React, { useRef, useCallback, useState, useEffect } from "react"
import { DollarSign, FileText } from "lucide-react"
import { type CompensationExhibit } from "@/lib/exhibits"

// ── Types ─────────────────────────────────────────────────────────────────────

interface ContractViewerProps {
  contractorName: string
  contractorAddress: string
  contractorCity: string
  contractorState: string
  contractorZip: string
  contractorPhone: string
  contractorEmail: string
  contractorEin: string
  contractorEntity: string
  contractorDba: string
  programLabel: string
  effectiveDate: string
  onReadComplete: () => void
  onAcknowledgeChange: (checked: boolean) => void
  isReadComplete: boolean
  exhibits?: CompensationExhibit[]
  leadsProvided?: boolean
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const EXHIBIT_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

function fmt(n: number): string {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function fill(val: string | undefined, fallback = "_______________") {
  return val?.trim() || fallback
}

// ── Contract sections data ────────────────────────────────────────────────────

export const CONTRACT_SECTIONS: { num: number; title: string; clauses: string[] }[] = [
  {
    num: 1,
    title: "AGREEMENT DOCUMENTS AND ORDER OF PRECEDENCE",
    clauses: [
      "1.1  This Agreement includes and incorporates: (a) this Independent Contractor Agreement; (b) all attached Compensation Exhibits; (c) all program-specific addenda, acknowledgments, compliance notices, and onboarding records accepted by Contractor; (d) Contractor's completed IRS Form W-9; and (e) any written amendments signed by both parties.",
      "1.2  If there is a conflict between this Agreement and a Compensation Exhibit, the Compensation Exhibit controls only with respect to the specific Carrier, channel, territory, compensation plan, or chargeback period covered by that exhibit. In all other respects, this Agreement controls.",
      "1.3  Contractor may participate only in the programs expressly authorized by Company in an applicable Compensation Exhibit. Nothing in this Agreement guarantees access to any particular Carrier, market, territory, volume, or compensation plan.",
    ],
  },
  {
    num: 2,
    title: "DEFINITIONS",
    clauses: [
      "2.1  \u201cActivation\u201d means a customer order that is submitted through an approved process, installed or activated if required by the applicable program, validated by the applicable Carrier, and credited by that Carrier to Company.",
      "2.2  \u201cAuthorized Channel\u201d means the sales or marketing method expressly approved for Contractor in the applicable Compensation Exhibit.",
      "2.3  \u201cCarrier\u201d means any telecommunications or related service provider whose products or services Contractor is authorized to market under an applicable Compensation Exhibit.",
      "2.4  \u201cChargeback\u201d means any reversal, clawback, debit, adjustment, denial, cancellation-related reversal, fraud-related reversal, short-pay, non-pay, or recoupment imposed by a Carrier or otherwise applied to an Activation or commission.",
      "2.5  \u201cCompensation Exhibit\u201d means a program-specific exhibit, schedule, or addendum setting out the applicable Carrier, Authorized Channel, Territory, compensation method, chargeback rules, and related program terms.",
      "2.6  \u201cConfidential Information\u201d means all non-public information relating to Company, any Carrier, compensation structures, pricing, customer information, systems, scripts, training, recruiting, operations, and business methods.",
      "2.7  \u201cCustomer Data\u201d means any information relating to an actual or prospective customer, including names, contact information, addresses, order details, service preferences, and any other personal or proprietary information.",
      "2.8  \u201cNet Commission\u201d means the amount, if any, actually received and retained by Company for an Activation after deductions, reversals, Chargebacks, holdbacks, reserves, offsets, processing fees, and Carrier-imposed adjustments.",
      "2.9  \u201cProgram Documents\u201d means the Compensation Exhibits, carrier rules, approved scripts, approved marketing materials, compliance notices, acknowledgments, and other written program-specific requirements communicated by Company.",
      "2.10  \u201cTerritory\u201d means the geography, market, zip code area, account type, customer class, or other scope restriction stated in the applicable Compensation Exhibit or Program Documents.",
      "2.11  \u201cWork Product\u201d means any materials, scripts, content, lead notes, reports, training items, deliverables, or other materials created by Contractor specifically for Company or for a Company-authorized program.",
    ],
  },
  {
    num: 3,
    title: "INDEPENDENT CONTRACTOR RELATIONSHIP",
    clauses: [
      "3.1  Contractor is and shall remain an independent contractor. Nothing in this Agreement creates any employment, partnership, joint venture, franchise, fiduciary, or agency relationship between Contractor and Company.",
      "3.2  Contractor has no authority to bind Company or any Carrier, and Contractor shall not represent otherwise.",
      "3.3  Except for the restrictions and compliance obligations expressly stated in this Agreement and the applicable Program Documents, Contractor controls the manner and means of performing services, including work schedule, methods, tools, and business operations.",
      "3.4  Contractor is not eligible for and expressly waives any claim to employee benefits from Company, including wages, salary, overtime, workers' compensation, unemployment compensation, paid leave, retirement benefits, or health benefits.",
      "3.5  Contractor is solely responsible for all federal, state, and local taxes arising from payments under this Agreement, including self-employment taxes. Company will not withhold payroll taxes unless required by law.",
      "3.6  Contractor is solely responsible for all business expenses, including transportation, devices, internet, permits, insurance, training time, marketing costs, and supplies, unless Company expressly agrees otherwise in writing.",
      "3.7  Unless a specific Compensation Exhibit expressly says otherwise, Contractor may perform services for others, provided Contractor does not violate this Agreement, misuse Confidential Information, create a direct conflict with active Company programs, or market through unauthorized channels.",
      "3.8  Contractor may not appoint sub-contractors, sub-agents, team members, or other representatives to perform under this Agreement unless Company first approves them in writing. Contractor remains fully responsible for all acts and omissions of any approved personnel.",
    ],
  },
  {
    num: 4,
    title: "CONTRACTOR REPRESENTATIONS, ELIGIBILITY, AND CONTINUING OBLIGATIONS",
    clauses: [
      "4.1  Contractor represents and warrants that all information submitted in the application, onboarding records, W-9, upload records, and any later updates is true, complete, current, and not misleading.",
      "4.2  Contractor must provide a completed and accurate IRS Form W-9 before Company is required to issue any payment.",
      "4.3  Contractor is solely responsible for obtaining and maintaining all licenses, permits, registrations, business filings, and insurance required for Contractor's services, entity form, personnel, vehicles, and Territory.",
      "4.4  Contractor must provide any identity-verification information reasonably required by Company or a Carrier, including a government-issued identification document and a badge photo or headshot if required for credentialing, compliance, payment setup, fraud prevention, audit support, or program participation.",
      "4.5  Contractor must promptly notify Company of any material change to Contractor's name, entity status, tax information, contact information, licensing status, permit status, legal capacity, or any other fact that could affect eligibility, payment, or compliance.",
      "4.6  Company may suspend Contractor's participation, access, compensation, or payment processing pending correction of incomplete, expired, suspicious, inconsistent, or false information.",
    ],
  },
  {
    num: 5,
    title: "SCOPE OF SERVICES AND PROGRAM LIMITS",
    clauses: [
      "5.1  Contractor may market, refer, sell, or support only those programs expressly authorized in an applicable Compensation Exhibit.",
      "5.2  Contractor may operate only through the Authorized Channel identified in the applicable Compensation Exhibit.",
      "5.3  Contractor may solicit only within the applicable Territory and only to the extent permitted by the applicable Program Documents.",
      "5.4  Contractor must use Company-approved systems, order paths, forms, scripts, disclosures, and workflows. Contractor may not submit orders outside approved systems without Company's prior written consent.",
      "5.5  Contractor must comply with all Program Documents and Carrier requirements communicated by Company from time to time. Contractor acknowledges that Carrier requirements, pricing, qualifications, promotions, and program terms may change, and Company may update Program Documents to reflect those changes.",
      "5.6  Contractor may not directly contact a Carrier regarding compensation, disputes, program access, approvals, or program terms unless Company gives prior written approval.",
      "5.7  Contractor may not promise installation dates, approval outcomes, service levels, billing results, promotions, gifts, credits, or pricing except as expressly authorized in current Program Documents.",
    ],
  },
  {
    num: 6,
    title: "COMPENSATION",
    clauses: [
      "6.1  Contractor will be compensated only as described in the applicable Compensation Exhibit. There is no salary, hourly pay, draw, minimum guarantee, or expense reimbursement unless expressly stated in writing by Company.",
      "6.2  Company has no obligation to pay Contractor for an Activation unless and until Company actually receives and retains the corresponding compensation from the applicable Carrier.",
      "6.3  Unless a Compensation Exhibit states otherwise, Company will pay approved amounts due to Contractor within five (5) business days after Company's receipt of the applicable Carrier payment and after Company has completed any ordinary reconciliation, reserve, offset, fraud, quality-control, or compliance review.",
      "6.4  Contractor is responsible for one hundred percent (100%) of all Chargebacks attributable to Activations, conduct, or submissions generated by Contractor or Contractor's approved personnel.",
      "6.5  Company may offset Chargebacks, reserves, losses, damages, fees, refunds, penalties, returns, and any other amounts owed by Contractor against any sums otherwise payable to Contractor under any program or Compensation Exhibit. If amounts owed by Contractor exceed amounts otherwise payable, Contractor must pay the balance to Company within fifteen (15) days after written demand.",
      "6.6  Company may hold back up to fifteen percent (15%) of gross commissions as a reserve against Chargebacks, fraud, cancellations, quality issues, or reconciliation.",
      "6.7  Company may withhold, suspend, reduce, deny, offset, or permanently forfeit unpaid compensation, in whole or in part, upon a good-faith determination that fraudulent, unauthorized, or non-compliant activity has occurred.",
      "6.8  Contractor must submit any commission dispute in writing within thirty (30) days after the applicable payment date. Any dispute not raised within that period is waived.",
      "6.9  The compensation stated in the applicable Compensation Exhibit(s) is the sole compensation owed to Contractor.",
    ],
  },
  {
    num: 7,
    title: "CONDUCT, LEGAL COMPLIANCE, AND CUSTOMER PROTECTION",
    clauses: [
      "7.1  Contractor shall act lawfully, honestly, professionally, and in a manner that protects customers, Company, and Carriers.",
      "7.2  The following are material breaches: submitting fraudulent orders; selling outside an Authorized Channel or Territory; quoting unauthorized pricing; misrepresenting Company or a Carrier; contacting a Carrier without authorization; misusing Customer Data or Confidential Information; violating telemarketing, privacy, or consumer-protection laws; and any conduct that jeopardizes a Carrier relationship or Company's reputation.",
      "7.3  Contractor is solely responsible for complying with all federal, state, and local laws applicable to Contractor's activities.",
      "7.4  Contractor must promptly notify Company of any customer complaint, regulator inquiry, Carrier inquiry, cease-and-desist demand, permit issue, or investigation.",
      "7.5  Company may suspend Contractor's program access, commissions, or payments while investigating suspected fraud, legal violations, policy violations, or data-security incidents.",
    ],
  },
  {
    num: 8,
    title: "CUSTOMER DATA, CONFIDENTIALITY, AND INFORMATION SECURITY",
    clauses: [
      "8.1  Contractor may use Customer Data only to perform authorized services under this Agreement and only through approved systems and workflows.",
      "8.2  Unless Company expressly authorizes otherwise in writing, Contractor may not store Customer Data in personal notebooks, personal cloud drives, screenshots, unapproved CRMs, personal spreadsheets, or personal messaging apps.",
      "8.3  Contractor may not sell, share, transfer, remarket, or use Customer Data for any purpose other than approved performance under this Agreement.",
      "8.4  Contractor must notify Company immediately — and in no event later than twenty-four (24) hours after discovery — of any suspected or actual unauthorized access, disclosure, loss, compromise, or misuse of Customer Data, Confidential Information, or Company systems.",
      "8.5  Contractor shall keep Confidential Information strictly confidential during the term of this Agreement and for three (3) years after termination.",
      "8.6  Confidential Information includes compensation plans, pricing, Carrier terms, customer information, training, recruiting methods, scripts, workflows, operations, systems, vendor relationships, business strategy, and non-public program rules.",
      "8.7  Upon Company's request or termination of this Agreement, Contractor must immediately stop using Customer Data and Confidential Information and return or securely destroy them, except to the extent retention is required by law.",
    ],
  },
  {
    num: 9,
    title: "INTELLECTUAL PROPERTY AND BRAND USE",
    clauses: [
      "9.1  As between the parties, all Work Product is and shall remain Company's exclusive property.",
      "9.2  Contractor retains ownership of Contractor's pre-existing materials, business methods, general know-how, and tools developed independently of Company, excluding any Company Confidential Information, Customer Data, Carrier materials, or Work Product created specifically for Company programs.",
      "9.3  Company grants Contractor a limited, revocable, non-exclusive, non-transferable license during the term of this Agreement to use only Company-approved names, logos, materials, and scripts solely for authorized performance under this Agreement.",
      "9.4  Contractor may not register, own, or use any website, domain, social profile, ad account, listing, phone number, email identity, or digital asset that uses or implies Company's or a Carrier's name, marks, or identity without Company's prior written consent.",
      "9.5  All brand-use rights terminate immediately when this Agreement or the applicable program ends.",
    ],
  },
  {
    num: 10,
    title: "IDENTITY DOCUMENTS, BADGE PHOTO, AND ONBOARDING MATERIALS",
    clauses: [
      "10.1  Contractor authorizes Company to collect, receive, review, verify, store, and use Contractor's uploaded identity documents, tax forms, badge photo, headshot, and related onboarding materials solely for legitimate business purposes, including identity verification, onboarding, credentialing, Carrier compliance, payment setup, fraud prevention, audit support, and legal compliance.",
      "10.2  Contractor's badge photo or headshot may be used by Company for internal systems, identification badges, field credentials, Carrier program records, compliance records, and related operational purposes. Company shall not use Contractor's photo for public advertising or public-facing marketing without separate written consent from Contractor.",
      "10.3  Contractor represents that all uploaded documents are accurate, current, authentic, and belong to Contractor or Contractor's business as applicable.",
      "10.4  Company may retain uploaded onboarding materials for as long as reasonably necessary for contractual, operational, legal, tax, audit, fraud-prevention, and dispute-resolution purposes.",
      "10.5  Company may deny, suspend, or terminate participation if required onboarding materials are missing, expired, inconsistent, suspicious, or not reasonably verifiable.",
    ],
  },
  {
    num: 11,
    title: "NON-SOLICITATION AND NON-CIRCUMVENTION",
    clauses: [
      "11.1  During the term of this Agreement and for twelve (12) months after termination, Contractor shall not knowingly solicit a customer obtained through Contractor's work under this Agreement for the purpose of cancelling, transferring, replacing, or competing against the applicable Company-authorized service, except with Company's written consent or as part of authorized Company activity.",
      "11.2  During the term of this Agreement and for twelve (12) months after termination, Contractor shall not directly solicit for competing telecom or related programs any employee or contractor of Company with whom Contractor had material business contact through Company.",
      "11.3  During the term of this Agreement and for twelve (12) months after termination, Contractor shall not knowingly bypass Company in order to obtain direct access to, or direct economic benefit from, a Carrier program first introduced to Contractor through Company.",
      "11.4  Contractor agrees that a breach of this Section may cause harm that is difficult to measure and that Company may seek injunctive relief in addition to any other remedies.",
    ],
  },
  {
    num: 12,
    title: "TERM, SUSPENSION, AND TERMINATION",
    clauses: [
      "12.1  This Agreement begins on the Effective Date and continues until terminated as provided herein.",
      "12.2  Either party may terminate this Agreement at any time upon thirty (30) days' written notice.",
      "12.3  Company may suspend Contractor immediately, or terminate this Agreement immediately, upon: fraud or suspected fraud; material breach; violation of law or Carrier rules; customer harm, deception, or data misuse; false or misleading information; or conduct reasonably likely to damage Company, a Carrier, or customers.",
      "12.4  Upon termination, Contractor shall immediately stop representing Company, all licenses terminate, Contractor shall cease access to Company systems, and Company may continue reconciliation, holdbacks, reserves, and Chargeback recovery.",
      "12.5  A Carrier program or Compensation Exhibit may be ended or changed independently of this Agreement.",
    ],
  },
  {
    num: 13,
    title: "INDEMNIFICATION AND LIMITATION OF LIABILITY",
    clauses: [
      "13.1  Contractor shall defend, indemnify, and hold harmless Company and its members, managers, officers, employees, agents, successors, and assigns from and against any third-party claims, losses, liabilities, judgments, fines, penalties, costs, and expenses, including reasonable attorneys' fees, arising out of or related to Contractor's acts or omissions; breach of this Agreement; violation of law; Contractor's personnel; or misuse of Customer Data, Confidential Information, or brand assets.",
      "13.2  To the fullest extent permitted by law, Company's total liability to Contractor shall not exceed the total commissions actually paid by Company to Contractor during the three (3) months immediately preceding the event giving rise to the claim.",
      "13.3  To the fullest extent permitted by law, Company shall not be liable to Contractor for any indirect, incidental, consequential, special, exemplary, or punitive damages.",
      "13.4  Company is not liable for Carrier decisions, program changes, pricing changes, market withdrawals, denials, audits, holds, reversals, Chargebacks, or termination of Carrier relationships.",
    ],
  },
  {
    num: 14,
    title: "DISPUTE RESOLUTION",
    clauses: [
      "14.1  Before filing arbitration, the parties shall first attempt in good faith to resolve any dispute through an informal conference after written notice of the dispute.",
      "14.2  If the dispute is not resolved informally within fifteen (15) days after written notice, either party may request mediation.",
      "14.3  Except for claims seeking temporary or preliminary injunctive relief or claims within a court's small-claims jurisdiction, any dispute shall be resolved by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules.",
      "14.4  The arbitration shall take place in the county in Ohio where Company maintains its principal office on the Effective Date, unless the parties agree otherwise in writing.",
      "14.5  The arbitrator may award any remedy available under applicable law and this Agreement.",
    ],
  },
  {
    num: 15,
    title: "ELECTRONIC RECORDS AND SIGNATURES",
    clauses: [
      "15.1  The parties agree to transact electronically for purposes of this Agreement and related records.",
      "15.2  Contractor consents to receive this Agreement, Program Documents, notices, acknowledgments, and related records in electronic form.",
      "15.3  Contractor's act of clicking, typing, checking required acknowledgment boxes, drawing a signature, or taking any other electronic action designated by Company as a signature step constitutes Contractor's electronic signature and intent to sign this Agreement and each accepted Program Document.",
      "15.4  Company may rely on reasonable security procedures, login records, confirmation steps, audit logs, timestamps, IP logs, email records, upload records, and related electronic evidence to establish the authenticity and attribution of an electronic record or signature.",
    ],
  },
  {
    num: 16,
    title: "NOTICES AND MISCELLANEOUS",
    clauses: [
      "16.1  Company may send notices to the email address, phone number, mailing address, or other contact information most recently provided by Contractor.",
      "16.2  This Agreement shall be governed by and construed under the laws of the State of Ohio, without regard to conflicts-of-law rules.",
      "16.3  This Agreement, together with all accepted Compensation Exhibits, Program Documents, and incorporated records, is the entire agreement between the parties regarding its subject matter.",
      "16.4  Contractor may not assign this Agreement or any rights under it without Company's prior written consent. Company may assign this Agreement in connection with a merger, restructuring, financing, sale of assets, or sale of equity.",
      "16.5  If any provision of this Agreement is found unenforceable, the remaining provisions shall remain in effect.",
      "16.6  Neither party is liable for delay or failure caused by events beyond its reasonable control, except that force majeure does not excuse payment obligations, confidentiality obligations, or data-protection obligations.",
    ],
  },
  {
    num: 17,
    title: "CONTRACTOR ACKNOWLEDGMENTS",
    clauses: [
      "By signing, Contractor acknowledges and agrees that: (a) Contractor has read and understands this Agreement and each accepted Compensation Exhibit; (b) Contractor is entering into this Agreement as an independent contractor and not as an employee of Company; (c) Contractor is responsible for taxes, expenses, permits, and legal compliance; (d) Contractor may only operate within authorized programs, channels, and territories; (e) compensation is commission-only and subject to Chargebacks, holdbacks, reserves, offsets, withholding, denial, and forfeiture as provided in this Agreement; (f) Contractor must provide a completed W-9 before payment; (g) Contractor must provide accurate identity and onboarding documents as required; (h) Contractor must protect Customer Data and Confidential Information; and (i) Contractor has had the opportunity to consult legal and tax advisors before signing.",
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionBlock({ section }: { section: (typeof CONTRACT_SECTIONS)[number] }) {
  return (
    <div className="mb-7">
      <h3 className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
        {section.num}. {section.title}
      </h3>
      <div className="space-y-2.5">
        {section.clauses.map((clause, i) => (
          <p key={i} className="text-[13px] text-slate-700 leading-relaxed">
            {clause}
          </p>
        ))}
      </div>
    </div>
  )
}

function CompensationExhibitCard({
  exhibit,
  label,
  leadsProvided,
}: {
  exhibit: CompensationExhibit
  label: string
  leadsProvided?: boolean
}) {
  const topAmount = Math.max(...exhibit.payStructure.map((r) => r.amount))
  const reduced = (n: number) => Math.round(n * 0.5 * 100) / 100

  return (
    <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow-lg shadow-emerald-100/60">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-emerald-400 uppercase mb-1.5">
              Compensation Exhibit {label}
            </p>
            <h4 className="text-xl font-bold text-white">{exhibit.provider}</h4>
            {leadsProvided && (
              <p className="text-[10px] text-orange-400/80 mt-1.5 uppercase tracking-wider font-semibold">
                Two-rate schedule — self-sourced &amp; company lead
              </p>
            )}
          </div>
          <div className="flex-shrink-0 bg-emerald-500/15 border border-emerald-500/25 rounded-xl px-4 py-2.5 text-right">
            <p className="text-[10px] text-emerald-400/70 mb-0.5">Up to per sale</p>
            <p className="text-lg font-bold text-emerald-400">{fmt(topAmount)}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white">
        {leadsProvided ? (
          <div className="grid grid-cols-[1fr_auto_auto]">
            <div className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase bg-slate-100 border-b border-slate-200">Service / Plan</div>
            <div className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase text-right bg-slate-100 border-b border-slate-200">Self-Sourced</div>
            <div className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-orange-500 uppercase text-right bg-slate-100 border-b border-slate-200">Co. Lead (−50%)</div>
            {exhibit.payStructure.map((row, i) => {
              const cellBg = i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
              return (
                <React.Fragment key={i}>
                  <div className={`px-5 py-3 text-sm text-slate-700 font-medium border-b border-slate-50 last:border-0 ${cellBg}`}>{row.service}</div>
                  <div className={`px-5 py-3 text-base font-bold text-emerald-700 tabular-nums text-right border-b border-slate-50 last:border-0 ${cellBg}`}>
                    {fmt(row.amount)}
                  </div>
                  <div className={`px-5 py-3 text-base font-bold text-orange-600 tabular-nums text-right border-b border-slate-50 last:border-0 ${cellBg}`}>
                    {fmt(reduced(row.amount))}
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_auto] border-b border-slate-100">
              <div className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">Service / Plan</div>
              <div className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase text-right">Your Payout</div>
            </div>
            {exhibit.payStructure.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto] items-center border-b border-slate-50 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <div className="px-5 py-3 text-sm text-slate-700 font-medium">{row.service}</div>
                <div className="px-5 py-3 flex items-center gap-1.5 justify-end">
                  <DollarSign className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                  <span className="text-base font-bold text-emerald-700 tabular-nums">
                    {fmt(row.amount).replace("$", "")}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer note */}
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-3">
        {leadsProvided ? (
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-orange-600">Company lead rate is 50% less</span> than the self-sourced rate. The applicable rate is determined by whether the lead was sourced by Contractor or provided by Company. Subject to Chargebacks, holdbacks, and reconciliation per Section 6.
          </p>
        ) : (
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Compensation is per approved Activation as defined in the Agreement. Subject to Chargebacks, holdbacks, and reconciliation per Section 6.
          </p>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ContractViewer({
  contractorName,
  contractorAddress,
  contractorCity,
  contractorState,
  contractorZip,
  contractorPhone,
  contractorEmail,
  contractorEin,
  contractorEntity,
  contractorDba,
  programLabel,
  effectiveDate,
  onReadComplete,
  onAcknowledgeChange,
  isReadComplete,
  exhibits,
  leadsProvided,
}: ContractViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  const handleScroll = useCallback(() => {
    if (hasScrolledToBottom) return
    const el = scrollRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 120) {
      setHasScrolledToBottom(true)
    }
  }, [hasScrolledToBottom, onReadComplete])

  // Also trigger if content is short enough to not need scrolling
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollHeight <= el.clientHeight + 120) {
      setHasScrolledToBottom(true)
    }
  }, [onReadComplete])

  const formattedEin = contractorEin
    ? contractorEin.replace(/^(\d{3})(\d{2})(\d{4})$/, "$1-$2-$3")
    : "_______________"

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ── Scrollable contract body ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-8"
      >
        {/* ── Contract header ── */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold text-slate-900 tracking-wide uppercase">Stance Marketing LLC</h1>
            <h2 className="text-base font-semibold text-slate-600 uppercase tracking-[0.15em] mt-1">
              Independent Contractor Agreement
            </h2>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>

          <p className="text-[13px] text-slate-600 leading-relaxed mb-8">
            This Independent Contractor Agreement (this "Agreement") is entered into by and between{" "}
            <strong>Stance Marketing LLC</strong>, an Ohio limited liability company ("Company"), and the
            contractor identified below ("Contractor"), effective as of the date the last party signs this
            Agreement (the "Effective Date").
          </p>

          {/* Contractor info block */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden mb-8">
            <div className="px-5 py-3 bg-slate-800">
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">Contractor Information</p>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                ["Contractor Legal Name", fill(contractorName)],
                ["Business / DBA Name", fill(contractorDba, "N/A")],
                ["Entity Type", fill(contractorEntity, "N/A")],
                ["Address", fill(contractorAddress)],
                ["City / State / ZIP", contractorCity ? `${contractorCity}, ${contractorState} ${contractorZip}` : "_______________"],
                ["Phone", fill(contractorPhone)],
                ["Email", fill(contractorEmail)],
                ["EIN / SSN", formattedEin],
                ["Effective Date", fill(effectiveDate)],
                ["Authorized Program", programLabel],
                ["Compensation Exhibits", exhibits && exhibits.length > 0 ? exhibits.map((e, i) => `Exhibit ${EXHIBIT_LABELS[i]} — ${e.provider}`).join("; ") : "See attached Compensation Exhibit(s)"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 px-5 py-2.5">
                  <span className="text-xs text-slate-500 w-40 flex-shrink-0">{label}</span>
                  <span className="text-xs text-slate-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections 1–17 */}
          {CONTRACT_SECTIONS.map((section) => (
            <SectionBlock key={section.num} section={section} />
          ))}

          {/* ── Compensation Exhibits ── */}
          {exhibits && exhibits.length > 0 ? (
            <div className="my-10">
              {/* Visual separator */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500/60 to-transparent" />
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800 tracking-wide uppercase">Compensation Schedules</span>
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-l from-emerald-500/60 to-transparent" />
              </div>

              <p className="text-[13px] text-slate-600 leading-relaxed mb-6">
                The following Compensation Exhibit(s) are attached to and incorporated into the Independent
                Contractor Agreement. They set forth the authorized Carrier(s), Authorized Channel(s),
                compensation amounts, and related program terms applicable to this Contractor.
              </p>

              <div className="space-y-6">
                {exhibits.map((exhibit, i) => (
                  <CompensationExhibitCard
                    key={exhibit.id}
                    exhibit={exhibit}
                    label={EXHIBIT_LABELS[i] ?? String(i + 1)}
                    leadsProvided={leadsProvided}
                  />
                ))}
              </div>

              {/* Combined summary */}
              {exhibits.length > 1 && (
                <div className="mt-6 rounded-xl bg-slate-800 border border-slate-700 px-6 py-5">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">
                    Exhibit Summary
                  </p>
                  <div className="space-y-2">
                    {exhibits.map((e, i) => {
                      const top = Math.max(...e.payStructure.map((r) => r.amount))
                      return (
                        <div key={e.id} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">
                            <span className="text-slate-500 text-xs mr-2">Exhibit {EXHIBIT_LABELS[i]}</span>
                            {e.provider}
                          </span>
                          <span className="text-sm text-emerald-400 font-semibold">
                            up to {fmt(top)} / sale
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="my-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
              <FileText className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500">Compensation Exhibit</p>
              <p className="text-xs text-slate-400 mt-1">
                Your compensation schedule will be attached separately. See your program documents for details.
              </p>
            </div>
          )}

          {/* ── Section 18: Signatures ── */}
          <div className="mb-10">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
              18. SIGNATURES
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Company</p>
                <p className="text-sm font-semibold text-slate-700 mb-4">Stance Marketing LLC</p>
                <div className="mb-3 border border-slate-200 bg-white rounded-lg px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/ron-rice-signature.svg" alt="Ron Rice signature" className="h-8 w-auto" />
                </div>
                {[
                  "Authorized Signature: Ron Rice",
                  "Name: Ron Rice",
                  "Title: President",
                  "Address: 6871 Lakota Plaza Dr. Ste. 11, West Chester, OH 45069",
                  `Date: ${fill(effectiveDate)}`,
                ].map((line) => (
                  <p key={line} className="text-xs text-slate-500 mb-2">{line}</p>
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Contractor</p>
                <p className="text-sm font-semibold text-slate-700 mb-4">{fill(contractorName)}</p>
                {[
                  `Legal Name / Entity: ${fill(contractorName)}`,
                  `Date: ${fill(effectiveDate)}`,
                  `Accepted Exhibits: ${exhibits && exhibits.length > 0 ? exhibits.map((_, i) => `Exhibit ${EXHIBIT_LABELS[i]}`).join(", ") : "See attached"}`,
                ].map((line) => (
                  <p key={line} className="text-xs text-slate-500 mb-2">{line}</p>
                ))}
              </div>
            </div>
          </div>

        </div>{/* max-w-3xl */}
      </div>{/* scrollable */}

      {/* ── Sticky acknowledgment bar — amber when unchecked, green when acknowledged ── */}
      <div
        className={`flex-shrink-0 border-t-2 px-5 sm:px-8 py-4 transition-all ${
          isReadComplete ? "border-green-400 bg-green-50" : "border-amber-300 bg-amber-50"
        }`}
      >
        <button
          onClick={() => hasScrolledToBottom && onAcknowledgeChange(!isReadComplete)}
          disabled={!hasScrolledToBottom}
          className={`flex items-start gap-3 w-full group text-left transition-opacity ${!hasScrolledToBottom ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label="Toggle read acknowledgment"
        >
          <div
            className={`flex-shrink-0 mt-0.5 h-6 w-6 rounded border-2 flex items-center justify-center transition-all ${
              isReadComplete ? "bg-green-500 border-green-500" : "bg-white border-amber-400 group-hover:border-amber-500"
            }`}
          >
            {isReadComplete && (
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              {!isReadComplete && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">Required to continue</span>
              )}
              {isReadComplete && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-200 text-green-800">Acknowledged ✓</span>
              )}
            </div>
            <p className={`text-sm font-semibold transition-colors ${isReadComplete ? "text-green-800" : "text-amber-900"}`}>
              I have read and understood this Independent Contractor Agreement and all attached Compensation Exhibit(s).
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {isReadComplete
                ? "Tap Continue to proceed to your signature."
                : "Scroll to the bottom of the agreement or check this box to continue."}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
