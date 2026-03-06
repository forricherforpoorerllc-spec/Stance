"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"

export function PartnerTestimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Why You Should Become a <span className="text-red-500">Stance</span> Channel Partner
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from one of the companies already benefiting from collaborating with
            Stance to sell services from our brand partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src="/images/partner-handshake.png"
                alt="Business partnership"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-black p-10 relative">
              <Quote className="h-16 w-16 text-red-500/20 absolute top-6 left-6" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-300 mb-8 italic">
                  "Partnering with Stance has transformed our business model. We've been able to offer our customers a
                  wider range of services while significantly increasing our revenue streams. The support team at Stance
                  has been exceptional, providing us with all the resources and training we needed to succeed."
                </p>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold text-white">Sarah Johnson</p>
                    <p className="text-gray-400">CEO, TechConnect Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
