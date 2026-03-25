import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStateBySlug, getAllStateSlugs } from '@/data/states';
import { generatePageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CompanyList } from '@/components/sections/CompanyList';
import { InlineQuoteCTA } from '@/components/cta/InlineQuoteCTA';
import { SidebarQuoteCTA } from '@/components/cta/SidebarQuoteCTA';
import { getCompaniesByState, getCompanyCountByState } from '@/lib/companies';
import { SITE_URL } from '@/lib/utils';

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return {};
  const companyCount = getCompanyCountByState(stateSlug);
  return generatePageMetadata({
    title: `Top Solar Companies in ${stateData.name} (2026) | Rated & Reviewed`,
    description: `Compare ${companyCount > 0 ? companyCount : 'top'} solar companies in ${stateData.name}. Read reviews, check ratings, certifications, and get free quotes from trusted local installers.`,
    path: `/solar-companies/${stateSlug}/`,
    keywords: [`solar companies ${stateData.name}`, `solar installers ${stateData.name}`, `best solar company ${stateData.name}`],
  });
}

export default async function SolarCompaniesStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const companies = getCompaniesByState(stateSlug);
  const companyCount = companies.length;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Solar Companies', href: '/solar-companies/' },
    { label: stateData.name },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solar Companies', url: `${SITE_URL}/solar-companies/` },
          { name: stateData.name, url: `${SITE_URL}/solar-companies/${stateSlug}/` },
        ])}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Top Solar Companies in {stateData.name} (2026)
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {companyCount > 0
                ? `We've identified ${companyCount} solar companies serving ${stateData.name}. Browse ratings, reviews, certifications, and service areas to find the right installer for your home. All companies listed are rated and reviewed by real customers.`
                : `Find the best solar installers in ${stateData.name}. We're currently compiling company data for this state. In the meantime, get a free quote to connect with top-rated local installers.`}
            </p>

            {/* Stats Bar */}
            {companyCount > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {companyCount} Companies Found
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Verified Ratings
                </div>
              </div>
            )}

            {/* What to Look For */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">
                What to Look for in a {stateData.name} Solar Company
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  { title: 'Licensing & Insurance', desc: `Verify the company holds a valid ${stateData.name} contractor license and carries liability insurance and workers' compensation.` },
                  { title: 'NABCEP Certification', desc: 'Look for installers with North American Board of Certified Energy Practitioners (NABCEP) certification, the gold standard in the solar industry.' },
                  { title: 'Reviews & Track Record', desc: 'Check customer reviews across multiple platforms. Companies with 4+ star ratings and 50+ reviews tend to deliver consistent quality.' },
                  { title: 'Warranty Coverage', desc: 'Top companies offer 25-year panel warranties, 10-12 year inverter warranties, and workmanship guarantees of 10+ years.' },
                  { title: 'Transparent Pricing', desc: 'Get detailed, itemized quotes. Be wary of companies that won\'t provide written estimates or pressure you into quick decisions.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <svg className="mt-1 h-5 w-5 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-0.5 text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Company List */}
            <CompanyList
              companies={companies}
              title={`Solar Companies in ${stateData.name}`}
            />

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
