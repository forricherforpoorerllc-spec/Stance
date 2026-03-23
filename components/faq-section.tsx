"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What types of internet providers does Stance work with?",
    answer:
      "We work with residential and business internet service providers looking to grow subscriber volume through managed sales channels. Our current relationships span fiber, cable, and fixed wireless providers operating across the United States.",
  },
  {
    question: "What sales channels does Stance deploy?",
    answer:
      "We operate across door-to-door field sales, event and retail location campaigns, structured referral networks, and business-to-business channel programs. Channels can be deployed independently or in combination depending on the market and provider goals.",
  },
  {
    question: "How does Stance ensure compliance and activation quality?",
    answer:
      "All sales activity operates under authorized agreements with each provider. We enforce compliance standards at the team level, and our programs are structured around verified, completed installations — not raw lead volume.",
  },
  {
    question: "Are there opportunities for independent sales professionals?",
    answer:
      "Yes — we offer structured programs for field sales agents, event team representatives, referral partners, and channel businesses. Each program has its own requirements and compensation structure. Visit our program pages to learn more or submit an application.",
  },
  {
    question: "How do I explore a partnership with Stance?",
    answer:
      "For providers interested in deploying our sales channels, reach out through our contact form and a member of our team will follow up to discuss fit and program options. For sales professionals and businesses, browse our program pages to find the right opportunity.",
  },
  {
    question: "What markets does Stance currently operate in?",
    answer:
      "We have active programs across major US markets and continue to expand. Market availability varies by program and provider. Contact us to discuss coverage in a specific territory.",
  },
]

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services and approach.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4 border-b border-gray-800 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-red-500 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 pb-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
