"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [partnersDropdownOpen, setPartnersDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const partnerLinks = [
    { name: "Referral Program", href: "/referral-program" },
    { name: "Sales Agent Program", href: "/sales-agent-program" },
    { name: "Business Partnerships", href: "/business-partnerships" },
    { name: "Spectrum Event Team", href: "/spectrum-event-team" },
    { name: "T-Mobile Fiber D2D", href: "/tmobile-fiber-partners" },
    { name: "Verizon Fios D2D", href: "/verizon-d2d-partners" },
  ]

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/#contact")
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-black",
        isScrolled ? "backdrop-blur-md py-2 shadow-lg" : "py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image
            src="/images/stance-logo-white.png"
            alt="Stance Marketing - Home"
            width={100}
            height={25}
            className="h-5 sm:h-6 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "Services", href: "/#services" },
            { name: "About", href: "/#about" },
            { name: "Solutions", href: "/#partners" },
            { name: "Team", href: "/#team" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              {item.name}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setPartnersDropdownOpen(true)}
            onMouseLeave={() => setPartnersDropdownOpen(false)}
          >
            <button className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm uppercase tracking-wider flex items-center gap-1">
              Partners
              <ChevronDown size={16} className={cn("transition-transform", partnersDropdownOpen && "rotate-180")} />
            </button>

            {partnersDropdownOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="w-56 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-xl py-2">
                  <Link
                    href="/partners"
                    className="block px-4 py-2 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-colors text-sm"
                  >
                    All Programs
                  </Link>
                  {partnerLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-gray-300 hover:text-red-500 hover:bg-gray-900/50 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-800 mt-2 pt-2">
                    <Link
                      href="/apply"
                      className="block px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-900/50 transition-colors text-sm font-semibold"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleContactClick}
            className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm uppercase tracking-wider"
          >
            Contact
          </button>

          <Link href="/apply">
            <Button
              variant="outline"
              className="border-red-500 text-white hover:bg-red-500 hover:text-white transition-all duration-300 bg-transparent"
            >
              Apply Now
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden text-white z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-6 z-0 px-4 overflow-y-auto py-20">
            {[
              { name: "Services", href: "/#services" },
              { name: "About", href: "/#about" },
              { name: "Solutions", href: "/#partners" },
              { name: "Team", href: "/#team" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-lg uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col items-center gap-3">
              <Link
                href="/partners"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-lg uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners
              </Link>
              <div className="flex flex-col items-center gap-2 pl-4">
                {partnerLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                handleContactClick()
              }}
              className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-lg uppercase tracking-wider"
            >
              Contact
            </button>

            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full max-w-xs"
            >
              <Button
                variant="outline"
                className="border-red-500 text-white hover:bg-red-500 hover:text-white transition-all duration-300 w-full bg-transparent"
              >
                Apply Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
