"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Wifi, TrendingUp, Users, Award, ArrowRight } from "lucide-react"

export function BusinessPartnershipsBrands() {
  const brands = [
    {
      name: "Frontier Communications",
      logo: "/images/frontier-logo.png",
      coverage: "25+ States",
      benefits: [
        "Highest commission tier available",
        "Multi-gig fiber internet up to 5 Gigs",
        "Business and residential services",
        "Dedicated partner support team",
      ],
    },
    {
      name: "Verizon Fios & 5G Home",
      logo: "/images/verizon-logo.png",
      coverage: "Northeast + Nationwide",
      benefits: [
        "100% fiber-optic Fios network",
        "Fios fiber up to 5 Gigs",
        "5G Home Internet nationwide",
        "America's most trusted telecom brand",
      ],
    },
    {
      name: "Brightspeed",
      logo: "/images/brightspeed-logo.png",
      coverage: "16+ States",
      benefits: [
        "Premium fiber internet services",
        "Growing network infrastructure",
        "Competitive commission structure",
        "Marketing and sales support",
      ],
    },
    {
      name: "Optimum",
      logo: "/images/optimum-logo.png",
      coverage: "Northeast US",
      benefits: [
        "Fiber internet up to 8 Gigs",
        "Strong regional presence",
        "Cable and fiber options",
        "Event and retail opportunities",
      ],
    },
    {
      name: "Spectrum",
      logo: "/images/spectrum-logo.png",
      coverage: "41+ States",
      benefits: [
        "Largest cable internet provider",
        "High-traffic retail locations",
        "Authorized retailer program",
        "Extensive market coverage",
      ],
    },
    {
      name: "AT&T Fiber",
      logo: "/images/att-logo.png",
      coverage: "21+ States",
      benefits: [
        "Trusted national brand recognition",
        "Fiber internet up to 5 Gigs",
        "Bundled service opportunities",
        "Comprehensive training programs",
      ],
    },
    {
      name: "T-Mobile Home Internet",
      logo: "/images/tmobile-fiber-logo.png",
      coverage: "20+ States",
      benefits: [
        "5G and fiber internet solutions",
        "No credit check required",
        "Fast installation process",
        "Master agent partnership benefits",
      ],
    },
    {
      name: "Kinetic by Windstream",
      logo: "/images/kinetic-logo.png",
      coverage: "18+ States",
      benefits: [
        "Fiber internet up to 2 Gigs",
        "Residential services",
        "Local market expertise",
        "Flexible partnership models",
      ],
    },
    {
      name: "EarthLink",
      logo: "/images/earthlink-logo.png",
      coverage: "Nationwide",
      benefits: [
        "Fiber and wireless internet options",
        "Established brand since 1994",
        "Multiple service tiers available",
        "Reliable partner support",
      ],
    },
    {
      name: "Altafiber",
      logo: "/images/altafiber-logo.png",
      coverage: "Ohio & Kentucky",
      benefits: [
        "100% fiber-optic network",
        "Local community focus",
        "Symmetrical upload/download speeds",
        "Regional market opportunities",
      ],
    },
  ]

  return (
    <section id="providers-section" className="py-20 bg-[#0f1419]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Partner with{" "}
            <span className="text-red-400">10 Leading Internet Providers</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Offer fiber internet, cable broadband, and 5G home internet services from the most trusted
            telecommunications companies in America — including Verizon, AT&T, and Spectrum.
          </p>

          <div className="grid sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
            {[
              { icon: Award, label: "Top Commissions", value: "Industry Leading" },
              { icon: Wifi, label: "Service Types", value: "Fiber & Cable" },
              { icon: Users, label: "Coverage", value: "Nationwide" },
              { icon: TrendingUp, label: "Growth", value: "Unlimited" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <item.icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                <div className="text-sm font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="bg-[#111827] border border-gray-700 hover:border-gray-500 transition-all h-full flex flex-col">
                <CardContent className="p-5 flex flex-col flex-grow">
                  <div className="bg-white rounded-lg p-3 mb-4 flex items-center justify-center h-16">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={160}
                      height={45}
                      className="h-10 w-auto object-contain"
                    />
                  </div>

                  <div className="text-sm text-gray-400 mb-3">{brand.coverage}</div>

                  <div className="space-y-2 flex-grow mb-4">
                    {brand.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-green-400" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/become-a-partner">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-all text-sm bg-transparent"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 text-white">Why Partner with Multiple Internet Providers?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-400">
              <div>
                <h4 className="font-semibold text-white mb-2">Maximize Your Revenue Potential</h4>
                <p className="text-sm leading-relaxed">
                  By offering services from 9 different internet providers, you can serve customers in any location with
                  the best available option. From fiber to cable to 5G, you'll have the right solution for every
                  customer.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Comprehensive Market Coverage</h4>
                <p className="text-sm leading-relaxed">
                  Our partnership program includes fiber internet providers, cable broadband companies, and 5G home
                  internet solutions. Whether your customers need multi-gig fiber, reliable cable, or wireless
                  internet, you're covered.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
