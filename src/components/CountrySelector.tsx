import React from 'react';
import { CountryTaxSystem } from '../types';
import { GlobeIcon } from 'lucide-react';

interface CountrySelectorProps {
  countries: CountryTaxSystem[];
  selectedCountry: CountryTaxSystem;
  onSelectCountry: (country: CountryTaxSystem) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onSelectCountry,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <GlobeIcon className="h-5 w-5 text-gray-400" />
      </div>
      <select
        className="block w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        value={selectedCountry.name}
        onChange={(e) => {
          const country = countries.find((c) => c.name === e.target.value);
          if (country) {
            onSelectCountry(country);
          }
        }}
      >
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name} ({country.currencySymbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;