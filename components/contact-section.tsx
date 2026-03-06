"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactSection() {
  const ref = useRef(null)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Please fill in all required fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed")

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Get in <span className="text-red-500">Touch</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Ready to elevate your brand? Send us a message and we'll get back to you within one business day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-500/20 border border-green-500 text-green-400 p-5 mb-6 flex items-center gap-3 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>Thank you! Your message has been sent. We'll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 mb-6 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" id="get-started-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message *"
                className="bg-gray-900 border-gray-800 focus:border-red-500 min-h-[140px]"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white h-12 w-full font-semibold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
              ) : (
                "Send Message"
              )}
            </Button>
            <p className="text-gray-500 text-xs text-center leading-relaxed pt-1">
              By submitting this form, you consent to Stance Marketing contacting you at the phone number and email
              provided. Message &amp; data rates may apply. You may opt out at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
