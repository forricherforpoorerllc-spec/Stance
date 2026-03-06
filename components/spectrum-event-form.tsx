"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Shield, Clock, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpectrumEventForm() {
  return (
    <section id="application-form" className="py-20 bg-[#0f1419]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to <span className="text-[#0089CF]">Join Our Team?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Take the first step toward a rewarding career with Stance Marketing and Spectrum.
            Complete our partner application and our recruiting team will be in touch within 48 hours.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, title: "Secure Application", desc: "Your information is protected" },
              { icon: Clock, title: "Quick Response", desc: "48-hour review time" },
              { icon: Handshake, title: "No Obligation", desc: "Free consultation included" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-[#0089CF]/20 bg-[#1a2332] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0089CF]/10">
                  <item.icon className="h-6 w-6 text-[#0089CF]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="bg-[#0089CF] hover:bg-[#0077B6] text-white font-semibold px-10 py-7 text-lg group shadow-xl"
          >
            <Link href="/become-a-partner">
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <p className="mt-8 text-gray-400">
            Questions about the position?{" "}
            <a href="mailto:careers@stancemarketing.com" className="text-[#0089CF] hover:underline font-semibold">
              Contact our recruiting team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
