import { useState } from 'react';
import { ChevronDown, Inbox, Info, TrendingUp } from 'lucide-react';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';
import { useAccounts } from '../../context/AccountContext';
import { useNavigate } from 'react-router-dom';

/* ------------------------- Tooltip Component ------------------------- */
const Tooltip = ({ text, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 top-6
          hidden group-hover:block
          whitespace-normal text-xs text-gray-700
          bg-white border border-gray-200 shadow-md 
          rounded p-2 w-64 z-20
        "
      >
        {text}
      </div>
    </div>
  );
};
/* --------------------------------------------------------------------- */

const Savings = () => {
  const { getAllActiveAccounts } = useAccounts();
  const navigate = useNavigate();
  const accountsData = getAllActiveAccounts();

  const [selectedAccount, setSelectedAccount] = useState(
    accountsData.active[0] || { accountType: 'Standard', mt5Login: '#196126793' }
  );
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  return (
    <>
      <TopContainer />

      <div className="min-h-screen bg-white  py-6">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-10 mx-auto">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Savings
          </h1>
          <span className="text-sm py-2">
            This shows you how much in dollars each trading benefit has saved you by either restoring losses, reducing trading costs or protecting you from stop outs.
          </span>

          {/* Account Dropdown */}
          <div className="my-6">
            <label className="block text-xs text-gray-600 mb-2">Account</label>
            <div className="relative w-full max-w-sm">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white text-left text-sm"
              >
                <span className="text-gray-900">
                  {selectedAccount.accountType} {selectedAccount.mt5Login}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    isAccountDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute z-10 left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {accountsData.active.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsAccountDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col">
                          <div className="font-medium text-sm text-gray-900 mb-1">
                            {account.accountType}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                              MT5
                            </span>
                            <div className="text-sm text-gray-500">
                              {account.accountType} {account.mt5Login}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4">
              <Inbox className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>

            <h2 className="text-md md:text-xl font-semibold text-gray-900 mb-2">
              You don't have any savings data yet
            </h2>

            <p className="text-sm text-gray-600 max-w-md text-center mb-6">
              Start trading to see how our better-than-market conditions reduce your
              trading costs and protect against stop outs.
            </p>

            <button
              onClick={() => navigate('/my-account')}
              className="flex items-center justify-center px-6 py-3 bg-[#ffde02] text-black font-medium rounded-sm hover:bg-yellow-500 transition-colors"
            >
              <TrendingUp className="w-5 h-5 mr-2" /> Start trading
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-10 mx-auto">
          <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
            AVAILABLE BENEFITS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base font-semibold text-gray-900">
                  Negative Balance Protection
                </h4>

                <Tooltip text="This feature ensures you never lose more money than you put into your account. If a stop out closes all your positions in a negative balance, we will restore it to 0. This screen shows how many times your balance was restored to 0, and the total amount of dollars credited to your account to do so.">
                  <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                </Tooltip>
              </div>

              <p className="text-sm text-gray-600">
                You can never lose more money than you put in your account. If your balance goes into the negative, we'll restore it back to 0.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base font-semibold text-gray-900">
                  Swap-Free
                </h4>

                <Tooltip text="We've removed overnight charges, known as swaps, on our most popular instruments. This screen shows how much our swap-free feature has saved you on your trading costs.">
                  <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                </Tooltip>
              </div>

              <p className="text-sm text-gray-600">
                No more overnight charges. Trade popular instruments without paying swaps.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Savings;
