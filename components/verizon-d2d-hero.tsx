"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VerizonD2DHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background gradient using Verizon red */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CD040B]/10 via-black to-black" />

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
              className="inline-block mb-4 px-4 py-2 bg-[#CD040B]/10 border border-[#CD040B]/30 rounded-full"
            >
              <span className="text-[#CD040B] font-semibold text-sm uppercase tracking-wider">
                Authorized Partner Program
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Partner with{" "}
              <span className="text-[#CD040B]">
                Verizon Fios
                <br />
              </span>
              D2D Sales Program
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join Stance as an authorized partner for Verizon Fios fiber and wireless door-to-door sales campaigns.
              Unlock premium dealer, contractor, and sales agent opportunities with{" "}
              <strong className="text-white">competitive contracts</strong> and industry-leading support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#CD040B] hover:bg-[#A80309] text-white font-semibold px-8 py-6 text-lg group"
              >
                <Link href="/become-a-partner">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#CD040B] text-[#CD040B] hover:bg-[#CD040B] hover:text-white font-semibold px-8 py-6 text-lg bg-transparent"
                onClick={() => document.getElementById("verizon-benefits")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Key benefits */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              {[
                "Fiber & Wireless D2D Sales",
                "Competitive Commissions",
                "Dealer & Contractor Programs",
                "Multi-State Coverage",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#CD040B] flex-shrink-0" />
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#CD040B]/20">
              <Image
                src="/images/verizon-d2d-team.png"
                alt="Verizon Fios D2D Sales Team - Professional door-to-door sales representatives"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-[#CD040B] text-white p-6 rounded-xl shadow-2xl"
            >
              <div className="text-3xl font-bold">9+</div>
              <div className="text-sm opacity-90">States Covered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-2xl"
            >
              <Image
                src="/images/verizon-logo.png"
                alt="Verizon Authorized Partner"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
