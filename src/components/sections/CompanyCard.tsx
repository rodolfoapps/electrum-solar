import { StarRating } from '@/components/ui/StarRating';
import { normalizePhone } from '@/lib/utils';
import type { SolarCompany } from '@/lib/types';

interface CompanyCardProps {
  company: SolarCompany;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const phoneDigits = company.phone?.replace(/\D/g, '') ?? '';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>

      <div className="mt-2 flex items-center gap-2">
        <StarRating rating={company.rating} />
        <span className="text-sm text-gray-600">
          {company.rating.toFixed(1)} ({company.reviewCount} reviews)
        </span>
      </div>

      <dl className="mt-3 space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt>Years in Business</dt>
          <dd className="font-medium text-gray-900">{company.yearsInBusiness}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Service Area</dt>
          <dd className="font-medium text-gray-900">{company.serviceArea}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {company.phone && (
          <a
            href={`tel:+1${phoneDigits}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {normalizePhone(company.phone)}
          </a>
        )}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Visit Website
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
