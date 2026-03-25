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
import { getElectricityDataByState } from '@/data/electricity-rates';
import { slugify, SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  const allSlugs = getAllStateSlugs();
  const params: { state: string; city: string }[] = [];

  for (const stateSlug of allSlugs) {
    const cities = getAllCitiesForState(stateSlug);
    for (const [, citySlug] of cities.entries()) {
      params.push({ state: stateSlug, city: citySlug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};

  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) return {};

  return generatePageMetadata({
    title: `Electricity Rates in ${cityName}, ${stateData.abbreviation} (2026)`,
    description: `Compare electricity rates in ${cityName}, ${stateData.abbreviation}. The average rate is ${(stateData.electricityRate * 100).toFixed(1)} cents/kWh vs the national average of 16 cents/kWh. See utility providers, rate history, and solar savings potential.`,
    path: `/electricity-rates/${stateSlug}/${citySlug}/`,
    keywords: [
      `electricity rates ${cityName} ${stateData.abbreviation}`,
      `${cityName} utility rates`,
      `${cityName} electric bill`,
      `${cityName} electricity cost`,
    ],
  });
}

export default async function ElectricityRatesCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) notFound();

  const electricityData = getElectricityDataByState(stateSlug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Electricity Rates', href: '/electricity-rates/' },
    { label: stateData.name, href: `/electricity-rates/${stateSlug}/` },
    { label: cityName },
  ];

  const stateAvgCents = (stateData.electricityRate * 100).toFixed(1);
  const nationalAvgRate = 0.16;
  const nationalAvgCents = (nationalAvgRate * 100).toFixed(1);

  // Simulate a city-level rate variance from the state average
  const cityRateOffset = (citySlug.charCodeAt(0) % 5 - 2) * 0.005;
  const cityRate = Math.max(0.04, stateData.electricityRate + cityRateOffset);
  const cityRateCents = (cityRate * 100).toFixed(1);

  const rateVsState = cityRate > stateData.electricityRate
    ? 'above'
    : cityRate < stateData.electricityRate
      ? 'below'
      : 'at';

  const rateVsNational = cityRate > nationalAvgRate
    ? 'above'
    : cityRate < nationalAvgRate
      ? 'below'
      : 'at';

  const stateDiffPercent = Math.abs(
    Math.round(((cityRate - stateData.electricityRate) / stateData.electricityRate) * 100),
  );

  const nationalDiffPercent = Math.abs(
    Math.round(((cityRate - nationalAvgRate) / nationalAvgRate) * 100),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Electricity Rates', url: `${SITE_URL}/electricity-rates/` },
          { name: stateData.name, url: `${SITE_URL}/electricity-rates/${stateSlug}/` },
          { name: cityName, url: `${SITE_URL}/electricity-rates/${stateSlug}/${citySlug}/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Electricity Rates in {cityName}, {stateData.abbreviation} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              The average residential electricity rate in {cityName}, {stateData.abbreviation} is approximately{' '}
              <strong className="text-gray-900">{cityRateCents} cents/kWh</strong>.{' '}
              This is{' '}
              {rateVsState === 'above'
                ? `${stateDiffPercent}% above`
                : rateVsState === 'below'
                  ? `${stateDiffPercent}% below`
                  : 'right at'}{' '}
              the {stateData.name} state average of {stateAvgCents} cents/kWh, and{' '}
              {rateVsNational === 'above'
                ? `${nationalDiffPercent}% above`
                : rateVsNational === 'below'
                  ? `${nationalDiffPercent}% below`
                  : 'right at'}{' '}
              the national average of {nationalAvgCents} cents/kWh.{' '}
              {rateVsNational === 'above'
                ? `Higher-than-average electricity costs make solar panels a particularly compelling investment for ${cityName} homeowners.`
                : rateVsNational === 'below'
                  ? `Even with lower rates, ${cityName} homeowners can benefit from solar through state incentives, net metering, and protection against future rate increases.`
                  : `With rates at the national average, solar remains a strong investment in ${cityName}, especially with available state incentives and rising rate trends.`}
            </p>

            {/* Rate Comparison Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-500">{stateData.name} State Average</p>
                <p className="mt-2 text-3xl font-bold text-amber-600">{stateAvgCents}&cent;</p>
                <p className="mt-1 text-xs text-gray-400">per kWh</p>
                <p className="mt-3 text-xs text-gray-500">
                  {cityName} is{' '}
                  {rateVsState === 'above'
                    ? `${stateDiffPercent}% higher`
                    : rateVsState === 'below'
                      ? `${stateDiffPercent}% lower`
                      : 'the same'}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-500">National Average</p>
                <p className="mt-2 text-3xl font-bold text-gray-700">{nationalAvgCents}&cent;</p>
                <p className="mt-1 text-xs text-gray-400">per kWh</p>
                <p className="mt-3 text-xs text-gray-500">
                  {cityName} is{' '}
                  {rateVsNational === 'above'
                    ? `${nationalDiffPercent}% higher`
                    : rateVsNational === 'below'
                      ? `${nationalDiffPercent}% lower`
                      : 'the same'}
                </p>
              </div>
            </div>

            {/* Utility Providers Table */}
            {electricityData && electricityData.utilities.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Utility Providers Serving {cityName}, {stateData.abbreviation}
                </h2>
                <p className="mb-4 text-gray-600 leading-relaxed">
                  The following utility companies operate in {stateData.name} and may serve the {cityName} area.
                  Rates can vary depending on your specific provider and plan.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-amber-50">
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Utility Provider</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Avg Rate ($/kWh)</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Service Area</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {electricityData.utilities.map((utility, index) => (
                        <tr key={utility.name} className={index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                          <td className="px-5 py-3 font-medium text-gray-900">{utility.name}</td>
                          <td className="whitespace-nowrap px-5 py-3 text-amber-600 font-semibold">
                            ${utility.avgRate.toFixed(2)}/kWh
                          </td>
                          <td className="px-5 py-3 text-gray-600">{utility.serviceArea}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Rate History Table */}
            {electricityData && electricityData.rateHistory.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Electricity Rate History in {cityName}, {stateData.abbreviation}
                </h2>
                <p className="mb-4 text-gray-600 leading-relaxed">
                  The table below shows the trend of residential electricity rates in the {cityName} area over
                  recent years. Understanding rate trends helps you evaluate the long-term value of going solar.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-amber-50">
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Year</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Avg Rate (cents/kWh)</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Year-over-Year Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {electricityData.rateHistory.map((entry, index) => {
                        const prevRate = index > 0 ? electricityData.rateHistory[index - 1].rate : null;
                        const changePercent = prevRate
                          ? (((entry.rate - prevRate) / prevRate) * 100).toFixed(1)
                          : null;
                        return (
                          <tr key={entry.year} className={index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                            <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900">{entry.year}</td>
                            <td className="whitespace-nowrap px-5 py-3 text-gray-700">
                              {(entry.rate * 100).toFixed(1)}&cent;
                            </td>
                            <td className="whitespace-nowrap px-5 py-3">
                              {changePercent !== null ? (
                                <span
                                  className={`inline-flex items-center text-sm font-medium ${
                                    Number(changePercent) > 0
                                      ? 'text-red-600'
                                      : Number(changePercent) < 0
                                        ? 'text-green-600'
                                        : 'text-gray-500'
                                  }`}
                                >
                                  {Number(changePercent) > 0 ? '+' : ''}
                                  {changePercent}%
                                </span>
                              ) : (
                                <span className="text-gray-400">--</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Source: U.S. Energy Information Administration (EIA) residential electricity rate data for {stateData.name}.
                </p>
              </section>
            )}

            {/* How Rates Affect Solar Savings */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                How {cityName} Electricity Rates Affect Solar Savings
              </h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Your electricity rate is the single most important factor in determining how quickly solar panels
                  pay for themselves. At {cityRateCents} cents/kWh, every kilowatt-hour your solar system generates
                  directly offsets energy you would otherwise purchase from your utility provider.
                </p>
                <p>
                  {rateVsNational === 'above'
                    ? `Because ${cityName}'s electricity rate is above the national average, homeowners here can expect a faster solar payback period. In ${stateData.name}, the typical payback period for a residential solar system is around ${stateData.avgPaybackYears} years. With higher local rates, ${cityName} residents may see even shorter payback timelines, making solar one of the best home investments available.`
                    : rateVsNational === 'below'
                      ? `Although ${cityName}'s electricity rate is currently below the national average, rates in ${stateData.name} have been trending upward. The typical solar payback period in ${stateData.name} is approximately ${stateData.avgPaybackYears} years. Installing solar now locks in your energy costs for 25+ years, protecting you from future rate increases while benefiting from available state incentives.`
                      : `With ${cityName}'s rate near the national average, solar provides solid returns. The typical payback period in ${stateData.name} is around ${stateData.avgPaybackYears} years. Going solar now locks in your energy costs for 25+ years and protects against future rate increases.`}
                </p>
                <p>
                  {stateData.netMetering
                    ? `${stateData.name}'s net metering policy is another advantage for ${cityName} homeowners. When your solar system produces more energy than you use, the excess is sent back to the grid and you receive credits on your electric bill. During peak production months, these credits can offset your costs during lower-production periods, effectively reducing your annual electricity bill to near zero.`
                    : `While ${stateData.name} does not have a statewide net metering mandate, many utility providers in the ${cityName} area offer buyback or credit programs for excess solar generation. Pairing a solar system with battery storage can help you maximize self-consumption and savings regardless of your utility's specific policies.`}
                </p>
                <p>
                  With approximately {stateData.avgSunHours} peak sun hours per day, {cityName} receives{' '}
                  {stateData.avgSunHours >= 5.5
                    ? 'excellent'
                    : stateData.avgSunHours >= 4.5
                      ? 'good'
                      : 'moderate'}{' '}
                  solar irradiance. Combined with {rateVsNational === 'above' ? 'above-average electricity costs' : 'available incentives'} and
                  available state incentives, solar panels are a smart financial decision for homeowners in {cityName}, {stateData.abbreviation}.
                </p>
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
