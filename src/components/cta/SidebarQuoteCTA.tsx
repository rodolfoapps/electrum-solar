import Link from 'next/link';

export function SidebarQuoteCTA() {
  return (
    <aside className="sticky top-24 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-1 rounded-t-xl bg-amber-500" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Get a Free Solar Quote
        </h3>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Compare local installers
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save up to 30% on installation
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No obligation
          </li>
        </ul>
        <Link
          href="/get-quote/"
          className="mt-6 block w-full rounded-lg bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-600"
        >
          Get Started
        </Link>
      </div>
    </aside>
  );
}
