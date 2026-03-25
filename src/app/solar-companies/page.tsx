import { generatePageMetadata } from '@/lib/metadata';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StateGrid } from '@/components/sections/StateGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';

export const metadata = generatePageMetadata({
  title: 'Top Solar Companies by State (2026) | Trusted Installers',
  description:
    'Find the best solar companies and installers in Idaho, California, Texas, and Hawaii. Compare ratings, reviews, certifications, and get free quotes from trusted local installers.',
  path: '/solar-companies/',
  keywords: [
    'solar companies',
    'solar installers',
    'best solar companies',
    'top solar installers',
    'solar companies near me',
    'solar installation companies',
  ],
});

export default function SolarCompaniesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Top Solar Companies by State (2026)',
          '/solar-companies/',
          'Find the best solar companies and installers in Idaho, California, Texas, and Hawaii. Compare ratings, reviews, and certifications.'
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Companies', url: `${SITE_URL}/solar-companies/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Solar Companies' },
          ]}
        />

        {/* Hero / Intro */}
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Top Solar Companies by State
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Choosing the right solar installer is one of the most important
            decisions you will make when going solar. We have researched and
            vetted the top-rated solar companies across Idaho, California,
            Texas, and Hawaii so you can compare reviews, certifications, and
            pricing. Whether you need a full rooftop installation or a ground-
            mounted system, our state-by-state listings help you find a trusted
            local installer.
          </p>
        </section>

        {/* What to Look For */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What to Look for in a Solar Company
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Certifications
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Look for NABCEP-certified installers. This certification
                ensures your installer meets the highest industry standards
                for solar installation.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Reviews & Ratings
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Check customer reviews on Google, BBB, and solar-specific
                platforms. Companies with 4+ star ratings and hundreds of
                reviews are typically reliable choices.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Warranties
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                A good solar company should offer workmanship warranties of at
                least 10 years in addition to manufacturer panel and inverter
                warranties.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Experience
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Companies with 5+ years in business and hundreds of completed
                installations bring the expertise to handle complex roof types
                and local permitting.
              </p>
            </div>
          </div>
        </section>

        {/* State Grid */}
        <StateGrid basePath="/solar-companies" />

        {/* How It Works */}
        <HowItWorks />

        {/* CTA */}
        <InlineQuoteCTA />
      </div>
    </>
  );
}
