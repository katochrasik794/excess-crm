import React, { useState } from 'react';

// You would typically pass props like 'isOpen', 'onClose', and 'currentLeverage'
// For this example, we'll manage the visibility and state internally.

const AdjustLeveragePopup = ({ isOpen, onClose, accountId = '196126793' }) => {
  // 1. State for component functionality
  const [selectedLeverage, setSelectedLeverage] = useState('1:2000');
  const [isWarningExpanded, setIsWarningExpanded] = useState(true); // Control the expand/collapse state

  const leverageOptions = ['1:100', '1:500', '1:1000', '1:2000', '1:5000'];

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    // Placeholder for save logic (e.g., API call)
    console.log(`Saving new leverage: ${selectedLeverage} for account: ${accountId}`);
    onClose();
  };

  const toggleWarning = () => {
    setIsWarningExpanded(!isWarningExpanded);
  };

  return (
    // 1. Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur"
      onClick={onClose}
    >

      {/* 2. Modal Content Container */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header (Title and Close Button) */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Adjust leverage</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-semibold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Account Info */}
        <p className="text-gray-700 mb-6">
          Account: <span className="font-semibold">#{accountId}</span>
        </p>

        {/* Leverage Dropdown */}
        <div className="mb-8">
          <label htmlFor="leverage" className="block text-gray-700 font-semibold mb-2">
            Leverage <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="leverage"
              value={selectedLeverage}
              onChange={(e) => setSelectedLeverage(e.target.value)}
              className="appearance-none block w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg cursor-pointer"
            >
              {leverageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* Custom arrow icon for the select box */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
          </div>
        </div>

        {/* 3. Collapsible Warning Box */}
        <div className="p-4 mb-8 rounded-lg bg-yellow-50 border border-yellow-200">
          
          {/* Header/Toggle Area */}
          <button
            onClick={toggleWarning}
            className="w-full flex justify-between items-start text-left focus:outline-none"
          >
            <div className="flex items-start">
              {/* Icon */}
              <div className="text-yellow-500 mr-3 mt-0.5 text-xl leading-none">⚠️</div>
              <p className="text-sm text-yellow-800 font-medium">
                Your actual leverage may vary depending on various conditions
              </p>
            </div>
            
            {/* Chevron Icon - Rotates based on state */}
            <svg 
                className={`fill-current h-4 w-4 text-yellow-800 transition-transform duration-300 ${isWarningExpanded ? 'transform rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            >
                {/* Up/Down arrow path */}
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </button>

          {/* Expanded Content (Details) */}
          {isWarningExpanded && (
            <div className="mt-4 pt-4 border-t border-yellow-200">
              <ul className="list-disc ml-5 space-y-3 text-sm text-gray-700">
                <li>
                  **Margin requirements** for some instruments are fixed: e.g. margin requirements for BTCUSD is fixed at 1:400 (or 0.25% of trade amount).
                  <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
                </li>
                <li>
                  During **high-impact news** and before weekends and holidays, maximum leverage is capped at **1:200** for currency pairs and gold.
                  <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
                </li>
                <li>
                  Maximum available leverage depends on your **equity amount**. Leverage of 1:2000 is only available when your equity is less than **30,000 USD**.
                  <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#ffde02] hover:bg-yellow-300/80 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

// Example usage in your main App component:
const App = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <button
                onClick={() => setIsPopupOpen(true)}
                className="p-3 bg-blue-500 text-white rounded"
            >
                Open Leverage Popup
            </button>
            <AdjustLeveragePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
};

export default AdjustLeveragePopup;