"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VerizonD2DCTA() {
  const highlights = [
    "Verizon Fios fiber — up to 5 Gig speeds",
    "5G Home Internet — nationwide coverage",
    "Competitive dealer and contractor contracts",
    "Comprehensive training and compliance support",
    "Access to Northeast and nationwide territories",
    "Industry-leading brand recognition",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#CD040B] to-[#8B0000] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Become a Verizon D2D Partner?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Join our Verizon Fios and 5G Home Internet partner network and start capitalizing on the power of America's
            most recognized telecom brand.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm p-4 rounded-lg"
              >
                <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-white font-medium">{highlight}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-[#CD040B] hover:bg-gray-100 font-bold px-10 py-7 text-lg group shadow-xl"
            >
              <Link href="/become-a-partner">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#CD040B] font-bold px-10 py-7 text-lg bg-transparent"
            >
              <Link href="/become-a-partner#contact">Contact Us</Link>
            </Button>
          </motion.div>

          <p className="mt-8 text-white/80 text-sm">
            Limited territories available. Apply today to secure your exclusive market access.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
