"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { MapPin, Zap, Globe, Wifi } from "lucide-react"

export function VerizonD2DCoverage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const coverageStats = [
    {
      icon: <MapPin className="h-8 w-8 text-[#CD040B]" />,
      stat: "9+",
      label: "Fios States",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#CD040B]" />,
      stat: "Up to 5 Gigs",
      label: "Fios Max Speed",
    },
    {
      icon: <Wifi className="h-8 w-8 text-[#CD040B]" />,
      stat: "Nationwide",
      label: "5G Home Internet",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#CD040B]" />,
      stat: "Expanding",
      label: "Rapid Growth",
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
            Verizon <span className="text-[#CD040B]">Coverage</span>
          </h2>
          <div className="w-20 h-1 bg-[#CD040B] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Verizon Fios delivers 100% fiber-optic internet to homes across the Northeast and Mid-Atlantic, while
            Verizon 5G Home Internet reaches customers nationwide — giving you two powerful products to sell D2D.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Agent image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-[#CD040B]/30 shadow-2xl">
              <Image
                src="/images/verizon-d2d-agent.png"
                alt="Verizon door-to-door sales agent at customer's door with tablet"
                width={1340}
                height={894}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#CD040B] text-white px-6 py-3 rounded-lg shadow-xl">
              <p className="font-bold text-lg">Two Products to Sell</p>
            </div>
          </motion.div>

          {/* Coverage Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Fios Fiber + <span className="text-[#CD040B]">5G Home Internet</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              As a Verizon D2D partner through Stance, you sell both Verizon Fios fiber internet (up to 5 Gigs) and
              Verizon 5G Home Internet — reaching customers across the Northeast with fiber and nationwide with 5G
              wireless home internet.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#CD040B]/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-[#CD040B]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Verizon Fios — Northeast & Mid-Atlantic</h4>
                  <p className="text-gray-400">
                    100% fiber-optic network across NY, NJ, PA, MA, RI, CT, VA, MD, and DE. No contracts, symmetrical
                    speeds, and one of the most trusted home internet products in the country.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#CD040B]/10 p-3 rounded-lg">
                  <Wifi className="h-6 w-6 text-[#CD040B]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Verizon 5G Home Internet — Nationwide</h4>
                  <p className="text-gray-400">
                    Fixed 5G wireless home internet available in hundreds of cities nationwide. No annual contracts, no
                    equipment fees, and a simple setup with strong consumer demand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#CD040B]/10 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-[#CD040B]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Premium Product Portfolio</h4>
                  <p className="text-gray-400">
                    Two strong Verizon products means more doors you can sell at and higher earning potential across
                    a wider geography.
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {coverageStats.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-xl text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{item.stat}</div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
