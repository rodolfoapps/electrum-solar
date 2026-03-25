import { generatePageMetadata } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Electrum Solar privacy policy. Learn how we collect, use, and protect your personal information.',
  path: '/privacy-policy/',
});

export default async function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: March 24, 2026
      </p>

      <div className="mt-8 space-y-10 text-base leading-relaxed text-gray-600">
        {/* Introduction */}
        <section>
          <p>
            {SITE_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            operates the website{' '}
            <strong>electrum.solar</strong> (the &quot;Site&quot;). This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our Site or submit a quote request. Please
            read this policy carefully.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            1. Information We Collect
          </h2>
          <p className="mt-3">
            We may collect the following categories of information:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and zip code that you voluntarily provide when submitting a
              quote request.
            </li>
            <li>
              <strong>Property Information:</strong> State, property type,
              monthly electricity bill, roof type, shade level, and project
              timeline that you provide through our forms.
            </li>
            <li>
              <strong>Usage Data:</strong> Information automatically collected
              when you visit our Site, including IP address, browser type,
              operating system, referring URLs, pages viewed, and date/time of
              visits.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies,
              web beacons, and similar technologies to collect usage data and
              improve your browsing experience.
            </li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            2. How We Use Your Information
          </h2>
          <p className="mt-3">We use the information we collect to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Connect you with qualified solar installers in your area who can
              provide quotes and consultations.
            </li>
            <li>Respond to your inquiries and customer service requests.</li>
            <li>
              Improve our Site, content, and services based on usage patterns.
            </li>
            <li>
              Send you relevant information about solar energy, incentives, and
              savings opportunities (with your consent).
            </li>
            <li>
              Comply with legal obligations and enforce our Terms of Service.
            </li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            3. Information Sharing
          </h2>
          <p className="mt-3">
            We may share your personal information in the following
            circumstances:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Solar Installers:</strong> When you submit a quote request,
              we share your contact and property information with pre-vetted
              solar installation companies who can provide quotes for your
              project.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors who assist us with website hosting, analytics,
              email delivery, and other operational functions.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              when required by law, subpoena, or other legal process.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be transferred
              as part of that transaction.
            </li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties for their
            own marketing purposes.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Data Security
          </h2>
          <p className="mt-3">
            We implement reasonable administrative, technical, and physical
            security measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. However,
            no method of transmission over the Internet or electronic storage is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Your Rights
          </h2>
          <p className="mt-3">
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Access:</strong> Request a copy of the personal information
              we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate or
              incomplete personal information.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal
              information, subject to certain exceptions.
            </li>
            <li>
              <strong>Opt-Out:</strong> Opt out of receiving marketing
              communications at any time by using the unsubscribe link in our
              emails.
            </li>
          </ul>
          <p className="mt-4">
            California residents have additional rights under the California
            Consumer Privacy Act (CCPA), including the right to know what
            personal information is collected and the right to opt out of the
            sale of personal information.
          </p>
        </section>

        {/* Third-Party Links */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            6. Third-Party Links
          </h2>
          <p className="mt-3">
            Our Site may contain links to third-party websites, including solar
            installer websites. We are not responsible for the privacy practices
            or content of these external sites. We encourage you to review the
            privacy policies of any site you visit.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            7. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. When we make
            changes, we will update the &quot;Last updated&quot; date at the top
            of this page. We encourage you to review this policy periodically.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            8. Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy or wish to exercise
            your data rights, please contact us through our{' '}
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
