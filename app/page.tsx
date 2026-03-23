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
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://stance-marketing.com/#organization",
    name: "Stance",
    alternateName: "Stance Marketing",
    url: "https://stance-marketing.com",
    logo: {
      "@type": "ImageObject",
      url: "https://stance-marketing.com/images/stance-logo-white.png",
      width: 512,
      height: 512,
    },
    image: "https://stance-marketing.com/images/partnership-hero.png",
    description:
      "Stance is a managed sales organization and authorized channel partner for leading internet service providers. We deploy field sales teams, event campaigns, referral networks, and business channel programs that drive verified residential and commercial subscriber activations across the United States.",
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: [
      "ISP Channel Development",
      "Managed Sales Organization",
      "Field Marketing Organization",
      "Telecom Subscriber Acquisition",
      "Door-to-Door Sales Management",
      "Event & Retail Sales Campaigns",
      "Referral Partner Networks",
      "ISP Business Channel Programs",
      "Telecom Sales Compliance",
      "Multi-Channel Sales Deployment",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@stance-marketing.com",
        contactType: "Partnership Inquiries",
        areaServed: "US",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/stance-marketing",
      "https://www.facebook.com/stancemarketingco",
      "https://www.instagram.com/stancemarketingco",
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Verizon Fios D2D Partnership",
            description: "Authorized Verizon partner for Fios fiber and 5G Home Internet door-to-door sales.",
            url: "https://stance-marketing.com/verizon-d2d-partners",
          },
        },
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://stance-marketing.com/#website",
    name: "Stance",
    url: "https://stance-marketing.com",
    description:
      "Internet provider partnership programs connecting sales professionals with leading telecom brands nationwide.",
    publisher: {
      "@id": "https://stance-marketing.com/#organization",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of internet providers does Stance work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with residential and business internet service providers looking to grow subscriber volume through managed sales channels. Our current relationships span fiber, cable, and fixed wireless providers operating across the United States.",
        },
      },
      {
        "@type": "Question",
        name: "What sales channels does Stance deploy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We operate across door-to-door field sales, event and retail location campaigns, structured referral networks, and business-to-business channel programs. Channels can be deployed independently or in combination depending on the market and provider goals.",
        },
      },
      {
        "@type": "Question",
        name: "How does Stance ensure compliance and activation quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All sales activity operates under authorized agreements with each provider. We enforce compliance standards at the team level, and our programs are structured around verified, completed installations — not raw lead volume.",
        },
      },
      {
        "@type": "Question",
        name: "Are there opportunities for independent sales professionals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we offer structured programs for field sales agents, event team representatives, referral partners, and channel businesses. Each program has its own requirements and compensation structure. Visit our program pages to learn more or submit an application.",
        },
      },
      {
        "@type": "Question",
        name: "How do I explore a partnership with Stance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For providers interested in deploying our sales channels, reach out through our contact form and a member of our team will follow up to discuss fit and program options. For sales professionals and businesses, browse our program pages to find the right opportunity.",
        },
      },
      {
        "@type": "Question",
        name: "What markets does Stance currently operate in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We have active programs across major US markets and continue to expand. Market availability varies by program and provider. Contact us to discuss coverage in a specific territory.",
        },
      },
    ],
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
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
