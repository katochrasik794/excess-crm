// transfer.jsx
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeftRight, Lock, ChevronDown } from "lucide-react";
import TopContainer from "./TopContainer";
import Footer from "./Footer";
import VerifyContactModal from "./VerifyContactModal";

// ----- DATA -----

// Transfer method data
const transferMethods = [
  {
    name: "Between your accounts",
    icon: ArrowLeftRight,
    processingTime: "Instant - 1 day",
    fee: "0%",
    limits: "1 - 1,000,000 USD",
    isAvailable: false,
  },
];

// PaymentMethodCard Component
const PaymentMethodCard = ({ method, onClick }) => {
  const Icon = method.icon;
  const isAvailable = method.isAvailable;

  return (
    <div
      onClick={onClick}
      className={`
        h-full flex flex-col rounded-md 
        border border-gray-200 bg-white 
        px-5 py-4 sm:px-6 sm:py-5
        shadow-[0_0_0_1px_rgba(15,23,42,0.02)]
        hover:shadow-lg
        cursor-pointer
        transition-shadow duration-200
      `}
    >
      {/* Header: icon + name + unavailable */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          {/* Icon */}
          <div className="mr-3 w-10 h-10 flex items-center justify-center filter grayscale">
            <Icon className="w-6 h-6 text-gray-500" />
          </div>

          {/* Name */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">
            {method.name}
          </h3>
        </div>

        {!isAvailable && (
          <div className="relative group">
            <div className="flex items-center text-xs sm:text-sm font-medium text-[#f3b100] whitespace-nowrap mt-2">
              <Lock className="w-3 h-3 mr-1" />
              Unavailable
            </div>
            {/* Tooltip */}
            <div className="absolute top-8 left-1/5 transform -translate-x-1/2 bg-white text-gray-900 text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-200 shadow-lg">
              You need to complete the verification
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white border-l border-t border-gray-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Details with left gap */}
      <div className="space-y-1 text-xs sm:text-sm text-gray-700 pl-12">
        <p>
          <span className="font-medium text-gray-800">Processing time:</span>{' '}
          {method.processingTime}
        </p>
        <p>
          <span className="font-medium text-gray-800">Fee:</span> {method.fee}
        </p>
        <p>
          <span className="font-medium text-gray-800">Limits:</span> {method.limits}
        </p>
      </div>
    </div>
  );
};

// Transfer Component
const Transfer = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [transferAmount, setTransferAmount] = useState("");

  // Auto-select transfer method if coming from CryptoWallet
  useEffect(() => {
    if (location.state?.selectedCrypto) {
      // For transfer, we just set the transfer method as available
      const transferMethod = transferMethods[0];
      if (transferMethod) {
        // Use setTimeout to avoid synchronous state update
        setTimeout(() => {
          setSelectedMethod(transferMethod);
        }, 0);
      }
    }
  }, [location.state]);

  const handleBackToAll = () => setSelectedMethod(null);

  // const parsedAmount = parseFloat(transferAmount || "0") || 0;
  // const formattedAmount = parsedAmount.toFixed(2);

  return (
    <div className="min-h-screen bg-white px-4 py-2 sm:px-6 lg:px-10 xl:px-16 font-sans">
      <div className="mx-auto">
        {!selectedMethod ? (
          <>
            {/* Header for list view */}
            <header className="mb-8 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Transfer
              </h1>
              <p className="text-lg text-gray-600">
                Move funds between your trading accounts
              </p>
            </header>

            {/* Transfer Methods Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {transferMethods.map((method, index) => (
                <PaymentMethodCard
                  key={index}
                  method={method}
                  onClick={() => setSelectedMethod(method)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Header for single method view */}
            <header className="mb-8 sm:mb-10 flex flex-col items-start gap-4">
              <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">
                Transfer
              </h1>
              <button
                type="button"
                onClick={handleBackToAll}
                className="text-sm font-medium text-blue-400 hover:underline"
              >
                See all transfer methods
              </button>
            </header>

            {/* Selected transfer method + verify message */}
            <div className="max-w-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Method
              </label>

              {/* Fake select showing selected method */}
              <div className="relative mb-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 flex items-center justify-between bg-white text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                      <selectedMethod.icon className="w-6 h-6 text-gray-500" />
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                      {selectedMethod.name}
                    </span>
                  </span>

                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-84 overflow-y-auto">
                    {transferMethods.map((method, index) => (
                      <div
                        key={index}
                        onClick={() => { setSelectedMethod(method); setIsOpen(false); }}
                        className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                          <method.icon className="w-6 h-6 text-gray-500" />
                        </span>

                        <span className="text-sm font-medium text-gray-900">{method.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              
              {/* <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Transfer
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 pr-16 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm text-gray-500">
                    USD
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedMethod.limits}
                </p>
              </div>

              
              <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 px-4 py-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Total to transfer</span>
                <span className="font-semibold text-gray-900">
                  {formattedAmount} USD
                </span>
              </div> */}

              {/* Verify profile box */}
              <div className="rounded-md border border-red-100 bg-red-50 px-6 py-5 sm:px-7 sm:py-6">
                <p className="text-sm text-gray-800 mb-4">
                  Please verify your profile to use this transfer method.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-6 py-2.5 rounded-md bg-[#ffde02] text-sm font-semibold text-gray-900 shadow hover:bg-yellow-300/80 focus:outline-none cursor-pointer"
                >
                  Verify profile
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <VerifyContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

// ----- MAIN PAGE -----

const TransferPage = () => {
  return (
    <>
      <TopContainer />
      <Transfer />
      <Footer />
    </>
  );
};

export default TransferPage;
