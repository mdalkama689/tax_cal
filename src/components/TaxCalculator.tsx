import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import IncomeInput from './IncomeInput';
import TaxSummary from './TaxSummary';
import TaxBracketBreakdown from './TaxBracketBreakdown';
import TaxChart from './TaxChart';
import { taxSystems } from '../data/taxSystems';
import { calculateTax } from '../utils/taxCalculator';
import { TaxBreakdown, CountryTaxSystem } from '../types';

const TaxCalculator: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryTaxSystem>(taxSystems[0]);
  const [income, setIncome] = useState<number>(50000);
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown>({
    brackets: [],
    totalTax: 0,
    effectiveRate: 0,
  });

  // Recalculate tax when income or country changes
  useEffect(() => {
    const result = calculateTax(income, selectedCountry);
    setTaxBreakdown(result);
  }, [income, selectedCountry]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tax Bracket Calculator</h1>
        <p className="text-gray-400">
          Estimate your tax bracket and see a breakdown of how your income is taxed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Select Country
          </label>
          <CountrySelector
            countries={taxSystems}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Annual Income
          </label>
          <IncomeInput
            currencySymbol={selectedCountry.currencySymbol}
            value={income}
            onChange={setIncome}
          />
        </div>
      </div>

      {income > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TaxSummary 
              taxBreakdown={taxBreakdown} 
              taxSystem={selectedCountry} 
              income={income} 
            />
            <TaxBracketBreakdown 
              taxBreakdown={taxBreakdown} 
              taxSystem={selectedCountry} 
            />
          </div>
          <div>
            <TaxChart taxBreakdown={taxBreakdown} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;