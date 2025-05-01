import React, { useState, useEffect } from 'react';
import { WalletIcon } from 'lucide-react';

interface IncomeInputProps {
  currencySymbol: string;
  value: number;
  onChange: (income: number) => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ 
  currencySymbol, 
  value, 
  onChange 
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  // Update the input value when the currency changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [currencySymbol, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(rawValue);
    onChange(parseInt(rawValue, 10) || 0);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <WalletIcon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
        <span className="text-gray-400">{currencySymbol}</span>
      </div>
      <input
        type="text"
        className="block w-full pl-16 pr-3 py-2.5 text-sm rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        placeholder="Enter your annual income"
        value={inputValue === '0' ? '' : inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default IncomeInput;