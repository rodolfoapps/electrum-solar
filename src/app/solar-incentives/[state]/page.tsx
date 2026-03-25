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
import { getIncentivesByState } from '@/data/solar-incentives';
import { incentiveFAQs } from '@/data/faqs';
import { SITE_URL } from '@/lib/utils';

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
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};
  const incentiveData = getIncentivesByState(stateSlug);
  const incentiveCount = incentiveData?.incentives.length ?? 0;
  return generatePageMetadata({
    title: `Solar Incentives & Tax Credits in ${stateData.name} (2026)`,
    description: `Discover ${incentiveCount} solar incentives available in ${stateData.name}, including the 30% federal tax credit, state programs, rebates, and exemptions. Maximize your solar savings.`,
    path: `/solar-incentives/${stateSlug}/`,
    keywords: [`solar incentives ${stateData.name}`, `solar tax credit ${stateData.name}`, `${stateData.name} solar rebates`],
  });
}

export default async function SolarIncentivesStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const incentiveData = getIncentivesByState(stateSlug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Solar Incentives', href: '/solar-incentives/' },
    { label: stateData.name },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Incentives', url: `${SITE_URL}/solar-incentives/` },
          { name: stateData.name, url: `${SITE_URL}/solar-incentives/${stateSlug}/` },
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
      <JsonLd data={faqSchema(incentiveFAQs)} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Solar Incentives &amp; Tax Credits in {stateData.name} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {stateData.name} residents can take advantage of multiple solar incentives to reduce the cost of going
              solar. Between the 30% federal Investment Tax Credit and{' '}
              {incentiveData
                ? `${incentiveData.incentives.length - 1} additional state and local programs`
                : 'available state programs'}
              , homeowners can significantly lower their upfront investment and accelerate their payback period.
            </p>

            {/* Incentive Cards */}
            {incentiveData && incentiveData.incentives.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Incentives in {stateData.name}
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
                  Net Metering in {stateData.name}
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
                </div>
              </section>
            )}

            {/* RPS Target */}
            {incentiveData && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Renewable Portfolio Standard (RPS)
                </h2>
                <div className="mt-4 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
                  <p className="text-sm font-medium text-amber-800">
                    {stateData.name} RPS Target
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{incentiveData.rpsTarget}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    A strong renewable portfolio standard signals long-term government support for solar energy, which
                    often translates to continued incentives and favorable policies for homeowners.
                  </p>
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection
                title={`Solar Incentive FAQs for ${stateData.name}`}
                faqs={incentiveFAQs}
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
