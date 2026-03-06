"use client"

import { motion } from "framer-motion"
import { DollarSign, MapPin, Users, TrendingUp, Award, Briefcase } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Earnings",
    description: "Competitive per-install commissions with performance bonuses and incentives for top performers.",
  },
  {
    icon: MapPin,
    title: "Versatile Locations",
    description: "Work at high-traffic retail locations including stores, events, and community venues nationwide.",
  },
  {
    icon: Users,
    title: "Professional Team",
    description: "Join an elite team of experienced sales professionals with proven track records.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Advance your career with leadership roles and expanded territories for top performers.",
  },
  {
    icon: Award,
    title: "Authorized Partner",
    description: "Represent Spectrum as an official authorized retailer with full dealer and contractor support.",
  },
  {
    icon: Briefcase,
    title: "Flexible Scheduling",
    description: "Choose from full-time or part-time opportunities with event-based scheduling.",
  },
]

export function SpectrumEventBenefits() {
  return (
    <section id="spectrum-benefits" className="py-20 bg-[#0f1419]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Join Our <span className="text-[#0089CF]">Spectrum Event Team?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're looking for experienced sales professionals who thrive in retail environments and want to represent a
            leading telecommunications brand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1a2332] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-[#0089CF]/20 hover:border-[#0089CF]/50"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#003057] to-[#0089CF] rounded-lg flex items-center justify-center mb-6">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Requirements section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-[#003057] to-[#004B87] text-white p-10 rounded-2xl border border-[#0089CF]/30"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">What We're Looking For</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Proven sales experience (retail, event, or D2D)",
              "Excellent communication and interpersonal skills",
              "Self-motivated with strong work ethic",
              "Professional appearance and demeanor",
              "Reliable transportation to event locations",
              "Ability to work weekends and flexible hours",
            ].map((requirement, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#0089CF] rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-100">{requirement}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
