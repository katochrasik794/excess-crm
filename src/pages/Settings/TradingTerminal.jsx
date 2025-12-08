import React, { useState } from 'react';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';

const TradingTerminal = () => {
  const [expandedAccount, setExpandedAccount] = useState(null);
  const [selectedTerminal, setSelectedTerminal] = useState(null);

  const handleChange = (accountType) => {
    if (expandedAccount === accountType) {
      setExpandedAccount(null);
    } else {
      setExpandedAccount(accountType);
      setSelectedTerminal(null);
    }
  };

  const handleCancel = () => {
    setExpandedAccount(null);
    setSelectedTerminal(null);
  };

  const handleSetTerminal = () => {
    // Handle setting the terminal
    console.log(`Setting ${selectedTerminal} for ${expandedAccount}`);
    setExpandedAccount(null);
    setSelectedTerminal(null);
  };

  const getTerminalOptions = (accountType) => {
    if (accountType === 'MT5') {
      return [
        'Exness Terminal',
        'MetaTrader 5',
        'MT5 WebTerminal'
      ];
    } else if (accountType === 'MT4') {
      return [
        'MetaTrader 4',
        'MT4 WebTerminal'
      ];
    }
    return [];
  };

  return (
    <>
      <TopContainer />
      
      <div className="p-4 md:px-8 w-full lg:px-10 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trading Terminal</h1>
        </div>
        <div className="mb-6">
            <h2 className="text-xl md:text-3xl font-semibold text-gray-900 mb-2">Default terminal</h2>
            <p className="text-sm text-gray-600">
              Set the default trading terminal for all your MT4 and MT5 accounts.
            </p>
          </div>

        {/* Default Terminal Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">

          {/* MT5 Accounts Row */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <span className="text-sm text-gray-700">MT5 Accounts</span>
              </div>
              {!expandedAccount || expandedAccount !== 'MT5' ? (
                <>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-semibold text-gray-900">Set your default terminal</span>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <button
                      onClick={() => handleChange('MT5')}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            {/* Expanded MT5 Options */}
            {expandedAccount === 'MT5' && (
              <div className="pb-6 flex justify-center">
                <div className="rounded-lg p-6 w-full max-w-lg">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 ">Set trading terminal</h3>
                  
                  <div className="space-y-3 mb-6">
                    {getTerminalOptions('MT5').map((terminal) => (
                      <label
                        key={terminal}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                      >
                        <input
                          type="radio"
                          name="mt5-terminal"
                          value={terminal}
                          checked={selectedTerminal === terminal}
                          onChange={(e) => setSelectedTerminal(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-900">{terminal}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSetTerminal}
                      disabled={!selectedTerminal}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedTerminal
                          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                          : 'bg-white border border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Set terminal
                    </button>
                    <button
                      onClick={handleCancel}
                      className="w-full py-2.5 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MT4 Accounts Row */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <span className="text-sm text-gray-700">MT4 Accounts</span>
              </div>
              {!expandedAccount || expandedAccount !== 'MT4' ? (
                <>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-semibold text-gray-900">Set your default terminal</span>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <button
                      onClick={() => handleChange('MT4')}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            {/* Expanded MT4 Options */}
            {expandedAccount === 'MT4' && (
              <div className="pb-6 flex justify-center">
                <div className=" rounded-lg p-6 w-full max-w-lg">
                  <h3 className="text-base font-semibold text-gray-900 mb-4 ">Set trading terminal</h3>
                  
                  <div className="space-y-3 mb-6">
                    {getTerminalOptions('MT4').map((terminal) => (
                      <label
                        key={terminal}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                      >
                        <input
                          type="radio"
                          name="mt4-terminal"
                          value={terminal}
                          checked={selectedTerminal === terminal}
                          onChange={(e) => setSelectedTerminal(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-900">{terminal}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSetTerminal}
                      disabled={!selectedTerminal}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedTerminal
                          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                          : 'bg-white border border-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Set terminal
                    </button>
                    <button
                      onClick={handleCancel}
                      className="w-full py-2.5 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXT Accounts Row */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="text-sm text-gray-700">EXT Accounts</span>
              </div>
              <div className="flex-1 text-center">
                <span className="text-sm font-semibold text-gray-900">Only Exness terminal</span>
              </div>
              <div className="flex-1 flex justify-end">
                {/* No button for EXT Accounts */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TradingTerminal;
