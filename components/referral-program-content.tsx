"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, UserPlus, LinkIcon, FileText, Phone, DollarSign, ArrowRight, Shield } from "lucide-react"

export function ReferralProgramContent() {
  const steps = [
    { icon: UserPlus, title: "Apply", description: "Complete our simple partner application" },
    { icon: LinkIcon, title: "Get Your Link", description: "Receive your unique tracking link" },
    { icon: FileText, title: "Share Leads", description: "Refer people in your network" },
    { icon: Phone, title: "We Handle Sales", description: "Our team takes care of everything" },
    { icon: DollarSign, title: "Get Paid", description: "Earn commissions per verified install" },
  ]

  const benefits = [
    "Lucrative payouts per verified installation",
    "No sales pressure or experience required",
    "Add value for your clients with trusted services",
    "Offer multiple top-tier internet brands",
    "Simple online referral process",
    "Dedicated partner support team",
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

  const idealFor = [
    "Real Estate Agents & Realtors",
    "Property Managers",
    "Insurance Agents",
    "Financial Advisors",
    "Home Service Professionals",
    "Community Leaders",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e13] via-[#0c1a2e] to-[#0a0e13]" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/referral-partner-handshake.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
        </div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 mb-8">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-sm">Easiest Way to Start Earning</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight text-balance">
              Internet Referral{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Partner Program
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
              Perfect for Realtors, Property Managers, Insurance Agents, and others with a network. Refer clients
              needing internet and earn commissions without doing the selling. Represent top brands including Verizon,
              AT&T, Spectrum, and more.
            </p>
            <Link href="/become-a-partner">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-10 py-7">
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
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
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Five simple steps to start earning</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#111827] border border-gray-700 hover:border-blue-500/50 transition-all h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="text-blue-400 font-bold text-xs mb-2 uppercase tracking-wider">
                      Step {index + 1}
                    </div>
                    <h3 className="font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                  Why Refer Through <span className="text-blue-400">Stance?</span>
                </h2>
                <ul className="space-y-5">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="bg-green-500/10 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-lg leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/become-a-partner">
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6">
                      Become a Partner
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#111827] border border-gray-700 p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-white">Trusted Brands You Represent</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <div
                        key={provider.name}
                        className="bg-white rounded-xl p-4 flex items-center justify-center h-20 hover:scale-105 transition-transform"
                      >
                        <Image
                          src={provider.logo || "/placeholder.svg"}
                          alt={`${provider.name} logo`}
                          width={110}
                          height={40}
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Ideal For <span className="text-blue-400">Professionals</span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Perfect for professionals who regularly interact with people moving or needing services
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {idealFor.map((profession, index) => (
                <motion.div
                  key={profession}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-[#111827] border border-gray-700 hover:border-blue-500/50 transition-all">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="bg-blue-500/10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="font-semibold text-white">{profession}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 bg-[#0a0e13]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-start gap-4 bg-[#111827] border border-gray-700 rounded-xl p-6">
            <Shield className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm leading-relaxed">
              All referral partners must adhere to Stance LLC's and our brand partners' marketing and compliance
              standards. Training is provided to ensure you can confidently refer clients while maintaining compliance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start <span className="text-blue-200">Earning?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Complete the application to join our Referral Partner Program today.
            </p>
            <Link href="/become-a-partner">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-7">
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

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
