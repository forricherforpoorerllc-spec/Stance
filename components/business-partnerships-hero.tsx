"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Handshake, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function BusinessPartnershipsHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src="/images/business-partnership-hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a]/95 via-[#0f1419]/90 to-[#1a1f2e]/95" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-5 py-2.5 mb-8">
            <Building2 className="w-4 h-4 text-red-400" />
            <span className="text-red-300 font-semibold text-sm">Strategic Business Partnerships</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white text-balance">
            Internet Provider{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              Partnership Program
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto text-pretty">
            Transform your business into a revenue powerhouse. Partner with Stance Marketing to offer fiber internet and
            broadband services from <strong className="text-white">10 leading providers</strong> including Verizon,
            Frontier, AT&T, T-Mobile, Kinetic, Optimum, Spectrum, Brightspeed, EarthLink, and Altafiber.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/become-a-partner">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-7 text-lg"
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("providers-section")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-10 py-7 text-lg bg-transparent"
            >
              View Providers
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: TrendingUp, label: "10 Providers", sublabel: "Leading Brands" },
              { icon: Handshake, label: "Full Support", sublabel: "Dedicated Team" },
              { icon: Building2, label: "Low Impact", sublabel: "Easy Integration" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white mb-0.5">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
