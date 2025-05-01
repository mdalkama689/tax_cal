import React from 'react';
import { TaxBreakdown, CountryTaxSystem } from '../types';
import { formatCurrency, formatPercentage } from '../utils/taxCalculator';
import { PercentIcon } from 'lucide-react';

interface TaxBracketBreakdownProps {
  taxBreakdown: TaxBreakdown;
  taxSystem: CountryTaxSystem;
}

const TaxBracketBreakdown: React.FC<TaxBracketBreakdownProps> = ({ 
  taxBreakdown, 
  taxSystem 
}) => {
  const { brackets } = taxBreakdown;

  if (brackets.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <PercentIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">Tax Bracket Breakdown</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Bracket
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tax Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {brackets.map((bracket, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-4 py-2 text-sm text-gray-300">
                  {bracket.max === null
                    ? `Over ${formatCurrency(bracket.min, taxSystem.currency)}`
                    : `${formatCurrency(bracket.min, taxSystem.currency)} - ${formatCurrency(bracket.max, taxSystem.currency)}`}
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  {formatPercentage(bracket.rate)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  {formatCurrency(bracket.tax, taxSystem.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxBracketBreakdown;