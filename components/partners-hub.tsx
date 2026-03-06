"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"

export function PartnersHub() {
  const partnerTypes = [
    {
      icon: Users,
      title: "Referral Partner",
      description: "Earn commissions simply by referring customers needing internet. No selling required.",
      href: "/referral-program",
      features: ["No sales experience needed", "Simple online referral process", "Passive income opportunity"],
      badge: "Easiest Start",
      badgeColor: "bg-blue-500",
    },
    {
      icon: Briefcase,
      title: "Sales Agent / Manager",
      description: "Actively sell services from multiple providers using approved methods. Uncapped earning potential.",
      href: "/sales-agent-program",
      features: ["Uncapped commission potential", "Flexible schedule", "Online or field positions"],
      badge: "High Earning",
      badgeColor: "bg-emerald-500",
    },
    {
      icon: Building2,
      title: "Business Partner",
      description: "Integrate internet offers into your existing business model for significant revenue boost.",
      href: "/business-partnerships",
      features: ["Premier tier earnings", "Low operational impact", "Dedicated support"],
      badge: "Best for Businesses",
      badgeColor: "bg-red-500",
    },
    {
      icon: Calendar,
      title: "Spectrum Event Team",
      description: "Join our dedicated team selling Spectrum at indoor retail events. Experienced reps needed.",
      href: "/spectrum-event-team",
      features: ["Indoor retail events", "Weekly pay", "Team environment"],
      badge: "Immediate Openings",
      badgeColor: "bg-[#0089CF]",
    },
    {
      icon: Calendar,
      title: "T-Mobile Fiber D2D",
      description: "Door-to-door sales for T-Mobile Fiber. Dealer and contractor programs available.",
      href: "/tmobile-fiber-partners",
      features: ["Only Master Agent partner", "Dealer & contractor roles", "Expanding territories"],
      badge: "Exclusive Program",
      badgeColor: "bg-[#E20074]",
    },
    {
      icon: Calendar,
      title: "Verizon Fios D2D",
      description: "Door-to-door sales for Verizon Fios fiber and 5G Home Internet. Dealer, contractor, and agent programs.",
      href: "/verizon-d2d-partners",
      features: ["Fios fiber & 5G wireless", "Dealer & contractor roles", "Northeast + nationwide coverage"],
      badge: "Now Available",
      badgeColor: "bg-[#CD040B]",
    },
  ]

  const providers = [
    { name: "Spectrum", logo: "/images/spectrum-logo.png" },
    { name: "Optimum", logo: "/images/optimum-logo.png" },
    { name: "T-Mobile Fiber", logo: "/images/tmobile-fiber-logo.png" },
    { name: "Verizon", logo: "/images/verizon-logo.png" },
    { name: "AT&T", logo: "/images/att-logo.png" },
    { name: "Frontier", logo: "/images/frontier-logo.png" },
    { name: "Kinetic", logo: "/images/kinetic-logo.png" },
    { name: "Brightspeed", logo: "/images/brightspeed-logo.png" },
    { name: "Altafiber", logo: "/images/altafiber-logo.png" },
    { name: "EarthLink", logo: "/images/earthlink-logo.png" },
  ]

  const whyPartner = [
    {
      icon: TrendingUp,
      title: "High Earning Potential",
      description: "Competitive commissions with uncapped earning potential across multiple partnership models",
    },
    {
      icon: Shield,
      title: "Trusted Brands",
      description: "Represent industry-leading providers that customers already know and trust",
    },
    {
      icon: Zap,
      title: "Fast Onboarding",
      description: "Get started quickly with comprehensive training and dedicated partnership support",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e13] via-[#111827] to-[#0a0e13]" />
        <div className="absolute inset-0 opacity-10">
          <Image src="/partners-hub-hero.jpg" alt="" fill className="object-cover" priority aria-hidden="true" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight text-balance">
              Partner with{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                Stance Marketing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-red-400 font-semibold mb-6">
              Multiple Ways to Earn Selling Essential Internet Services
            </p>
            <p className="text-lg text-gray-300 mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
              Represent top internet brands like AT&T, Verizon, Spectrum, Frontier, Kinetic, Optimum, Brightspeed,
              Earthlink, and Altafiber. Choose the partnership model that fits your goals.
            </p>
            <Link href="/become-a-partner">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white text-lg px-10 py-7"
              >
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 bg-[#0f1419] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyPartner.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Programs Grid */}
      <section className="py-20 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Choose Your <span className="text-red-500">Partnership Path</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Select the opportunity that best fits your goals, experience, and preferred work style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#111827] border-2 border-gray-700 hover:border-red-500/50 transition-all duration-300 group h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-red-500/10 p-3 rounded-xl">
                        <partner.icon className="w-7 h-7 text-red-400" />
                      </div>
                      <span className={`${partner.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {partner.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">{partner.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5 text-sm flex-grow">{partner.description}</p>

                    <ul className="space-y-2.5 mb-6">
                      {partner.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-gray-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={partner.href} className="block mt-auto">
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-all bg-transparent"
                      >
                        Learn More
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
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-4">Not sure which program is right for you?</p>
            <Link href="/become-a-partner">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-10 py-6 text-lg">
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trusted Providers Section */}
      <section className="py-16 bg-[#0f1419] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Represent <span className="text-red-400">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Partner with the most trusted names in internet and telecommunications services
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="bg-white rounded-xl p-4 h-20 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Image
                  src={provider.logo || "/placeholder.svg"}
                  alt={`${provider.name} logo`}
                  width={120}
                  height={45}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-14 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#111827] border border-gray-700 rounded-2xl p-8 flex items-start gap-5">
            <div className="bg-red-500/10 p-3 rounded-xl flex-shrink-0">
              <Shield className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Compliance & Standards</h3>
              <p className="text-gray-400 leading-relaxed">
                All partnership opportunities require strict adherence to Stance LLC's and our brand partners'
                marketing and compliance standards. Comprehensive training is provided to ensure success and regulatory
                compliance across all programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
