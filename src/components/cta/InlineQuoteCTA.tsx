import Link from 'next/link';

export function InlineQuoteCTA() {
  return (
    <section className="my-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-12 text-center sm:px-12">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">
        Ready to Go Solar?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-base text-white/90">
        Get a free, no-obligation quote from top-rated installers in your area.
      </p>
      <Link
        href="/get-quote/"
        className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-amber-600 shadow-sm transition-colors hover:bg-gray-50"
      >
        Get Your Free Quote
      </Link>
    </section>
  );
}
