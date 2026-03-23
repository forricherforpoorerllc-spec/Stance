import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
          <div>
            <Image
              src="/images/stance-logo-white.png"
              alt="Stance"
              width={100}
              height={25}
              className="h-5 sm:h-6 w-auto mb-4 md:mb-6"
            />
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              A managed sales organization deploying field teams, referral networks, and channel programs that drive subscriber growth for internet service providers.
            </p>
          </div>

          <div className="mt-2 sm:mt-0">
            <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/#about" },
                { name: "Services", href: "/#services" },
                { name: "Partners", href: "/partners" },
                { name: "Join a Program", href: "/become-a-partner" },
                { name: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 sm:mt-0">
            <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Sales Programs</h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: "Referral Program", href: "/referral-program" },
                { name: "Sales Agent Program", href: "/sales-agent-program" },
                { name: "Business Partnerships", href: "/business-partnerships" },
                { name: "Spectrum Event Team", href: "/spectrum-event-team" },
                { name: "T-Mobile Fiber D2D", href: "/tmobile-fiber-partners" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 sm:mt-0">
            <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Subscribe to our newsletter to receive the latest updates and news about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 flex-grow focus:outline-none focus:border-red-500 text-sm"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition-colors duration-300 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Stance LLC. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6 mt-3 md:mt-0">
              <Link
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-xs md:text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-xs md:text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
