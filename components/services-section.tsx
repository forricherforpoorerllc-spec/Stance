"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Wifi, Zap, Phone, Globe } from "lucide-react"

const services = [
  {
    icon: <Wifi className="h-10 w-10 text-red-500" />,
    title: "Field & D2D Sales",
    description: "Managed door-to-door residential sales campaigns with trained, performance-driven field teams.",
  },
  {
    icon: <Zap className="h-10 w-10 text-red-500" />,
    title: "Event & Retail Sales",
    description: "In-person sales coverage at high-traffic retail locations and community events, driving on-the-spot activations.",
  },
  {
    icon: <Phone className="h-10 w-10 text-red-500" />,
    title: "Referral Networks",
    description: "Structured referral programs through realtors, property managers, and professional networks that generate warm introductions.",
  },
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Business Channel Programs",
    description: "B2B channel partnerships enabling established businesses to refer and sell services to their existing client base.",
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
            Sales <span className="text-red-500">Channels</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            We deploy multiple go-to-market strategies so internet service providers can grow subscriber volume through the right channel for every market.
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
