import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { StateGrid } from '@/components/sections/StateGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FAQSection } from '@/components/sections/FAQSection';
import { BottomBannerCTA } from '@/components/cta/BottomBannerCTA';
import { AnimatedStats } from '@/components/sections/AnimatedStats';
import { homepageFAQs } from '@/data/faqs';

export const metadata = generatePageMetadata({
  title: 'Electrum Solar — Compare Solar Costs & Installers in ID, CA, TX, HI',
  description:
    'Compare solar panel costs, find top-rated solar companies, and discover available incentives in Idaho, California, Texas, and Hawaii. Get free quotes from trusted installers.',
  path: '/',
  keywords: [
    'solar panel cost',
    'solar companies',
    'solar incentives',
    'solar installation',
    'Idaho solar',
    'California solar',
    'Texas solar',
    'Hawaii solar',
  ],
});

export default async function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homepageFAQs)} />

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Go Solar.{' '}
            <span className="text-amber-400">Save Thousands.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Compare solar costs, find top-rated installers, and unlock incentives
            in Idaho, California, Texas, and Hawaii.
          </p>

          <div className="mt-10">
            <Link
              href="/get-quote/"
              className="inline-flex items-center rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-600 active:bg-amber-700 sm:text-lg"
            >
              Get Your Free Quote
            </Link>
          </div>

          {/* Stats Row */}
          <AnimatedStats />
        </div>
      </section>

      {/* Page Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TrustSignals />
        <StateGrid basePath="/solar-panel-cost" />
        <HowItWorks />
        <FAQSection faqs={homepageFAQs} />
      </div>

      <BottomBannerCTA />
    </>
  );
}
