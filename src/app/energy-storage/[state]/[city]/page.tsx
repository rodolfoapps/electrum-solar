import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/data/states';
import { generatePageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { SidebarQuoteCTA } from '@/components/cta/SidebarQuoteCTA';
import { getAllCitiesForState, getCityNameFromSlug } from '@/lib/companies';
import { batterySystems } from '@/data/energy-storage';
import { slugify, formatCurrency, SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  const allParams: { state: string; city: string }[] = [];
  for (const stateSlug of getAllStateSlugs()) {
    const cities = getAllCitiesForState(stateSlug);
    for (const [, citySlug] of cities.entries()) {
      allParams.push({ state: stateSlug, city: citySlug });
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) return {};
  return generatePageMetadata({
    title: `Home Battery Storage in ${cityName}, ${stateData.abbreviation} (2026)`,
    description: `Compare the best home battery storage systems in ${cityName}, ${stateData.abbreviation}. Tesla Powerwall, Enphase, Franklin WH, and more. See prices, specs, warranties, and how batteries pair with solar in ${cityName}.`,
    path: `/energy-storage/${stateSlug}/${citySlug}/`,
    keywords: [
      `battery storage ${cityName} ${stateData.abbreviation}`,
      `home battery ${cityName}`,
      `Tesla Powerwall ${cityName} ${stateData.abbreviation}`,
      `solar battery ${cityName}`,
      `energy storage ${cityName} ${stateData.name}`,
    ],
  });
}

export default async function EnergyStorageCityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Energy Storage', href: '/energy-storage/' },
    { label: stateData.name, href: `/energy-storage/${stateSlug}/` },
    { label: cityName },
  ];

  // Determine backup power messaging based on state
  const getBackupPowerMessage = () => {
    switch (stateData.slug) {
      case 'texas':
        return `In ${cityName}, severe storms and extreme weather events can cause extended power outages. A home battery keeps your essential systems running when the Texas grid is under stress.`;
      case 'hawaii':
        return `${cityName}'s island grid can be vulnerable to tropical storms, hurricanes, and natural events. Battery backup ensures your home stays powered when the grid goes down.`;
      case 'california':
        return `${cityName} residents face Public Safety Power Shutoffs (PSPS) during high wildfire risk periods. A home battery keeps your lights on and your family safe during planned and unplanned outages.`;
      case 'idaho':
        return `${cityName} can experience harsh winter storms that knock out power for hours or even days. A battery backup system ensures your home stays warm and your essential appliances keep running.`;
      default:
        return `A home battery gives ${cityName} homeowners peace of mind with reliable backup power during outages, keeping essential systems like refrigeration, lighting, and medical equipment running.`;
    }
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Energy Storage', url: `${SITE_URL}/energy-storage/` },
          { name: stateData.name, url: `${SITE_URL}/energy-storage/${stateSlug}/` },
          { name: cityName, url: `${SITE_URL}/energy-storage/${stateSlug}/${citySlug}/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Home Battery Storage in {cityName}, {stateData.abbreviation} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Home battery storage systems give {cityName}, {stateData.abbreviation} homeowners the ability
              to store excess solar energy for use during evenings, outages, and peak-rate hours. By pairing
              a battery with your solar panels, you can maximize self-consumption, reduce grid dependence,
              and enjoy whole-home backup power when you need it most.
              {stateData.electricityRate >= 0.20
                ? ` With electricity rates in ${stateData.name} averaging ${(stateData.electricityRate * 100).toFixed(1)} cents/kWh, ${cityName} residents benefit significantly from time-of-use rate arbitrage with battery storage.`
                : stateData.netMetering
                  ? ` Combined with ${stateData.name}'s net metering program, a battery helps ${cityName} homeowners optimize when they use vs. export their solar energy.`
                  : ` In ${stateData.name}, where net metering options are limited, a battery helps ${cityName} homeowners maximize the value of every kilowatt-hour their solar panels produce.`}
            </p>

            {/* Battery Comparison Grid */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Top Battery Systems for {cityName} Homes
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {batterySystems.map((battery) => (
                  <div
                    key={battery.slug}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
                      <p className="text-xs font-medium text-amber-400 uppercase tracking-wide">
                        {battery.manufacturer}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">{battery.name}</h3>
                    </div>

                    {/* Specs */}
                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-gray-50 p-3 text-center">
                          <p className="text-xs font-medium text-gray-500">Capacity</p>
                          <p className="mt-1 text-lg font-bold text-gray-900">{battery.capacity} kWh</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-3 text-center">
                          <p className="text-xs font-medium text-gray-500">Power</p>
                          <p className="mt-1 text-lg font-bold text-gray-900">{battery.power} kW</p>
                        </div>
                        <div className="rounded-lg bg-amber-50 p-3 text-center">
                          <p className="text-xs font-medium text-amber-600">Cost Range</p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {formatCurrency(battery.costRange.min)} - {formatCurrency(battery.costRange.max)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-3 text-center">
                          <p className="text-xs font-medium text-gray-500">Warranty</p>
                          <p className="mt-1 text-lg font-bold text-gray-900">{battery.warranty}</p>
                        </div>
                      </div>

                      {/* Chemistry & Efficiency */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {battery.chemistry}
                        </span>
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {battery.roundTripEfficiency}% efficiency
                        </span>
                      </div>

                      {/* Top 3 Features */}
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</p>
                        <ul className="space-y-1.5">
                          {battery.features.slice(0, 3).map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                              <svg
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Battery Storage Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Why Battery Storage in {cityName}?
              </h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {cityName} homeowners have compelling reasons to add battery storage to their solar systems:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Energy Independence */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Energy Independence</h3>
                    </div>
                    <p className="text-sm">
                      Store solar energy during the day and use it at night, reducing your reliance on the
                      grid and protecting your {cityName} home against electricity rate increases.
                    </p>
                  </div>

                  {/* Backup Power */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Backup Power</h3>
                    </div>
                    <p className="text-sm">
                      {getBackupPowerMessage()}
                    </p>
                  </div>

                  {/* Maximize Solar Savings */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Maximize Solar Savings</h3>
                    </div>
                    <p className="text-sm">
                      {stateData.electricityRate >= 0.20
                        ? `With ${stateData.name}'s high rates of ${(stateData.electricityRate * 100).toFixed(1)} cents/kWh, ${cityName} homeowners save significantly by using stored solar energy during peak hours instead of buying from the grid.`
                        : stateData.netMetering
                          ? `While ${stateData.name}'s net metering helps, a battery lets ${cityName} homeowners strategically use or export energy to maximize their financial return on solar.`
                          : `Without statewide net metering in ${stateData.name}, a battery helps ${cityName} homeowners use more of their own solar energy instead of buying expensive electricity from the grid.`}
                    </p>
                  </div>

                  {/* Incentives */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">State & Local Incentives</h3>
                    </div>
                    <p className="text-sm">
                      Battery storage systems may qualify for state and local incentives when paired with solar.
                      {cityName} homeowners should check available programs to reduce their battery investment costs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cost Summary Table */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Battery Storage Costs in {cityName}, {stateData.abbreviation}
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Home battery prices in {cityName} typically range from{' '}
                <strong className="text-gray-900">{formatCurrency(5500)} to {formatCurrency(18000)}</strong> before
                incentives, depending on the system capacity and brand. State programs and utility rebates may further
                reduce these costs.
              </p>
              <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Battery System</th>
                      <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Cost Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {batterySystems.map((battery, index) => (
                      <tr key={battery.slug} className={index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                        <td className="px-5 py-3 font-medium text-gray-900">{battery.name}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-gray-700">
                          {formatCurrency(battery.costRange.min)} - {formatCurrency(battery.costRange.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Inline CTA */}
            <InlineQuoteCTA />
          </div>

          {/* Sidebar */}
          <div className="mt-10 lg:mt-0">
            <SidebarQuoteCTA />
          </div>
        </div>
      </div>
    </>
  );
}
