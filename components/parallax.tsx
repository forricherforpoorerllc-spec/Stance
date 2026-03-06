"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Parallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const isMobile = useMediaQuery("(max-width: 768px)")

  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 150 : 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -150 : -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <div ref={ref} className="h-[30vh] md:h-[50vh] relative overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="text-[15vw] md:text-[20vw] font-bold text-red-500/10">STANCE</div>
        </motion.div>

        <motion.div
          style={{ y: y2, opacity }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="text-[8vw] md:text-[10vw] font-bold text-white/5">FUTURE</div>
        </motion.div>
      </div>
    </div>
  )
}
