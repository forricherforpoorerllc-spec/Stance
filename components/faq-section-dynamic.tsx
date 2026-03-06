"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What industries does Stance Marketing specialize in?",
    answer:
      "Stance Marketing specializes in providing marketing solutions for Cable, Internet, Lifeline, and Energy sectors. Our expertise in these industries allows us to create targeted strategies that deliver exceptional results for our clients.",
  },
  {
    question: "How does Stance Marketing approach new client partnerships?",
    answer:
      "We begin with a comprehensive consultation to understand your business goals, target audience, and current marketing challenges. From there, we develop a customized strategy tailored to your specific needs, with clear metrics for success and regular reporting on progress.",
  },
  {
    question: "What marketing services does Stance offer?",
    answer:
      "Stance offers a full range of marketing services including digital marketing, brand development, content creation, social media management, SEO optimization, PPC campaigns, email marketing, and traditional marketing strategies tailored to your industry needs.",
  },
  {
    question: "How does Stance measure marketing success?",
    answer:
      "We establish clear KPIs at the beginning of each campaign based on your business objectives. Our data-driven approach includes regular reporting on metrics such as conversion rates, customer acquisition costs, ROI, engagement metrics, and other relevant performance indicators.",
  },
  {
    question: "What makes Stance different from other marketing agencies?",
    answer:
      "Stance combines deep industry expertise in specific sectors with innovative marketing approaches. Our dedicated team provides personalized service, transparent communication, and measurable results. We focus on building long-term partnerships rather than just completing transactions.",
  },
  {
    question: "How quickly can I expect to see results from working with Stance?",
    answer:
      "While some tactical initiatives may show immediate results, strategic marketing typically requires time to build momentum. Most clients begin seeing measurable improvements within 3-6 months, with significant results becoming apparent after 6-12 months of consistent implementation.",
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
