"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Submit form
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Get in <span className="text-red-500">Touch</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Ready to elevate your brand? Contact us today to discuss how we can help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>

            {/* Success message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/20 border border-green-500 text-green-400 p-4 mb-6 flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/20 border border-red-500 text-red-400 p-4 mb-6"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-4 md:space-y-6" id="get-started-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
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
                    disabled={isSubmitting || isSubmitted}
                  />
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 h-12"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message *"
                  className="bg-gray-900 border-gray-800 focus:border-red-500 min-h-[120px] md:min-h-[150px]"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting || isSubmitted}
                />
              </div>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-5 md:px-8 md:py-6 h-auto rounded-none w-full md:w-auto"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? "Sending..." : "Request Consultation"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Our Location</h4>
                  <p className="text-gray-400">6871 Lakota Plaza Dr. Suite 11, West Chester, OH 45069</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Phone Number</h4>
                  <p className="text-gray-400">(513) 341-6067</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Email Address</h4>
                  <p className="text-gray-400">info@stance-marketing.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Working Hours</h4>
                  <p className="text-gray-400">Mon - Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <h4 className="text-white font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
