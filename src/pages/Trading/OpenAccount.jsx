// // OpenAccount.jsx
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import TopContainer from "../../components/TopContainer";
// import Footer from "../../components/Footer";

// const ACCOUNT_GROUPS = [
//   {
//     label: "Standard accounts",
//     accounts: [
//       {
//         id: "standard",
//         name: "Standard",
//         description:
//           "Low minimum deposit with no commission. Made for all traders.",
//         minDeposit: "10 USD",
//         minSpread: "0.20 pips",
//         maxLeverage: "1:Unlimited",
//         commission: "No commission",
//       },
//       {
//         id: "standard-cent",
//         name: "Standard Cent",
//         description: "Smaller lots, lower risk. Great for practicing.",
//         minDeposit: "10 USD",
//         minSpread: "0.30 pips",
//         maxLeverage: "1:Unlimited",
//         commission: "No commission",
//       },
//     ],
//   },
//   {
//     label: "Professional accounts",
//     accounts: [
//       {
//         id: "pro",
//         name: "Pro",
//         description:
//           "Instant or market execution with tighter spreads and no commission.",
//         minDeposit: "200 USD",
//         minSpread: "0.10 pips",
//         maxLeverage: "1:Unlimited",
//         commission: "No commission",
//       },
//       {
//         id: "raw-spread",
//         name: "Raw spread",
//         description:
//           "Direct market pricing with fixed commission. Designed for experienced traders.",
//         minDeposit: "200 USD",
//         minSpread: "0.00 pips",
//         maxLeverage: "1:Unlimited",
//         commission: "Up to 3.50 USD per lot/side",
//       },
//       {
//         id: "zero",
//         name: "Zero",
//         description: "Spreads from 0 pips on top instruments.",
//         minDeposit: "200 USD",
//         minSpread: "0.00 pips",
//         maxLeverage: "1:Unlimited",
//         commission: "From 0.05 USD per lot/side",
//       },
//     ],
//   },
// ];

// const OpenAccount = () => {
//   const navigate = useNavigate();
//   const [selectedId, setSelectedId] = useState("standard");

//   const handleSelect = (id) => setSelectedId(id);

//   return (
//     <>
//     <TopContainer />
//     <div className="w-full bg-white text-gray-900 flex justify-center px-4 py-6 sm:py-10">
//       <div className="w-full max-w-6xl">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center w-8 h-8 text-gray-700 text-xl hover:bg-gray-50"
//               onClick={() => navigate('/')}
//             >
//               &larr;
//             </button>
//             <h1 className="text-2xl sm:text-3xl font-semibold">Open account</h1>
//           </div>

//           <a
//             href="#"
//             className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
//           >
//             Contract specifications
//             <span aria-hidden="true" className="text-base">
//               ↗
//             </span>
//           </a>
//         </div>

//         {/* Column headers (desktop only) */}
//         <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 px-4 pb-2">
//           <span className="col-span-2">
            
//           </span>
//           <span className="text-right">Min deposit</span>
//           <span className="text-right">Min spread</span>
//           <span className="text-right">Max leverage</span>
//           <span className="text-right">Commission</span>
//         </div>

//         {/* Account groups */}
//         <div className="space-y-6">
//           {ACCOUNT_GROUPS.map((group) => (
//             <div key={group.label} className="space-y-3">
//               <h2 className=" text-gray-500 px-1">
//                 {group.label}
//               </h2>

//               <div className="space-y-3">
//                 {group.accounts.map((acc) => {
//                   const isSelected = selectedId === acc.id;
//                   return (
//                     <button
//                       key={acc.id}
//                       type="button"
//                       onClick={() => handleSelect(acc.id)}
//                       className={`w-full text-left border rounded-xl px-4 py-3 transition-shadow flex flex-col md:grid md:grid-cols-6 gap-4 md:items-center
//                         ${
//                           isSelected
//                             ? "border-gray-200 bg-gray-200/50 shadow-md"
//                             : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                         }`}
//                     >
//                       {/* Account + radio */}
//                       <div className="flex items-ceter justify-center gap-3 col-span-2">
//                         <div className="flex md:flex items-center justify-center">
//                           <span
//                             className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${
//                               isSelected
//                                 ? "border-gray-400 bg-gray-400"
//                                 : "border-gray-400 bg-white"
//                             }`}
//                           >
//                             {isSelected && (
//                               <span className="block w-2 h-2 rounded-full bg-white" />
//                             )}
//                           </span>
//                         </div>
//                         {acc.id === "standard" && <img src="/standard.png" alt="Standard" className="w-12 h-12 flex items-center justify-center" />}
//                         {acc.id === "standard-cent" && <img src="/cent.png" alt="Standard Cent" className="w-12 h-12 flex items-center justify-center" />}
//                         {acc.id === "pro" && <img src="/pro.png" alt="Pro" className="w-12 h-12 flex items-center justify-center" />}
//                         {acc.id === "raw-spread" && <img src="/raw.png" alt="Raw Spread" className="w-12 h-12 flex items-center justify-center" />}
//                         {acc.id === "zero" && <img src="/zero.png" alt="Zero" className="w-12 h-12 flex items-center justify-center" />}
//                         <div className="">
//                           <div className="font-semibold text-sm sm:text-base ">
//                             {acc.name}
//                           </div>
//                           <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                             {acc.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Desktop values in order: Min deposit, Min spread, Max leverage, Commission */}
//                       <div className="hidden md:block text-sm text-right font-medium">
//                         {acc.minDeposit}
//                       </div>
//                       <div className="hidden md:block text-sm text-right font-medium">
//                         {acc.minSpread}
//                       </div>
//                       <div className="hidden md:block text-sm text-right font-medium">
//                         {acc.maxLeverage}
//                       </div>
//                       <div className="hidden md:block text-sm text-right font-medium">
//                         {acc.commission}
//                       </div>

//                       {/* Mobile stacked values (same order) */}
//                       <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 md:hidden mt-2">
//                         <span className="text-gray-500">Min deposit</span>
//                         <span className="text-right font-medium">
//                           {acc.minDeposit}
//                         </span>

//                         <span className="text-gray-500">Min spread</span>
//                         <span className="text-right font-medium">
//                           {acc.minSpread}
//                         </span>

//                         <span className="text-gray-500">Max leverage</span>
//                         <span className="text-right font-medium">
//                           {acc.maxLeverage}
//                         </span>

//                         <span className="text-gray-500">Commission</span>
//                         <span className="text-right font-medium">
//                           {acc.commission}
//                         </span>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer button */}
//         <div className="mt-6">
//           <button
//             type="button"
//             className="w-full sm:w-auto md:w-[300px] bg-[#ffde02] hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-sm sm:text-base shadow-md transition-colors"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
    
//   );
// };

// export default OpenAccount;



// OpenAccount.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

const ACCOUNT_GROUPS = [
  {
    label: "Standard accounts",
    accounts: [
      {
        id: "standard",
        name: "Standard",
        description:
          "Low minimum deposit with no commission. Made for all traders.",
        minDeposit: "10 USD",
        minSpread: "0.20 pips",
        maxLeverage: "1:Unlimited",
        commission: "No commission",
      },
      {
        id: "standard-cent",
        name: "Standard Cent",
        description: "Smaller lots, lower risk. Great for practicing.",
        minDeposit: "10 USD",
        minSpread: "0.30 pips",
        maxLeverage: "1:Unlimited",
        commission: "No commission",
      },
    ],
  },
  {
    label: "Professional accounts",
    accounts: [
      {
        id: "pro",
        name: "Pro",
        description:
          "Instant or market execution with tighter spreads and no commission.",
        minDeposit: "200 USD",
        minSpread: "0.10 pips",
        maxLeverage: "1:Unlimited",
        commission: "No commission",
      },
      {
        id: "raw-spread",
        name: "Raw spread",
        description:
          "Direct market pricing with fixed commission. Designed for experienced traders.",
        minDeposit: "200 USD",
        minSpread: "0.00 pips",
        maxLeverage: "1:Unlimited",
        commission: "Up to 3.50 USD per lot/side",
      },
      {
        id: "zero",
        name: "Zero",
        description: "Spreads from 0 pips on top instruments.",
        minDeposit: "200 USD",
        minSpread: "0.00 pips",
        maxLeverage: "1:Unlimited",
        commission: "From 0.05 USD per lot/side",
      },
    ],
  },
];

const OpenAccount = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("standard");

  const handleSelect = (id) => setSelectedId(id);

  return (
    <>
      <TopContainer />
      <div className="w-full bg-white text-gray-900 flex justify-center px-4 py-6 sm:py-10 lg:px-10 xl:px-16">
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-gray-700 text-xl hover:bg-gray-50"
                onClick={() => navigate('/')}
              >
                &larr;
              </button>
              <h1 className="text-2xl sm:text-3xl font-semibold">Open account</h1>
            </div>

            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              Contract specifications
              <span aria-hidden="true" className="text-base">
                ↗
              </span>
            </a>
          </div>

          {/* Column headers (desktop + tablet) */}
          <div className="hidden sm:grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 px-4 pb-2">
            <span className="col-span-2"></span>
            <span className="text-right">Min deposit</span>
            <span className="text-right">Min spread</span>
            <span className="text-right">Max leverage</span>
            <span className="text-right">Commission</span>
          </div>

          {/* Account groups */}
          <div className="space-y-6">
            {ACCOUNT_GROUPS.map((group) => (
              <div key={group.label} className="space-y-3">
                <h2 className=" text-gray-500 px-1">
                  {group.label}
                </h2>

                <div className="space-y-3">
                  {group.accounts.map((acc) => {
                    const isSelected = selectedId === acc.id;
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleSelect(acc.id)}
                        className={`w-full text-left border rounded-md px-4 py-3  flex flex-col sm:grid sm:grid-cols-6 gap-4 sm:items-center
                          ${
                            isSelected
                              ? "border-gray-200 bg-gray-200/50 "
                              : "border-gray-200 hover:border-gray-300 "
                          }`}
                      >
                        {/* Account + radio */}
                        <div className="flex items-center justify-center gap-3 col-span-2">
                          <div className="flex items-center justify-center">
                            <span
                              className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${
                                isSelected
                                  ? "border-gray-400 bg-gray-400"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="block w-2 h-2 rounded-full bg-white" />
                              )}
                            </span>
                          </div>
                          {acc.id === "standard" && <img src="/standard.png" alt="Standard" className="w-12 h-12" />}
                          {acc.id === "standard-cent" && <img src="/cent.png" alt="Standard Cent" className="w-12 h-12" />}
                          {acc.id === "pro" && <img src="/pro.png" alt="Pro" className="w-12 h-12" />}
                          {acc.id === "raw-spread" && <img src="/raw.png" alt="Raw Spread" className="w-12 h-12" />}
                          {acc.id === "zero" && <img src="/zero.png" alt="Zero" className="w-12 h-12" />}
                          <div className="">
                            <div className="font-semibold text-sm sm:text-base ">
                              {acc.name}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              {acc.description}
                            </p>
                          </div>
                        </div>

                        {/* Desktop/tablet values in order: Min deposit, Min spread, Max leverage, Commission */}
                        <div className="hidden sm:block text-sm text-right font-medium">
                          {acc.minDeposit}
                        </div>
                        <div className="hidden sm:block text-sm text-right font-medium">
                          {acc.minSpread}
                        </div>
                        <div className="hidden sm:block text-sm text-right font-medium">
                          {acc.maxLeverage}
                        </div>
                        <div className="hidden sm:block text-sm text-right font-medium">
                          {acc.commission}
                        </div>

                        {/* Mobile stacked values (same order) */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 sm:hidden mt-2">
                          <span className="text-gray-500">Min deposit</span>
                          <span className="text-right font-medium">
                            {acc.minDeposit}
                          </span>

                          <span className="text-gray-500">Min spread</span>
                          <span className="text-right font-medium">
                            {acc.minSpread}
                          </span>

                          <span className="text-gray-500">Max leverage</span>
                          <span className="text-right font-medium">
                            {acc.maxLeverage}
                          </span>

                          <span className="text-gray-500">Commission</span>
                          <span className="text-right font-medium">
                            {acc.commission}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full sm:w-auto md:w-[300px] bg-[#ffde02] hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-sm sm:text-base shadow-md transition-colors"
              onClick={() => {
                const selectedAccount = ACCOUNT_GROUPS.flatMap(g => g.accounts).find(a => a.id === selectedId);
                navigate('/set-up-account', { state: { account: selectedAccount } });
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpenAccount;
