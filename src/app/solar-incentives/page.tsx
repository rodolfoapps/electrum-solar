import { generatePageMetadata } from '@/lib/metadata';
import { collectionPageSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StateGrid } from '@/components/sections/StateGrid';
import { FAQSection } from '@/components/sections/FAQSection';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { incentiveFAQs } from '@/data/faqs';

export const metadata = generatePageMetadata({
  title: 'Solar Incentives & Tax Credits by State (2026)',
  description:
    'Discover solar incentives, tax credits, rebates, and net metering programs available in Idaho, California, Texas, and Hawaii. Learn how to maximize your solar savings in 2026.',
  path: '/solar-incentives/',
  keywords: [
    'solar incentives',
    'solar tax credit',
    'solar rebates',
    'federal solar tax credit',
    'state solar incentives',
    'net metering',
    'solar ITC',
  ],
});

export default function SolarIncentivesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Solar Incentives & Tax Credits by State (2026)',
          '/solar-incentives/',
          'Discover solar incentives, tax credits, rebates, and net metering programs in Idaho, California, Texas, and Hawaii.'
        )}
      />
      <JsonLd data={faqSchema(incentiveFAQs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Incentives', url: `${SITE_URL}/solar-incentives/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Solar Incentives' },
          ]}
        />

        {/* Hero / Intro */}
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Solar Incentives & Tax Credits
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Going solar is more affordable than ever thanks to generous federal
            and state incentives. The{' '}
            <strong>federal Investment Tax Credit (ITC)</strong> lets you deduct{' '}
            <strong>30%</strong> of your solar system cost from your federal
            taxes — and many states offer additional credits, rebates, property
            tax exemptions, and net metering programs that can save you
            thousands more. Explore the incentives available in Idaho,
            California, Texas, and Hawaii below.
          </p>
        </section>

        {/* Federal ITC Highlight */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Solar Incentives for 2026
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-800">
                30% Federal Tax Credit (ITC)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-amber-900/80">
                Deduct 30% of your total solar system cost from your federal
                income taxes. Available for residential and commercial systems
                installed through 2032. No cap on the credit amount.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                State Tax Credits
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Hawaii offers a 35% state tax credit (up to $5,000), one of the
                most generous in the nation. Other states offer property tax
                exemptions that keep your taxes from rising after installation.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Net Metering
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                California, Hawaii, and Idaho offer net metering programs that
                credit you for excess solar electricity sent back to the grid.
                Texas offers buyback programs through select retail electricity
                providers.
              </p>
            </div>
          </div>
        </section>

        {/* State Grid */}
        <StateGrid basePath="/solar-incentives" />

        {/* FAQ Section */}
        <FAQSection faqs={incentiveFAQs} />

        {/* CTA */}
        <InlineQuoteCTA />
      </div>
    </>
  );
}
