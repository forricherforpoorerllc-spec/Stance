"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Shield, Zap, Handshake, Building2, CheckCircle2 } from "lucide-react"

export function BusinessPartnershipsBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Significant Revenue Stream",
      description: "Add high-margin telecom services to your existing business model",
    },
    {
      icon: Users,
      title: "Enhanced Customer Value",
      description: "Provide essential services your customers already need",
    },
    {
      icon: Shield,
      title: "Trusted Brand Partners",
      description: "Represent industry-leading internet service providers",
    },
    {
      icon: Zap,
      title: "Minimal Operational Impact",
      description: "Seamless integration with your current business operations",
    },
    {
      icon: Handshake,
      title: "Dedicated Support Team",
      description: "Full partnership support and ongoing training",
    },
    {
      icon: CheckCircle2,
      title: "Flexible Integration",
      description: "Multiple partnership models to fit your business",
    },
  ]

  const idealPartners = [
    { icon: Building2, title: "Retailers", description: "Add telecom to your product offerings" },
    { icon: Users, title: "IT Service Providers", description: "Bundle internet with IT services" },
    { icon: Building2, title: "Property Management", description: "Offer solutions to tenants" },
    { icon: Handshake, title: "Home Services", description: "Cross-sell to your customer base" },
    { icon: Users, title: "Community Organizations", description: "Provide value to members" },
    { icon: Building2, title: "Franchise Operations", description: "Scale across locations" },
  ]

  return (
    <section className="py-20 bg-[#0a0e13]">
      {/* Benefits Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Partnership <span className="text-red-400">Benefits</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transform your business with strategic telecom partnerships
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#111827] border border-gray-700 hover:border-red-500/50 transition-all h-full group">
                <CardContent className="p-6">
                  <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ideal Partners Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Ideal <span className="text-red-400">Partners</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Perfect for businesses looking to expand their service offerings
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {idealPartners.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#111827] border border-gray-700 hover:border-red-500/30 transition-all h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <partner.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1.5 text-white">{partner.title}</h3>
                  <p className="text-gray-400 text-sm">{partner.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
