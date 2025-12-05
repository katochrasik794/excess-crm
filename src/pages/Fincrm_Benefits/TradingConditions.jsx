// src/components/TradingConditions.jsx
import React, { useState } from "react";
import { ChevronRight, X, ExternalLink } from "lucide-react";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

export default function TradingConditions() {
  const [openPopup, setOpenPopup] = useState(null); // "nbp" | "swap" | null

  return (
    <>
      <TopContainer />
      

        {/* MAIN SECTION */}
      <section className="">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">Trading Conditions</h1>
          <p className="text-sm text-gray-600 mb-8">
            Here's a list of the better-than-market trading conditions you can currently enjoy on your accounts.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CARD 1 */}
            <div className="relative bg-white border border-gray-200 rounded-lg p-8 ">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Negative Balance Protection</h3>
              <p className="text-sm text-gray-600 max-w-[90%]">
                You can never lose more money than you put into your account. If a stop out causes all your positions 
                to close in a negative balance, we will restore it to 0.
              </p>

              <button
                onClick={() => setOpenPopup("nbp")}
                className="absolute right-6 bottom-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-400 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* CARD 2 */}
            <div className="relative bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="max-w-[70%]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Swap-Free</h3>
                  <p className="text-sm text-gray-600">
                    No more overnight charges on selected instruments. Trade popular instruments without paying swaps.
                    Qualification depends on your trading activity.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                  Qualified
                </span>
              </div>

              <button
                onClick={() => setOpenPopup("swap")}
                className="absolute right-6 bottom-4 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center  hover:border-gray-400 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POPUPS */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-white w-full max-w-2xl rounded-md shadow-lg p-6 relative">
            
            {/* CLOSE ICON */}
            <button
              onClick={() => setOpenPopup(null)}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* POPUP CONTENT */}
            {openPopup === "nbp" && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Negative Balance Protection
                </h2>

                <p className="text-sm text-gray-700 mb-4">
                  You can never lose more money than you put into your account. If a stop out
                  causes all your positions to close in a negative balance, we will restore it to 0.
                </p>

                <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                  For example, if a trading account with a balance of $100 has its positions closed
                  with a loss of $150, the account will have a negative balance of -$50. With Negative 
                  Balance Protection, we will reset the balance to zero and you won’t need to cover the 
                  loss with your own money.
                </p>

                {/* OK BUTTON */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpenPopup(null)}
                    className="bg-[#ffde02] hover:bg-yellow-300/80 text-black px-6 py-2 rounded-md font-medium"
                  >
                    OK
                  </button>
                </div>
              </>
            )}

            {openPopup === "swap" && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Swap-Free</h2>

                <p className="text-sm text-gray-700 mb-4">
                  No more overnight charges. Trade popular instruments without paying swaps. 
                  Your qualification depends on your trading activity.
                </p>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-700">Swap-free status:</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                    Qualified
                  </span>
                </div>

                <div className="h-2 bg-emerald-500 rounded-full mb-6"></div>

                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  To qualify and maintain swap-free status, you need to trade primarily during the 
                  day and hold minimal overnight positions.
                </p>

                <p className="text-sm text-gray-700 mb-4">
                  Check the Help Center for a list of instruments available for swap-free trading.
                </p>

                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1 mb-8"
                >
                  Read more in our Help Center <ExternalLink className="w-4 h-4" />
                </a>

                {/* OK BUTTON */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpenPopup(null)}
                    className="bg-[#ffde02] hover:bg-yellow-300/80 text-black px-6 py-2 rounded-md font-medium"
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      
      
      <Footer />
    </>
  );
}
