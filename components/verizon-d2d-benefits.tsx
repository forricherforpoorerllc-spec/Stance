"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DollarSign, Users, TrendingUp, Award, Shield, Headphones, Wifi } from "lucide-react"

const benefits = [
  {
    icon: <Award className="h-10 w-10 text-[#CD040B]" />,
    title: "Authorized Verizon Partner",
    description:
      "Represent one of the most recognized and trusted brands in America. Verizon's name opens doors — literally. Gain exclusive access to territories and premium partner support.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-[#CD040B]" />,
    title: "Competitive Dealer Contracts",
    description:
      "Industry-leading commission structures for Verizon Fios fiber and 5G wireless home internet sales. Maximize your earning potential with one of the nation's top carriers.",
  },
  {
    icon: <Wifi className="h-10 w-10 text-[#CD040B]" />,
    title: "Fiber & Wireless Opportunities",
    description:
      "Sell both Verizon Fios fiber internet and 5G Home Internet — two premium products with strong consumer demand and high close rates in D2D campaigns.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#CD040B]" />,
    title: "Contractor & Agent Programs",
    description:
      "Flexible partnership models for independent contractors, sales agents, and established dealers looking to add Verizon to their portfolio.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-[#CD040B]" />,
    title: "Growing Market Opportunity",
    description:
      "Verizon is aggressively expanding its Fios fiber footprint and 5G Home Internet coverage. Get positioned now in high-growth markets.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#CD040B]" />,
    title: "Comprehensive Training",
    description:
      "Full onboarding, product training, and sales enablement resources to ensure your team represents the Verizon brand confidently and successfully.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-[#CD040B]" />,
    title: "Dedicated Support Team",
    description:
      "Access to our experienced support team for sales assistance, compliance guidance, and ongoing partnership management.",
  },
]

export function VerizonD2DBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="verizon-benefits" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Partner with <span className="text-[#CD040B]">Stance</span>
          </h2>
          <div className="w-20 h-1 bg-[#CD040B] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            As an authorized Verizon partner, Stance provides unmatched opportunities for dealers, contractors, and
            sales agents to grow their business selling Verizon Fios fiber and wireless internet services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black border border-gray-800 hover:border-[#CD040B]/50 p-8 rounded-xl transition-all duration-300 group hover:shadow-xl hover:shadow-[#CD040B]/10"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#CD040B] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call-out box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 bg-gradient-to-r from-[#CD040B]/10 to-transparent border-l-4 border-[#CD040B] p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-3 text-white">Ready to Sell with Verizon's Brand Power?</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Verizon is one of the most recognized telecommunications brands in the United States. Selling door-to-door
            with the Verizon name behind you means higher consumer trust, better conversion rates, and stronger earning
            potential. Whether you are an experienced dealer, independent contractor, or sales agent, Stance has a
            Verizon program tailored to your needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
