import { generatePageMetadata } from '@/lib/metadata';
import { collectionPageSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StateGrid } from '@/components/sections/StateGrid';
import { FAQSection } from '@/components/sections/FAQSection';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { costFAQs } from '@/data/faqs';

export const metadata = generatePageMetadata({
  title: 'Solar Panel Cost by State (2026) | Compare Prices',
  description:
    'Compare solar panel costs across Idaho, California, Texas, and Hawaii. See average prices per watt, system costs, payback periods, and available incentives for 2026.',
  path: '/solar-panel-cost/',
  keywords: [
    'solar panel cost',
    'solar panel prices',
    'cost of solar panels',
    'solar installation cost',
    'solar panel cost by state',
    'how much do solar panels cost',
  ],
});

export default function SolarPanelCostPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Solar Panel Cost by State (2026)',
          '/solar-panel-cost/',
          'Compare solar panel costs across Idaho, California, Texas, and Hawaii. Average prices per watt, system costs, and payback periods for 2026.'
        )}
      />
      <JsonLd data={faqSchema(costFAQs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Panel Cost', url: `${SITE_URL}/solar-panel-cost/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Solar Panel Cost' },
          ]}
        />

        {/* Hero / Intro */}
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Solar Panel Cost by State
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            The cost of solar panels varies significantly depending on where you
            live. In 2026, residential solar systems range from{' '}
            <strong>$2.60 to $3.35 per watt</strong> across our focus states —
            Idaho, California, Texas, and Hawaii. Factors like local labor
            costs, permitting fees, equipment choices, and available incentives
            all influence your final price. Below, you can explore detailed
            pricing for each state and see how much you could save by going
            solar.
          </p>
        </section>

        {/* State Grid */}
        <StateGrid basePath="/solar-panel-cost" />

        {/* Value Proposition */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Solar Costs in 2026
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                State Incentives
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                State tax credits, property tax exemptions, and utility rebates
                can reduce your system cost by thousands of dollars. Check your
                state&apos;s available programs to maximize savings.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Dropping Prices
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Solar panel costs have dropped over 70% in the last decade.
                Today, going solar is more affordable than ever with average
                payback periods of just 5 to 9 years.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                25-Year Savings
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Homeowners in our focus states can save between $28,000 and
                $65,000 over 25 years, depending on local electricity rates and
                available state incentives.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={costFAQs} />

        {/* CTA */}
        <InlineQuoteCTA />
      </div>
    </>
  );
}
