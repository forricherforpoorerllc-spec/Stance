"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Shield,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react"

const partnerTypes = [
  {
    id: "referral",
    icon: Users,
    title: "Referral Partner",
    description: "Earn commissions by referring customers needing internet. No selling required.",
    color: "#3B82F6",
  },
  {
    id: "sales-agent",
    icon: Briefcase,
    title: "Sales Agent / Manager",
    description: "Actively sell services from multiple providers. Online or field positions available.",
    color: "#10B981",
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Partner",
    description: "Integrate internet offers into your existing business model for added revenue.",
    color: "#EF4444",
  },
  {
    id: "spectrum-event",
    icon: Calendar,
    title: "Spectrum Event Team",
    description: "Sell Spectrum at indoor retail events. Experienced reps needed.",
    color: "#0089CF",
  },
  {
    id: "tmobile-d2d",
    icon: Calendar,
    title: "T-Mobile Fiber D2D",
    description: "Door-to-door sales for T-Mobile Fiber. Dealer and contractor programs.",
    color: "#E20074",
  },
  {
    id: "verizon-d2d",
    icon: Briefcase,
    title: "Verizon Fios D2D",
    description: "Authorized Verizon partner for Fios fiber & 5G Home Internet door-to-door sales.",
    color: "#CD040B",
  },
]

const providers = [
  { name: "Spectrum", logo: "/images/spectrum-logo.png" },
  { name: "Optimum", logo: "/images/optimum-logo.png" },
  { name: "T-Mobile Fiber", logo: "/images/tmobile-fiber-logo.png" },
  { name: "AT&T", logo: "/images/att-logo.png" },
  { name: "Frontier", logo: "/images/frontier-logo.png" },
  { name: "Kinetic", logo: "/images/kinetic-logo.png" },
  { name: "Brightspeed", logo: "/images/brightspeed-logo.png" },
  { name: "Altafiber", logo: "/images/altafiber-logo.png" },
  { name: "EarthLink", logo: "/images/earthlink-logo.png" },
]

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  partnerType: string
  experience: string
  state: string
  message: string
}

export function PartnerSignupContent() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    partnerType: "",
    experience: "",
    state: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeSelect = (id: string) => {
    setSelectedType(id)
    setFormData((prev) => ({ ...prev, partnerType: id }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.partnerType) {
      setError("Please fill in all required fields and select a partnership type.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    try {
      await fetch("/api/send-partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch {
      // Non-fatal: still show success
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Application Received Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#111827] border border-green-500/40 rounded-2xl p-10 max-w-lg w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Application Received!</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Thank you for your interest in partnering with Stance Marketing. Our team will review your application
                and contact you within 24–48 business hours.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Questions? Email us at{" "}
                <a href="mailto:info@stance-marketing.com" className="text-red-400 hover:underline">
                  info@stance-marketing.com
                </a>
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                >
                  Done
                </Button>
                <Link href="/">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e13] via-[#111827] to-[#0a0e13]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white text-balance">
              Become a{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                Stance Partner
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto text-pretty">
              One application, multiple opportunities. Whether you want to refer customers, sell actively, or integrate
              internet services into your business, we have a partnership for you.
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-7 text-lg"
            >
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Provider Logos */}
      <section className="py-12 bg-[#0f1419] border-y border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-8 font-medium">
            Represent leading internet providers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="bg-white rounded-lg px-5 py-3 h-16 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Image
                  src={provider.logo || "/placeholder.svg"}
                  alt={provider.name}
                  width={110}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="partner-form" className="py-20 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Partner <span className="text-red-500">Application</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Select your preferred partnership type and fill out the form below. Our team will review your
                application and reach out within 24-48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Select Partnership Type */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    1. Select your partnership type <span className="text-red-400">*</span>
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partnerTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleTypeSelect(type.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all ${
                          selectedType === type.id
                            ? "border-green-500 bg-green-500/10"
                            : "border-gray-700 bg-[#111827] hover:border-gray-500"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${type.color}20` }}
                          >
                            <type.icon className="w-5 h-5" style={{ color: type.color }} />
                          </div>
                          <div>
                            <div className={`font-semibold text-sm ${selectedType === type.id ? "text-green-400" : "text-white"}`}>{type.title}</div>
                            <div className="text-gray-400 text-xs mt-1 leading-relaxed">{type.description}</div>
                          </div>
                        </div>
                        {selectedType === type.id && (
                          <div className="mt-3 flex items-center gap-1 text-green-400 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Personal Information */}
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-white mb-4">2. Your information</h3>
                  <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1.5">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Company / Organization
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Your company (if applicable)"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1.5">
                          State
                        </label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          placeholder="e.g. Ohio"
                          value={formData.state}
                          onChange={handleChange}
                          className="bg-[#0a0e13] border-gray-600 text-white h-11 focus:border-red-500"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Relevant Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full bg-[#0a0e13] border border-gray-600 text-white h-11 px-3 rounded-md focus:border-red-500 focus:outline-none"
                        disabled={isSubmitting}
                      >
                        <option value="">Select your experience level</option>
                        <option value="none">No prior sales experience</option>
                        <option value="some">Some sales experience (less than 1 year)</option>
                        <option value="experienced">Experienced (1-3 years)</option>
                        <option value="veteran">Veteran (3+ years)</option>
                        <option value="business-owner">Business Owner / Operator</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Additional Information
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about yourself, your goals, and why you want to partner with Stance..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-[#0a0e13] border-gray-600 text-white min-h-[100px] focus:border-red-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-12 py-7 text-lg w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-gray-500 text-sm">
                    By submitting, you agree to Stance Marketing's terms and compliance standards.
                  </p>
                </div>
              </form>
          </motion.div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="py-12 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-start gap-4 bg-[#111827] border border-gray-700 rounded-xl p-6">
            <Shield className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm leading-relaxed">
              All partnership opportunities require strict adherence to Stance LLC's and brand partners' marketing and
              compliance standards. Comprehensive training is provided to ensure success and regulatory compliance. All
              applicants are subject to verification and approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
