// src/pages/profile/Profile.jsx
import React, { useState } from 'react';
import { User, Circle, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';

const InfoCard = ({ children }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    {children}
  </div>
);

const Step = ({ index, title, children, open, onToggle, disabled }) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
        aria-expanded={open}
        disabled={disabled}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
              open ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {index}
          </div>
          <div>
            <div className={`text-sm font-medium ${open ? 'text-gray-900' : 'text-gray-600'}`}>{title}</div>
          </div>
        </div>

        <div className="text-gray-400">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 pt-1 text-sm text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Profile() {
  const [openStep, setOpenStep] = useState(1);

  const toggleStep = (i) => {
    setOpenStep((prev) => (prev === i ? null : i));
  };

  // sample account data
  const depositLimit = '0 USD';
  const verificationProgress = '0/3 steps complete';

  return (
    <>
      <TopContainer />

      <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900 mb-6">Profile</h1>

          {/* Account header + cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left card: Verification status */}
              <InfoCard>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <User className="w-7 h-7 text-gray-500" />
                  </div>

                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="text-2xl font-semibold text-red-600 mt-1">Not verified</div>
                    <div className="text-sm text-gray-400 mt-1">{verificationProgress}</div>
                  </div>
                </div>
              </InfoCard>

              {/* Right card: Deposit limit */}
              <InfoCard>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="text-xs text-gray-500">Deposit limit</div>
                    <div className="text-2xl font-extrabold text-gray-900 mt-1">{depositLimit}</div>
                    <div className="text-sm text-gray-400 mt-1">Verify your account to unlock limits</div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100">
                      <DollarSign className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>

          {/* Verification steps */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Verification steps</h3>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Step 1 (expanded by default) */}
              <Step
                index={1}
                title="Confirm email and phone number. Add personal details"
                open={openStep === 1}
                onToggle={toggleStep}
              >
                <div className="text-xs text-gray-500 mb-3">Required to confirm</div>

                <div className="text-sm text-gray-700 mb-4">
                  <span className="text-gray-600">ro••••81@ekuali.com</span>
                  <span className="mx-3 text-gray-400">•</span>
                  <span className="text-gray-600">Add profile information</span>
                  <span className="mx-3 text-gray-400">•</span>
                  <span className="text-gray-600">Phone number</span>
                </div>

                <div className="text-sm text-gray-700 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Features and limits</div>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Withdrawals</li>
                  </ul>
                </div>

                <div>
                  <button className="px-5 py-3 rounded-md bg-[#ffde02]  text-black font-medium shadow-sm hover:yellow-300/80">
                    Complete now
                  </button>
                </div>
              </Step>

              {/* Step 2 */}
              <Step
                index={2}
                title="Identity verification"
                open={openStep === 2}
                onToggle={toggleStep}
              >
                {/* New content inserted as requested */}
                <div className="text-sm text-gray-700 mb-4">
                  Provide a document verifying your name
                </div>

                <div className="text-base font-medium text-gray-900 mb-4">Add profile information</div>

                <div className="text-sm text-gray-700 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Features and limits</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Deposits up to 10,000 USD</li>
                    <li>Global and local payment methods</li>
                    <li>Bank card and crypto payments</li>
                    <li>Trading</li>
                  </ul>
                </div>

                <div>
                  <button
                    disabled
                    className="px-5 py-3 rounded-md bg-white text-gray-400 font-medium border border-gray-200 cursor-not-allowed"
                  >
                    Verify now
                  </button>
                </div>
              </Step>

              {/* Step 3 */}
              <Step
                index={3}
                title="Residential address verification"
                open={openStep === 3}
                onToggle={toggleStep}
              >
                {/* New content inserted as requested */}
                <div className="text-sm text-gray-700 mb-4">
                  Provide proof of your place of residence
                </div>

                <div className="text-base font-medium text-gray-900 mb-4">Add profile information</div>

                <div className="text-sm text-gray-700 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Features and limits</div>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Unlimited deposits</li>
                  </ul>
                </div>

                <div>
                  <button
                    disabled
                    className="px-5 py-3 rounded-md bg-white text-gray-400 font-medium border border-gray-200 cursor-not-allowed"
                  >
                    Verify now
                  </button>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
