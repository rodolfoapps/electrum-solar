import Link from 'next/link';
import { SITE_NAME, PHONE_NUMBER } from '@/lib/utils';

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

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneDigits = PHONE_NUMBER.replace(/\D/g, '');

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
            <a
              href={`tel:+1${phoneDigits}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
              aria-label={`Call us at ${PHONE_NUMBER}`}
            >
              <PhoneIcon className="h-4 w-4 text-amber-500" />
              {PHONE_NUMBER}
            </a>
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
