"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpectrumEventHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#001829] via-[#003057] to-[#004B87] pt-20">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Image
                src="/images/spectrum-logo.png"
                alt="Spectrum Authorized Retailer"
                width={300}
                height={75}
                className="h-16 w-auto"
                priority
              />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Join Our Elite
              <br />
              <span className="text-[#00A3E0]">Event Sales Team</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stance Marketing is seeking <strong className="text-white">experienced sales professionals</strong> to
              represent Spectrum at high-traffic retail locations. Earn competitive pay with industry-leading support as
              an authorized dealer and contractor partner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#0089CF] hover:bg-[#0077B6] text-white font-semibold px-8 py-6 text-lg group shadow-xl"
              >
                <Link href="/become-a-partner">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#003057] font-semibold px-8 py-6 text-lg bg-transparent"
                onClick={() => document.getElementById("spectrum-benefits")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Key highlights */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              {[
                "Competitive Commissions",
                "Flexible Locations",
                "Nationwide Opportunities",
                "Full Training & Support",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#00A3E0] flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/images/spectrum-team.png"
                alt="Spectrum Event Sales Team - Professional indoor retail sales representatives"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003057]/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white text-[#003057] p-6 rounded-xl shadow-2xl border-4 border-[#0089CF]"
            >
              <div className="text-3xl font-bold text-[#0089CF]">40+</div>
              <div className="text-sm font-semibold">States Available</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
