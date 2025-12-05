// src/pages/security/VirtualPrivateServer.jsx
import React from "react";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

// Simple progress bar component
const ProgressBar = ({ value = 0, max = 100, labelLeft, labelCenter, labelRight }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "rgba(0,0,0,0.08)" }}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>{labelLeft ?? "0 USD"}</span>
        {labelCenter ? <span className="mx-auto">{labelCenter}</span> : null}
        <span>{labelRight ?? `${max.toLocaleString()} USD`}</span>
      </div>
    </div>
  );
};

const InfoRowNumber = ({ number, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
        {number}
      </div>
    </div>

    <div className="flex-1">
      <div className="text-gray-700">{children}</div>
    </div>
  </div>
);

const VirtualPrivateServer = () => {
  // Example values — replace with real values from props/state as needed
  const accountBalance = 0;
  const requiredBalanceForImmediate = 2000;
  const requiredBalanceForAlt = 500;
  const tradingVolumeRequired = 1500000;

  return (
    <>
      <TopContainer />

      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-10  mx-auto">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
              Virtual Private Server
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-3xl">
              Virtual Private Servers allow you to run automated trading strategies with fast and
              reliable execution.{" "}
              <a href="#" className="text-blue-600 underline">
                Read more
              </a>
            </p>
          </div>

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Top notice */}
            <div className="flex items-start gap-4 mb-4">
              {/* warning icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="h-9 w-9 rounded-full bg-yellow-50 flex items-center justify-center border border-yellow-200">
                  <svg
                    className="h-5 w-5 text-yellow-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.683-1.36 3.448 0l6.518 11.58c.75 1.333-.188 2.99-1.724 2.99H3.463c-1.536 0-2.474-1.657-1.725-2.99l6.519-11.58zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2.5a.9.9 0 01.9.9v1.6a.9.9 0 11-1.8 0v-1.6a.9.9 0 01.9-.9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-gray-900 font-medium">You do not currently qualify for a free VPS</div>
                <div className="mt-2 text-sm text-gray-600">
                  To qualify for a free VPS, you need to meet one of the following criteria:
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Criterion 1 */}
              <div className="space-y-3">
                <InfoRowNumber number={1}>
                  <p>
                    Your balance across all your trading accounts needs to be at least{" "}
                    <span className="font-semibold">2,000 USD</span> to immediately qualify for a
                    free VPS. If your balance is between 500–1,999 USD, you can still get a free
                    VPS if you meet the trading volume requirements below.
                  </p>

                  <div className="mt-3 text-sm text-gray-600">
                    <div className="flex items-baseline justify-between">
                      <div>
                        Balance required: <span className="font-semibold">2,000 USD</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <ProgressBar
                        value={accountBalance}
                        max={requiredBalanceForImmediate}
                        labelLeft="0 USD"
                        labelCenter=""
                        labelRight={`${requiredBalanceForImmediate.toLocaleString()} USD`}
                      />
                    </div>
                  </div>
                </InfoRowNumber>
              </div>

              {/* OR pill */}
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 rounded-full border border-gray-200 text-sm text-gray-600">
                  OR
                </div>
              </div>

              {/* Criterion 2 */}
              <div className="space-y-3">
                <InfoRowNumber number={2}>
                  <p>
                    If your account balance is between 500–1,999 USD, your total trading volume
                    within the last 30 days needs to be equivalent to at least{" "}
                    <span className="font-semibold">1,500,000 USD</span>, in any currency or asset.
                  </p>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left column: balance small requirement */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">
                        Balance required: <span className="font-semibold">500 USD</span>
                      </div>
                      <ProgressBar
                        value={accountBalance}
                        max={requiredBalanceForAlt}
                        labelLeft="0 USD"
                        labelCenter="500 USD"
                        labelRight={`${requiredBalanceForImmediate.toLocaleString()} USD`}
                      />
                    </div>

                    {/* Right column: trading volume requirement */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">Trading Volume required:</div>
                        <div className="text-sm font-semibold">1,500,000 USD</div>
                      </div>

                      <div className="mt-3">
                        <ProgressBar
                          value={0}
                          max={tradingVolumeRequired}
                          labelLeft="0 USD"
                          labelCenter=""
                          labelRight={tradingVolumeRequired.toLocaleString()}
                        />
                      </div>
                    </div>
                  </div>
                </InfoRowNumber>
              </div>

              <div>
                <a href="#" className="text-sm text-blue-600 underline">
                  More about VPS requirements
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* VPS Benefits Section */}
        <div className="px-4 sm:px-6 lg:px-10 w-full max-w-7xl mx-auto">
            <div className="mt-16  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

  {/* Speed */}
  <div>
    <div className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 9V5.25M8.25 9V5.25M3 9h18M3 9a9 9 0 1018 0M3 9h18"/>
      </svg>
    </div>
    <h3 className="font-semibold text-lg">Speed</h3>
    <p className="text-gray-600 text-sm mt-2">
      VPS servers are located in close proximity to Exness trading servers,
      ensuring fast and reliable execution.
    </p>
  </div>

  {/* Stability */}
  <div>
    <div className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18M5 10h14M7 10a5 5 0 015-5 5 5 0 015 5"/>
      </svg>
    </div>
    <h3 className="font-semibold text-lg">Stability</h3>
    <p className="text-gray-600 text-sm mt-2">
      Running your Expert Advisor on a VPS ensures seamless EA execution,
      regardless of your internet quality.
    </p>
  </div>

  {/* 24-hour trading */}
  <div>
    <div className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2M12 22a10 10 0 110-20 10 10 0 010 20z"/>
      </svg>
    </div>
    <h3 className="font-semibold text-lg">24-hour trading</h3>
    <p className="text-gray-600 text-sm mt-2">
      Trade the markets using Expert Advisors even when your own computer is turned off.
    </p>
  </div>

  {/* Mobility & portability */}
  <div>
    <div className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/>
      </svg>
    </div>
    <h3 className="font-semibold text-lg">Mobility & portability</h3>
    <p className="text-gray-600 text-sm mt-2">
      Access your account and trade from anywhere. VPS is available on any
      operating system.
    </p>
  </div>

</div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default VirtualPrivateServer;
