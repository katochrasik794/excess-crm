import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Eye,
  EyeOff,
  DollarSign,
  Zap,
  Clock,
  Briefcase,
  ArrowRight,
  Monitor,
  ChevronDown,
  Repeat2,
  Scale,
  User,
  Settings,
  File,
  KeyRound,
  Archive,
  EllipsisVertical,
  RotateCcw,
  Copy,
  Pencil,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronsUpDown,
  List,
  Grid3X3,
  Smartphone,
  Check,
} from "lucide-react";

import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";
import AdjustLeveragePopup from "../../components/AdjustLeveragePopup";

// Simple tab list used in the UI
const accountTabs = ["Real", "Demo", "Archived"];

// Minimal mock accounts used by the page. Keep shape consistent with the UI usage.
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
/**
 * Balance component
 * Renders a balance string like "1,500.00 USD" with:
 * - integer part bold and larger
 * - fractional part (after dot) smaller and normal weight
 * - currency part smaller and normal weight
 */
const Balance = ({ value = "", className = "" }) => {
  if (!value) return null;

  const [num = "", currency = ""] = value.split(" ");
  const dotIndex = num.lastIndexOf(".");
  const before = dotIndex !== -1 ? num.slice(0, dotIndex) : num;
  const after = dotIndex !== -1 ? num.slice(dotIndex) : "";

  return (
    <div className={className}>
      <span className="font-extrabold leading-none">{before}</span>
      {after && (
        <span className="ml-1 font-normal text-base align-baseline">
          {after}
        </span>
      )}
      {currency && (
        <span className="ml-3 font-normal text-sm text-gray-500">
          {currency}
        </span>
      )}
    </div>
  );
};

// --- Modals Components (Reused from previous step) ---

/**
 * Change Trading Password Modal
 */
const ChangeTradingPasswordModal = ({ isOpen, onClose, mt5Login }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordLength = password.length;

  if (!isOpen) return null;

  // Password requirements
  const requirements = [
    {
      label: "Between 8-15 characters",
      check: password.length >= 8 && password.length <= 15,
    },
    {
      label: "At least one uppercase letter",
      check: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      check: /[a-z]/.test(password),
    },
    {
      label: "At least one number",
      check: /\d/.test(password),
    },
    {
      label: "At least one special character",
      check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.check);

  // Helper to render password requirements list
  const RequirementItem = ({ label, check }) => (
    <li
      className={`flex items-center space-x-2 text-sm ${
        check ? "text-green-600" : "text-gray-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          check ? "bg-green-600" : "bg-gray-400"
        }`}
      ></span>
      <span>{label}</span>
    </li>
  );

  return (
    // Modal Backdrop
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 flex justify-between items-start">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Change trading <br/> password
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Input and Requirements) */}
        <div className="px-4 sm:px-5 md:px-6 space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-sm font-semibold text-gray-700">
            Account: <span className="text-gray-900">{mt5Login}</span>
          </p>

          {/* Password Input Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter new password"
              autoFocus
            />
            {/* Eye Icon to show/hide password */}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-2">
            <ul className="list-none p-0 space-y-1">
              <li className="flex justify-between items-start text-sm text-gray-500">
                {/* Length Requirement is handled slightly differently in the UI */}
                <span
                  className={`flex items-center space-x-2 ${
                    requirements[0].check ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      requirements[0].check ? "bg-green-600" : "bg-gray-400"
                    }`}
                  ></span>
                  <span>{requirements[0].label}</span>
                </span>
                <span
                  className={`font-medium ${
                    passwordLength > 15 ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {passwordLength}
                </span>
              </li>

              {/* Other requirements */}
              <RequirementItem
                label={requirements[1].label}
                check={requirements[1].check}
              />
              <RequirementItem
                label={requirements[2].label}
                check={requirements[2].check}
              />
              <RequirementItem
                label={requirements[3].label}
                check={requirements[3].check}
              />
            </ul>
          </div>
        </div>

        {/* Footer (Action Button) */}
        <div className="px-4 sm:px-5 md:px-6 pb-8 pt-2 flex justify-end">
          <button
            onClick={() => console.log("Password Changed!")}
            disabled={!allRequirementsMet}
            className={`px-4 sm:px-5 md:px-6 py-2 rounded-lg text-sm sm:text-base transition-colors shadow-md ${
              allRequirementsMet
                ? "bg-[#ffde02] text-gray-900 hover:bg-yellow-500"
                : "bg-[#ffde02] text-gray-900 cursor-not-allowed"
            }`}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Set Balance Modal
 */
const SetBalanceModal = ({
  isOpen,
  onClose,
  account,
  amount,
  setAmount,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] overflow-hidden flex flex-col">
        <div className="p-3 sm:p-4 md:p-6 pb-1 flex justify-between items-start">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
            Set balance for demo account
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 space-y-1">
          <p className="text-xs sm:text-sm text-gray-900">
            Account: {account ? account.mt5Login.replace("#", "") : ""}
          </p>
          <p className="text-xs sm:text-sm text-gray-900">Amount</p>
          <div className="relative w-full">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 text-gray-900 text-sm sm:text-base md:text-lg"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
              USD
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-6 pt-0 bg-gray-50 flex justify-end border-t border-gray-100">
          <button
            onClick={onApply}
            className="w-full sm:w-auto bg-[#ffde02] text-gray-900 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base hover:bg-yellow-500 transition-colors shadow-md"
          >
            Set Balance
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Spreads Strategy Modal (opens via "Pay less, keep more" banner)
 */
const SpreadsStrategyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 pb-3 sm:pb-4 flex justify-between items-start">
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900">
            Power your strategy with the best spreads
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Content) */}
        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 space-y-4 sm:space-y-5 md:space-y-6 overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh]">
          <p className="text-xs sm:text-sm text-gray-600">
            Pricing can make or break a strategy. That's why you deserve the
            best.
          </p>

          <div className="space-y-3">
            <p className="font-semibold text-gray-800 text-sm sm:text-base">Trade with:</p>
            <ul className="list-disc ml-5 text-xs sm:text-sm text-gray-700 space-y-2">
              <li>The tightest and most stable spreads on gold and USOIL.</li>
              <li>
                The most stable spreads on EURUSD, GBPUSD, and USDJPY after
                high-impact news.
              </li>
              <li>
                4x more stable spreads on BTCUSD than the industry average.
              </li>
              <li>67% reduced spreads on ETHUSD.</li>
            </ul>
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Verify our claims with full{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              data and disclosures
            </a>
            .
          </p>

          {/* Image Placeholder (Mimics the visual from the image) */}
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Mock background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-70"></div>
            {/* Mock icons for assets */}
            <DollarSign className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-500 absolute top-4 left-4 transform rotate-12 opacity-50" />
            <Zap className="w-14 sm:w-16 h-14 sm:h-16 text-blue-500 absolute bottom-6 right-6 transform -rotate-12 opacity-50" />

            {/* Placeholder for the person/graph image */}
            <div className="text-center p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300">
              <p className="font-bold text-base sm:text-lg text-gray-800">
                Trading Performance
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Visual Placeholder</p>
            </div>
          </div>
        </div>

        {/* Footer (Action Button) */}
        <div className="p-4 sm:p-5 md:p-6 pt-3 sm:pt-4 bg-gray-50 flex justify-end border-t border-gray-100">
          <button className="bg-[#ffde02] text-gray-900 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base hover:bg-yellow-500 transition-colors shadow-md">
            Trade
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Trade Selection Modal
 */
const TradeSelectionModal = ({ isOpen, onClose, mt5Login, platform }) => {
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [useAsDefault, setUseAsDefault] = useState(false);

  if (!isOpen) return null;

  // A helper component for each platform option
  const PlatformLink = ({ Icon, title, subtitle, onClick }) => (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 bg-gray-200/50  ">
      {/* Mocking the Exness Terminal Icon with a simple placeholder */}
      <div className="p-3 rounded-lg bg-black text-yellow-600">
        {Icon ? (
          <Icon className="w-5 h-5" />
        ) : (
          <span className="font-extrabold text-sm">Ex</span> // Mock Exness logo style
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <button
        onClick={onClick}
        className="text-gray-400 hover:text-gray-600 text-sm font-semibold flex items-center shrink-0"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const handleTerminalClick = (terminalName) => {
    // In a real app, this would navigate the user to the respective terminal
    console.log(`Action: Go to ${terminalName}`);
    // onClose(); // Optionally close the modal after action
  };

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 pb-3 sm:pb-4 flex justify-between items-start">
          <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-900">Trade</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Platforms) */}
        <div className="p-4 sm:p-5 md:p-6 pt-0 space-y-2 sm:space-y-3 overflow-y-auto">
          {/* Option 1: Exness Terminal */}
          <PlatformLink
            title="Exness terminal"
            subtitle="Trade directly from your browser"
            onClick={() => handleTerminalClick("Exness terminal")}
          />

          {/* Option 2: MetaTrader 5 */}
          <PlatformLink
            // Using Monitor icon as a generic platform visual placeholder
            Icon={Monitor}
            title={`${platform} Terminal`}
            subtitle="Download and install the MT5 platform"
            onClick={() => handleTerminalClick(platform + " Terminal")}
          />

          {/* Other options toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowOtherOptions(!showOtherOptions)}
              className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Other options
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                  showOtherOptions ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Expanded Content (QR Code & Web Terminal) */}
          {showOtherOptions && (
            <div className="pb-2 space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  Get the Exness Trade app
                </p>

                {/* Mock QR Code Placeholder */}
                <div className="w-28 sm:w-32 h-28 sm:h-32 mx-auto bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                  {/* Using Smartphone icon inside to represent the mobile app download */}
                  <Smartphone className="w-8 sm:w-10 h-8 sm:h-10 text-gray-500" />
                </div>

                <p className="text-xs sm:text-sm text-gray-500">Or trade on</p>

                {/* MT5 WebTerminal Button */}
                <button
                  onClick={() => handleTerminalClick("MT5 WebTerminal")}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                  MT5 WebTerminal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer (Default Terminal Checkbox) */}
        <div className="p-4 sm:p-5 md:p-6 pt-0 border-t border-gray-100">
          <div className="flex items-start space-x-3">
            <input
              id="default-terminal"
              type="checkbox"
              checked={useAsDefault}
              onChange={(e) => setUseAsDefault(e.target.checked)}
              className="mt-1 w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="default-terminal" className="text-xs sm:text-sm text-gray-700">
              Always use this terminal
              <p className="text-xs text-gray-500 mt-0.5">
                You can change this later in "Settings"
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Trading Hours Changes Modal
 */
const TradingHoursModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 pb-3 sm:pb-4 flex justify-between items-start">
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900">
            Changes to trading hours
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Content) */}
        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-xs sm:text-sm text-gray-600">
            Temporary changes are scheduled between 26.11.2025 - 01.12.2025
          </p>

          {/* Image/Icon Placeholder (Mocked 3D clock from the image) */}
          <div className="w-full h-36 sm:h-42 md:h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            {/* Using a larger Clock icon with a background to mimic the visual style */}
            <div className="p-6 sm:p-7 md:p-8 rounded-full bg-gray-200 text-gray-400 shadow-inner">
              <Clock className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16" />
            </div>
          </div>
        </div>

        {/* Footer (Action Button) */}
        <div className="p-4 sm:p-5 md:p-6 pt-3 sm:pt-4 bg-gray-50 flex justify-end border-t border-gray-100">
          <button className="bg-[#ffde02] text-gray-900 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base hover:bg-yellow-500 transition-colors shadow-md">
            View changes
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Account Dropdown Menu
 * This is the component that shows the menu items (Transfer funds, Adjust leverage, etc.)
 */


/**
 * Nickname Modal
 */
const NicknameModal = ({ isOpen, onClose, account }) => {
  const [nickname, setNickname] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 pb-2 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">Nickname</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-5 md:px-6 space-y-4">
          <p className="text-sm font-semibold text-gray-700">
            Account: <span className="text-gray-900">{account ? account.mt5Login.replace("#", "# ") : ""}</span>
          </p>
          <p className="text-sm text-gray-700">
            Give this account a custom name to find it faster.
          </p>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Account nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500 outline-none"
              placeholder="Give this account a custom name to find it faster."
            />
            <p className="text-xs text-gray-500 mt-1">
              Nicknames can't contain special characters: {'<>\"&?^*#@'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 md:p-6 flex justify-end">
          <button
            onClick={() => {
                console.log("Nickname saved:", nickname); 
                onClose();
            }}
            className="bg-[#ffde02] text-gray-900 px-6 py-2 rounded font-medium hover:bg-yellow-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Account Settings Modal
 */
const AccountSettingsModal = ({ isOpen, onClose, account }) => {
  if (!isOpen || !account) return null;

  // Helper for rows
  const SettingRow = ({ label, value, copy = false }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 border-dashed">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-base text-gray-900">{value}</span>
        {copy && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(value);
              // Maybe add a toast/tooltip here for feedback
            }}
            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 pb-2 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader */}
        <div className="px-4 sm:px-5 md:px-6 pb-2">
          <p className="text-sm font-semibold text-gray-700">
            Account: <span className="text-gray-900">{account.mt5Login.replace("#", "# ")}</span>
          </p>
        </div>

        {/* Body (List) */}
        <div className="px-4 sm:px-5 md:px-6 pb-6 pt-2">
          <SettingRow label="Nickname" value="Raghvendra Singh" /> {/* Mocked per image */}
          <SettingRow label="Type" value={account.accountType} />
          <SettingRow label="Actual leverage" value={account.actualLeverage} />
          <SettingRow label="Adjust leverage" value={account.adjustLeverage} />
          <SettingRow label="Balance" value={account.balance || "0.00 USD"} />
          <SettingRow label="Floating P/L" value={account.floatingPnL || "0.00 USD"} />
          <SettingRow label="Server" value={account.server + "Real31"} copy /> {/* Appended Real31 to match image style slightly, or just use server */}
          <SettingRow label="Login" value={account.mt5Login.replace("#", "")} copy />
        </div>
      </div>
    </div>
  );
};

/**
 * Read Only Access Modal
 */
const ReadOnlyAccessModal = ({ isOpen, onClose, account }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen || !account) return null;

  // Password requirements
  const requirements = [
    {
      label: "Between 8-15 characters",
      check: password.length >= 8 && password.length <= 15,
    },
    {
      label: "At least one upper and one lower case letter",
      check: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      label: "At least one number",
      check: /\d/.test(password),
    },
    {
      label: "At least one special character",
      check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.check);

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 pb-2 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">Share read-only access</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader */}
        <div className="px-4 sm:px-5 md:px-6 pb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Account: <span className="text-gray-900">{account.mt5Login.replace("#", "# ")}</span>
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            You can share readonly access to your trading account to show
            investors how you perform.
          </p>
        </div>

        {/* Body (Input + Requirements) */}
        <div className="px-4 sm:px-5 md:px-6 pb-6">
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 pr-10 text-sm focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            />
            <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </div>
          </div>

          <ul className="space-y-1">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs text-gray-500">
                <div className="mr-2 mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0">
                  {req.check ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full border border-gray-400"></div>
                  )}
                </div>
                <span className={req.check ? "text-green-600" : ""}>{req.label}</span>
                 {index === 0 && <span className="ml-auto">{password.length}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
         <div className="p-4 sm:p-5 md:p-6 flex justify-end">
          <button
            disabled={!allRequirementsMet}
             onClick={() => {
                console.log("Read only access set");
                onClose();
             }}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              allRequirementsMet 
              ? "bg-[#ffde02] text-gray-900 hover:bg-yellow-500" 
              : "bg-[#ffde02] text-gray-900 opacity-50 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Manage Statements Modal
 */
const ManageStatementsModal = ({ isOpen, onClose, account }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 pb-2 flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">Manage your statements</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader */}
        <div className="px-4 sm:px-5 md:px-6 pb-2">
          <p className="text-sm font-semibold text-gray-700">
            Account: <span className="text-gray-900">{account.mt5Login.replace("#", "# ")}</span>
          </p>
        </div>

        {/* content */}
        <div className="px-4 sm:px-5 md:px-6 pb-6 pt-2 space-y-4">
            <p className="text-sm text-gray-700">
                Select the accounts for which you would like to receive email trading statements.
            </p>

            <div>
                <p className="text-sm text-gray-700 mb-2">Send me statements:</p>
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        id="statement-checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <label htmlFor="statement-checkbox" className="text-sm text-gray-700">
                        Raghvendra Singh / {account.mt5Login.replace("#", "")}
                    </label>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 md:p-6 flex justify-end">
          <button
            onClick={() => {
                console.log("Statements saved:", isChecked);
                onClose();
            }}
            className="bg-[#ffde02] text-gray-900 px-6 py-2 rounded font-medium hover:bg-yellow-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Account Dropdown Menu
 * This is the component that shows the menu items (Transfer funds, Adjust leverage, etc.)
 */
const AccountDropdownMenu = ({
  account,
  isDemo,
  onPasswordChange,
  onAdjustLeverage,
  onEditNickname,
  onOpenSettings,
  onSetReadOnly,
  onManageStatements,
  onArchive,
  onRestore,
  onClose,
  isArchived,
  onTradeClick,
  showHeaderActions,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  // Action handler for "Change trading password"
  const handlePasswordChange = () => {
    onPasswordChange(account); // Pass the entire account object for context
    onClose();
  };

  // Define menu items based on the active account type (Real/Demo)
  const menuItems = [
    {
      label: "Transfer funds",
      icon: Repeat2,
      hideForDemo: true,
      onClick: () => {
        navigate("/transfer");
        onClose();
      },
    },
    {
      label: "Adjust leverage",
      icon: Scale,
      onClick: () => { onAdjustLeverage(account); onClose(); },
    },
    {
      label: "Add or edit nickname",
      icon: User,
      onClick: () => { onEditNickname(account); onClose(); },
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => { onOpenSettings(account); onClose(); },
    },
    {
      label: "Set read-only access",
      icon: Eye,
      onClick: () => { onSetReadOnly(account); onClose(); },
    },
    {
      label: "Manage your statements",
      icon: File,
      hideForDemo: true,
      onClick: () => { onManageStatements(account); onClose(); },
    },
    {
      label: "Change trading password",
      icon: KeyRound,
      onClick: handlePasswordChange,
    },
    {
      label: "Archive",
      icon: Archive,
      onClick: () => { onArchive(account); onClose(); },
    },
    {
      label: "Restore",
      icon: RotateCcw,
      onClick: () => { onRestore(account); onClose(); },
    },
  ];

  return (
    <div className="absolute right-0 top-10 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 py-2 origin-top-right animate-in fade-in zoom-in-95">
      {showHeaderActions && (
        <div className="flex justify-around items-center px-2 pb-2 mb-2 border-b border-gray-100">
           {/* Trade */}
           <div className="flex flex-col items-center cursor-pointer group" onClick={() => { onTradeClick(account); onClose(); }}>
              <div className="w-10 h-10 rounded-full bg-[#ffde02] flex items-center justify-center cursor-pointer text-black mb-1 group-hover:bg-yellow-400 transition-colors">
                 <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Trade</span>
           </div>
           
           {/* Deposit */}
           {/* Only show Deposit/Withdraw for Real accounts or mimic logic? The image shows them. Detailed logic: isDemo? 
               If isDemo, we usually show "Set Balance". But the user asked for "create same as it is".
               In Grid View, "Set Balance" is missing from card too. 
               Let's assume we show them. If Demo, maybe "Deposit" redirects to generic deposit or alerts. 
               Actually, for Demo, usually we show "Set Balance". 
               Let's follow the image structure for now. */}
           <div className="flex flex-col items-center cursor-pointer group" onClick={() => { navigate("/deposit"); onClose(); }}>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-1 group-hover:bg-gray-200 transition-colors ">
                 <ArrowDownCircle className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Deposit</span>
           </div>

           {/* Withdraw */}
           <div className="flex flex-col items-center cursor-pointer group" onClick={() => { navigate("/withdraw"); onClose(); }}>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-1 group-hover:bg-gray-200 transition-colors">
                 <ArrowUpCircle className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Withdraw</span>
           </div>
        </div>
      )}
      <ul className="divide-y divide-gray-50">
        {menuItems
          .filter((item) => {
             // Logic to filter menu items based on account state
             if (isArchived) {
                 // specific items for archived
                 if (item.label === 'Archive') return false;
                 if (item.label === 'Restore') return true;
             } else {
                 // specific items for non-archived
                 if (item.label === 'Restore') return false;
             }
             return !isDemo || !item.hideForDemo;
          }) // Filter items logic
          .map((item) => (
            <li key={item.label}>
              <button
                onClick={item.onClick}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-gray-500" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

/**
 * Account Summary Card
 * The layout now switches between 'list' and 'grid' view modes.
 */
const AccountCard = ({
  account,
  activeTab,
  viewMode,
  onTradeClick,
  onPasswordChange,
  onSetBalance,
  onAdjustLeverage,
  onEditNickname,
  onOpenSettings,
  onSetReadOnly,
  onManageStatements,
  onArchive,
  onRestore,
}) => {
  // Use navigation inside this card so buttons can redirect
  const navigate = useNavigate();

  // Always keep details open in grid view, otherwise respect state
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isArchived = activeTab === "Archived";
  const isDemo = activeTab === "Demo";
  const isGridView = viewMode === "grid";

  // Data for the summary statistics grid
  const statsList = [
    // Data tailored for the Grid View (vertical stack)
    { label: "Number", value: account.mt5Login.replace("#", "") },
    { label: "Platform", value: account.platform },
    { label: "Type", value: account.accountType },
    { label: "Server", value: account.server },
    {
      label: "Free margin",
      value: account.freeMargin,
      hideInGrid: !isDemo && !isGridView,
    }, // Only show in Grid for Real/Demo
    { label: "Actual leverage", value: account.actualLeverage },
    { label: "Adjust leverage", value: account.adjustLeverage },

    // Additional items for List View
    { label: "Equity", value: account.equity, hideInGrid: true },
    { label: "Floating P/L", value: account.floatingPnL, hideInGrid: true },
    { label: "Platform", value: account.platform, hideInGrid: true },
  ].filter((stat) => !isGridView || !stat.hideInGrid); // Filter stats based on view mode

  // Action buttons component
  const ActionButton = ({
    Icon,
    label,
    primary = false,
    onClick = () => {},
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors duration-150 ${
        primary
          ? "bg-[#ffde02] text-gray-900 hover:bg-yellow-500 shadow-md"
          : "bg-gray-200/50 text-gray-700 hover:bg-gray-100 hover:border-gray-500 border border-gray-200"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );

  // Helper component for List View statistics display (side-by-side)
  const ListStatsGrid = ({ stats }) => {
    // We will render stats in pairs to mimic the side-by-side display
    const visibleStats = stats.filter((s) => !s.hideInGrid);
    const pairs = [];
    for (let i = 0; i < visibleStats.length; i += 2) {
      pairs.push([visibleStats[i], visibleStats[i + 1]]);
    }

    const listGridStyle = `
      .list-stats-grid {
        display: grid;
        gap: 1rem 3rem; /* vertical and horizontal gap */
      }
      @media (min-width: 768px) { /* md breakpoint and up */
        .list-stats-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: listGridStyle }} />
        <div className="list-stats-grid bg-gray-200/50 pt-6 pb-4 px-4 rounded-lg">
          {pairs.map((pair, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Left Column Item */}
              <div className="flex justify-between items-center border-b border-gray-300 ">
                <div className="text-gray-500">{pair[0].label}</div>
                <div className="font-medium text-gray-800">{pair[0].value}</div>
              </div>
              {/* Right Column Item (if exists) */}
              {pair[1] && (
                <div className="flex justify-between items-center border-b border-gray-300">
                  <div className="text-gray-500">{pair[1].label}</div>
                  <div className="font-medium text-gray-800">
                    {pair[1].value}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </>
    );
  };

  // Helper component for Grid View statistics display (vertical stack)
  const GridStatsStack = ({ stats }) => (
    <div className="grid grid-cols-2 gap-4">
      {statsList
        .filter((s) =>
          [
            "Number",
            "Platform",
            "Type",
            "Server",
            "Free margin",
            "Actual leverage",
            "Adjust leverage",
          ].includes(s.label)
        )
        .map((stat) => (
          <div key={stat.label} className="flex flex-col space-y-1">
            <div className="text-gray-500 text-sm">{stat.label}</div>
            <div className="font-medium text-gray-800 text-base">
              {stat.value}
            </div>
          </div>
        ))}
    </div>
  );

  // Render Grid View
  if (isGridView) {
    const gridRows = [
      { label: "Number", value: account.mt5Login.replace("#", "") },
      { label: "Platform", value: account.platform },
      { label: "Type", value: account.accountType },
      { label: "Server", value: account.server + (isDemo ? "Demo" : "Real31") }, 
      { label: "Free margin", value: account.freeMargin || "0.00 USD" },
      { label: "Actual leverage", value: account.actualLeverage },
      { label: "Adjust leverage", value: account.adjustLeverage },
    ];
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col space-y-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 pb-2 border-b border-gray-100 border-dashed">
          <div className="flex items-center space-x-2">
             <span className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded">
               {isDemo ? "Demo" : "Real"}
             </span>
             <span className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded">
               {account.platform === "MT5" ? "CT" : "MT5"}
             </span>
             <span className="font-bold text-sm text-gray-900 truncate max-w-[120px]" title="Raghvendra Singh">
               Raghvendra Singh
             </span>
          </div>

          {/* Ellipsis Menu Button - This is the button the user is asking about */}
          <div className="relative">
            <button
              title="More Options"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-2 rounded-lg text-gray-700 border border-transparent hover:bg-gray-100 hover:border-gray-500"
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>
            {isMenuOpen && (
              <AccountDropdownMenu
                account={account}
                isDemo={isDemo}
                onPasswordChange={onPasswordChange}
                onAdjustLeverage={onAdjustLeverage}
                onEditNickname={onEditNickname}
                onOpenSettings={onOpenSettings}
                onSetReadOnly={onSetReadOnly}
                onManageStatements={onManageStatements}
                onArchive={onArchive}
                onRestore={onRestore}
                isArchived={isArchived}
                showHeaderActions={true}
                onTradeClick={onTradeClick}
                onClose={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </div>

        {/* Body Rows */}
        <div className="p-4 pt-2 space-y-3">
           {gridRows.map((row) => (
             <div key={row.label} className="flex justify-between items-end text-xs sm:text-sm group relative">
               <div className="text-gray-500 bg-white z-10 pr-1">{row.label}</div>
               {/* Dotted Leader */}
               <div className="flex-1 border-b border-dotted border-gray-300 mb-1 mx-1"></div>
               <div className="text-gray-900 font-medium bg-white z-10 pl-1">{row.value}</div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // Render Archived View (Always List-like, but simple)
  if (isArchived) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {/* Header and Toggle */}
        <div
          className="flex justify-between items-center"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
          <div className="flex items-center space-x-2 text-sm text-gray-900">
            <span className="bg-gray-200/50 px-2">
              {isDemo ? "Demo" : "Real"}
            </span>
            <span className="text-gray-400">|</span>
            <span className="bg-gray-200/50 px-2">MT5</span>
            <span className="text-gray-400">|</span>
            <span className="bg-gray-200/50 px-2">{account.mt5Login}</span>
            <span className="text-gray-400">|</span>
            <span>{account.accountType}</span>
          </div>
          {/* Toggle is always visible but might not perform collapse for simple archived cards */}
          {/* <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${isDetailsOpen ? 'rotate-180' : 'rotate-0'}`}
            /> */}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-gray-100">
          <div className="mb-2 sm:mb-0">
            <Balance
              value={account.balance}
              className="text-xl font-extrabold text-gray-900 inline"
            />
            <span className="ml-3 text-sm font-medium text-gray-500">
              {account.reason}
            </span>
          </div>
          <ActionButton
            label="Restore"
            Icon={RotateCcw}
            onClick={() => onRestore(account)}
          />
        </div>
      </div>
    );
  }

  // --- Default: Render List View (Real/Demo not Archived) ---
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      {/* Header and Toggle */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
      >
        <div className="flex items-center space-x-2 text-sm text-gray-900">
          <span className="bg-gray-200/50 px-2">
            {isDemo ? "Demo" : "Real"}
          </span>
          <span className="text-gray-400 ">|</span>
          <span className="bg-gray-200/50 px-2 ">MT5</span>
          <span className="text-gray-400">|</span>
          <span className="bg-gray-200/50 px-2">{account.mt5Login}</span>
          <span className="text-gray-400">|</span>
          <span>{account.accountType}</span>
        </div>
        {/* Toggle Icon */}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isDetailsOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Conditional Content */}
      {isDetailsOpen && (
        <div className="space-y-6">
          {/* Balance and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-gray-100">
            <Balance
              value={account.balance}
              className="text-3xl font-semibold text-gray-900 mb-4 sm:mb-0"
            />
            <div className="flex space-x-3 relative">
              <ActionButton
                label="Trade"
                primary
                Icon={ArrowRight}
                onClick={() => onTradeClick(account)}
              />
              {isDemo ? (
                <ActionButton
                  label="Set Balance"
                  onClick={() => onSetBalance && onSetBalance(account)}
                />
              ) : (
                <ActionButton
                  label="Deposit"
                  onClick={() => navigate("/deposit")}
                />
              )}
              {/* FIX: Corrected the JSX closing tag */}
              {!isDemo && (
                <ActionButton
                  label="Withdraw"
                  onClick={() => navigate("/withdraw")}
                />
              )}

              {/* Ellipsis Menu Button Wrapper */}
              <div className="relative">
                <button
                  title="More Options"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card collapse when clicking menu button
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="p-2 rounded-lg text-gray-700 bg-gray-200/50 hover:bg-gray-100 hover:border-gray-500 border border-gray-200"
                >
                  <EllipsisVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <AccountDropdownMenu
                    account={account} // Pass the account details
                    isDemo={isDemo}
                    onPasswordChange={onPasswordChange} // Pass the new handler
                    onAdjustLeverage={onAdjustLeverage}
                    onEditNickname={onEditNickname}
                    onOpenSettings={onOpenSettings}
                    onSetReadOnly={onSetReadOnly}
                    onManageStatements={onManageStatements}
                    onArchive={onArchive}
                    onRestore={onRestore}
                    isArchived={isArchived}
                    onClose={() => setIsMenuOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Detailed Statistics Grid (List View Layout) */}
          <div className="text-sm">
            <ListStatsGrid stats={statsList} />
          </div>

          {/* Footer Metadata and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-4">
              <span>Server: {account.server}</span>
              <span>
                MT5 login: {account.mt5Login.replace("#", "")}
                <Copy
                  className="w-3 h-3 ml-1 inline cursor-pointer hover:text-gray-700"
                  title="Copy Login"
                />
              </span>
              <button
                onClick={() => onPasswordChange(account)} // Direct link handler
                className="flex items-center hover:text-gray-600 text-sm font-medium cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Change trading password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Main MyAccount Component
 */
const MyAccount = () => {
  const navigate = useNavigate();
  // 'Real' is the default active tab
  const [activeTab, setActiveTab] = useState("Real");
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("Newest");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Accounts state (so we can update balances)
  const [accountsData, setAccountsData] = useState(() => {
    const saved = localStorage.getItem('exness_accounts');
    return saved ? JSON.parse(saved) : mockAccounts;
  });

  // Persist accountsData to localStorage
  useEffect(() => {
    localStorage.setItem('exness_accounts', JSON.stringify(accountsData));
  }, [accountsData]);

  // Set Balance modal state
  const [isSetBalanceOpen, setIsSetBalanceOpen] = useState(false);
  const [setBalanceAccount, setSetBalanceAccount] = useState(null);
  const [setBalanceAmount, setSetBalanceAmount] = useState("");

  // Modal states (omitted for brevity, maintained from previous steps)
  const [isTradingHoursModalOpen, setIsTradingHoursModalOpen] = useState(false);
  const [isSpreadsModalOpen, setIsSpreadsModalOpen] = useState(false);
  const [isTradeSelectionModalOpen, setIsTradeSelectionModalOpen] =
    useState(false);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordAccountDetails, setPasswordAccountDetails] = useState(null);
  const [isAdjustLeverageOpen, setIsAdjustLeverageOpen] = useState(false);
  const [selectedAccountForLeverage, setSelectedAccountForLeverage] = useState(null);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [selectedAccountForNickname, setSelectedAccountForNickname] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedAccountForSettings, setSelectedAccountForSettings] = useState(null);
  const [isReadOnlyModalOpen, setIsReadOnlyModalOpen] = useState(false);
  const [selectedAccountForReadOnly, setSelectedAccountForReadOnly] = useState(null);
  const [isStatementsModalOpen, setIsStatementsModalOpen] = useState(false);
  const [selectedAccountForStatements, setSelectedAccountForStatements] = useState(null);

  // Handler for opening the Password Change Modal
  const handlePasswordChange = (account) => {
    setPasswordAccountDetails(account);
    setIsPasswordModalOpen(true);
  };

  // Handler for Trade button click in AccountCard
  const handleTradeClick = (account) => {
    setSelectedAccountDetails(account);
    setIsTradeSelectionModalOpen(true); // Open the new modal
  };

  // Handler to open Set Balance modal
  const handleOpenSetBalance = (account) => {
    setSetBalanceAccount(account);
    setSetBalanceAmount("");
    setIsSetBalanceOpen(true);
  };

  // Apply Set Balance - update accountsData
  const handleApplySetBalance = () => {
    const num = Number(String(setBalanceAmount).replace(/,/g, ""));
    if (isNaN(num) || setBalanceAccount == null) {
      setIsSetBalanceOpen(false);
      return;
    }
    const formatted = `${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
    setAccountsData((prev) => {
      const updated = {};
      Object.keys(prev).forEach((tab) => {
        updated[tab] = prev[tab].map((a) =>
          a.id === setBalanceAccount.id ? { ...a, balance: formatted } : a
        );
      });
      return updated;
    });
    setIsSetBalanceOpen(false);
  };

  // Handler for Adjust Leverage
  const handleAdjustLeverage = (account) => {
    setSelectedAccountForLeverage(account);
    setIsAdjustLeverageOpen(true);
  };

  // Handler for Nickname Modal
  const handleEditNickname = (account) => {
    setSelectedAccountForNickname(account);
    setIsNicknameModalOpen(true);
  };

  // Handler for Settings Modal
  const handleOpenSettings = (account) => {
    setSelectedAccountForSettings(account);
    setIsSettingsModalOpen(true);
  };

  // Handler for Read Only Modal
  const handleSetReadOnly = (account) => {
      setSelectedAccountForReadOnly(account);
      setIsReadOnlyModalOpen(true);
  };

  // Handler for Manage Statements Modal
  const handleManageStatements = (account) => {
    setSelectedAccountForStatements(account);
    setIsStatementsModalOpen(true);
  };

  // Handler for Archiving Account
  const handleArchiveAccount = (account) => {
    if (activeTab === "Archived") return;
    setAccountsData((prev) => {
        const updated = { ...prev };
        updated[activeTab] = updated[activeTab].filter(a => a.id !== account.id);
        const archivedAccount = { 
            ...account, 
            reason: "Archived by user" 
        };
        updated.Archived = [archivedAccount, ...updated.Archived];
        return updated;
    });
  };

  // Handler for Restoring Account
  const handleRestoreAccount = (account) => {
    if (activeTab !== "Archived") return;
    setAccountsData((prev) => {
        const updated = { ...prev };
        // Remove from Archived
        updated.Archived = updated.Archived.filter(a => a.id !== account.id);
        
        // Add back to Real (or Demo if type suggests, but user asked for Real tab specifically)
        // Let's try to be smart: if accountType is 'Demo', put in Demo, else Real.
        const targetTab = account.accountType === 'Demo' ? 'Demo' : 'Real';
        
        // Remove the 'reason' property we added when archiving
        const { reason, ...restoredAccount } = account;
        
        updated[targetTab] = [restoredAccount, ...updated[targetTab]];
        return updated;
    });
  };

  // Get the accounts corresponding to the active tab and apply sorting
  const accountsToDisplay = React.useMemo(() => {
    const accounts = accountsData[activeTab] || [];
    let sorted = [...accounts];

    if (sortBy === "Newest") {
       // Assuming 'accounts' are stored with newest first (unshift). 
       // If not, we might need an ID or Date check. 
       // For this implementation, we assume the array order represents newest first.
       // No action needed if already sorted by newest.
    } else if (sortBy === "Oldest") {
       sorted.reverse();
    } else if (sortBy === "Free margin") {
       sorted.sort((a, b) => {
          const valA = parseFloat((a.freeMargin || "0").replace(/[^0-9.-]+/g, ""));
          const valB = parseFloat((b.freeMargin || "0").replace(/[^0-9.-]+/g, ""));
          return valB - valA; // Descending
       });
    } else if (sortBy === "Nickname") {
       sorted.sort((a, b) => {
          const nameA = a.nickname || a.accountType || "";
          const nameB = b.nickname || b.accountType || "";
          return nameA.localeCompare(nameB);
       });
    }
    return sorted;
  }, [accountsData, activeTab, sortBy]);

  // Tab Item component
  const TabItem = ({ name }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`pb-2 px-1 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
        activeTab === name
          ? "text-gray-900 border-b-3 border-gray-900"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {name}
    </button>
  );

  return (
    <>
    {/* 1. */}
      <TopContainer />
    <div className="min-h-screen bg-white flex flex-col items-center">
      

      <div className="p-4 md:px-8 w-full lg:px-10 max-w-7xl">
        {/* 2. Info/Ad Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Banner 1: Changes to trading hours - CLICKABLE */}
          <div
            onClick={() => setIsTradingHoursModalOpen(true)}
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between cursor-pointer"
          >
            <h3 className="text-lg  text-gray-800">Changes to trading hours</h3>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Banner 2: Pay less, keep more - NOW CLICKABLE */}
          <div
            onClick={() => setIsSpreadsModalOpen(true)} // Open the new modal
            className="bg-green-50 border border-green-200 p-6 rounded-xl flex items-center justify-between cursor-pointer"
          >
            <div>
              <h3 className="text-lg  text-gray-800">Pay less, keep more</h3>
              <p className="text-sm text-gray-600">
                Trade with the best spreads on the market.
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 3. My Accounts Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl lg:text-[32px] text-gray-900">
            My accounts
          </h2>
          <button
            onClick={() => navigate("/open-account")}
            className="flex items-center space-x-2 cursor-pointer bg-gray-200/50  text-gray-700 px-4 py-2 rounded-lg text-sm  hover:bg-gray-100"
          >
            <Plus className="w-5 h-5" />
            <span>Open account</span>
          </button>
        </div>

        {/* 4. Tab Navigation and Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 border-b border-gray-200">
          {/* Tabs */}
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {accountTabs.map((tab) => (
              <TabItem key={tab} name={tab} />
            ))}
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="flex items-center space-x-4 py-6 justify-between ">
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center space-x-1 px-6  gap-8  py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
            >
              <span>{sortBy}</span>
              <ChevronsUpDown className="w-3.5 h-3.5" />
            </button>
            {/* Dropdown Menu */}
            {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full min-w-[140px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1 flex flex-col">
                    {["Newest", "Oldest", "Free margin", "Nickname"].map((option) => (
                        <button
                            key={option}
                            className={`text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option ? 'font-medium text-black bg-gray-50' : 'text-gray-600'}`}
                            onClick={() => {
                                setSortBy(option);
                                setIsSortDropdownOpen(false);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg p-0.5 bg-white">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5. Account Cards List / Grid */}
        <div
          className={
            viewMode === "list"
              ? "space-y-4"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4"
          }
        >
          {accountsToDisplay.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              activeTab={activeTab}
              viewMode={viewMode} // Pass the view mode state
              onTradeClick={handleTradeClick}
              onPasswordChange={handlePasswordChange}
              onSetBalance={handleOpenSetBalance}
              onAdjustLeverage={handleAdjustLeverage}
              onEditNickname={handleEditNickname}
              onOpenSettings={handleOpenSettings}
              onSetReadOnly={handleSetReadOnly}
              onManageStatements={handleManageStatements}
              onArchive={handleArchiveAccount}
              onRestore={handleRestoreAccount}
            />
          ))}
        </div>

        {/* 6. Modals */}
        <TradingHoursModal
          isOpen={isTradingHoursModalOpen}
          onClose={() => setIsTradingHoursModalOpen(false)}
        />
        <SpreadsStrategyModal
          isOpen={isSpreadsModalOpen}
          onClose={() => setIsSpreadsModalOpen(false)}
        />

        {/* Trade Selection Modal */}
        <TradeSelectionModal
          isOpen={isTradeSelectionModalOpen}
          onClose={() => setIsTradeSelectionModalOpen(false)}
          mt5Login={selectedAccountDetails?.mt5Login || ""}
          platform={selectedAccountDetails?.platform || "MT5"}
        />

        {/* Set Balance Modal */}
        <SetBalanceModal
          isOpen={isSetBalanceOpen}
          onClose={() => setIsSetBalanceOpen(false)}
          account={setBalanceAccount}
          amount={setBalanceAmount}
          setAmount={setSetBalanceAmount}
          onApply={handleApplySetBalance}
        />

        {/* Change Trading Password Modal */}
        <ChangeTradingPasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          mt5Login={passwordAccountDetails?.mt5Login || ""}
        />

        {/* Adjust Leverage Modal */}
        <AdjustLeveragePopup
          isOpen={isAdjustLeverageOpen}
          onClose={() => setIsAdjustLeverageOpen(false)}
          accountId={selectedAccountForLeverage?.mt5Login.replace('#', '')}
        />

        {/* Nickname Modal */}
        <NicknameModal
          isOpen={isNicknameModalOpen}
          onClose={() => setIsNicknameModalOpen(false)}
          account={selectedAccountForNickname}
        />

        {/* Settings Modal */}
        <AccountSettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          account={selectedAccountForSettings}
        />

        {/* Read Only Access Modal */}
        <ReadOnlyAccessModal
            isOpen={isReadOnlyModalOpen}
            onClose={() => setIsReadOnlyModalOpen(false)}
            account={selectedAccountForReadOnly}
        />

        {/* Manage Statements Modal */}
        <ManageStatementsModal
          isOpen={isStatementsModalOpen}
          onClose={() => setIsStatementsModalOpen(false)}
          account={selectedAccountForStatements}
        />
      </div>

      <Footer />
    </div>
    </>
    
  );
};

export default MyAccount;
