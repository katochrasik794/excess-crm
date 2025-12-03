// Topbar.jsx
import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Globe,
  Clock,
  Bell,
  User,
  Menu,
  X,
  Copy,
  LogOut,
  EyeOff,
  Wallet,
} from "lucide-react";

// Tailwind CSS class for the toggle switch (Re-usable component style)
const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      value=""
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-gray-300 dark:peer-focus:ring-gray-300 rounded-full peer dark:bg-gray-50 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-gray-300"></div>
  </label>
);

// List of languages
const languages = [
  "English",
  "العربية",
  "বাংলা",
  "Español",
  "Français",
  "हिन्दी",
  "Bahasa Indonesia",
  "日本語",
  "한국어",
  "Português",
  "ไทย",
  "Tiếng Việt",
  "简体中文",
  "O'zbek",
];

// Content for the Tools & Services / History dropdown
const historyDropdownContent = {
  "Tools & Services": [
    "MetaTrader4",
    "MetaTrader5",
    "WebTerminal",
    "Trader's Calculator",
    "Currency Converter",
    "Free VPS hosting",
    "Economic Calendar",
    "Web Tv",
    "Tick History",
  ],
  Trading: [
    "Contract Specifications",
    "Margin & Leverage",
    "Forex Market Trading Hours",
    "Dividends on Indices",
    "Deposit And Withdrawals",
  ],
  Help: [
    "Exness Help Center",
    "How to Become Our Partner",
    "Suggest a feature",
  ],
};

// Content for the Apps dropdown
const appsDropdownContent = [
  { name: "Personal area", icon: LayoutGrid },
  { name: "Exness terminal", icon: Copy },
  { name: "Public website", icon: Globe },
  { name: "Partnership", icon: User },
];

// Content for the Profile dropdown
const profileDropdownContent = [
  {
    name: "Settings",
    icon: null,
    separator: true,
    className: "text-gray-700 hover:bg-gray-50",
  },
  {
    name: "Trading conditions",
    icon: null,
    separator: false,
    className: "text-gray-700 hover:bg-gray-50",
  },
  {
    name: "Sign Out",
    icon: LogOut,
    separator: true,
    className: "text-red-600 hover:bg-red-50",
  },
];

// The main Topbar component
const Topbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Refs for dropdowns
  const balanceDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const historyDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const appsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Effect to handle click outside for closing dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (balanceDropdownRef.current && !balanceDropdownRef.current.contains(event.target)) {
        setIsBalanceDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (historyDropdownRef.current && !historyDropdownRef.current.contains(event.target)) {
        setIsHistoryDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target)) {
        setIsNotificationsDropdownOpen(false);
      }
      if (appsDropdownRef.current && !appsDropdownRef.current.contains(event.target)) {
        setIsAppsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dummy Data
  const balanceValue = "0.00";
  const currency = "USD";
  const accountType = "Investment wallet";
  const accountId = "#1197981759115928122";
  const userEmail = "r*****1@ekuali.com";
  const hasNewNotifications = false;

  // Array of primary navigation items (icons)
  const primaryNavItems = [
    {
      id: "language",
      icon: Globe,
      label: "Language",
      desktopOnly: true,
      onClick: () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen),
    },
    {
      id: "history",
      icon: Clock,
      label: "History",
      desktopOnly: true,
      onClick: () => setIsHistoryDropdownOpen(!isHistoryDropdownOpen),
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      hasIndicator: hasNewNotifications,
      onClick: () =>
        setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen),
    },
    {
      id: "apps",
      icon: LayoutGrid,
      label: "Apps",
      desktopOnly: true,
      onClick: () => setIsAppsDropdownOpen(!isAppsDropdownOpen),
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      onClick: () => setIsProfileDropdownOpen(!isProfileDropdownOpen),
    },
  ];

  // Component for a single icon link
  const IconLink = ({
    Icon,
    label,
    hasIndicator = false,
    className = "",
    onClick,
    isActive = false,
  }) => (
    <div
      title={label}
      onClick={onClick}
      className={`relative p-2 cursor-pointer transition-colors duration-150 rounded-sm border ${isActive ? 'border-gray-500 bg-gray-100' : 'border-transparent hover:border-gray-500 hover:bg-gray-100'} ${className}`}
    >
      <Icon className="w-5 h-5 text-gray-700" />
      {hasIndicator && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );

  return (
    <header className="bg-white h-[56px] w-full z-10 flex items-center justify-between px-4 relative">

      {/* LEFT SECTION */}
      <div className="flex items-center">
        {/* Mobile: Hamburger Menu */}
        <div className="lg:hidden mr-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop: Logo */}
        <div className="hidden lg:block flex-shrink:0">
          <img src="/finCRM-logo-dark (1).png" alt="" className="px-4 w-48"/>
        </div>
      </div>

      {/* CENTER SECTION (Mobile Only) */}
      <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
        <img src="/finCRM-logo-dark (1).png" alt="" className="w-32"/>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        
        {/* Mobile: Notification Icon */}
        <div className="lg:hidden relative">
           <button
             onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
             className="p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors relative"
           >
             <Bell className="w-6 h-6" />
             {hasNewNotifications && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
             )}
           </button>
           
           {/* Mobile Notification Dropdown */}
           {isNotificationsDropdownOpen && (
              <div
                ref={notificationsDropdownRef}
                className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-2xl border border-gray-100 overflow-hidden z-20"
              >
                <div className="flex items-center pl-6 h-10">
                  <p className="text-gray-600 text-sm font-medium">
                    You currently have no new notifications.
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Desktop: Balance Display with Dropdown (Hidden on Mobile) */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
            className={`flex items-center text-sm font-semibold text-gray-700 px-3 py-1.5 rounded-sm border transition-colors duration-150 ${isBalanceDropdownOpen ? 'border-gray-500 bg-gray-100' : 'border-transparent hover:border-gray-500 hover:bg-gray-100'}`}
            aria-expanded={isBalanceDropdownOpen}
            aria-controls="balance-dropdown"
          >
            {!isBalanceHidden && <Wallet className="w-4 h-4 mr-1.5 text-gray-700" />}
            {isBalanceHidden && <EyeOff className="w-4 h-4 mr-1.5 text-gray-700" />}
            <span className={isBalanceHidden ? "blur-sm" : ""}>
              {balanceValue} {currency}
            </span>
          </button>

          {/* Balance Dropdown Content */}
          {isBalanceDropdownOpen && (
            <div
              ref={balanceDropdownRef}
              id="balance-dropdown"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-20"
            >
              <div className="px-4 py-1 space-y-4">
                {/* Hide Balance Toggle */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-700 font-medium">
                    Hide balance
                  </span>
                  <ToggleSwitch
                    checked={isBalanceHidden}
                    onChange={() => setIsBalanceHidden(!isBalanceHidden)}
                  />
                </div>

                {/* Trading account block */}
                <div className="pb-2 border-b border-gray-100">
                  <div
                    className={`text-lg font-semibold text-gray-900 ${
                      isBalanceHidden ? "blur-sm" : ""
                    }`}
                  >
                    0.00 <span className="font-normal">USD</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Trading account
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    #196092361
                  </p>

                  <div className="flex gap-4 mt-3">
                    <button className="px-3 py-1.5 text-xs font-medium rounded-sm bg-gray-100 hover:bg-gray-100">
                      Transfer
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium rounded-sm bg-gray-100 hover:bg-gray-100">
                      Withdraw
                    </button>
                  </div>
                </div>

                {/* Investment wallet block */}
                <div className="">
                  <div
                    className={`text-lg font-semibold text-gray-900 ${
                      isBalanceHidden ? "blur-sm" : ""
                    }`}
                  >
                    0.00 <span className="font-normal">USD</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Investment wallet
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {accountId}
                    </span>
                    <button
                      title="Copy wallet ID"
                      onClick={() =>
                        navigator.clipboard.writeText(accountId)
                      }
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Icons */}
        <nav className="hidden lg:flex items-center space-x-4">
          {primaryNavItems.map((item) => (
            <div key={item.id} className="relative">
              <IconLink
                Icon={item.icon}
                label={item.label}
                hasIndicator={item.hasIndicator}
                onClick={item.onClick}
                isActive={
                  (item.id === 'language' && isLanguageDropdownOpen) ||
                  (item.id === 'history' && isHistoryDropdownOpen) ||
                  (item.id === 'notifications' && isNotificationsDropdownOpen) ||
                  (item.id === 'apps' && isAppsDropdownOpen) ||
                  (item.id === 'profile' && isProfileDropdownOpen)
                }
              />

              {/* Apps Dropdown */}
              {item.id === "apps" && isAppsDropdownOpen && (
                <div
                  ref={appsDropdownRef}
                  id="apps-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-20"
                >
                  <div className="p-2 space-y-1">
                    {appsDropdownContent.map((app) => (
                      <a
                        key={app.name}
                        href="#"
                        className="flex items-center px-2 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          console.log(`Navigating to: ${app.name}`);
                          setIsAppsDropdownOpen(false);
                        }}
                      >
                        <app.icon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{app.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Language Dropdown */}
              {item.id === "language" && isLanguageDropdownOpen && (
                <div
                  ref={languageDropdownRef}
                  id="language-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-y-auto max-h-[520px] z-20"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        lang === "English"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        console.log(`Selected language: ${lang}`);
                        setIsLanguageDropdownOpen(false);
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}

              {/* History Dropdown – UPDATED */}
              {item.id === "history" && isHistoryDropdownOpen && (
                <div
                  ref={historyDropdownRef}
                  id="history-dropdown"
                  className="absolute right-0 mt-2 bg-white rounded-md shadow-2xl border border-gray-100 overflow-hidden z-20"
                >
                  <div className="px-4 py-3 flex space-x-10">
                    {/* Left column – Tools & Services */}
                    <div className="min-w-[130px]">
                      <h3 className="text-xs text-gray-400 mb-2">
                        Tools &amp; Services
                      </h3>
                      <ul className="space-y-1.5">
                        {historyDropdownContent["Tools & Services"].map(
                          (link) => (
                            <li key={link}>
                              <a
                                href="#"
                                className="text-xs text-gray-800 hover:text-black"
                                onClick={() => {
                                  console.log(`Clicked: ${link}`);
                                  setIsHistoryDropdownOpen(false);
                                }}
                              >
                                {link}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Right column – Trading + Help */}
                    <div className="min-w-[150px]">
                      <h3 className="text-xs text-gray-400 mb-2">
                        Trading
                      </h3>
                      <ul className="space-y-1.5 mb-3">
                        {historyDropdownContent.Trading.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="text-xs text-gray-800 hover:text-black"
                              onClick={() => {
                                console.log(`Clicked: ${link}`);
                                setIsHistoryDropdownOpen(false);
                              }}
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xs text-gray-400 mb-2 mt-8">
                        Help
                      </h3>
                      <ul className="space-y-1.5">
                        {historyDropdownContent.Help.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="text-xs text-gray-800 hover:text-black"
                              onClick={() => {
                                console.log(`Clicked: ${link}`);
                                setIsHistoryDropdownOpen(false);
                              }}
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Dropdown */}
              {item.id === "notifications" &&
                isNotificationsDropdownOpen && (
                  <div
                    ref={notificationsDropdownRef}
                    id="notifications-dropdown"
                    className="absolute right-0 mt-2 w-96 bg-white rounded-md  shadow-2xl border border-gray-100 overflow-hidden z-20"
                  >
                    <div className="flex items-center pl-6 h-10">
                      <p className="text-gray-600 text-sm font-medium">
                        You currently have no new notifications.
                      </p>
                    </div>
                  </div>
                )}

              {/* Profile Dropdown */}
              {item.id === "profile" && isProfileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-20"
                >
                  <div className="p-3">
                    <div className="flex items-center p-2 mb-2">
                      <User className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="text-sm font-medium text-gray-800">
                        {userEmail}
                      </span>
                    </div>
                    <hr className="border-gray-200" />

                    <div className="space-y-1 pt-2">
                      {profileDropdownContent.map((link, index) => (
                        <div key={link.name}>
                          <a
                            href="#"
                            className={`flex items-center px-2 py-2 text-sm rounded-lg transition-colors ${link.className}`}
                            onClick={() => {
                              console.log(`Action: ${link.name}`);
                              setIsProfileDropdownOpen(false);
                            }}
                          >
                            {link.icon && (
                              <link.icon
                                className={`w-5 h-5 mr-3 ${
                                  link.name === "Sign Out"
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                              />
                            )}
                            <span>{link.name}</span>
                          </a>
                          {link.separator &&
                            index < profileDropdownContent.length - 1 && (
                              <hr className="my-1 border-gray-200" />
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

    </header>
  );
};

export default Topbar;
