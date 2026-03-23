"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Building, BarChart } from "lucide-react"

const stats = [
  {
    icon: <Users className="h-10 w-10 text-red-500" />,
    value: 500,
    suffix: "+",
    label: "Active Sales Partners",
  },
  {
    icon: <Award className="h-10 w-10 text-red-500" />,
    value: 15,
    suffix: "+",
    label: "Years Combined Experience",
  },
  {
    icon: <Building className="h-10 w-10 text-red-500" />,
    value: 50,
    suffix: "+",
    label: "Markets Served",
  },
  {
    icon: <BarChart className="h-10 w-10 text-red-500" />,
    value: 10000,
    suffix: "+",
    label: "Verified Activations",
  },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const duration = 2000 // 2 seconds
        const frameDuration = 1000 / 60 // 60fps
        const totalFrames = Math.round(duration / frameDuration)
        const increment = stat.value / totalFrames

        let currentCount = 0
        let frame = 0

        const counter = setInterval(() => {
          frame++
          currentCount += increment

          setCounts((prevCounts) => {
            const newCounts = [...prevCounts]
            newCounts[index] = Math.min(Math.round(currentCount), stat.value)
            return newCounts
          })

          if (frame === totalFrames) {
            clearInterval(counter)
          }
        }, frameDuration)

        return () => clearInterval(counter)
      })
    }
  }, [isInView])

  return (
    <section className="py-20 bg-black relative" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.05)_0,_rgba(0,0,0,0)_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 text-center border-b-2 border-red-500"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                {counts[index]}
                <span className="text-red-500">{stat.suffix}</span>
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
