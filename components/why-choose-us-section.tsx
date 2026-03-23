"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Users, Award, BarChart, Lightbulb } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-10 w-10 text-red-500" />,
    title: "Authorized Channel Relationships",
    description:
      "We hold authorized sales relationships with leading internet service providers, which means every campaign operates within a legitimate, structured agreement.",
  },
  {
    icon: <Zap className="h-10 w-10 text-red-500" />,
    title: "Any Channel, Any Market",
    description: "Field/D2D, event teams, referral networks, and B2B channel programs — deployed individually or in combination based on what your market requires.",
  },
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    title: "Experienced Field Leadership",
    description: "Our team leaders come from telecom field sales. We don’t just manage the paperwork — we manage the execution.",
  },
  {
    icon: <Award className="h-10 w-10 text-red-500" />,
    title: "Outcome-Based Performance",
    description: "Our incentive structure is tied to verified activations. When you win, we win — making our goals fully aligned with yours.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-red-500" />,
    title: "National Partner Network",
    description: "A growing network of sales professionals and channel partners operating across the country, continuously expanding into new markets.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-red-500" />,
    title: "Full Compliance, Every Time",
    description: "Every sales channel is operated within provider compliance standards. We protect your brand at every point of customer contact.",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Why Partner With <span className="text-red-500">Stance</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We’re not an agency — we’re a managed sales organization with authorized provider relationships and a track record of delivering results across multiple channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 p-8 border-l-2 border-red-500 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
