import Script from "next/script"
import { Parallax } from "@/components/parallax"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PartnersSection } from "@/components/partners-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stance",
    alternateName: "Stance Marketing",
    url: "https://stance-marketing.com",
    logo: "https://stance-marketing.com/images/stance-logo-white.png",
    description:
      "Leading internet provider partnership programs connecting sales agents, businesses, and referral partners with top telecom brands including AT&T, Spectrum, Frontier, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber.",
    foundingDate: "2020",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Partnership Inquiries",
      areaServed: "US",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://stance-marketing.com",
      "https://stance-marketing.com/partners",
      "https://stance-marketing.com/become-a-partner",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Partnership Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Referral Partner Program",
            description:
              "Earn commissions by referring customers to internet service providers. Perfect for realtors, property managers, and insurance agents.",
            url: "https://stance-marketing.com/referral-program",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sales Agent Program",
            description:
              "Online and field sales agent positions representing 9 leading internet providers with uncapped commission potential.",
            url: "https://stance-marketing.com/sales-agent-program",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Partnership Program",
            description:
              "Channel partner opportunities for businesses to resell internet services from AT&T, Spectrum, Frontier, T-Mobile, and more.",
            url: "https://stance-marketing.com/business-partnerships",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Spectrum Event Team",
            description: "Elite sales positions representing Spectrum at high-traffic retail locations nationwide.",
            url: "https://stance-marketing.com/spectrum-event-team",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "T-Mobile Fiber D2D Partnership",
            description: "Exclusive door-to-door partnership opportunities for T-Mobile Fiber internet services.",
            url: "https://stance-marketing.com/tmobile-fiber-partners",
          },
        },
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stance",
    url: "https://stance-marketing.com",
    description:
      "Internet provider partnership programs connecting sales professionals with leading telecom brands nationwide.",
    publisher: {
      "@type": "Organization",
      name: "Stance",
      logo: {
        "@type": "ImageObject",
        url: "https://stance-marketing.com/images/stance-logo-white.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://stance-marketing.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="beforeInteractive"
      />
      <Navbar />
      <HeroSection />
      <Parallax />
      <WhyChooseUsSection />
      <ServicesSection />
      <StatsSection />
      <PartnersSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
