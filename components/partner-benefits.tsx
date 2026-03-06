"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, DollarSign, HeadphonesIcon, Megaphone } from "lucide-react"
import Image from "next/image"

const benefits = [
  {
    icon: <TrendingUp className="h-12 w-12 text-red-500" />,
    title: "Grow Your Revenue",
    description:
      "Stance partners with major brands to offer a wide range of in-demand services, allowing Channel Partners like you to diversify their offerings and expand into new markets. Through Stance, take advantage of comprehensive solutions in Cable, Internet, Lifeline, and Energy, making it easy to upsell and cross-sell.",
  },
  {
    icon: <DollarSign className="h-12 w-12 text-red-500" />,
    title: "Receive Competitive Compensation",
    description:
      "For Stance Channel Partners, the growth potential is significant. Enjoy competitive commission structures for selling our brand partners' services. We also offer incentives like SPIFFs, special promotions, and recognition opportunities to make your sales efforts even more rewarding.",
  },
  {
    icon: <HeadphonesIcon className="h-12 w-12 text-red-500" />,
    title: "Get Support From the Dedicated Stance Partner Team",
    description:
      "Count on our experienced Stance team to support you every step of the way. We're here to assist with questions about our brand partners' products, commission processes, and navigating customer inquiries. We provide training and resources, giving you access to the information and support you need.",
  },
  {
    icon: <Megaphone className="h-12 w-12 text-red-500" />,
    title: "Marketing Resources to Drive Sales",
    description:
      "We make it easier for you to market the services of our brand partners. Get access to professional marketing materials and resources provided through Stance. Options include sales collateral, customizable templates, and guidance to help you achieve your sales goals.",
  },
]

export function PartnerBenefits() {
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
            How Partnering with Stance <span className="text-red-500">Expands</span> Your Business
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Grow your reach, boost revenue, and enhance customer relationships by leveraging Stance's portfolio of brand
            partnerships and our dedicated support for your sales efforts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <Image
                src="/images/partner-entrepreneur.png"
                alt="Entrepreneur working with Stance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 p-4 backdrop-blur-sm border-l-2 border-red-500">
                  <p className="text-white text-lg font-medium">
                    Join our network of successful entrepreneurs and business owners
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-black p-6 border-l-2 border-red-500"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
