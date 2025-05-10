import { useEffect, useState } from 'react';
import TaxCalculator from './components/TaxCalculator';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
    const [deviceType, setDeviceType] = useState<"big" | "small">("big");


  useEffect(() => {
    const handleResize = () => {
        setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {deviceType === "small" ? <MobileShare /> : <TabShare />}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-bold">TaxBracket</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <TaxCalculator />
      </main>
      
      <footer className="bg-gray-800 py-6 mt-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            Disclaimer: This tax calculator provides estimates based on simplified tax brackets. 
            Actual tax calculations may vary based on individual circumstances, deductions, 
            and current tax laws. Please consult with a tax professional for accurate advice.
          </p>
         
        </div>
      </footer>
    </div>
  );
}

export default App;