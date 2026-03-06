"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
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

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="will-change-transform"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-white leading-tight">
              Redefining <span className="text-red-500">Digital</span> Marketing
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="will-change-transform"
          >
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl">
              We partner with major brands to deliver cutting-edge solutions in Cable, Internet, Lifeline, and Energy
              sectors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto will-change-transform"
          >
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-5 sm:px-8 sm:py-6 rounded-none w-full sm:w-auto"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Our Services
            </Button>
            <Button
              variant="outline"
              className="border-gray-500 text-white hover:bg-gray-800 px-6 py-5 sm:px-8 sm:py-6 rounded-none w-full sm:w-auto"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated logo */}
      <motion.div
        className="absolute right-5 sm:right-10 bottom-10 sm:bottom-20 z-20 hidden sm:block will-change-transform"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Image
          src="/images/stance-a-logo-new.png"
          alt="Stance Logo"
          width={150}
          height={150}
          className="w-auto h-20 md:h-32"
          loading="lazy"
        />
      </motion.div>
    </section>
  )
}
