"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TMobileFiberHero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E20074]/10 via-black to-black" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              className="inline-block mb-4 px-4 py-2 bg-[#E20074]/10 border border-[#E20074]/30 rounded-full"
            >
              <span className="text-[#E20074] font-semibold text-sm uppercase tracking-wider">
                Authorized Partner Program
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Partner with{" "}
              <span className="text-[#E20074]">
                T-Mobile Fiber
                <br />
              </span>
              D2D Sales Program
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join Stance, partnered with the <strong className="text-white">only Master Agent</strong> for T-Mobile
              Fiber door-to-door sales campaigns. Unlock premium dealer, contractor, and sales agent opportunities with
              competitive contracts and industry-leading support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#E20074] hover:bg-[#C1005F] text-white font-semibold px-8 py-6 text-lg group"
              >
                <Link href="/become-a-partner">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#E20074] text-[#E20074] hover:bg-[#E20074] hover:text-white font-semibold px-8 py-6 text-lg bg-transparent"
                onClick={() => document.getElementById("tmobile-benefits")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Key benefits */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              {[
                "Only Master Agent Partner",
                "Competitive Contracts",
                "Dealer & Contractor Programs",
                "Nationwide Coverage",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#E20074] flex-shrink-0" />
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E20074]/20">
              <Image
                src="/images/tmobile-d2d-team.png"
                alt="T-Mobile Fiber D2D Sales Team - Professional door-to-door sales representatives"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-[#E20074] text-white p-6 rounded-xl shadow-2xl"
            >
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm opacity-90">States Covered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-2xl"
            >
              <Image
                src="/images/tmobile-fiber-logo.png"
                alt="T-Mobile Fiber Authorized Retailer"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
