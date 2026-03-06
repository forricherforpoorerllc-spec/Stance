"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import components with client-side options
const TestimonialsSectionComponent = dynamic(
  () => import("@/components/testimonials-section-dynamic").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="py-20 bg-gray-900"></div>,
    ssr: false,
  },
)

const StatsSectionComponent = dynamic(
  () => import("@/components/stats-section-dynamic").then((mod) => ({ default: mod.StatsSection })),
  {
    loading: () => <div className="py-20 bg-black"></div>,
    ssr: true,
  },
)

const FaqSectionComponent = dynamic(
  () => import("@/components/faq-section-dynamic").then((mod) => ({ default: mod.FaqSection })),
  {
    loading: () => <div className="py-20 bg-gray-900"></div>,
    ssr: false,
  },
)

const CtaSectionComponent = dynamic(
  () => import("@/components/cta-section-dynamic").then((mod) => ({ default: mod.CtaSection })),
  {
    loading: () => <div className="py-20 bg-black"></div>,
    ssr: true,
  },
)

export function DynamicTestimonialsSection() {
  return (
    <Suspense fallback={<div className="py-20 bg-gray-900"></div>}>
      <TestimonialsSectionComponent />
    </Suspense>
  )
}

export function DynamicStatsSection() {
  return (
    <Suspense fallback={<div className="py-20 bg-black"></div>}>
      <StatsSectionComponent />
    </Suspense>
  )
}

export function DynamicFaqSection() {
  return (
    <Suspense fallback={<div className="py-20 bg-gray-900"></div>}>
      <FaqSectionComponent />
    </Suspense>
  )
}

export function DynamicCtaSection() {
  return (
    <Suspense fallback={<div className="py-20 bg-black"></div>}>
      <CtaSectionComponent />
    </Suspense>
  )
}
