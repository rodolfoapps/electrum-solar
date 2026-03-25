import { generatePageMetadata } from '@/lib/metadata';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StateGrid } from '@/components/sections/StateGrid';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';

export const metadata = generatePageMetadata({
  title: 'Electricity Rates by State (2026) | Compare Utility Costs',
  description:
    'Compare electricity rates across Idaho, California, Texas, and Hawaii. Understand how utility costs affect your solar savings and return on investment in 2026.',
  path: '/electricity-rates/',
  keywords: [
    'electricity rates',
    'electricity rates by state',
    'utility costs',
    'electricity prices',
    'average electricity rate',
    'solar ROI electricity rates',
  ],
});

export default function ElectricityRatesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Electricity Rates by State (2026)',
          '/electricity-rates/',
          'Compare electricity rates across Idaho, California, Texas, and Hawaii. Understand how utility costs affect your solar savings and ROI.'
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Electricity Rates', url: `${SITE_URL}/electricity-rates/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Electricity Rates' },
          ]}
        />

        {/* Hero / Intro */}
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Electricity Rates by State
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Your local electricity rate is one of the biggest factors in
            determining your solar savings and payback period. States with
            higher utility costs — like Hawaii at{' '}
            <strong>$0.39/kWh</strong> and California at{' '}
            <strong>$0.28/kWh</strong> — see the fastest solar ROI, while
            states like Idaho (<strong>$0.10/kWh</strong>) still benefit thanks
            to state incentives and rising utility prices. Explore the rates
            and solar potential for each of our focus states below.
          </p>
        </section>

        {/* Rate Comparison */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Electricity Rates Affect Solar ROI
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 pr-6 font-semibold text-gray-900">State</th>
                  <th className="pb-3 pr-6 font-semibold text-gray-900">Avg. Rate</th>
                  <th className="pb-3 pr-6 font-semibold text-gray-900">Payback Period</th>
                  <th className="pb-3 font-semibold text-gray-900">25-Year Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-6 font-medium text-gray-900">Hawaii</td>
                  <td className="py-3 pr-6 text-gray-600">$0.39/kWh</td>
                  <td className="py-3 pr-6 text-gray-600">5 years</td>
                  <td className="py-3 font-semibold text-amber-600">$65,000</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-gray-900">California</td>
                  <td className="py-3 pr-6 text-gray-600">$0.28/kWh</td>
                  <td className="py-3 pr-6 text-gray-600">5 years</td>
                  <td className="py-3 font-semibold text-amber-600">$50,000</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-gray-900">Texas</td>
                  <td className="py-3 pr-6 text-gray-600">$0.13/kWh</td>
                  <td className="py-3 pr-6 text-gray-600">6 years</td>
                  <td className="py-3 font-semibold text-amber-600">$38,000</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 font-medium text-gray-900">Idaho</td>
                  <td className="py-3 pr-6 text-gray-600">$0.10/kWh</td>
                  <td className="py-3 pr-6 text-gray-600">9 years</td>
                  <td className="py-3 font-semibold text-amber-600">$28,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Data reflects 2026 averages for a typical 6kW residential solar
            system. Savings estimates based on current rates and available incentives.
          </p>
        </section>

        {/* Why It Matters */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Electricity Rates Matter for Solar
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Higher Rates = Faster Payback
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Every kilowatt-hour your solar panels generate offsets
                electricity you would have purchased from the utility. The
                higher your rate, the more each kWh of solar production is
                worth and the faster your system pays for itself.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Rising Utility Costs
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Electricity rates have historically risen 2-3% per year. Going
                solar locks in your energy cost for 25+ years, protecting you
                from future rate hikes and increasing your total lifetime
                savings.
              </p>
            </div>
          </div>
        </section>

        {/* State Grid */}
        <StateGrid basePath="/electricity-rates" />

        {/* CTA */}
        <InlineQuoteCTA />
      </div>
    </>
  );
}
