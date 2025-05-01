import React from 'react';
import { TaxBreakdown, CountryTaxSystem } from '../types';
import { formatCurrency, formatPercentage } from '../utils/taxCalculator';
import { ReceiptIcon } from 'lucide-react';

interface TaxSummaryProps {
  taxBreakdown: TaxBreakdown;
  taxSystem: CountryTaxSystem;
  income: number;
}

const TaxSummary: React.FC<TaxSummaryProps> = ({ 
  taxBreakdown, 
  taxSystem, 
  income 
}) => {
  const { totalTax, effectiveRate } = taxBreakdown;
  const afterTaxIncome = income - totalTax;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <ReceiptIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">Tax Summary</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Income:</span>
          <span className="text-white font-medium">
            {formatCurrency(income, taxSystem.currency)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Total Tax:</span>
          <span className="text-white font-medium">
            {formatCurrency(totalTax, taxSystem.currency)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">After-Tax Income:</span>
          <span className="text-white font-medium">
            {formatCurrency(afterTaxIncome, taxSystem.currency)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Effective Tax Rate:</span>
          <span className="text-white font-medium">
            {formatPercentage(effectiveRate)}
          </span>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 italic">
          This is a simplified estimation. Actual tax calculations may vary based on deductions, 
          credits, and other factors specific to your situation.
        </p>
      </div>
    </div>
  );
};

export default TaxSummary;