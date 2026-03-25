import { formatCurrency } from '@/lib/utils';

interface CostTableProps {
  stateName: string;
  costPerWatt: number;
  systemCost: number;
  savings25Year: number;
  paybackYears: number;
}

const systemSizes = [4, 6, 8, 10, 12]; // kW

export function CostTable({ stateName, costPerWatt, systemCost, savings25Year, paybackYears }: CostTableProps) {
  // Use 6kW as the baseline reference size for scaling
  const baselineSize = 6;
  const scaleFactor = systemCost / (baselineSize * 1000 * costPerWatt);

  const rows = systemSizes.map((size) => {
    const grossCost = Math.round(size * 1000 * costPerWatt * scaleFactor);
    const scaledSavings = Math.round(savings25Year * (size / baselineSize));

    return { size, grossCost, savings: scaledSavings };
  });

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Solar Panel Costs in {stateName}
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Average cost per watt: <strong>${costPerWatt.toFixed(2)}</strong> | Payback period: <strong>{paybackYears} years</strong>
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">System Size</th>
              <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Estimated Cost</th>
              <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">Est. 25-Year Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, index) => (
              <tr key={row.size} className={index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900">{row.size} kW</td>
                <td className="whitespace-nowrap px-5 py-3 text-gray-600">{formatCurrency(row.grossCost)}</td>
                <td className="whitespace-nowrap px-5 py-3 text-green-600 font-medium">{formatCurrency(row.savings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
