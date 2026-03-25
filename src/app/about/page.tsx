import { generatePageMetadata } from '@/lib/metadata';
import { aboutPageSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_NAME } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'About Electrum Solar',
  description:
    'Learn about Electrum Solar\'s mission to help homeowners in Idaho, California, Texas, and Hawaii save money by going solar. Transparent pricing, trusted installers.',
  path: '/about/',
  keywords: [
    'about Electrum Solar',
    'solar energy company',
    'solar mission',
    'trusted solar installers',
  ],
});

export default async function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          About {SITE_NAME}
        </h1>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-gray-600">
          {/* Mission */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-3">
              At {SITE_NAME}, we believe every homeowner deserves access to clear,
              honest information about solar energy. Our mission is to simplify
              the process of going solar by providing transparent cost data,
              unbiased installer reviews, and up-to-date incentive information
              for homeowners in{' '}
              <strong>Idaho, California, Texas, and Hawaii</strong>.
            </p>
            <p className="mt-3">
              We are not a solar installer. Instead, we serve as an independent
              resource that connects homeowners with top-rated, pre-vetted solar
              companies in their area so they can make confident, informed
              decisions.
            </p>
          </section>

          {/* Why These States */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Why Idaho, California, Texas &amp; Hawaii?
            </h2>
            <p className="mt-3">
              These four states represent a diverse cross-section of the
              residential solar market. California leads the nation in solar
              adoption. Texas offers some of the lowest installation costs.
              Hawaii has the highest electricity rates, making solar savings
              dramatic. And Idaho is an emerging market where homeowners are just
              beginning to discover the benefits of clean energy.
            </p>
            <p className="mt-3">
              By focusing deeply on these four markets, we deliver
              hyper-relevant data instead of generic, one-size-fits-all advice.
            </p>
          </section>

          {/* Team Expertise */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Our Team &amp; Expertise
            </h2>
            <p className="mt-3">
              Our team combines experience in renewable energy, real estate, and
              consumer finance. We research local utility rates, track state and
              federal incentive programs, and vet solar installers so that the
              information you find on our site is accurate, current, and
              actionable.
            </p>
            <p className="mt-3">
              Every cost estimate, savings projection, and company profile on
              {' '}{SITE_NAME} is grounded in publicly available data and
              regularly updated to reflect market conditions.
            </p>
          </section>

          {/* Commitment to Transparency */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Commitment to Transparency
            </h2>
            <p className="mt-3">
              We earn revenue when homeowners request quotes through our
              platform, but that never influences the information we publish. We
              do not rank companies based on who pays us more, and we clearly
              disclose how our service works.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
              <li>No hidden fees for homeowners &mdash; our service is 100% free to use.</li>
              <li>Installer ratings are based on verified reviews, licensing, and certifications.</li>
              <li>Cost data reflects real market averages, not inflated estimates.</li>
              <li>We only partner with companies that meet our quality standards.</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Get in Touch
            </h2>
            <p className="mt-3">
              Have a question or want to learn more? We would love to hear from
              you. Visit our{' '}
              <a
                href="/get-quote/"
                className="font-medium text-amber-600 underline decoration-amber-600/30 hover:text-amber-700 hover:decoration-amber-700/50 transition-colors"
              >
                Get a Quote
              </a>{' '}
              page to connect with a solar expert, or reach out directly and a
              member of our team will respond within one business day.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
