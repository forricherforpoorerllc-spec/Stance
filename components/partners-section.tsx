"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Target, Users, BarChart, PieChart, LineChart } from "lucide-react"

const salesSolutions = [
  {
    icon: <TrendingUp className="h-10 w-10 text-red-500 mb-4" />,
    title: "Verified Activation Model",
    description: "Our operations are built around completed, verified installations — not just leads. Performance is always traceable.",
  },
  {
    icon: <Target className="h-10 w-10 text-red-500 mb-4" />,
    title: "Managed Sales Teams",
    description: "We recruit, train, and manage the sales teams. Providers get results without taking on the hiring and HR overhead.",
  },
  {
    icon: <Users className="h-10 w-10 text-red-500 mb-4" />,
    title: "Multi-Market Coverage",
    description: "Active programs across major US markets with the operational capacity to expand into new territories.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-red-500 mb-4" />,
    title: "Carrier Compliance",
    description: "All activity adheres to provider compliance standards. We protect your brand at every point of customer contact.",
  },
  {
    icon: <PieChart className="h-10 w-10 text-red-500 mb-4" />,
    title: "Rapid Mobilization",
    description: "We can launch new campaigns quickly with minimal ramp time — from onboarding to active sales in the field.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-red-500 mb-4" />,
    title: "Scalable Capacity",
    description: "From targeted regional tests to full national rollouts, our program structure scales to match provider volume goals.",
  },
]

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="partners" className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            How We Drive <span className="text-red-500">Results</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Our operations are structured to deliver consistent, quality-driven performance across every sales channel we deploy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {salesSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 p-8 border-b-2 border-red-500 hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">{solution.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="text-gray-400">{solution.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-900 px-8 py-6 border-l-2 border-red-500">
            <p className="text-lg text-gray-300 italic">
              "Our structured, multi-channel approach has consistently delivered strong activation volumes for our provider partners across residential and business markets — through any sales model they need."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
