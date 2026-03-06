import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle2,
  TrendingUp,
  Handshake,
  Shield,
  Users,
  Zap,
  Building2,
  DollarSign,
  Target,
  Rocket,
} from "lucide-react"

export function BusinessPartnershipsContent() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Significant New Revenue",
      description: "Add a high-margin revenue stream to your existing business",
    },
    {
      icon: Users,
      title: "Enhanced Customer Value",
      description: "Provide essential services your customers already need",
    },
    {
      icon: Shield,
      title: "Trusted Brands",
      description: "Offer in-demand services from recognized providers",
    },
    {
      icon: Zap,
      title: "Low Operational Impact",
      description: "Minimal changes to your existing business operations",
    },
    {
      icon: Handshake,
      title: "Dedicated Partnership Support",
      description: "Full support from our partnership team",
    },
    {
      icon: CheckCircle2,
      title: "Flexible Integration",
      description: "Multiple ways to integrate into your business model",
    },
  ]

  const idealPartners = [
    {
      icon: Building2,
      title: "Retailers",
      description: "Add internet services to your product offerings",
    },
    {
      icon: Users,
      title: "IT Service Providers / MSPs",
      description: "Bundle internet with your IT services",
    },
    {
      icon: Building2,
      title: "Property Management",
      description: "Offer internet solutions to tenants and properties",
    },
    {
      icon: Handshake,
      title: "Home Service Businesses",
      description: "Cross-sell internet to your customer base",
    },
    {
      icon: Users,
      title: "Community Organizations",
      description: "Provide value to your members and community",
    },
    {
      icon: Building2,
      title: "Franchise Operations",
      description: "Add revenue across multiple locations",
    },
  ]

  const providers = [
    { name: "Spectrum", logo: "/images/spectrum-logo.png" },
    { name: "Optimum", logo: "/images/optimum-logo.png" },
    { name: "T-Mobile Fiber", logo: "/images/tmobile-fiber-logo.png" },
    { name: "AT&T", logo: "/images/att-logo.png" },
    { name: "Frontier", logo: "/images/frontier-logo.png" },
    { name: "Kinetic", logo: "/images/kinetic-logo.png" },
    { name: "Brightspeed", logo: "/images/brightspeed-logo.png" },
    { name: "Altafiber", logo: "/images/altafiber-logo.png" },
    { name: "EarthLink", logo: "/images/earthlink-logo.png" },
  ]

  const integrationMethods = [
    "Referral links integrated into your customer journey",
    "Trained staff for face-to-face or phone sales within your business",
    "Co-branded marketing materials (subject to strict provider approval)",
    "Digital integration with pre-approved marketing channels",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/business-partnership-meeting.jpg"
            alt="Business Partnerships"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/85 via-orange-900/75 to-red-800/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <DollarSign className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">Earn Up to $350+ Per Install</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance text-white leading-tight">
              Strategic Business Partnerships
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
              Transform your existing customer relationships into a powerful revenue stream. Partner with Stance to
              offer essential internet services.
            </p>
            <Button
              size="lg"
              className="bg-white text-red-900 hover:bg-gray-100 text-lg px-10 py-7 font-bold shadow-2xl"
            >
              Explore Partnership Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Revenue Potential */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-red-600 to-orange-600 border-0 shadow-2xl">
              <CardContent className="p-12 text-center">
                <Rocket className="w-20 h-20 text-white mx-auto mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Maximize Your Revenue</h2>
                <p className="text-2xl md:text-3xl text-white/95 mb-6 leading-relaxed">
                  Earn up to <span className="font-black text-yellow-300">$350+</span> per installation
                </p>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Turn your existing customer relationships into a powerful revenue generator with minimal operational
                  changes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Partner */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How We <span className="text-red-600">Partner</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Flexible integration options that work with your business model
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Integration Methods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {integrationMethods.map((method, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                      <div className="bg-red-600 rounded-full p-2 flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-gray-800 text-lg font-medium pt-1">{method}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provider Logos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Partner with Leading Providers</h3>
            <p className="text-xl text-gray-600">Offer services from the most trusted names in internet</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="bg-white rounded-xl p-6 h-24 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <Image
                  src={provider.logo || "/placeholder.svg"}
                  alt={provider.name}
                  width={140}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Benefits for Your <span className="text-red-600">Business</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="bg-white border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all group"
              >
                <CardContent className="p-8">
                  <div className="bg-red-100 group-hover:bg-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <benefit.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              Ideal <span className="text-red-600">Partners</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {idealPartners.map((partner) => (
                <Card
                  key={partner.title}
                  className="bg-white border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <partner.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{partner.title}</h3>
                    <p className="text-gray-600 text-lg">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 rounded-2xl p-4 flex-shrink-0">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      Compliance is <span className="text-red-600">Key</span>
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Partners must operate within approved sales channels and strictly follow all provider-specific
                      marketing guidelines.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">Comprehensive guidance and training provided</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">We manage all provider approvals and compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">Ongoing support for regulatory compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-20 h-20 text-white mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Ready to Partner?</h2>
            <p className="text-2xl text-white/95 mb-10 leading-relaxed">
              Transform your business with a strategic partnership today
            </p>
            <Button
              size="lg"
              className="bg-white text-red-900 hover:bg-gray-100 text-xl px-12 py-8 font-bold shadow-2xl"
            >
              Start Partnership Discussion
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
