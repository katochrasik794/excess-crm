import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Eye, EyeOff, Check, Circle, ExternalLink, Info } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import TopContainer from '../../components/TopContainer';

const mockAccounts = {
  Real: [
    {
      id: 1,
      accountType: "Standard",
      mt5Login: "#123456789",
      balance: "1,250.00 USD",
      platform: "MT5",
      server: "EU1",
      freeMargin: "1,000.00 USD",
      actualLeverage: "1:100",
      adjustLeverage: "1:200",
      equity: "1,250.00 USD",
      floatingPnL: "0.00 USD",
    },
  ],
  Demo: [
    {
      id: 2,
      accountType: "Demo",
      mt5Login: "#987654321",
      balance: "0.00 USD",
      platform: "MT5",
      server: "DEMO1",
      freeMargin: "0.00 USD",
      actualLeverage: "1:500",
      adjustLeverage: "1:500",
      equity: "0.00 USD",
      floatingPnL: "0.00 USD",
    },
  ],
  Archived: [
    {
      id: 8,
      accountType: "Standard",
      mt5Login: "#195971218",
      balance: "0.00 USD",
      platform: "MT5",
      server: "ARCH1",
      freeMargin: "0.00 USD",
      actualLeverage: "1:100",
      adjustLeverage: "1:100",
      equity: "0.00 USD",
      floatingPnL: "0.00 USD",
      reason: "Account archived due to inactivity",
    },
  ],
};

const SetUpAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accountData = location.state?.account;

  const isStandardCent = accountData?.id === 'standard-cent';
  const isPro = accountData?.id === 'pro';

  // Initialize accountType based on whether it's Standard Cent
  const [accountType, setAccountType] = useState(isStandardCent ? 'real' : 'demo');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('USD - United States Dollar');
  const [executionType, setExecutionType] = useState('market');

  // Update accountType if accountData changes (e.g. navigation)
  React.useEffect(() => {
    if (isStandardCent) {
      setAccountType('real');
    }
  }, [isStandardCent]);

  // Password validation checks
  const hasLength = password.length >= 8 && password.length <= 15;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (!hasLength || !hasUpperLower || !hasNumber || !hasSpecial) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    const formData = new FormData(e.target);
    
    const newAccount = {
      id: Date.now(),
      accountType: accountData ? accountData.name : "Standard",
      mt5Login: "#" + Math.floor(100000000 + Math.random() * 900000000),
      balance: accountType === 'demo' 
        ? `${(formData.get('startingBalance') || "500").replace(/,/g, '')}.00 ${currency.split(' ')[0]}` 
        : `0.00 ${currency.split(' ')[0]}`,
      platform: formData.get('platform') || "MT5",
      server: accountType === 'real' ? "REAL1" : "DEMO1",
      freeMargin: "0.00 USD",
      actualLeverage: formData.get('leverage') || (accountData?.maxLeverage || "1:2000"),
      adjustLeverage: formData.get('leverage') || (accountData?.maxLeverage || "1:2000"),
      equity: "0.00 USD",
      floatingPnL: "0.00 USD",
      nickname: formData.get('nickname') || (accountData ? accountData.name : "Standard"),
    };

    const saved = localStorage.getItem('exness_accounts');
    const accounts = saved ? JSON.parse(saved) : mockAccounts;

    if (accountType === 'real') {
      if (!accounts.Real) accounts.Real = [];
      accounts.Real.unshift(newAccount);
    } else {
      if (!accounts.Demo) accounts.Demo = [];
      accounts.Demo.unshift(newAccount);
    }

    localStorage.setItem('exness_accounts', JSON.stringify(accounts));
    navigate('/');
  };

  return (
    <>
    <TopContainer />
    <div className="flex flex-col w-full p-6">
      {/* Header */}
      <div className="flex items-center">
        <button 
          className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => navigate('/open-account')}
        >
          <ArrowLeft className="w-6 h-6  text-gray-600" />
        </button>
        <h1 className="text-2xl lg:text-[32px] font-bold text-gray-900">Set up your account</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl">
        {/* Main Form Area */}
        <div className="flex-1 bg-white p-6">
          
          {/* Account Type Toggle */}
          <div className="mb-6">
            <div className="flex bg-white border border-gray-300 p-1 rounded-lg mb-2">
              <button
                onClick={() => !isStandardCent && setAccountType('demo')}
                disabled={isStandardCent}
                className={`flex-1 py-2 text-sm font-medium rounded-sm transition-all cursor-pointer ${
                  accountType === 'demo'
                    ? 'bg-[#F9F9F9] text-gray-900'
                    : isStandardCent 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Demo
              </button>
              <button
                onClick={() => setAccountType('real')}
                className={`flex-1 py-2 text-sm font-medium rounded-sm transition-all cursor-pointer ${
                  accountType === 'real'
                    ? 'bg-[#F9F9F9] text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Real
              </button>
            </div>

            <p className="text-sm text-gray-500">
              {accountType === 'demo' 
                ? "Risk-free account. Trade with virtual money" 
                : "Trade with real money and withdraw any profit you may make"}
            </p>
          </div>

          {/* Form Fields */}
          <form className="space-y-6" onSubmit={handleCreateAccount}>
            
            {/* Currency */}
            <div className="relative">
              <label className="block text-xs text-gray-500 mb-1">Currency *</label>
              <div className="relative">
                <select 
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>AED – United Arab Emirates Dirham</option>
                  <option>ARS – Argentine Peso</option>
                  <option>AUD – Australian Dollar</option>
                  <option>AZN – Azerbaijani Manat</option>
                  <option>BDT – Bangladeshi Taka</option>
                  <option>BHD – Bahraini Dinar</option>
                  <option>BND – Brunei Dollar</option>
                  <option>BRL – Brazilian Real</option>
                  <option>CAD – Canadian Dollar</option>
                  <option>CHF – Swiss Franc</option>
                  <option>CNY – Chinese Yuan (Renminbi)</option>
                  <option>EGP – Egyptian Pound</option>
                  <option>EUR – Euro</option>
                  <option>GBP – Pound Sterling</option>
                  <option>GHS – Ghanaian Cedi</option>
                  <option>HKD – Hong Kong Dollar</option>
                  <option>HUF – Hungarian Forint</option>
                  <option>IDR – Indonesian Rupiah</option>
                  <option>INR – Indian Rupee</option>
                  <option>JOD – Jordanian Dinar</option>
                  <option>JPY – Japanese Yen</option>
                  <option>KES – Kenyan Shilling</option>
                  <option>KRW – South Korean Won</option>
                  <option>KWD – Kuwaiti Dinar</option>
                  <option>KZT – Kazakhstan Tenge</option>
                  <option>MAD – Moroccan Dirham</option>
                  <option>MBT – MicroBitcoin</option>
                  <option>MXN – Mexican Peso</option>
                  <option>MYR – Malaysian Ringgit</option>
                  <option>NGN – Nigerian Naira</option>
                  <option>NZD – New Zealand Dollar</option>
                  <option>OMR – Omani Rial</option>
                  <option>PHP – Philippine Peso</option>
                  <option>PKR – Pakistani Rupee</option>
                  <option>QAR – Qatari Riyal</option>
                  <option>SAR – Saudi Riyal</option>
                  <option>SGD – Singapore Dollar</option>
                  <option>THB – Thai Baht</option>
                  <option>UAH – Ukrainian Hryvnia</option>
                  <option>UGX – Ugandan Shilling</option>
                  <option>USD – United States Dollar</option>
                  <option>UZS – Uzbekistan Som</option>
                  <option>VND – Vietnamese Dong</option>
                  <option>XOF – CFA Franc BCEAO</option>
                  <option>ZAR - South African Rand</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Execution Type - Only for Pro */}
            {isPro && (
              <div>
                <label className="block text-xs text-gray-500 mb-2">Execution type</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="executionType"
                        value="market"
                        checked={executionType === 'market'}
                        onChange={(e) => setExecutionType(e.target.value)}
                        className="w-5 h-5 border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                    </div>
                    <span className="text-sm text-gray-900">Market</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="executionType"
                        value="instant"
                        checked={executionType === 'instant'}
                        onChange={(e) => setExecutionType(e.target.value)}
                        className="w-5 h-5 border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                    </div>
                    <span className="text-sm text-gray-900">Instant</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </label>
                </div>
              </div>
            )}

            {/* Starting Balance - Only for Demo */}
            {accountType === 'demo' && (
              <div>
                <label className="block text-xs text-gray-900 mb-1">Starting balance *</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                  defaultValue="500"
                  name="startingBalance"
                />
              </div>
            )}

            {/* Nickname */}
            <div>
              <label className="block text-xs text-gray-900 mb-1">Nickname *</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Give this account a custom name"
                defaultValue={accountData ? accountData.name : "Standard"}
                maxLength={36}
                name="nickname"
              />
              <div className="flex justify-between mt-1">
                 <span className="text-xs text-gray-400">Nicknames can't contain special characters: &lt;&gt;"'&?^*#@</span>
                 <span className="text-xs text-gray-400">8/36</span>
              </div>
            </div>

            {/* Max Leverage */}
            <div className="relative">
              <label className="block text-xs text-gray-900 mb-1">Max leverage *</label>
              <div className="relative">
                <select className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                  <option>{accountData?.maxLeverage || "1:2000"}</option>
                  <option>1:1000</option>
                  <option>1:500</option>
                  <option>1:200</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Platform */}
            <div className="relative">
              <label className="block text-xs text-gray-900 mb-1">Platform *</label>
              <div className="relative">
                <select className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                  <option>MT5</option>
                  <option>MT4</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Trading Password */}
            <div>
              <label className="block text-xs text-gray-900 mb-1">Trading password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  {hasLength ? <Check className="w-4 h-4 text-green-500" /> : <Circle className="w-2 h-2 text-gray-300 ml-1 mr-1" />}
                  <span className={`text-xs ${hasLength ? 'text-green-700' : 'text-gray-900'}`}>Between 8-15 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasUpperLower ? <Check className="w-4 h-4 text-green-500" /> : <Circle className="w-2 h-2 text-gray-300 ml-1 mr-1" />}
                  <span className={`text-xs ${hasUpperLower ? 'text-green-700' : 'text-gray-900'}`}>At least one upper and one lower case letter</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumber ? <Check className="w-4 h-4 text-green-500" /> : <Circle className="w-2 h-2 text-gray-300 ml-1 mr-1" />}
                  <span className={`text-xs ${hasNumber ? 'text-green-700' : 'text-gray-900'}`}>At least one number</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasSpecial ? <Check className="w-4 h-4 text-green-500" /> : <Circle className="w-2 h-2 text-gray-300 ml-1 mr-1" />}
                  <span className={`text-xs ${hasSpecial ? 'text-green-700' : 'text-gray-900'}`}>At least one special character</span>
                </div>
              </div>
            </div>

            {/* Contract Specifications Link */}
            {/* <div className="flex items-center gap-1">
                <a href="#" className="text-sm text-blue-600 hover:underline">Contract specifications</a>
                <ExternalLink className="w-4 h-4 text-blue-600" />
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ffde02] text-gray-900 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors shadow-sm cursor-pointer"
            >
              Create account
            </button>

          </form>
        </div>

        {/* Right Side Panel - Account Details */}
        <div className="w-full lg:w-80">
           <div className="mt-6 bg-white px-6 border-l border-gray-300 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{accountData ? accountData.name : "Standard"}</h3>
              
              <div className="space-y-4">
                {accountType === 'real' && (
                  <div className="flex flex-col justify-between">
                    <span className="text-sm text-gray-500">Min deposit</span>
                    <span className="text-sm font-medium text-gray-900">{accountData?.minDeposit || "10 USD"}</span>
                  </div>
                )}
                <div className="flex flex-col justify-between ">
                  <span className="text-sm text-gray-500">Min spread</span>
                  <span className="text-sm font-medium text-gray-900">{accountData?.minSpread || "0.20 pips"}</span>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-sm text-gray-500">Max leverage</span>
                  <span className="text-sm font-medium text-gray-900">{accountData?.maxLeverage || "1:Unlimited"}</span>
                </div>
                <div className="flex flex-col justify-between ">
                  <span className="text-sm text-gray-500">Commission</span>
                  <span className="text-sm font-medium text-gray-900">{accountData?.commission || "No commission"}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default SetUpAccount;
