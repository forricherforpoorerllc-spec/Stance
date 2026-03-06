"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { FileText, UserCheck, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VerizonD2DForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const partnerTypes = [
    {
      icon: <Briefcase className="h-8 w-8 text-[#CD040B]" />,
      title: "Dealers",
      description: "Established businesses looking to add Verizon Fios and 5G to their portfolio",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-[#CD040B]" />,
      title: "Contractors",
      description: "Independent contractors seeking D2D sales opportunities with the Verizon brand",
    },
    {
      icon: <FileText className="h-8 w-8 text-[#CD040B]" />,
      title: "Sales Agents",
      description: "Individual sales professionals ready to represent Verizon door-to-door",
    },
  ]

  return (
    <section id="verizon-partner-form" className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Start Your <span className="text-[#CD040B]">Partnership Journey</span>
          </h2>
          <div className="w-20 h-1 bg-[#CD040B] mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Complete our partner application to begin your Verizon D2D journey with Stance as a dealer, contractor, or
            sales agent. Our team will review your application and contact you within 24-48 hours.
          </p>
        </motion.div>

        {/* Partner Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {partnerTypes.map((type) => (
            <div
              key={type.title}
              className="bg-black border border-gray-800 p-6 rounded-xl text-center hover:border-[#CD040B]/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold mb-2">{type.title}</h3>
              <p className="text-gray-400 text-sm">{type.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA to centralized form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-black border border-[#CD040B]/30 rounded-2xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Partner Application</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Fill out our partner application form to get started. Whether you are a dealer, contractor, or individual
              sales agent, we have a Verizon D2D program tailored to your needs.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#CD040B] hover:bg-[#A80309] text-white font-bold px-10 py-7 text-lg group shadow-xl"
            >
              <Link href="/become-a-partner">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-400">
                <div>
                  <p className="font-semibold text-white mb-1">Secure</p>
                  <p>Protected info</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Fast</p>
                  <p>24-48hr review</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Free</p>
                  <p>No obligation</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Questions about the Verizon partnership program? Contact our team at{" "}
            <a href="mailto:partners@stancepartners.com" className="text-[#CD040B] hover:underline">
              partners@stancepartners.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
