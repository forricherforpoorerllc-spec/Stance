"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Shield, CheckCircle2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BusinessPartnershipsForm() {
  const integrationMethods = [
    "Referral links integrated into your customer journey",
    "Trained staff for face-to-face or phone sales within your business",
    "Co-branded marketing materials (subject to provider approval)",
    "Digital integration with pre-approved marketing channels",
  ]

  return (
    <>
      {/* How We Partner */}
      <section className="py-16 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                How We <span className="text-red-400">Integrate</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Flexible options that work with your existing business model
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {integrationMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#111827] border border-gray-700 p-5 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{method}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-start gap-4 bg-[#111827] border border-gray-700 rounded-xl p-6">
            <Shield className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Partners must operate within approved sales channels and strictly follow all provider-specific marketing
              guidelines. Comprehensive guidance, training, and ongoing compliance support is provided.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Partner?</h2>
            <p className="text-xl text-red-100 mb-4 leading-relaxed">
              Transform your business with a strategic partnership today.
            </p>
            <p className="text-red-200 mb-10">
              Questions? Email us at{" "}
              <a
                href="mailto:info@stance-marketing.com"
                className="text-white underline font-semibold hover:text-red-100"
              >
                info@stance-marketing.com
              </a>
            </p>
            <Link href="/become-a-partner">
              <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100 text-lg px-12 py-7 font-bold">
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
