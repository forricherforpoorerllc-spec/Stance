"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Wifi, Zap, Phone, Globe } from "lucide-react"

const services = [
  {
    icon: <Wifi className="h-10 w-10 text-red-500" />,
    title: "Internet",
    description: "High-speed connectivity solutions for businesses and consumers with unmatched reliability.",
  },
  {
    icon: <Zap className="h-10 w-10 text-red-500" />,
    title: "Energy",
    description: "Innovative energy solutions that power businesses while reducing environmental impact.",
  },
  {
    icon: <Phone className="h-10 w-10 text-red-500" />,
    title: "Lifeline",
    description: "Essential communication services ensuring everyone stays connected when it matters most.",
  },
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Cable",
    description: "Premium entertainment packages delivering content across multiple platforms and devices.",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Our <span className="text-red-500">Services</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            We partner with major brands to deliver cutting-edge solutions across multiple sectors.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black p-8 border border-gray-800 hover:border-red-500 transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
