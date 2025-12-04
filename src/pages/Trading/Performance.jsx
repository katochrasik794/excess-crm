// import React, { useState } from 'react';
// import { ChevronDown, Info, Calendar } from 'lucide-react';
// import TopContainer from '../../components/TopContainer';
// import Footer from '../../components/Footer';

// const Performance = () => {
//   const [selectedAccount, setSelectedAccount] = useState('all');
//   const [selectedPeriod, setSelectedPeriod] = useState('365');
//   const [selectedChart, setSelectedChart] = useState('netProfit');

//   const stats = {
//     netProfit: {
//       profit: '0 USD',
//       loss: '0 USD',
//       unrealisedPL: '0 USD',
//     },
//     closedOrders: {
//       total: '0',
//       profitable: '0',
//       unprofitable: '0',
//     },
//     tradingVolume: {
//       lifetime: '0 USD',
//     },
//     equity: {
//       current: '0 USD',
//     },
//   };

//   const InfoIcon = () => (
//     <div className="inline-block ml-1 cursor-pointer">
//       <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//     </div>
//   );

//   const StatCard = ({ title, mainValue, details, showInfo = false }) => (
//     <div className="bg-white  p-6">
//       <div className="mb-4">
//         <div className="flex items-center gap-1 mb-2">
//           <span className="text-sm font-medium text-gray-700 mb-4">{title}</span>
//           {showInfo && <InfoIcon />}
//         </div>
//         {mainValue && (
//           <div className="text-3xl font-bold text-gray-900">{mainValue}</div>
//         )}
//       </div>
      
//       {details && (
//         <div className="space-y-3">
//           {details.map((detail, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <div className="flex items-center gap-1">
//                 <span className="text-sm text-gray-600">{detail.label}</span>
//                 {detail.showInfo && <InfoIcon />}
//               </div>
//               <span className="text-sm font-medium text-gray-900">{detail.value}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <TopContainer />
      
//       <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-semibold text-gray-900 mb-6">Summary</h1>
          
//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-8">
//             {/* Account Filter */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs text-gray-600">Account</label>
//               <div className="relative">
//                 <select
//                   value={selectedAccount}
//                   onChange={(e) => setSelectedAccount(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[280px]"
//                 >
//                   <option value="all">All accounts</option>
//                   <option value="mt5">MT5 Account</option>
//                   <option value="mt4">MT4 Account</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Period Filter */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs text-gray-600 opacity-0">Period</label>
//               <div className="relative">
//                 <select
//                   value={selectedPeriod}
//                   onChange={(e) => setSelectedPeriod(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
//                 >
//                   <option value="30">Last 30 days</option>
//                   <option value="90">Last 90 days</option>
//                   <option value="180">Last 180 days</option>
//                   <option value="365">Last 365 days</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Stats Row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//             {/* Net Profit */}
//             <div>
//               <div className="flex items-center gap-1 mb-4">
//                 <span className="text-sm text-gray-600">Net profit</span>
//                 <InfoIcon />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Profit</span>
//                   <span className="text-sm text-gray-900">{stats.netProfit.profit}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Loss</span>
//                   <span className="text-sm text-gray-900">{stats.netProfit.loss}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-1">
//                     <span className="text-sm text-gray-600">Unrealised P/L</span>
//                     <InfoIcon />
//                   </div>
//                   <span className="text-sm text-gray-900">{stats.netProfit.unrealisedPL}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Closed Orders */}
//             <div>
//               <div className="flex items-center gap-1 mb-4">
//                 <span className="text-sm text-gray-600">Closed orders</span>
//                 <InfoIcon />
//               </div>
//               <div className="text-3xl font-semibold text-gray-900 mb-3">{stats.closedOrders.total}</div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Profitable</span>
//                   <span className="text-sm text-gray-900">{stats.closedOrders.profitable}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Unprofitable</span>
//                   <span className="text-sm text-gray-900">{stats.closedOrders.unprofitable}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Trading Volume */}
//             <div>
//               <div className="flex items-center gap-1 mb-4">
//                 <span className="text-sm text-gray-600">Trading volume</span>
//                 <InfoIcon />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Lifetime</span>
//                   <span className="text-sm text-gray-900">{stats.tradingVolume.lifetime}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Equity */}
//             <div>
//               <div className="flex items-center gap-1 mb-4">
//                 <span className="text-sm text-gray-600">Equity</span>
//                 <InfoIcon />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Current</span>
//                   <span className="text-sm text-gray-900">{stats.equity.current}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-900">Charts</h2>
            
//             {/* Chart Tabs */}
//             <div className="border-b border-gray-200">
//               <div className="flex gap-6">
//                 <button
//                   onClick={() => setSelectedChart('netProfit')}
//                   className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
//                     selectedChart === 'netProfit'
//                       ? 'text-gray-900'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Net profit
//                   {selectedChart === 'netProfit' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setSelectedChart('closedOrders')}
//                   className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
//                     selectedChart === 'closedOrders'
//                       ? 'text-gray-900'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Closed orders
//                   {selectedChart === 'closedOrders' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setSelectedChart('tradingVolume')}
//                   className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
//                     selectedChart === 'tradingVolume'
//                       ? 'text-gray-900'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Trading volume
//                   {selectedChart === 'tradingVolume' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setSelectedChart('equity')}
//                   className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
//                     selectedChart === 'equity'
//                       ? 'text-gray-900'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Equity
//                   {selectedChart === 'equity' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Chart Area */}
//             <div className="bg-white rounded-lg">
//               <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
//                 <div className="text-center">
//                   <div className="text-gray-400 mb-2">
//                     <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                     </svg>
//                   </div>
//                   <p className="text-gray-500 text-sm">No trading data available</p>
//                   <p className="text-gray-400 text-xs mt-1">Start trading to see your performance metrics</p>
//                 </div>
//               </div>

//               {/* Chart Legend */}
//               <div className="flex items-center justify-start gap-6 mt-6 pt-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-sm bg-green-600"></div>
//                   <span className="text-xs text-gray-600">Profit</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
//                   <span className="text-xs text-gray-600">Loss</span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Note */}
//             <div className="text-xs text-gray-500 space-x-1">
//               <span>Please keep in mind that only closed position count.</span>
//               <span>Updated on: {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} (UTC).</span>
//               <span>
//                 For real-time statistics, check{' '}
//                 <a href="/webtrading/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
//                   Terminal
//                 </a>.
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Performance;




// src/pages/performance/Performance.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';
import { useAccounts } from '../../context/AccountContext';

/**
 * Usage: this file replaces your previous Performance component.
 * TailwindCSS required. Icons from 'lucide-react'.
 */

const periods = [
  { id: '7', label: 'Last 7 days' },
  { id: '30', label: 'Last 30 days' },
  { id: '90', label: 'Last 90 days' },
  { id: '365', label: 'Last 365 days' },
];

const InfoIcon = ({ className = '' }) => (
  <Info className={`w-4 h-4 text-gray-400 ${className}`} />
);

/* --- Custom Account Dropdown --- */
const AccountDropdown = ({ value, onChange }) => {
  const { getAllActiveAccounts } = useAccounts();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const accountsData = getAllActiveAccounts();

  useEffect(() => {
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSelect = (selected) => {
    onChange(selected);
    setOpen(false);
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white text-left min-w-[300px] text-sm shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-800">{value?.label ?? 'All accounts'}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-40 left-0 mt-2 w-[340px] bg-white border border-gray-200 rounded-md shadow-lg max-h-[320px] overflow-y-auto"
        >
          {/* All accounts header as an option */}
          <div
            onClick={() => handleSelect({ value: 'all', label: 'All accounts' })}
            className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 font-medium"
          >
            All accounts
          </div>

          {accountsData.active.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-400">Active accounts</div>
              <div className="divide-y divide-gray-100">
                {accountsData.active.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleSelect({ value: acc.id, label: `${acc.accountType} ${acc.mt5Login}` })}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm text-gray-800">{acc.accountType}</div>
                    <div className="mt-1 text-xs text-gray-500 flex items-center gap-3">
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium border rounded bg-gray-100 text-gray-700">
                        {acc.platform}
                      </span>
                      <span>{acc.accountType} {acc.mt5Login}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {accountsData.archived.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-400">Archived accounts</div>
              <div className="divide-y divide-gray-100 ">
                {accountsData.archived.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleSelect({ value: acc.id, label: `${acc.accountType} ${acc.mt5Login}` })}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm text-gray-800">{acc.accountType}</div>
                    <div className="mt-1 text-xs text-gray-500 flex items-center gap-3">
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium border rounded bg-gray-100 text-gray-700">
                        {acc.platform}
                      </span>
                      <span>{acc.accountType} {acc.mt5Login}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* --- Custom Period Dropdown --- */
const PeriodDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSelect = (p) => {
    onChange(p);
    setOpen(false);
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white text-left min-w-[200px] text-sm shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-800">{value?.label ?? 'Last 365 days'}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-40 left-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          {periods.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 ${
                value?.id === p.id ? 'bg-gray-50 font-medium' : 'text-gray-700'
              }`}
            >
              {p.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --- Main Performance component (layout unchanged) --- */
const Performance = () => {
  const [selectedAccount, setSelectedAccount] = useState({ value: 'all', label: 'All accounts' });
  const [selectedPeriod, setSelectedPeriod] = useState(periods.find((p) => p.id === '365'));
  const [selectedChart, setSelectedChart] = useState('netProfit');

  const stats = {
    netProfit: {
      profit: '0 USD',
      loss: '0 USD',
      unrealisedPL: '0 USD',
    },
    closedOrders: {
      total: '0',
      profitable: '0',
      unprofitable: '0',
    },
    tradingVolume: {
      lifetime: '0 USD',
    },
    equity: {
      current: '0 USD',
    },
  };

  return (
    <>
      <TopContainer />

      <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
        {/* Header */}
        <div className="mb-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Summary</h1>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Account Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-600">Account</label>
              <AccountDropdown value={selectedAccount} onChange={setSelectedAccount} />
            </div>

            {/* Period Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-600 opacity-0">Period</label>
              <PeriodDropdown value={selectedPeriod} onChange={setSelectedPeriod} />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Net Profit */}
            <div>
              <div className="flex items-center gap-1 mb-12">
                <span className="text-sm text-gray-600">Net profit</span>
                <InfoIcon />
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600">Profit</span>
                  <span className="text-sm text-gray-900">{stats.netProfit.profit}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600">Loss</span>
                  <span className="text-sm text-gray-900">{stats.netProfit.loss}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Unrealised P/L</span>
                    <InfoIcon />
                  </div>
                  <span className="text-sm text-gray-900">{stats.netProfit.unrealisedPL}</span>
                </div>
              </div>
            </div>

            {/* Closed Orders */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm text-gray-600">Closed orders</span>
                <InfoIcon />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-8">{stats.closedOrders.total}</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profitable</span>
                  <span className="text-sm text-gray-900">{stats.closedOrders.profitable}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unprofitable</span>
                  <span className="text-sm text-gray-900">{stats.closedOrders.unprofitable}</span>
                </div>
              </div>
            </div>

            {/* Trading Volume */}
            <div>
              <div className="flex items-center gap-1 mb-12">
                <span className="text-sm text-gray-600">Trading volume</span>
                <InfoIcon />
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600">Lifetime</span>
                  <span className="text-sm text-gray-900">{stats.tradingVolume.lifetime}</span>
                </div>
              </div>
            </div>

            {/* Equity */}
            <div>
              <div className="flex items-center gap-1 mb-12">
                <span className="text-sm text-gray-600">Equity</span>
                <InfoIcon />
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600">Current</span>
                  <span className="text-sm text-gray-900">{stats.equity.current}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Charts</h2>

            {/* Chart Tabs (unchanged) */}
            <div className="border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setSelectedChart('netProfit')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                    selectedChart === 'netProfit' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Net profit
                  {selectedChart === 'netProfit' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedChart('closedOrders')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                    selectedChart === 'closedOrders' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Closed orders
                  {selectedChart === 'closedOrders' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedChart('tradingVolume')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                    selectedChart === 'tradingVolume' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Trading volume
                  {selectedChart === 'tradingVolume' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedChart('equity')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                    selectedChart === 'equity' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Equity
                  {selectedChart === 'equity' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-lg">
              <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No trading data available</p>
                  <p className="text-gray-400 text-xs mt-1">Start trading to see your performance metrics</p>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-start gap-6 mt-6 pt-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                  <span className="text-xs text-gray-600">Profit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
                  <span className="text-xs text-gray-600">Loss</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-xs text-gray-500 space-x-1">
              <span>Please keep in mind that only closed position count.</span>
              <span>
                Updated on:{' '}
                {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })},{' '}
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} (UTC).
              </span>
              <span>
                For real-time statistics, check{' '}
                <a href="/webtrading/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                  Terminal
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Performance;
