"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MapPin, Zap, Globe } from "lucide-react"

export function TMobileFiberCoverage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const coverageStats = [
    {
      icon: <MapPin className="h-8 w-8 text-[#E20074]" />,
      stat: "20+",
      label: "States with Coverage",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#E20074]" />,
      stat: "up to 2 Gigs",
      label: "Maximum Speed",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#E20074]" />,
      stat: "Growing",
      label: "Rapid Expansion",
    },
  ]

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nationwide <span className="text-[#E20074]">Coverage</span>
          </h2>
          <div className="w-20 h-1 bg-[#E20074] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            T-Mobile Fiber is rapidly expanding across the United States, bringing ultra-fast fiber internet to millions
            of homes. Partner with us to tap into these growing markets.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Coverage Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-[#E20074]/30 shadow-2xl">
              <Image
                src="/images/tmobile-coverage-map.png"
                alt="T-Mobile Fiber Coverage Map - Available states highlighted in magenta"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#E20074] text-white px-6 py-3 rounded-lg shadow-xl">
              <p className="font-bold text-lg">Expanding Daily</p>
            </div>
          </motion.div>

          {/* Coverage Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Tap Into <span className="text-[#E20074]">High-Growth Markets</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              T-Mobile Fiber is available in over 20 states and growing rapidly. Major markets include Texas, Florida,
              Colorado, Nebraska, Minnesota, Wisconsin, Michigan, Illinois, Indiana, Ohio, North Carolina, and more.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#E20074]/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-[#E20074]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Strategic Territory Access</h4>
                  <p className="text-gray-400">
                    Gain exclusive access to high-value territories as a Master Agent partner.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#E20074]/10 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-[#E20074]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Premium Product Offering</h4>
                  <p className="text-gray-400">
                    Sell ultra-fast fiber internet with speeds up to 2 Gigs - a product customers want.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#E20074]/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-[#E20074]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Continuous Expansion</h4>
                  <p className="text-gray-400">
                    New markets opening regularly - grow your business as T-Mobile Fiber expands.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {coverageStats.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{item.stat}</div>
              <div className="text-gray-400">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
