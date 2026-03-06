"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Users, Award, BarChart, Lightbulb } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-10 w-10 text-red-500" />,
    title: "Trusted Expertise",
    description:
      "Over a decade of experience delivering exceptional results for major brands across multiple industries.",
  },
  {
    icon: <Zap className="h-10 w-10 text-red-500" />,
    title: "Rapid Deployment",
    description: "Our streamlined processes ensure quick implementation of marketing strategies with maximum impact.",
  },
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    title: "Dedicated Support",
    description: "A dedicated team of professionals providing personalized support throughout your journey with us.",
  },
  {
    icon: <Award className="h-10 w-10 text-red-500" />,
    title: "Award-Winning Solutions",
    description: "Recognized for our innovative approaches and outstanding results in the marketing industry.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-red-500" />,
    title: "Data-Driven Strategies",
    description: "We leverage advanced analytics to create marketing strategies that deliver measurable results.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-red-500" />,
    title: "Innovative Thinking",
    description: "Constantly evolving our approaches to stay ahead of industry trends and maximize your ROI.",
  },
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Why Choose <span className="text-red-500">Stance</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We combine industry expertise with innovative strategies to deliver exceptional results for our clients.
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
