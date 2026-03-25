import Link from 'next/link';
import { SITE_NAME } from '@/lib/utils';

const solarResources = [
  { label: 'Solar Panel Costs', href: '/solar-panel-cost/' },
  { label: 'Solar Companies', href: '/solar-companies/' },
  { label: 'Solar Incentives', href: '/solar-incentives/' },
  { label: 'Electricity Rates', href: '/electricity-rates/' },
  { label: 'Battery Storage', href: '/energy-storage/' },
];

const focusStates = [
  { label: 'Idaho', href: '/solar-companies/idaho/' },
  { label: 'California', href: '/solar-companies/california/' },
  { label: 'Texas', href: '/solar-companies/texas/' },
  { label: 'Hawaii', href: '/solar-companies/hawaii/' },
];

const companyLinks = [
  { label: 'About', href: '/about/' },
  { label: 'Contact / Get Quote', href: '/get-quote/' },
];

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 group">
      <svg
        className="h-7 w-7 text-amber-500 group-hover:text-amber-400 transition-colors"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13 2L4.09 12.79a1 1 0 00.77 1.62H11v6.59a.5.5 0 00.89.31L20.91 11.21a1 1 0 00-.77-1.62H13V3a.5.5 0 00-.89-.31L13 2z" />
      </svg>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-white">Electrum</span>
        <span className="text-amber-500"> Solar</span>
      </span>
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + description + phone */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Compare solar panel costs, find trusted installers, and discover incentives across Idaho, California, Texas, and Hawaii. Your guide to going solar.
            </p>
          </div>

          {/* Column 2: Solar Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Solar Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {solarResources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our States */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our States
            </h3>
            <ul className="mt-4 space-y-3">
              {focusStates.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            <nav className="flex items-center gap-6" aria-label="Footer legal links">
              <Link
                href="/privacy-policy/"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms/"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
