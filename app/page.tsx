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
      "Leading internet provider partnership programs connecting sales agents, businesses, and referral partners with top telecom brands including AT&T, Spectrum, Frontier, T-Mobile, Brightspeed, Kinetic, Optimum, Earthlink, and Altafiber.",
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
      "Internet Service Provider Partnerships",
      "Telecom Sales Channel Management",
      "Fiber Internet Sales",
      "Door-to-Door Sales Training",
      "Referral Marketing Programs",
      "Commission-Based Sales Programs",
      "AT&T Authorized Dealer Program",
      "Spectrum Authorized Retailer",
      "T-Mobile Fiber D2D",
      "Verizon Fios Partner Program",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "partnerships@stancellc.com",
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
        name: "What industries does Stance Marketing specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stance Marketing specializes in providing marketing solutions for Cable, Internet, Lifeline, and Energy sectors. Our expertise in these industries allows us to create targeted strategies that deliver exceptional results for our clients.",
        },
      },
      {
        "@type": "Question",
        name: "How does Stance Marketing approach new client partnerships?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We begin with a comprehensive consultation to understand your business goals, target audience, and current marketing challenges. From there, we develop a customized strategy tailored to your specific needs, with clear metrics for success and regular reporting on progress.",
        },
      },
      {
        "@type": "Question",
        name: "What marketing services does Stance offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stance offers a full range of marketing services including digital marketing, brand development, content creation, social media management, SEO optimization, PPC campaigns, email marketing, and traditional marketing strategies tailored to your industry needs.",
        },
      },
      {
        "@type": "Question",
        name: "How does Stance measure marketing success?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We establish clear KPIs at the beginning of each campaign based on your business objectives. Our data-driven approach includes regular reporting on metrics such as conversion rates, customer acquisition costs, ROI, engagement metrics, and other relevant performance indicators.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Stance different from other marketing agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stance combines deep industry expertise in specific sectors with innovative marketing approaches. Our dedicated team provides personalized service, transparent communication, and measurable results. We focus on building long-term partnerships rather than just completing transactions.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can I expect to see results from working with Stance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While some tactical initiatives may show immediate results, strategic marketing typically requires time to build momentum. Most clients begin seeing measurable improvements within 3-6 months, with significant results becoming apparent after 6-12 months of consistent implementation.",
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
