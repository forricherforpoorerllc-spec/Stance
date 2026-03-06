"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, HeadphonesIcon, UserCheck, Settings } from "lucide-react"
import Image from "next/image"

const loyaltyFeatures = [
  {
    icon: <Globe className="h-10 w-10 text-red-500" />,
    title: "Access Nationwide Coverage",
    description: "Offer services from brands that may have coverage options wherever your customers are located.",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10 text-red-500" />,
    title: "Benefit from Brand Customer Service",
    description: "Your customers often receive access to the brand's customer service and support teams.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-red-500" />,
    title: "Become a Trusted Advisor",
    description:
      "Be the go-to source for your customers' essential service needs, simplifying their choices and ensuring continuity.",
  },
  {
    icon: <Settings className="h-10 w-10 text-red-500" />,
    title: "Tailored Solutions",
    description:
      "Offer flexible options from our diverse brand portfolio to meet a variety of customer needs and budgets.",
  },
]

export function PartnerLoyalty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Increase Customer Loyalty by Offering <span className="text-red-500">Trusted Brands</span> Through Stance
            </h2>
            <div className="w-16 h-1 bg-red-500 mb-6"></div>
            <p className="text-gray-400 mb-8">
              By partnering with Stance, you offer your customers services from well-known, trusted brands, often backed
              by excellent technical support and industry standards. The convenience of accessing a broad array of
              technology and essential services through a single point of contact – you, the Stance Partner – enhances
              customer satisfaction and helps build long-term loyalty.
            </p>

            <div className="relative h-[300px] w-full overflow-hidden mt-8 mb-8 lg:mb-0">
              <Image
                src="/images/partner-support-team.png"
                alt="Dedicated support team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 max-w-[80%]">
                <div className="bg-black/80 p-4 backdrop-blur-sm border-l-2 border-red-500">
                  <p className="text-white text-lg font-medium">
                    Our dedicated support team is ready to help you succeed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loyaltyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-gray-900 p-6 border-b-2 border-red-500"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
