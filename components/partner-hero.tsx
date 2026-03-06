"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PartnerHero() {
  const scrollToApplication = () => {
    document.getElementById("partner-application")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.png"
          alt="Digital cityscape with red light trails"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Darker overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Partner with <span className="text-red-500">Stance</span>: Unlock Sales Opportunities with Leading Brands
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Partnering with Stance is your opportunity to grow your business by gaining access to high-demand sales
              opportunities in the Cable, Internet, Lifeline, and Energy sectors. We've built strong relationships with
              major brands, and we make it easier for partners like you to connect customers with the services they
              need.
            </p>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-none text-lg"
              onClick={scrollToApplication}
            >
              Become a Partner
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src="/images/partner-team.png"
                alt="Stance partnership team"
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1/2 bg-red-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
