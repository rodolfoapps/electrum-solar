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
import { getStateCostFAQs } from '@/data/faqs';
import { formatCurrency, SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};
  return generatePageMetadata({
    title: `Solar Panel Cost in ${stateData.name} (2026) | Prices & Savings`,
    description: `Average solar panel cost in ${stateData.name} is $${stateData.avgCostPerWatt.toFixed(2)}/watt. A 6kW system costs ~${formatCurrency(stateData.avgSystemCost)} before incentives. See full cost breakdown and savings.`,
    path: `/solar-panel-cost/${stateSlug}/`,
    keywords: [`solar panel cost ${stateData.name}`, `solar prices ${stateData.name}`, `${stateData.name} solar installation cost`],
  });
}

export default async function SolarPanelCostStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const faqs = getStateCostFAQs(
    stateData.name,
    stateData.avgCostPerWatt,
    stateData.avgSystemCost,
    stateData.avgSavings25Year,
    stateData.avgPaybackYears,
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Solar Panel Cost', href: '/solar-panel-cost/' },
    { label: stateData.name },
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
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={serviceSchema(stateData.name, 'solar')} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Solar Panel Cost in {stateData.name} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              The average solar panel installation in {stateData.name} costs{' '}
              <strong className="text-gray-900">${stateData.avgCostPerWatt.toFixed(2)} per watt</strong>, or about{' '}
              <strong className="text-gray-900">{formatCurrency(stateData.avgSystemCost)}</strong> for a typical 6kW
              residential system before state and local incentives. Over 25 years, homeowners in{' '}
              {stateData.name} can expect to save an estimated{' '}
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
                stateName={stateData.name}
                costPerWatt={stateData.avgCostPerWatt}
                systemCost={stateData.avgSystemCost}
                savings25Year={stateData.avgSavings25Year}
                paybackYears={stateData.avgPaybackYears}
              />
            </div>

            {/* Solar Savings Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Solar Savings in {stateData.name}
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {stateData.name} residents currently pay an average of{' '}
                <strong className="text-gray-900">${(stateData.electricityRate * 100).toFixed(1)} cents/kWh</strong> for
                electricity. {stateData.electricityRate > 0.16
                  ? `This is above the national average of 16 cents/kWh, making solar an especially attractive investment in ${stateData.name}.`
                  : stateData.electricityRate < 0.16
                    ? `While this is below the national average of 16 cents/kWh, ${stateData.name} homeowners still benefit from solar thanks to state incentives, net metering, and rising electricity costs.`
                    : `This matches the national average of 16 cents/kWh. Combined with available incentives, solar remains a strong investment in ${stateData.name}.`}
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {stateData.netMetering
                  ? `${stateData.name} offers net metering, which means you earn credits on your electricity bill for any excess solar energy you send back to the grid. This can significantly reduce or even eliminate your electricity bill.`
                  : `${stateData.name} does not have a statewide net metering mandate, but many utility providers offer buyback programs or credits for excess solar generation. Check with your local utility for available options.`}
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                With an average of <strong className="text-gray-900">{stateData.avgSunHours} peak sun hours</strong> per
                day, {stateData.name} receives{' '}
                {stateData.avgSunHours >= 5.5
                  ? 'excellent'
                  : stateData.avgSunHours >= 4.5
                    ? 'good'
                    : 'moderate'}{' '}
                solar irradiance, supporting strong energy production throughout the year.
              </p>
            </section>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection
                title={`Solar Cost FAQs for ${stateData.name}`}
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
