"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  {
    src: "/images/spectrum-high-traffic-event.jpg",
    alt: "Spectrum brand ambassador at high-traffic outdoor community event with large crowd",
    title: "High-Traffic Events",
  },
  {
    src: "/images/spectrum-event-booth-2.png",
    alt: "Spectrum representatives at community event with promotional materials",
    title: "Community Engagement",
  },
  {
    src: "/images/spectrum-indoor-retail.jpg",
    alt: "Spectrum sales team at indoor retail location with promotional booth",
    title: "Retail Locations",
  },
]

export function SpectrumEventGallery() {
  return (
    <section className="py-20 bg-[#0a0f1a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            See Our Team <span className="text-[#0089CF]">In Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our sales professionals represent Spectrum at premium retail locations and community events across the
            country.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all border border-[#0089CF]/20"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003057]/80 via-[#003057]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
