import { TaxBracket, TaxBreakdown, CountryTaxSystem } from '../types';

export const calculateTax = (income: number, taxSystem: CountryTaxSystem): TaxBreakdown => {
  if (income <= 0) {
    return {
      brackets: [],
      totalTax: 0,
      effectiveRate: 0,
    };
  }

  let totalTax = 0;
  const brackets: TaxBracket[] = [];

  // Calculate tax for each bracket
  for (const bracket of taxSystem.brackets) {
    const min = bracket.min;
    const max = bracket.max;
    const rate = bracket.rate;

    if (income > min) {
      const taxableInThisBracket = max === null 
        ? income - min 
        : Math.min(income, max) - min;
      
      if (taxableInThisBracket <= 0) continue;

      const taxForBracket = taxableInThisBracket * rate;
      totalTax += taxForBracket;

      brackets.push({
        min,
        max,
        rate,
        tax: taxForBracket,
      });

      if (max !== null && income <= max) {
        break;
      }
    }
  }

  const effectiveRate = totalTax / income;

  return {
    brackets,
    totalTax,
    effectiveRate,
  };
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (rate: number): string => {
  return (rate * 100).toFixed(1) + '%';
};