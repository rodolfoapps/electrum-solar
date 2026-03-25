import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Thank You',
  description:
    'Thank you for requesting a solar quote. A solar expert will contact you within 24 hours.',
  path: '/thank-you/',
});

export default async function ThankYouPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Checkmark icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
        <svg
          className="h-10 w-10 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Thank You!
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600">
        We&apos;ve received your request. A solar expert will contact you within
        24 hours to discuss your options and answer any questions.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
