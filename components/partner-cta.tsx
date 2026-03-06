"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function PartnerCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const scrollToApplication = () => {
    document.getElementById("partner-application")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/10 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join a <span className="text-red-500">Winning Partnership</span> Network
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Stance Channel Partners gain access to diverse opportunities through our brand portfolio, competitive
              compensation, and dedicated support from the Stance team.
            </p>
            <p className="text-xl font-medium text-white mb-8">Ready to become one of them?</p>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 h-auto rounded-none text-lg"
              onClick={scrollToApplication}
            >
              Become a Partner
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
