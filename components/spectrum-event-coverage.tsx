"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: MapPin,
    value: "40+",
    label: "States with Coverage",
    description: "Nationwide opportunities available",
  },
  {
    icon: Users,
    value: "100M+",
    label: "Potential Customers",
    description: "Massive market reach",
  },
  {
    icon: TrendingUp,
    value: "Growing",
    label: "Expanding Markets",
    description: "New territories opening regularly",
  },
]

export function SpectrumEventCoverage() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#003057] to-[#0089CF] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nationwide <span className="text-[#00A3E0]">Coverage & Opportunities</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Spectrum serves millions of customers across the United States. Join our team and tap into one of the
            largest telecommunications markets in the country.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Coverage Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          <Image
            src="/images/spectrum-coverage-map.png"
            alt="Spectrum availability map showing coverage across United States"
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
