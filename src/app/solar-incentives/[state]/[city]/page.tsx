import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/data/states';
import { generatePageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, governmentServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQSection } from '@/components/sections/FAQSection';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { SidebarQuoteCTA } from '@/components/cta/SidebarQuoteCTA';
import { getAllCitiesForState, getCityNameFromSlug } from '@/lib/companies';
import { getIncentivesByState } from '@/data/solar-incentives';
import { slugify, SITE_URL } from '@/lib/utils';

const typeBadgeColors: Record<string, string> = {
  tax_credit: 'bg-green-100 text-green-700',
  rebate: 'bg-blue-100 text-blue-700',
  exemption: 'bg-purple-100 text-purple-700',
  program: 'bg-amber-100 text-amber-700',
};

const typeLabels: Record<string, string> = {
  tax_credit: 'Tax Credit',
  rebate: 'Rebate',
  exemption: 'Exemption',
  program: 'Program',
};

export async function generateStaticParams() {
  const allParams: { state: string; city: string }[] = [];
  for (const stateSlug of getAllStateSlugs()) {
    const cities = getAllCitiesForState(stateSlug);
    for (const [, citySlug] of cities) {
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

  const incentiveData = getIncentivesByState(stateSlug);
  const incentiveCount = incentiveData?.incentives.length ?? 0;

  return generatePageMetadata({
    title: `Solar Incentives in ${cityName}, ${stateData.abbreviation} (2026)`,
    description: `Explore ${incentiveCount} solar incentives available in ${cityName}, ${stateData.abbreviation}, including the 30% federal ITC and ${stateData.name} state programs, rebates, and tax exemptions. Maximize your savings.`,
    path: `/solar-incentives/${stateSlug}/${citySlug}/`,
    keywords: [
      `solar incentives ${cityName} ${stateData.abbreviation}`,
      `solar tax credit ${cityName}`,
      `${cityName} solar rebates`,
      `${stateData.name} solar incentives`,
    ],
  });
}

function getCityIncentiveFAQs(cityName: string, stateAbbrev: string, stateName: string, netMetering: boolean) {
  return [
    {
      question: `What solar incentives are available in ${cityName}, ${stateAbbrev}?`,
      answer: `Homeowners in ${cityName}, ${stateAbbrev} can take advantage of the 30% federal Investment Tax Credit (ITC), ${stateName} state incentives, property tax exemptions, and local utility rebates. These programs can reduce the total cost of a solar installation by 30-50%.`,
    },
    {
      question: `How do I claim the federal solar tax credit in ${cityName}?`,
      answer: `To claim the 30% federal ITC, file IRS Form 5695 with your federal tax return after your solar system is installed. You will need documentation of the total system cost and installation date. The credit applies dollar-for-dollar against your federal tax liability.`,
    },
    {
      question: `Does ${cityName} offer net metering for solar panels?`,
      answer: netMetering
        ? `Yes, ${cityName} residents benefit from ${stateName}'s net metering policy. You earn credits on your electricity bill for excess solar energy sent back to the grid, which can significantly reduce or eliminate your monthly electricity costs.`
        : `${stateName} does not have a statewide net metering mandate, but many utility providers in the ${cityName} area offer buyback programs or credits for excess solar generation. Contact your local utility to learn about available options.`,
    },
    {
      question: `Can I combine multiple solar incentives in ${cityName}, ${stateAbbrev}?`,
      answer: `Yes, solar incentives in ${cityName} are stackable. You can claim the 30% federal ITC alongside ${stateName} state incentives, property tax exemptions, and any local utility rebates. Combining these programs maximizes your total savings and shortens the payback period.`,
    },
  ];
}

export default async function SolarIncentivesCityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const cityName = getCityNameFromSlug(stateSlug, citySlug);
  if (!cityName) notFound();

  const incentiveData = getIncentivesByState(stateSlug);

  const faqs = getCityIncentiveFAQs(cityName, stateData.abbreviation, stateData.name, stateData.netMetering);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Solar Incentives', href: '/solar-incentives/' },
    { label: stateData.name, href: `/solar-incentives/${stateSlug}/` },
    { label: cityName },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Incentives', url: `${SITE_URL}/solar-incentives/` },
          { name: stateData.name, url: `${SITE_URL}/solar-incentives/${stateSlug}/` },
          { name: cityName, url: `${SITE_URL}/solar-incentives/${stateSlug}/${citySlug}/` },
        ])}
      />
      {incentiveData && incentiveData.incentives.map((incentive, i) => (
        <JsonLd
          key={i}
          data={governmentServiceSchema(
            { name: incentive.name, description: incentive.description, value: incentive.value },
            stateData.name,
          )}
        />
      ))}
      <JsonLd data={faqSchema(faqs)} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Solar Incentives &amp; Tax Credits in {cityName}, {stateData.abbreviation} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Homeowners in {cityName}, {stateData.abbreviation} have access to a variety of solar incentives that
              can dramatically reduce the cost of going solar. Between the{' '}
              <strong className="text-gray-900">30% federal Investment Tax Credit</strong> and{' '}
              {incentiveData
                ? `${incentiveData.incentives.length - 1} additional ${stateData.name} state and local programs`
                : `available ${stateData.name} state programs`}
              , residents can lower their upfront investment by thousands of dollars and shorten their payback
              period significantly.
            </p>

            {/* Incentive Cards */}
            {incentiveData && incentiveData.incentives.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Incentives for {cityName} Residents
                </h2>
                <div className="space-y-4">
                  {incentiveData.incentives.map((incentive, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{incentive.name}</h3>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeColors[incentive.type] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {typeLabels[incentive.type] || incentive.type}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{incentive.description}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-amber-50 px-4 py-3">
                          <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Value</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">{incentive.value}</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 px-4 py-3">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Eligibility</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">{incentive.eligibility}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Net Metering Details */}
            {incentiveData && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Net Metering in {cityName}, {stateData.abbreviation}
                </h2>
                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${stateData.netMetering ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                    >
                      {stateData.netMetering ? 'Available' : 'Limited / Varies by Utility'}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{incentiveData.netMeteringDetails}</p>
                  <p className="mt-3 text-sm text-gray-500">
                    {cityName} residents should contact their local utility provider to confirm specific net metering
                    terms and enrollment requirements in their service area.
                  </p>
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection
                title={`Solar Incentive FAQs for ${cityName}, ${stateData.abbreviation}`}
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
