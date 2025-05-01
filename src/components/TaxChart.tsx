import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData, TaxBreakdown } from '../types';
import { generateChartData } from '../utils/chartUtil';
import { PieChartIcon } from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface TaxChartProps {
  taxBreakdown: TaxBreakdown;
}

const TaxChart: React.FC<TaxChartProps> = ({ taxBreakdown }) => {
  const { brackets } = taxBreakdown;
  
  if (brackets.length === 0) {
    return null;
  }

  const chartData: ChartData[] = generateChartData(brackets);
  
  const data = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        data: chartData.map(item => item.value),
        backgroundColor: chartData.map(item => item.color),
        borderColor: chartData.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#E5E7EB', // text-gray-200
          font: {
            size: 12,
          },
          padding: 20,
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)', // bg-gray-900 with opacity
        titleColor: '#F9FAFB', // text-gray-50
        bodyColor: '#F3F4F6', // text-gray-100
        borderColor: '#4B5563', // border-gray-600
        borderWidth: 1,
        padding: 12,
        cornerRadius: 4,
        displayColors: true,
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <PieChartIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">Tax Distribution</h3>
      </div>
      <div className="h-64 md:h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TaxChart;