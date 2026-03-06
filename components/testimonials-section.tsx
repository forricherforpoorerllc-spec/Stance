"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Stance Marketing transformed our digital presence completely. Their strategic approach to our cable service marketing increased our customer acquisition by 45% in just three months.",
    author: "Sarah Johnson",
    position: "Marketing Director",
    company: "ConnectCable Inc.",
  },
  {
    quote:
      "Working with Stance has been a game-changer for our energy business. Their innovative campaigns and attention to detail helped us reach new markets we hadn't previously considered.",
    author: "Michael Chen",
    position: "CEO",
    company: "EcoPower Solutions",
  },
  {
    quote:
      "The team at Stance Marketing truly understands the internet service provider landscape. Their expertise helped us navigate a competitive market and establish our brand as an industry leader.",
    author: "Jessica Williams",
    position: "Brand Manager",
    company: "FastNet Communications",
  },
  {
    quote:
      "Our Lifeline program enrollment increased dramatically after partnering with Stance. Their ability to communicate our services to the right audience made all the difference.",
    author: "Robert Garcia",
    position: "Operations Director",
    company: "Community Connect",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

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
            Client <span className="text-red-500">Testimonials</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Stance.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-black p-8 md:p-12 relative"
          >
            <Quote className="h-12 w-12 text-red-500/20 absolute top-6 left-6" />
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-300 mb-8 italic">"{testimonials[currentIndex].quote}"</p>
              <div>
                <p className="font-bold text-white">{testimonials[currentIndex].author}</p>
                <p className="text-gray-400">
                  {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-800 hover:bg-red-500 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === index ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-800 hover:bg-red-500 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
