import { CompanyCard } from '@/components/sections/CompanyCard';
import type { SolarCompany } from '@/lib/types';

interface CompanyListProps {
  companies: SolarCompany[];
  title?: string;
}

export function CompanyList({ companies, title }: CompanyListProps) {
  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}

      {companies.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
          <p className="text-gray-600">No solar companies found in this area.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
      )}
    </section>
  );
}
