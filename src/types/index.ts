export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  tax: number;
}

export interface TaxBreakdown {
  brackets: TaxBracket[];
  totalTax: number;
  effectiveRate: number;
}

export interface CountryTaxSystem {
  name: string;
  currency: string;
  currencySymbol: string;
  brackets: {
    min: number;
    max: number | null;
    rate: number;
  }[];
}

export interface ChartData {
  label: string;
  value: number;
  color: string;
}