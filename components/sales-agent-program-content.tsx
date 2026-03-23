"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  Zap,
  DollarSign,
  Phone,
  MapPin,
  UserCheck,
  ArrowRight,
  Wifi,
} from "lucide-react"

export function SalesAgentProgramContent() {
  const benefits = [
    {
      icon: Users,
      title: "Represent 10 Top Providers",
      description: "Sell AT&T, Verizon, Frontier, T-Mobile, Spectrum, Brightspeed, Kinetic, Optimum, Earthlink & Altafiber",
    },
    {
      icon: TrendingUp,
      title: "Uncapped Commissions",
      description: "Competitive per-install earnings as an agent, plus manager override opportunities",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Work when and where you want as a 1099 independent contractor",
    },
    {
      icon: Zap,
      title: "Multiple Sales Channels",
      description: "Online phone sales, field door-to-door, retail events, and more",
    },
    {
      icon: Shield,
      title: "Full Training & Support",
      description: "Comprehensive onboarding, compliance training, and ongoing support",
    },
    {
      icon: DollarSign,
      title: "Weekly Payouts",
      description: "Get paid weekly after installation verification",
    },
  ]

  const salesChannels = [
    {
      icon: Phone,
      title: "Online Sales Agent",
      description: "Work from home making outbound calls to qualified leads",
      features: ["Remote work flexibility", "Provided lead lists", "Phone sales training", "CRM access"],
      image: "/images/online-sales-agent.jpg",
    },
    {
      icon: MapPin,
      title: "Field Sales Agent",
      description: "Door-to-door and retail event sales in your local market",
      features: ["Face-to-face selling", "High-traffic locations", "Event marketing", "Territory assignments"],
      image: "/images/field-sales-agent.jpg",
    },
    {
      icon: UserCheck,
      title: "Sales Manager",
      description: "Lead a team and earn commissions plus manager overrides",
      features: ["Team leadership", "Agent commissions", "Manager overrides", "Performance bonuses"],
      image: "/images/sales-manager.jpg",
    },
  ]

  const providers = [
    { name: "Frontier", logo: "/images/frontier-logo.png", coverage: "25+ States", type: "Fiber Internet" },
    { name: "AT&T", logo: "/images/att-logo.png", coverage: "21+ States", type: "Fiber Internet" },
    { name: "Verizon", logo: "/images/verizon-logo.png", coverage: "NE + Nationwide", type: "Fios Fiber & 5G" },
    { name: "Spectrum", logo: "/images/spectrum-logo.png", coverage: "41+ States", type: "Cable Internet" },
    { name: "Brightspeed", logo: "/images/brightspeed-logo.png", coverage: "16+ States", type: "Fiber Internet" },
    { name: "Optimum", logo: "/images/optimum-logo.png", coverage: "Northeast US", type: "Fiber & Cable" },
    { name: "T-Mobile", logo: "/images/tmobile-fiber-logo.png", coverage: "Nationwide", type: "5G Home Internet" },
    { name: "Kinetic", logo: "/images/kinetic-logo.png", coverage: "18+ States", type: "Fiber Internet" },
    { name: "Earthlink", logo: "/images/earthlink-logo.png", coverage: "Nationwide", type: "Fiber & Wireless" },
    { name: "Altafiber", logo: "/images/altafiber-logo.png", coverage: "OH & KY", type: "Fiber Internet" },
  ]

  const idealCandidates = [
    "Proven B2C Sales Experience (Retail, Phone, or Field Sales)",
    "Self-Motivated & Commission-Driven",
    "Professional Communication Skills",
    "Reliable & Accountable",
    "Ability to Learn Multiple Provider Systems",
    "Comfortable with Technology & CRM Tools",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sales-agent-hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e13]/95 via-[#0f1419]/90 to-[#1a1f2e]/95" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2.5 mb-8">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-semibold text-sm">Uncapped Earning Potential</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white text-balance">
              Sales Agent &{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Manager Program
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 text-pretty leading-relaxed max-w-4xl mx-auto">
              Join our network of online and field sales professionals. Represent 10 leading internet providers
              including Verizon, AT&T, and Spectrum. Work on your schedule and earn uncapped commissions. Manager
              positions available with team override opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/become-a-partner">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-10 py-7"
                >
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("provider-details")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-emerald-400/30 text-white hover:bg-emerald-500/10 font-semibold text-lg px-10 py-7 bg-transparent"
              >
                View Providers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sales Channels */}
      <section className="py-20 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Choose Your <span className="text-emerald-400">Sales Path</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Online, field, or management -- find the opportunity that fits your lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {salesChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#111827] border border-gray-700 hover:border-emerald-500/50 transition-all h-full group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={channel.image || "/placeholder.svg"}
                        alt={channel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <channel.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{channel.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-5 text-sm">{channel.description}</p>
                      <ul className="space-y-2">
                        {channel.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Grid */}
      <section id="provider-details" className="py-20 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Provider{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Network
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Sell services from 10 leading internet providers across the nation
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-[#111827] border border-gray-700 hover:border-gray-500 transition-all h-full">
                  <CardContent className="p-5">
                    <div className="bg-white rounded-lg p-3 mb-4 flex items-center justify-center h-16">
                      <img
                        src={provider.logo || "/placeholder.svg"}
                        alt={`${provider.name} logo`}
                        className="h-10 w-auto object-contain max-w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{provider.coverage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{provider.type}</span>
                    </div>
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
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0">
              <CardContent className="p-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">Uncapped Earning Potential</h3>
                <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Your income is only limited by your ambition. Top agents earn significant monthly income, and managers
                  can multiply earnings with team overrides.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Why Join <span className="text-emerald-400">Stance Marketing?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#111827] border border-gray-700 hover:border-emerald-500/50 transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="py-20 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ideal <span className="text-teal-400">Candidates</span>
              </h2>
              <p className="text-lg text-gray-400">Who thrives in our sales agent and manager program?</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {idealCandidates.map((candidate, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="bg-[#111827] border border-gray-700">
                    <CardContent className="p-5 flex items-center gap-3">
                      <div className="bg-emerald-500/10 p-1.5 rounded-md flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-gray-300 font-medium">{candidate}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-12 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#111827] border border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  <div className="bg-amber-500/10 rounded-xl p-3 flex-shrink-0">
                    <Shield className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      Marketing & Compliance
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      All agents and managers must strictly adhere to Stance LLC and provider-specific marketing
                      guidelines for each approved sales channel.
                    </p>
                    <ul className="space-y-2.5">
                      <li className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        Comprehensive compliance training provided
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        Provider branding requires specific approvals
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        Ongoing support for all compliance requirements
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Start Earning?</h2>
            <p className="text-xl text-emerald-100 mb-4 leading-relaxed">
              Join our network of successful sales agents and managers today.
            </p>
            <p className="text-emerald-200 mb-10">
              Questions? Email us at{" "}
              <a
                href="mailto:info@stance-marketing.com"
                className="text-white underline font-semibold hover:text-emerald-100"
              >
                info@stance-marketing.com
              </a>
            </p>
            <Link href="/become-a-partner">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-10 py-7 font-bold">
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
