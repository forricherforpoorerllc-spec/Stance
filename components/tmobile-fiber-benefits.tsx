"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DollarSign, Users, TrendingUp, Award, Shield, Headphones } from "lucide-react"

const benefits = [
  {
    icon: <Award className="h-10 w-10 text-[#E20074]" />,
    title: "Authorized Partner Program",
    description:
      "Partner with Stance, working with the only authorized Master Agent for T-Mobile Fiber D2D campaigns. Gain exclusive access to territories and premium support.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-[#E20074]" />,
    title: "Competitive Dealer Contracts",
    description:
      "Industry-leading commission structures and dealer contracts designed to maximize your earning potential with T-Mobile Fiber sales.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#E20074]" />,
    title: "Contractor & Agent Programs",
    description:
      "Flexible partnership models for independent contractors, sales agents, and established dealers looking to expand their portfolio.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-[#E20074]" />,
    title: "Growing Market Opportunity",
    description:
      "T-Mobile Fiber is rapidly expanding across 20+ states. Get in early and establish your presence in this high-growth market.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#E20074]" />,
    title: "Comprehensive Training",
    description:
      "Full onboarding, product training, and sales enablement resources to ensure your team succeeds from day one.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-[#E20074]" />,
    title: "Dedicated Support Team",
    description:
      "Access to our experienced support team for sales assistance, technical questions, and ongoing partnership management.",
  },
]

export function TMobileFiberBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="tmobile-benefits" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Partner with <span className="text-[#E20074]">Stance</span>
          </h2>
          <div className="w-20 h-1 bg-[#E20074] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Partnered with the only Master Agent for T-Mobile Fiber D2D campaigns, we provide unmatched opportunities
            for dealers, contractors, and sales agents to grow their business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black border border-gray-800 hover:border-[#E20074]/50 p-8 rounded-xl transition-all duration-300 group hover:shadow-xl hover:shadow-[#E20074]/10"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#E20074] transition-colors duration-300">
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#E20074]/10 to-transparent border-l-4 border-[#E20074] p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-3 text-white">Ready to Join the T-Mobile Fiber Revolution?</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            T-Mobile Fiber represents a massive opportunity in the telecommunications market. Through our partnership
            with the only Master Agent, Stance offers you the tools, support, and contracts needed to capitalize on this
            growing demand. Whether you're an experienced dealer, independent contractor, or sales agent, we have a
            program tailored to your needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
