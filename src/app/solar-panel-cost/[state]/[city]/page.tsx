import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/data/states';
import { generatePageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CostTable } from '@/components/sections/CostTable';
import { FAQSection } from '@/components/sections/FAQSection';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { SidebarQuoteCTA } from '@/components/cta/SidebarQuoteCTA';
import { getAllCitiesForState, getCityNameFromSlug } from '@/lib/companies';
import { formatCurrency, slugify, SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  for (const stateSlug of getAllStateSlugs()) {
    const cities = getAllCitiesForState(stateSlug);
    for (const [cityName] of cities.entries()) {
      params.push({ state: stateSlug, city: slugify(cityName) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!stateData || !cityName) return {};
  return generatePageMetadata({
    title: `Solar Panel Cost in ${cityName}, ${stateData.abbreviation} (2026) | Local Prices`,
    description: `How much do solar panels cost in ${cityName}, ${stateData.name}? Average cost is $${stateData.avgCostPerWatt.toFixed(2)}/watt. Get local pricing, savings estimates, and free quotes.`,
    path: `/solar-panel-cost/${stateSlug}/${citySlug}/`,
    keywords: [`solar panel cost ${cityName}`, `solar prices ${cityName} ${stateData.abbreviation}`, `${cityName} solar installation cost`],
  });
}

export default async function SolarPanelCostCityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!stateData || !cityName) notFound();

  const faqs = [
    {
      question: `How much do solar panels cost in ${cityName}?`,
      answer: `The average cost of solar panels in ${cityName}, ${stateData.abbreviation} is $${stateData.avgCostPerWatt.toFixed(2)} per watt, or approximately ${formatCurrency(stateData.avgSystemCost)} for a typical 6kW residential system before incentives. State and local programs can further reduce this cost.`,
    },
    {
      question: `What is the payback period for solar in ${cityName}?`,
      answer: `The average solar payback period in ${cityName}, ${stateData.name} is approximately ${stateData.avgPaybackYears} years. After the payback period, homeowners in ${cityName} enjoy free electricity for the remaining life of their panels, which typically last 25 to 30 years.`,
    },
    {
      question: `Are there solar incentives available in ${cityName}, ${stateData.name}?`,
      answer: `Yes, ${cityName} residents can take advantage of several state and local solar incentives.${stateData.netMetering ? ` ${stateData.name} offers net metering, allowing you to earn credits for excess solar energy sent back to the grid.` : ` While ${stateData.name} does not have statewide net metering, many local utilities offer buyback programs for excess generation.`}${stateData.srecAvailable ? ` Additionally, Solar Renewable Energy Credits (SRECs) are available in ${stateData.name}, providing extra income from your solar production.` : ''} Check with your local utility in ${cityName} for additional rebates and programs.`,
    },
    {
      question: `What size solar system do I need in ${cityName}?`,
      answer: `Most homes in ${cityName} need a 5-8kW solar system, depending on electricity usage, roof space, and sun exposure. ${stateData.name} averages ${stateData.avgSunHours} peak sun hours per day, which affects how many panels you need. A typical household uses about 10,000 kWh per year.`,
    },
    {
      question: `How much can I save with solar panels in ${cityName}, ${stateData.abbreviation}?`,
      answer: `Homeowners in ${cityName} can save an estimated ${formatCurrency(stateData.avgSavings25Year)} over 25 years by switching to solar. With average electricity rates of ${(stateData.electricityRate * 100).toFixed(1)} cents/kWh in ${stateData.name}, solar offers significant long-term savings compared to staying on grid power.`,
    },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Solar Panel Cost', href: '/solar-panel-cost/' },
    { label: stateData.name, href: `/solar-panel-cost/${stateSlug}/` },
    { label: cityName },
  ];

  const metrics = [
    { label: 'Cost per Watt', value: `$${stateData.avgCostPerWatt.toFixed(2)}` },
    { label: 'Avg System Cost', value: formatCurrency(stateData.avgSystemCost) },
    { label: 'Payback Period', value: `${stateData.avgPaybackYears} years` },
    { label: '25-Year Savings', value: formatCurrency(stateData.avgSavings25Year) },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Panel Cost', url: `${SITE_URL}/solar-panel-cost/` },
          { name: stateData.name, url: `${SITE_URL}/solar-panel-cost/${stateSlug}/` },
          { name: cityName, url: `${SITE_URL}/solar-panel-cost/${stateSlug}/${citySlug}/` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={serviceSchema(stateData.name, 'solar', cityName)} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Solar Panel Cost in {cityName}, {stateData.abbreviation} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              The average solar panel installation in {cityName}, {stateData.abbreviation} costs{' '}
              <strong className="text-gray-900">${stateData.avgCostPerWatt.toFixed(2)} per watt</strong>, or about{' '}
              <strong className="text-gray-900">{formatCurrency(stateData.avgSystemCost)}</strong> for a typical 6kW
              residential system before state and local incentives. Over 25
              years, going solar in {cityName} can save you an estimated{' '}
              <strong className="text-gray-900">{formatCurrency(stateData.avgSavings25Year)}</strong>, with a payback
              period of around <strong className="text-gray-900">{stateData.avgPaybackYears} years</strong>.
            </p>

            {/* Key Metrics Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-amber-600">{metric.value}</p>
                  <p className="mt-1 text-xs font-medium text-gray-500">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Cost Table */}
            <div className="mt-10">
              <CostTable
                stateName={`${cityName}, ${stateData.abbreviation}`}
                costPerWatt={stateData.avgCostPerWatt}
                systemCost={stateData.avgSystemCost}
                savings25Year={stateData.avgSavings25Year}
                paybackYears={stateData.avgPaybackYears}
              />
            </div>

            {/* Why Go Solar Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Why Go Solar in {cityName}?
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {cityName} residents currently pay an average of{' '}
                <strong className="text-gray-900">${(stateData.electricityRate * 100).toFixed(1)} cents/kWh</strong> for
                electricity.{' '}
                {stateData.electricityRate > 0.16
                  ? `This is above the national average of 16 cents/kWh, making solar an especially smart investment for homeowners in ${cityName}.`
                  : stateData.electricityRate < 0.16
                    ? `While this is below the national average of 16 cents/kWh, ${cityName} homeowners still benefit from solar thanks to state incentives, net metering, and rising electricity costs.`
                    : `This matches the national average of 16 cents/kWh. Combined with available incentives, solar remains a strong investment in ${cityName}.`}
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                With an average of <strong className="text-gray-900">{stateData.avgSunHours} peak sun hours</strong> per
                day, {cityName} receives{' '}
                {stateData.avgSunHours >= 5.5
                  ? 'excellent'
                  : stateData.avgSunHours >= 4.5
                    ? 'good'
                    : 'moderate'}{' '}
                solar irradiance, supporting strong energy production from your rooftop panels throughout the year.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {stateData.netMetering
                  ? `${stateData.name} offers net metering, which means ${cityName} homeowners earn credits on their electricity bill for any excess solar energy sent back to the grid. This can significantly reduce or even eliminate your monthly electricity bill.`
                  : `${stateData.name} does not have a statewide net metering mandate, but many utility providers serving ${cityName} offer buyback programs or credits for excess solar generation. Check with your local utility for available options.`}
              </p>
            </section>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection
                title={`Solar Cost FAQs for ${cityName}, ${stateData.abbreviation}`}
                faqs={faqs}
              />
            </div>

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
