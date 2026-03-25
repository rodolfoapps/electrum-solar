import { generatePageMetadata } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'Electrum Solar terms of service. Read the terms and conditions governing your use of our website and services.',
  path: '/terms/',
});

export default async function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: March 24, 2026
      </p>

      <div className="mt-8 space-y-10 text-base leading-relaxed text-gray-600">
        {/* Introduction */}
        <section>
          <p>
            Welcome to {SITE_NAME}. By accessing or using our website at{' '}
            <strong>electrum.solar</strong> (the &quot;Site&quot;), you agree to
            be bound by these Terms of Service (&quot;Terms&quot;). If you do not
            agree to these Terms, please do not use the Site.
          </p>
        </section>

        {/* 1. Description of Service */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            1. Description of Service
          </h2>
          <p className="mt-3">
            {SITE_NAME} provides an informational platform that helps homeowners
            compare solar panel costs, find solar installation companies, and
            discover solar incentives in Idaho, California, Texas, and Hawaii. We
            also offer a free quote request service that connects users with
            pre-vetted solar installers.
          </p>
          <p className="mt-3">
            {SITE_NAME} is not a solar installer, contractor, or financial
            advisor. We do not sell or install solar panels. Any agreement you
            enter into with a solar installer is between you and that company.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            2. Eligibility
          </h2>
          <p className="mt-3">
            You must be at least 18 years old and a legal resident of the United
            States to use our quote request service. By submitting a quote
            request, you confirm that you meet these requirements.
          </p>
        </section>

        {/* 3. User Conduct */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            3. User Conduct
          </h2>
          <p className="mt-3">When using our Site, you agree not to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Provide false, misleading, or inaccurate information in quote
              requests or any other forms.
            </li>
            <li>
              Use the Site for any unlawful purpose or in violation of any
              applicable local, state, or federal law.
            </li>
            <li>
              Attempt to gain unauthorized access to our systems, servers, or
              networks.
            </li>
            <li>
              Use automated tools (bots, scrapers, etc.) to access or collect
              data from the Site without our written permission.
            </li>
            <li>
              Interfere with or disrupt the Site&apos;s operation or the
              experience of other users.
            </li>
          </ul>
        </section>

        {/* 4. Information Accuracy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Information Accuracy
          </h2>
          <p className="mt-3">
            We strive to provide accurate and up-to-date information about solar
            costs, incentives, and companies. However, solar pricing, incentive
            programs, and company availability change frequently. We make no
            warranties or guarantees regarding the accuracy, completeness, or
            timeliness of the information on our Site.
          </p>
          <p className="mt-3">
            Cost estimates, savings projections, and payback periods shown on our
            Site are approximations based on publicly available data and industry
            averages. Your actual costs and savings may vary based on your
            specific circumstances.
          </p>
        </section>

        {/* 5. Quote Requests & Lead Generation */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Quote Requests &amp; Lead Generation
          </h2>
          <p className="mt-3">
            When you submit a quote request, your information may be shared with
            one or more solar installation companies. By submitting a request,
            you consent to being contacted by these companies via phone, email,
            or text message regarding solar installation services.
          </p>
          <p className="mt-3">
            {SITE_NAME} does not guarantee that you will receive a specific
            number of quotes, that any quote will meet your expectations, or that
            the installers will be available in your area.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            6. Intellectual Property
          </h2>
          <p className="mt-3">
            All content on the Site, including text, graphics, logos, design
            elements, and software, is the property of {SITE_NAME} or its
            content suppliers and is protected by copyright, trademark, and other
            intellectual property laws. You may not reproduce, distribute, or
            create derivative works from our content without written permission.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            7. Limitation of Liability
          </h2>
          <p className="mt-3">
            To the fullest extent permitted by law, {SITE_NAME} shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to your use of the Site,
            any quote request, or any interaction with a solar installer
            connected through our platform.
          </p>
          <p className="mt-3">
            Our total liability to you for any claim arising from or related to
            these Terms or your use of the Site shall not exceed $100.
          </p>
        </section>

        {/* 8. Indemnification */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            8. Indemnification
          </h2>
          <p className="mt-3">
            You agree to indemnify and hold harmless {SITE_NAME}, its officers,
            directors, employees, and agents from any claims, damages, losses, or
            expenses (including reasonable attorneys&apos; fees) arising from your
            use of the Site, violation of these Terms, or infringement of any
            third-party rights.
          </p>
        </section>

        {/* 9. Third-Party Links */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            9. Third-Party Links
          </h2>
          <p className="mt-3">
            Our Site may link to third-party websites. These links are provided
            for convenience and do not imply endorsement. We are not responsible
            for the content, privacy practices, or availability of linked sites.
          </p>
        </section>

        {/* 10. Modifications */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            10. Modifications to These Terms
          </h2>
          <p className="mt-3">
            We reserve the right to modify these Terms at any time. Changes take
            effect when posted on this page. Your continued use of the Site after
            changes are posted constitutes acceptance of the updated Terms.
          </p>
        </section>

        {/* 11. Governing Law */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            11. Governing Law
          </h2>
          <p className="mt-3">
            These Terms are governed by and construed in accordance with the laws
            of the State of Idaho, without regard to its conflict of law
            principles. Any disputes arising under these Terms shall be resolved
            in the state or federal courts located in Idaho.
          </p>
        </section>

        {/* 12. Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            12. Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about these Terms of Service, please contact us
            through our{' '}
            <a
              href="/get-quote/"
              className="font-medium text-amber-600 underline decoration-amber-600/30 hover:text-amber-700 hover:decoration-amber-700/50 transition-colors"
            >
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
