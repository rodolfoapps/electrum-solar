import Link from 'next/link';

export function BottomBannerCTA() {
  return (
    <section className="bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-8">
        <p className="text-center text-base font-medium text-white sm:text-left">
          Go Solar Today{' '}
          <span className="text-amber-400">&mdash;</span>{' '}
          Save thousands on energy costs
        </p>
        <Link
          href="/get-quote/"
          className="shrink-0 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
        >
          Get Free Quote
        </Link>
      </div>
    </section>
  );
}
