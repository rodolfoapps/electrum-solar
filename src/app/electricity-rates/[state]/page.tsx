import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/data/states';
import { generatePageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { SidebarQuoteCTA } from '@/components/cta/SidebarQuoteCTA';
import { getElectricityDataByState } from '@/data/electricity-rates';
import { formatCurrency, SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};
  return generatePageMetadata({
    title: `Electricity Rates in ${stateData.name} (2026) | Utility Comparison`,
    description: `Average electricity rate in ${stateData.name} is ${(stateData.electricityRate * 100).toFixed(1)} cents/kWh vs the national average of 16 cents/kWh. Compare utility rates and see how solar can lower your bill.`,
    path: `/electricity-rates/${stateSlug}/`,
    keywords: [`electricity rates ${stateData.name}`, `${stateData.name} utility rates`, `${stateData.name} electric bill`],
  });
}

export default async function ElectricityRatesStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const electricityData = getElectricityDataByState(stateSlug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Electricity Rates', href: '/electricity-rates/' },
    { label: stateData.name },
  ];

  const stateAvgCents = (stateData.electricityRate * 100).toFixed(1);
  const nationalAvgCents = electricityData ? (electricityData.nationalAvgRate * 100).toFixed(1) : '16.0';
  const rateComparison = stateData.electricityRate > 0.16
    ? 'above'
    : stateData.electricityRate < 0.16
      ? 'below'
      : 'at';
  const rateDiffPercent = Math.abs(
    Math.round(((stateData.electricityRate - 0.16) / 0.16) * 100),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Electricity Rates', url: `${SITE_URL}/electricity-rates/` },
          { name: stateData.name, url: `${SITE_URL}/electricity-rates/${stateSlug}/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Electricity Rates in {stateData.name} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              The average residential electricity rate in {stateData.name} is{' '}
              <strong className="text-gray-900">{stateAvgCents} cents/kWh</strong>, which is{' '}
              {rateComparison === 'above'
                ? `${rateDiffPercent}% above`
                : rateComparison === 'below'
                  ? `${rateDiffPercent}% below`
                  : 'right at'}{' '}
              the national average of {nationalAvgCents} cents/kWh.{' '}
              {rateComparison === 'above'
                ? `Higher electricity costs make solar panels an especially smart investment in ${stateData.name}, as the savings are more significant.`
                : rateComparison === 'below'
                  ? `Even with lower rates, ${stateData.name} homeowners benefit from solar through state incentives, rising rate trends, and energy independence.`
                  : `Solar remains a strong investment in ${stateData.name}, especially with available state incentives and rising rate trends.`}
            </p>

            {/* Rate Comparison Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-500">{stateData.name} Average</p>
                <p className="mt-2 text-3xl font-bold text-amber-600">{stateAvgCents}&cent;</p>
                <p className="mt-1 text-xs text-gray-400">per kWh</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-500">National Average</p>
                <p className="mt-2 text-3xl font-bold text-gray-700">{nationalAvgCents}&cent;</p>
                <p className="mt-1 text-xs text-gray-400">per kWh</p>
              </div>
            </div>

            {/* Utility Comparison Table */}
            {electricityData && electricityData.utilities.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Utility Companies in {stateData.name}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Utility Provider</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Avg Rate</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Service Area</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {electricityData.utilities.map((utility, index) => (
                        <tr key={utility.name} className={index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                          <td className="px-5 py-3 font-medium text-gray-900">{utility.name}</td>
                          <td className="whitespace-nowrap px-5 py-3 text-amber-600 font-semibold">
                            {(utility.avgRate * 100).toFixed(1)}&cent;/kWh
                          </td>
                          <td className="px-5 py-3 text-gray-600">{utility.serviceArea}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Rate History */}
            {electricityData && electricityData.rateHistory.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Electricity Rate History in {stateData.name}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Year</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Avg Rate (cents/kWh)</th>
                        <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Change</th>
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
                                  className={`inline-flex items-center text-sm font-medium ${Number(changePercent) > 0 ? 'text-red-600' : Number(changePercent) < 0 ? 'text-green-600' : 'text-gray-500'}`}
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
                  Source: U.S. Energy Information Administration (EIA) residential electricity rate data.
                </p>
              </section>
            )}

            {/* How High Rates Benefit Solar */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                How Electricity Rates Affect Solar Savings in {stateData.name}
              </h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Your electricity rate directly determines how much you save with solar panels. Every kilowatt-hour
                  your solar system produces offsets energy you would otherwise buy from the grid at {stateAvgCents} cents/kWh.
                </p>
                <p>
                  {rateComparison === 'above'
                    ? `With ${stateData.name}'s above-average rates, solar panels provide exceptional value. Homeowners typically see faster payback periods and higher lifetime savings compared to states with lower electricity costs. A typical 6kW system in ${stateData.name} can save you ${formatCurrency(stateData.avgSavings25Year)} over 25 years.`
                    : rateComparison === 'below'
                      ? `While ${stateData.name} enjoys below-average electricity rates today, rates have been trending upward. Solar panels lock in your energy costs for 25+ years, protecting you from future rate increases. With available state incentives and net metering programs, the economics still strongly favor going solar.`
                      : `At the national average, ${stateData.name}'s rates make solar a solid investment. With rates trending upward nationally, going solar now locks in your energy costs and protects against future increases.`}
                </p>
                <p>
                  {stateData.netMetering
                    ? `${stateData.name}'s net metering policy allows you to earn credits for excess solar energy sent to the grid, further enhancing your savings. This is especially valuable during summer months when your system produces more than you consume.`
                    : `While ${stateData.name} doesn't have mandatory statewide net metering, many utilities offer buyback programs. Pairing solar with battery storage can help you maximize self-consumption and savings.`}
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
