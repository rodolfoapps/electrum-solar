import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { states } from '@/data/states';

export const metadata = generatePageMetadata({
  title: 'Sitemap',
  description:
    'Browse all pages on Electrum Solar. Find solar panel costs, companies, incentives, electricity rates, and energy storage information by state.',
  path: '/sitemap-html/',
});

interface SitemapSection {
  title: string;
  basePath: string;
  description: string;
}

const silos: SitemapSection[] = [
  {
    title: 'Solar Panel Cost',
    basePath: '/solar-panel-cost',
    description: 'Compare solar panel costs and pricing by state.',
  },
  {
    title: 'Solar Companies',
    basePath: '/solar-companies',
    description: 'Find top-rated solar installers by state.',
  },
  {
    title: 'Solar Incentives',
    basePath: '/solar-incentives',
    description: 'Discover solar incentives, rebates, and tax credits by state.',
  },
  {
    title: 'Electricity Rates',
    basePath: '/electricity-rates',
    description: 'Compare electricity rates and utility companies by state.',
  },
  {
    title: 'Energy Storage',
    basePath: '/energy-storage',
    description: 'Explore home battery and energy storage options by state.',
  },
];

const staticPages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Get a Quote', href: '/get-quote/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
];

export default async function SitemapHtmlPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Sitemap
      </h1>
      <p className="mt-4 text-base text-gray-600">
        Browse all pages on Electrum Solar, organized by category.
      </p>

      <div className="mt-10 space-y-12">
        {/* Static Pages */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Main Pages</h2>
          <ul className="mt-4 space-y-2">
            {staticPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Silo Sections */}
        {silos.map((silo) => (
          <section key={silo.basePath}>
            <h2 className="text-xl font-semibold text-gray-900">
              {silo.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{silo.description}</p>

            <ul className="mt-4 space-y-2">
              {/* Hub page */}
              <li>
                <Link
                  href={`${silo.basePath}/`}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {silo.title} Overview
                </Link>
              </li>

              {/* State pages */}
              {states.map((state) => (
                <li key={state.slug} className="ml-4">
                  <Link
                    href={`${silo.basePath}/${state.slug}/`}
                    className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {silo.title} in {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
