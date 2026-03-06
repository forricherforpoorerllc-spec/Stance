import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, TrendingUp, Shield, Users, Award, Briefcase, MapPin, Star } from "lucide-react"

export function SpectrumEventTeamContent() {
  const agentBenefits = [
    "Earn up to $130+ per Spectrum Internet install",
    "Competitive commission structure",
    "Weekly pay post-verification",
    "Indoor retail event locations",
    "Professional event setup and materials",
    "Full training on Spectrum systems",
  ]

  const managerBenefits = [
    "Lead a team and earn overrides up to $40 per team install",
    "Plus personal sales commissions",
    "Team leadership and development opportunities",
    "Higher earning potential through team performance",
    "Management training and support",
    "Career advancement opportunities",
  ]

  const requirements = [
    {
      icon: Award,
      title: "Proven Sales Experience",
      description: "D2D, Event, or Wireless sales background required",
    },
    {
      icon: TrendingUp,
      title: "Proven Closer",
      description: "Track record of meeting and exceeding sales goals",
    },
    {
      icon: Users,
      title: "Professional Demeanor",
      description: "Excellent communication and customer service skills",
    },
    {
      icon: Shield,
      title: "Background Check",
      description: "Must pass comprehensive background screening",
    },
    {
      icon: Briefcase,
      title: "Reliable Transportation",
      description: "Ability to travel to event locations",
    },
    {
      icon: CheckCircle2,
      title: "Tech Proficiency",
      description: "Comfortable using tablet/laptop for order entry",
    },
  ]

  const roleDetails = [
    "Set up and manage professional information tables at retail locations",
    "Engage shoppers in high-traffic indoor venues (grocery stores, retail centers)",
    "Present Spectrum offers including Internet, TV, and Mobile services",
    "Accurately submit orders via Spectrum systems",
    "Focus on Events Marketing & Face-to-Face Retail interactions",
    "Maintain professional appearance and brand standards",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/spectrum-event-team.jpg" alt="Spectrum Event Team" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-cyan-900/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">Experienced Reps Only</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance text-white leading-tight">
              Elite Spectrum Event Team
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 text-pretty leading-relaxed max-w-3xl mx-auto">
              Join our dedicated team representing Spectrum at high-traffic indoor retail events nationwide. Immediate
              openings for proven sales professionals.
            </p>

            <div className="flex justify-center mb-10">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 inline-block shadow-2xl border border-white/20">
                <Image
                  src="/images/spectrum-logo.png"
                  alt="Spectrum"
                  width={240}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-10 py-7 font-bold shadow-2xl"
              >
                Apply as Event Agent
              </Button>
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-10 py-7 font-bold shadow-2xl border-2 border-white/30"
              >
                Apply as Event Manager
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Role */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              The Role: <span className="text-blue-600">Indoor Event Expert</span>
            </h2>

            <Card className="bg-white border-2 border-blue-200 shadow-xl">
              <CardContent className="p-10">
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-blue-600 rounded-2xl p-4 flex-shrink-0">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">What You'll Do</h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Represent Spectrum at premium indoor retail locations, engaging with high-intent shoppers in
                      professional event settings.
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {roleDetails.map((detail, index) => (
                    <li key={index} className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                      <div className="bg-blue-600 rounded-full p-1 flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-800 text-lg leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compensation Package */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Compensation <span className="text-blue-600">Package</span>
            </h2>
            <p className="text-xl text-gray-600">Uncapped earning potential based on performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Agent Compensation */}
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 shadow-2xl">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Event Agent</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <p className="text-5xl font-black text-white mb-2">$130+</p>
                    <p className="text-white/90 text-lg">per install</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {agentBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <span className="text-white text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Manager Compensation */}
            <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 border-0 shadow-2xl">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Event Manager</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <p className="text-5xl font-black text-white mb-2">$40</p>
                    <p className="text-white/90 text-lg">per team install + commissions</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {managerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <span className="text-white text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strict Requirements */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              Strict <span className="text-blue-600">Requirements</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requirements.map((requirement) => (
                <Card
                  key={requirement.title}
                  className="bg-white border-2 border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <requirement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{requirement.title}</h3>
                    <p className="text-gray-600 text-lg">{requirement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600 rounded-2xl p-4 flex-shrink-0">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      Compliance <span className="text-blue-600">Requirements</span>
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Agents must strictly follow all Charter/Spectrum Marketing Rules, including using only approved
                      advertising copy and accurately representing offers.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">Mandatory compliance training provided</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">
                          Use only approved marketing materials and messaging
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-lg">Accurate representation of all offers and pricing</span>
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
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-20 h-20 text-white mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Apply for Your Role</h2>
            <p className="text-2xl text-white/95 mb-12 leading-relaxed">
              Choose the position that matches your experience and career goals
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Event Agent</h3>
                  <p className="text-white/90 mb-6 text-lg">Join our team as a sales agent at indoor retail events</p>
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 w-full font-bold">
                    Apply as Agent
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Event Manager</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Lead a team and maximize earnings through team performance
                  </p>
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 w-full font-bold">
                    Apply as Manager
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
