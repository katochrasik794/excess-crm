// withdraw.jsx
import {useState} from "react";
import { Bitcoin, Lock, Wallet, Gem, ArrowLeftRight, CreditCard, ChevronDown } from "lucide-react";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";
import VerifyContactModal from "../../components/VerifyContactModal";

// ----- DATA -----

// All payment methods section
const allPaymentMethods = [
  {
    name: "Neteller",
    icon: (props) => (
      <img
        {...props}
        src="/neteller.png"
        alt="Neteller"
        className="w-7 h-7 grayscale-25"
      />
    ),
    processingTime: "Instant - 24 hours",
    fee: "0%",
    limits: "10 - 10,000 USD",
    isAvailable: true,
  },
  {
    name: "Skrill",
    icon: (props) => (
      <img
        {...props}
        src="/skrill.webp"
        alt="Skrill"
        className="w-7 h-7"
      />
    ),
    processingTime: "Instant - 24 hours",
    fee: "0%",
    limits: "10 - 12,000 USD",
    isAvailable: true,
  },
];

// Transfer section
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

// --- Data Structure for Payment Methods ---
const paymentMethods = [
  {
    name: 'Bank Card',
    icon: CreditCard,
    processingTime: 'Instant - 30 minutes',
    fee: '0%',
    limits: '10 - 10,000 USD',
    isAvailable: false,
  },
  {
    name: 'Bitcoin (BTC)',
    icon: (props) => (
      <img
        {...props}
        src="/Bitcoin.svg.webp"
        alt="Bitcoin"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 1 hour',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },
  {
    name: 'Ethereum (ETH)',
    icon: (props) => (
      <img
        {...props}
        src="/ethereum.png"
        alt="Ethereum"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },

  {
    name: 'TRON (TRX)',
    icon: (props) => (
      <img
        {...props}
        src="/tron.png"
        alt="TRON"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },
  {
    name: 'Tether (USDT BEP20)',
    icon: (props) => (
      <img
        {...props}
        src="/tether_bep20.png"
        alt="Tether BEP20"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },
  {
    name: 'Tether (USDT ERC20)',
    icon: (props) => (
      <img
        {...props}
        src="/tether_bep20.png"
        alt="Tether ERC20"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },
  {
    name: 'Tether (USDT TRC20)',
    icon: (props) => (
      <img
        {...props}
        src="/tether_tron.png"
        alt="Tether TRC20"
        className="w-8 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
    isAvailable: false,
  },
  {
    name: 'USD Coin (USDC BEP20)',
    icon: (props) => (
      <img
        {...props}
        src="/usd-coin.png"
        alt="USD Coin"
        className="w-7 h-7"
      />
    ),
    processingTime: 'Instant - 15 minutes',
    fee: '0%',
    limits: '10 - 200,000 USD',
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
            <Icon />
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

// Deposit Component
const Deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleBackToAll = () => setSelectedMethod(null);

  const parsedAmount = parseFloat(withdrawAmount || "0") || 0;
  const formattedAmount = parsedAmount.toFixed(2);

  const isMainMethod =
    selectedMethod &&
    allPaymentMethods.some((m) => m.name === selectedMethod.name);

  return (
    <div className="font-sans">
      <div className="mx-auto">
        {!selectedMethod ? (
          <>
            <div className="mx-auto">
              {/* Page title */}
              <header className="mb-4">
                <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-gray-900">
                  Withdrawal
                </h1>
              </header>

              {/* All payment methods */}
              <section className="mb-10">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold  text-gray-900 mb-4">
                  All payment methods
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {allPaymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.name}
                      method={method}
                      onClick={() => setSelectedMethod(method)}
                    />
                  ))}
                </div>
              </section>

              {/* Transfer */}
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                  Transfer
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {transferMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.name}
                      method={method}
                      onClick={() => setSelectedMethod(method)}
                    />
                  ))}
                </div>
              </section>

              {/* Verification required (crypto methods) */}
            </div>
            {/* Header for list view */}
            <header className="mb-8 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Verification required
              </h2>
            </header>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 ">
              {paymentMethods.map((method, index) => (
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
                Withdrawal
              </h1>
              <button
                type="button"
                onClick={handleBackToAll}
                className="text-sm font-medium text-blue-400 hover:underline"
              >
                See all payment methods
              </button>
            </header>

            {/* Selected payment method view */}
            {isMainMethod ? (
              // ---------- NETELLER / SKRILL WITHDRAWAL LAYOUT ----------
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 max-w-5xl">
                <div>
                  {/* Top row: Payment method + Currency */}
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment method
                      </label>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full border border-gray-300 rounded-md px-4 flex items-center justify-between bg-white text-left"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                              {(() => {
                                const Icon = selectedMethod.icon;

                                // If icon is a component from lucide-react
                                if (
                                  typeof Icon === "function" &&
                                  Icon?.name !== "img"
                                ) {
                                  return <Icon className="w-6 h-6 text-white " />;
                                }

                                // If icon is an <img> renderer
                                return <Icon className="w-7 h-7 object-contain " />;
                              })()}
                            </span>

                            <span className="text-sm font-medium text-gray-900">
                              {selectedMethod.name}
                            </span>
                          </span>

                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {isOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-92 overflow-y-auto">
                            <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                              All payment methods
                            </span>
                            {paymentMethods
                              .filter(
                                (m) =>
                                  m.name === 'Neteller' || m.name === 'Skrill'
                              )
                              .map((method, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setSelectedMethod(method);
                                    setIsOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                                >
                                  <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                                    {(() => {
                                      const Icon = method.icon;

                                      if (
                                        typeof Icon === "function" &&
                                        Icon?.name !== "img"
                                      ) {
                                        return <Icon className="w-6 h-6 text-white" />;
                                      }

                                      return <Icon className="w-7 h-7 object-contain" />;
                                    })()}
                                  </span>

                                  <span className="text-sm font-medium text-gray-900">
                                    {method.name}
                                  </span>
                                </div>
                              ))}
                            <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                              Transfer
                            </span>
                            {transferMethods.map((method, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  setSelectedMethod(method);
                                  setIsOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                              >
                                <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                                  {(() => {
                                    const Icon = method.icon;
                                    return <Icon className="w-6 h-6" />;
                                  })()}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {method.name}
                                </span>
                              </div>
                            ))}
                            <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                              Verification required
                            </span>
                            {paymentMethods
                              .filter(
                                (m) =>
                                  m.name !== 'Neteller' && m.name !== 'Skrill'
                              )
                              .map((method, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setSelectedMethod(method);
                                    setIsOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                                >
                                  <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                                    {(() => {
                                      const Icon = method.icon;

                                      if (
                                        typeof Icon === "function" &&
                                        Icon?.name !== "img"
                                      ) {
                                        return <Icon className="w-6 h-6 text-white" />;
                                      }

                                      return <Icon className="w-7 h-7 object-contain " />;
                                    })()}
                                  </span>

                                  <span className="text-sm font-medium text-gray-900">
                                    {method.name}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 flex items-center justify-between bg-white text-left"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            USD
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* From account */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From account
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 flex items-center justify-between bg-white text-left"
                      >
                        <span className="flex items-center gap-3 text-sm text-gray-900">
                          <span className="px-2 py-1 rounded border border-gray-300 text-xs font-medium bg-gray-50">
                            MT5
                          </span>
                          196126793
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
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

                  {/* To be withdrawn */}
                  <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 px-4 py-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600">To be withdrawn</span>
                    <span className="font-semibold text-gray-900">
                      {formattedAmount} USD
                    </span>
                  </div>

                  {/* Continue button */}
                  <button
                    type="button"
                    disabled={parsedAmount <= 0}
                    className={`px-6 py-2.5 rounded-md text-sm font-semibold shadow focus:outline-none ${
                      parsedAmount > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>

                {/* Terms + FAQ */}
                <aside className="lg:pl-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Terms
                  </h2>
                  <div className="space-y-2 text-sm text-gray-700 mb-8">
                    <div className="flex items-center justify-between">
                      <span>Average payment time</span>
                      <span className="font-medium">Instant</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fee</span>
                      <span className="font-medium">0%</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    FAQ
                  </h2>
                  <ul className="space-y-2 text-sm text-blue-500">
                    <li>
                      <button type="button" className="hover:underline">
                        How do I withdraw with {selectedMethod.name}?
                      </button>
                    </li>
                    <li>
                      <button type="button" className="hover:underline">
                        How do I verify my account?
                      </button>
                    </li>
                  </ul>
                </aside>
              </div>
            ) : (
              // ---------- EXISTING VERIFY PROFILE VIEW FOR OTHER METHODS ----------
              <div className="max-w-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>

                {/* Fake select showing selected method */}
                <div className="relative mb-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border border-gray-300 rounded-md px-4 py-1 flex items-center justify-between bg-white text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden ">
                        {(() => {
                          const Icon = selectedMethod.icon;

                          // If icon is a component from lucide-react
                          if (typeof Icon === "function" && Icon?.name !== "img") {
                            return <Icon className="w-6 h-6 text-white" />;
                          }

                          // If icon is an <img> renderer
                          return (
                            <Icon className="w-7 h-7 object-contain" />
                          );
                        })()}
                      </span>

                      <span className="text-sm font-medium text-gray-900">
                        {selectedMethod.name}
                      </span>
                    </span>

                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-92 overflow-y-auto">
                      <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                        All payment methods
                      </span>
                      {paymentMethods.filter(m => m.name === 'Neteller' || m.name === 'Skrill').map((method, index) => (
                        <div
                          key={index}
                          onClick={() => { setSelectedMethod(method); setIsOpen(false); }}
                          className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                        >
                          <span className="w-9 h-9 rounded-full  flex items-center justify-center overflow-hidden">
                            {(() => {
                              const Icon = method.icon;

                              // If icon is a component from lucide-react
                              if (typeof Icon === "function" && Icon?.name !== "img") {
                                return <Icon className="w-6 h-6 text-white" />;
                              }

                              // If icon is an <img> renderer
                              return (
                                <Icon className="w-7 h-7 object-contain" />
                              );
                            })()}
                          </span>

                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                        </div>
                      ))}
                      <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                        Transfer
                      </span>
                      {transferMethods.map((method, index) => (
                        <div
                          key={index}
                          onClick={() => { setSelectedMethod(method); setIsOpen(false); }}
                          className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                        >
                          <span className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                            {(() => {
                              const Icon = method.icon;
                              return <Icon className="w-6 h-6" />;
                            })()}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                        </div>
                      ))}
                      <span className='px-3 text-sm text-gray-500 font-medium block py-2'>
                        Verification required
                      </span>
                      {paymentMethods.filter(m => m.name !== 'Neteller' && m.name !== 'Skrill').map((method, index) => (
                        <div
                          key={index}
                          onClick={() => { setSelectedMethod(method); setIsOpen(false); }}
                          className="flex items-center gap-3 px-4 py-1 hover:bg-gray-50 cursor-pointer"
                        >
                          <span className="w-9 h-9 rounded-full  flex items-center justify-center overflow-hidden">
                            {(() => {
                              const Icon = method.icon;

                              // If icon is a component from lucide-react
                              if (typeof Icon === "function" && Icon?.name !== "img") {
                                return <Icon className="w-6 h-6 text-white" />;
                              }

                              // If icon is an <img> renderer
                              return (
                                <Icon className="w-7 h-7 object-contain" />
                              );
                            })()}
                          </span>

                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verify profile box */}
                <div className="rounded-md border border-red-100 bg-red-50 px-6 py-5 sm:px-7 sm:py-6">
                  <p className="text-sm text-gray-800 mb-4">
                    Please verify your profile to use this payment method.
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
            )}
          </>
        )}
      </div>

      <VerifyContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

// ----- MAIN PAGE -----

const Withdraw = () => {
  return (
    <>
      <TopContainer />

      <div className="bg-white px-4 sm:px-6 lg:px-10 xl:px-16 font-sans pb-10">
        <Deposit />
      </div>
      <Footer />
    </>
  );
};

export default Withdraw;
