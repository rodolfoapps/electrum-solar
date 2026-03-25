import { generatePageMetadata } from '@/lib/metadata';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import { SITE_URL, formatCurrency } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StateGrid } from '@/components/sections/StateGrid';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { batterySystems } from '@/data/energy-storage';

export const metadata = generatePageMetadata({
  title: 'Home Battery Storage Options (2026) | Compare Systems',
  description:
    'Compare home battery storage systems including Tesla Powerwall, Enphase IQ Battery, Franklin WH, and more. See capacity, pricing, warranties, and find the best battery for your solar system.',
  path: '/energy-storage/',
  keywords: [
    'home battery storage',
    'solar battery',
    'Tesla Powerwall',
    'Enphase battery',
    'battery storage systems',
    'solar energy storage',
    'backup battery',
  ],
});

export default function EnergyStoragePage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Home Battery Storage Options (2026)',
          '/energy-storage/',
          'Compare home battery storage systems including Tesla Powerwall, Enphase IQ Battery, Franklin WH, and more. Capacity, pricing, and warranty details.'
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Energy Storage', url: `${SITE_URL}/energy-storage/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Energy Storage' },
          ]}
        />

        {/* Hero / Intro */}
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Home Battery Storage
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Pairing solar panels with a home battery lets you store excess
            energy for use at night, during outages, or when electricity rates
            peak. Battery storage maximizes your solar investment by reducing
            grid dependence and providing backup power when you need it most.
            Compare the top residential battery systems for 2026 below.
          </p>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Add Battery Storage?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Backup Power
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Keep your lights on, refrigerator running, and essential
                devices charged during grid outages. A fully charged battery
                can power critical loads for 8-12+ hours.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Energy Independence
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Reduce your reliance on the utility grid by storing daytime
                solar production for evening use. In Hawaii and California,
                this is especially valuable due to time-of-use rate structures.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Maximize Savings
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                In states without full net metering, batteries let you use
                more of your own solar energy instead of selling it back at
                lower buyback rates, increasing your overall savings.
              </p>
            </div>
          </div>
        </section>

        {/* Battery Comparison Grid */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Compare Battery Systems
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {batterySystems.map((battery) => (
              <div
                key={battery.slug}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {battery.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {battery.manufacturer}
                </p>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Capacity</dt>
                    <dd className="font-medium text-gray-900">
                      {battery.capacity} kWh
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Power Output</dt>
                    <dd className="font-medium text-gray-900">
                      {battery.power} kW
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Cost Range</dt>
                    <dd className="font-medium text-gray-900">
                      {formatCurrency(battery.costRange.min)} &ndash;{' '}
                      {formatCurrency(battery.costRange.max)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Warranty</dt>
                    <dd className="font-medium text-gray-900">
                      {battery.warranty}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Efficiency</dt>
                    <dd className="font-medium text-gray-900">
                      {battery.roundTripEfficiency}%
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {battery.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* State Grid */}
        <StateGrid basePath="/energy-storage" />

        {/* CTA */}
        <InlineQuoteCTA />
      </div>
    </>
  );
}
