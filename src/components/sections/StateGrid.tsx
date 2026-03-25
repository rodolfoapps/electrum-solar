import Link from 'next/link';
import { states } from '@/data/states';
import { formatCurrency } from '@/lib/utils';

interface StateGridProps {
  basePath: string;
}

export function StateGrid({ basePath }: StateGridProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by State</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`${basePath}/${state.slug}/`}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                {state.name}
              </h3>
              <svg
                className="h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <dl className="mt-3 space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <dt>Avg. Sun Hours</dt>
                <dd className="font-medium text-gray-900">{state.avgSunHours} hrs/day</dd>
              </div>
              <div className="flex justify-between">
                <dt>Cost per Watt</dt>
                <dd className="font-medium text-gray-900">${state.avgCostPerWatt.toFixed(2)}/W</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </section>
  );
}
