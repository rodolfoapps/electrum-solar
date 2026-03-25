import { generatePageMetadata } from '@/lib/metadata';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const metadata = generatePageMetadata({
  title: 'Get Your Free Solar Quote',
  description:
    'Compare quotes from top-rated solar installers in Idaho, California, Texas, and Hawaii. Free, no-obligation solar quotes in minutes.',
  path: '/get-quote/',
  keywords: [
    'free solar quote',
    'solar panel quote',
    'compare solar installers',
    'solar installation cost',
  ],
});

export default async function GetQuotePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get Your Free Solar Quote
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Compare quotes from top-rated solar installers in your area. It takes
          less than two minutes, and there is no obligation.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <QuoteRequestForm />
      </div>
    </div>
  );
}
