import React, { useState } from 'react';
import { ChevronDown, ArrowDownCircle, ArrowRightLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';

// Cryptocurrency data
const cryptocurrencies = [
  {
    id: 'btc',
    name: 'Bitcoin (BTC)',
    symbol: 'BTC',
    balance: '0.00000000',
    usdValue: '0.00',
    icon: '₿',
    iconColor: 'text-orange-500',
  },
  {
    id: 'eth',
    name: 'Ether (ETH)',
    symbol: 'ETH',
    balance: '0.00000000',
    usdValue: '0.00',
    icon: '◆',
    iconColor: 'text-purple-500',
  },
  {
    id: 'usdt-bep20',
    name: 'Tether (USDT BEP20)',
    symbol: 'USDT',
    balance: '0.00',
    usdValue: '0.00',
    icon: '₮',
    iconColor: 'text-green-500',
  },
  {
    id: 'usdt-erc20',
    name: 'Tether (USDT ERC20)',
    symbol: 'USDT',
    balance: '0.00',
    usdValue: '0.00',
    icon: '₮',
    iconColor: 'text-green-500',
  },
  {
    id: 'usdt-trc20',
    name: 'Tether (USDT TRC20)',
    symbol: 'USDT',
    balance: '0.00',
    usdValue: '0.00',
    icon: '₮',
    iconColor: 'text-red-500',
  },
  {
    id: 'trx',
    name: 'Tronix (TRX)',
    symbol: 'TRX',
    balance: '0.000000',
    usdValue: '0.00',
    icon: '⊿',
    iconColor: 'text-red-500',
  },
  {
    id: 'usdc-bep20',
    name: 'USD Coin (USDC BEP20)',
    symbol: 'USDC',
    balance: '0.00',
   usdValue: '0.00',
    icon: '⊙',
    iconColor: 'text-blue-500',
  },
  {
    id: 'usdc-erc20',
    name: 'USD Coin (USDC ERC20)',
    symbol: 'USDC',
    balance: '0.00',
    usdValue: '0.00',
    icon: '⊙',
    iconColor: 'text-purple-500',
  },
];

// Cryptocurrency Card Component
const CryptoCard = ({ crypto, onWithdrawClick, onDepositClick, onTransferClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white hover:shadow-sm transition-shadow">
      {/* Mobile/Tablet Layout (below md breakpoint) */}
      <div className="md:hidden">
        {/* Icon and Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 ${crypto.iconColor} text-xl font-bold`}>
            {crypto.icon}
          </div>
          <div className="text-sm text-gray-700 font-medium">{crypto.name}</div>
        </div>
        
        {/* Balance */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {crypto.balance}
            </span>
            <span className="text-lg text-gray-600 font-medium">{crypto.symbol}</span>
          </div>
          <div className="text-sm text-gray-400 mt-1">≈ {crypto.usdValue} USD</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={() => onWithdrawClick(crypto)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowDownCircle className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xs text-gray-700">Withdrawal</span>
          </button>
          <button 
            onClick={() => onTransferClick(crypto)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowRightLeft className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xs text-gray-700">Transfer</span>
          </button>
          <button 
            onClick={() => onDepositClick(crypto)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffde02] flex items-center justify-center hover:bg-yellow-300 transition-colors">
              <Plus className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-xs text-gray-900 font-medium">Deposit</span>
          </button>
        </div>
      </div>

      {/* Desktop Layout (md breakpoint and above) */}
      <div className="hidden md:flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon, Name, and Balance */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 ${crypto.iconColor} text-xl font-bold`}>
              {crypto.icon}
            </div>
            <div className="text-sm text-gray-700 font-medium">{crypto.name}</div>
          </div>
          
          {/* Balance below icon and name */}
          <div className="flex items-center gap-2 pl-2">
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">
              {crypto.balance}
            </span>
            <span className="text-sm text-gray-600 font-medium">{crypto.symbol}</span>
            <span className="text-sm text-gray-400 ml-2">≈ {crypto.usdValue} USD</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => onWithdrawClick(crypto)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Withdrawal</span>
          </button>
          <button 
            onClick={() => onTransferClick(crypto)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Transfer</span>
          </button>
          <button 
            onClick={() => onDepositClick(crypto)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-[#ffde02] hover:bg-yellow-300 text-gray-900 text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Deposit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CryptoWallet = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [accountFilter, setAccountFilter] = useState('Account name');
  const navigate = useNavigate();

  const handleWithdrawClick = (crypto) => {
    // Navigate to withdraw page with the selected cryptocurrency
    navigate('/withdraw', { state: { selectedCrypto: crypto } });
  };

  const handleDepositClick = (crypto) => {
    // Navigate to deposit page with the selected cryptocurrency
    navigate('/deposit', { state: { selectedCrypto: crypto } });
  };

  const handleTransferClick = (crypto) => {
    // Navigate to transfer page with the selected cryptocurrency
    navigate('/transfer', { state: { selectedCrypto: crypto } });
  };

  return (
    <div className="min-h-screen bg-white">
      <TopContainer />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10  py-6">
        {/* Header Banner */}
      <div className="bg-[#e1ebe5] border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300">
              <span className="text-3xl">💰</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900">
                How to deposit with crypto
              </h3>
              <p className="text-sm text-gray-600">
                Check our our step-by-step guides on crypto deposits
              </p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700  border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Learn more
          </button>
        </div>
      </div>

        {/* Title and Balance */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Crypto wallet
          </h1>
          <div>
            <div className="text-sm text-gray-600 mb-1">Total balance</div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">
              0.00 <span className="text-xl text-gray-600">USD</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'accounts'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Accounts
            {activeTab === 'accounts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('external')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'external'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            External wallets
            {activeTab === 'external' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
        </div>

        {/* Conditional Content based on Active Tab */}
        {activeTab === 'accounts' ? (
          <>
            {/* Account Filter Dropdown */}
            <div className="mb-6">
              <div className="relative inline-block">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                   <span className="flex items-center gap-2">
                    <span className="text-gray-400">≡</span>
                    {accountFilter}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Cryptocurrency List */}
            <div className="space-y-4">
              {cryptocurrencies.map((crypto) => (
                <CryptoCard 
                  key={crypto.id} 
                  crypto={crypto} 
                  onWithdrawClick={handleWithdrawClick}
                  onDepositClick={handleDepositClick}
                  onTransferClick={handleTransferClick}
                />
              ))}
            </div>
          </>
        ) : (
          /* External Wallets Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              No external wallet added
            </h3>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CryptoWallet;
