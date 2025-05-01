import { ChartData, TaxBracket } from '../types';

// Generate chart data from tax brackets
export const generateChartData = (brackets: TaxBracket[]): ChartData[] => {
  // Colors for the pie chart segments
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F97316', // orange
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F43F5E', // rose
    '#6366F1', // indigo
  ];

  return brackets.map((bracket, index) => {
    const label = bracket.max === null
      ? `${(bracket.rate * 100).toFixed(1)}% (Income > ${bracket.min.toLocaleString()})`
      : `${(bracket.rate * 100).toFixed(1)}% (${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()})`;

    return {
      label,
      value: bracket.tax,
      color: colors[index % colors.length],
    };
  });
};