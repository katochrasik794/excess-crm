import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronUp,
  BarChart3, Clock, ExternalLink,
  Shield, Heart, Settings, Copy,
  Wallet, TrendingUp, Users, X,
  LogOut, User, EyeOff, MessageSquare, LayoutGrid, Globe, HelpCircle,
} from 'lucide-react';

// --- Data Structure for Mobile Sidebar Navigation ---
const sidebarItems = [

  {
    id: 'trading',
    label: 'Trading',
    icon: TrendingUp,
    isCollapsible: true,
    initialOpen: false,
    subItems: [
      { id: 'my-accounts', label: 'My accounts', icon: Users, route: '/my-account', isLink: true },
      { id: 'performance', label: 'Performance', icon: BarChart3, route: '/performance', isLink: true },
      { id: 'history', label: 'History of orders', icon: Clock, route: '/history-of-orders', isLink: true },
      { id: 'terminal', label: 'Exness Terminal', icon: ExternalLink, route: '/exness-terminal', isExternal: true },
    ],
  },
  {
    id: 'payments',
    label: 'Payments & wallet',
    icon: Wallet,
    isCollapsible: true,
    subItems: [
      { id: 'deposit', label: 'Deposit', icon: Users, route: '/deposit', isLink: true },
      { id: 'withdrawal', label: 'Withdrawal', icon: BarChart3, route: '/withdraw', isLink: true },
      { id: 'transaction', label: 'Transaction history', icon: Clock, route: '/transaction-history', isLink: true },
      { id: 'crypto', label: 'Crypto wallet', icon: ExternalLink, route: '/crypto-wallet', isLink: true },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    isCollapsible: true,
    subItems: [
      { id: 'analyst', label: 'Analyst View', icon: Users, route: '/analyst-view', isLink: true },
      { id: 'market', label: 'Market News', icon: BarChart3, route: '/market-news', isLink: true },
      { id: 'economic', label: 'Economic Calendar', icon: ExternalLink, route: '/economic-calendar', isExternal: true },
    ],
  },
  {
    id: 'benefits',
    label: 'FinCRM benefits',
    icon: Shield,
    isCollapsible: true,
    subItems: [
      { id: 'tradingcondition', label: 'Trading Conditions', icon: Users, route: '/trading-conditions', isLink: true },
      { id: 'savings', label: 'Savings', icon: BarChart3, route: '/savings', isLink: true },
      { id: 'virtual', label: 'Virtual Private Server', icon: Clock, route: '/virtual-private-server', isLink: true },
    ],
  },
  { id: 'copy-trading', label: 'Copy Trading', icon: Copy, route: '/copy-trading', isCollapsible: false },
  { id: 'support', label: 'Support hub', icon: Heart, route: '/support-hub', isCollapsible: false, isNew: true },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    isCollapsible: true,
    subItems: [
      { id: 'profile', label: 'Profile', icon: Users, route: '/profile', isLink: true },
      { id: 'security', label: 'Security', icon: BarChart3, route: '/security', isLink: true },
      { id: 'tradingterminal', label: 'Trading Terminal', icon: Clock, route: '/trading-terminal-settings', isLink: true },
    ],
  },
  { id: 'live-chat', label: 'Live Chat', icon: MessageSquare, route: '/live-chat', isCollapsible: false },
  {
    id: 'exness-products',
    label: 'Exness Products',
    icon: LayoutGrid,
    isCollapsible: true,
    subItems: [
      { id: 'personal-area', label: 'Personal area', icon: LayoutGrid, route: '/my-account', isLink: true },
      { id: 'exness-terminal', label: 'Exness terminal', icon: TrendingUp, route: '/exness-terminal', isLink: true },
      { id: 'public-website', label: 'Public website', icon: Globe, route: '#', isLink: true },
      { id: 'partnership', label: 'Partnership', icon: Users, route: '#', isLink: true },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    isCollapsible: true,
    hasNestedMenu: true, // Flag to indicate this has nested structure
    subItems: [
      {
        id: 'tools-services',
        label: 'Tools & Services',
        isCategory: true,
        items: [
          { id: 'metatrader4', label: 'MetaTrader4', route: '#' },
          { id: 'metatrader5', label: 'MetaTrader5', route: '#' },
          { id: 'webterminal', label: 'WebTerminal', route: '#' },
          { id: 'traders-calculator', label: "Trader's Calculator", route: '#' },
          { id: 'currency-converter', label: 'Currency Converter', route: '#' },
          { id: 'free-vps', label: 'Free VPS hosting', route: '#' },
          { id: 'economic-calendar-help', label: 'Economic Calendar', route: '#' },
          { id: 'web-tv', label: 'Web Tv', route: '#' },
          { id: 'tick-history', label: 'Tick History', route: '#' },
        ],
      },
      {
        id: 'trading-help',
        label: 'Trading',
        isCategory: true,
        items: [
          { id: 'contract-specs', label: 'Contract Specifications', route: '#' },
          { id: 'margin-leverage', label: 'Margin & Leverage', route: '#' },
          { id: 'forex-hours', label: 'Forex Market Trading Hours', route: '#' },
          { id: 'dividends', label: 'Dividends on indices', route: '#' },
          { id: 'deposit-withdrawal', label: 'Deposit And Withdrawals', route: '#' },
        ],
      },
      {
        id: 'help-section',
        label: 'Help',
        isCategory: true,
        items: [
          { id: 'help-center', label: 'Exness Help Center', route: '#' },
          { id: 'become-partner', label: 'How to Become Our Partner', route: '#' },
          { id: 'suggest-feature', label: 'Suggest a feature', route: '#' },
        ],
      },
    ],
  },
  {
    id: 'language',
    label: 'English',
    icon: Globe,
    isCollapsible: true,
    isLanguageSelector: true,
    subItems: [
      { id: 'lang-en', label: 'English', isSelected: true },
      { id: 'lang-ar', label: 'العربية' },
      { id: 'lang-bn', label: 'বাংলা' },
      { id: 'lang-es', label: 'Español' },
      { id: 'lang-fr', label: 'Français' },
      { id: 'lang-hi', label: 'हिन्दी' },
      { id: 'lang-id', label: 'Bahasa Indonesia' },
      { id: 'lang-ja', label: '日本語' },
      { id: 'lang-ko', label: '한국어' },
      { id: 'lang-pt', label: 'Português' },
      { id: 'lang-th', label: 'ไทย' },
      { id: 'lang-vi', label: 'Tiếng Việt' },
      { id: 'lang-zh', label: '简体中文' },
      { id: 'lang-uz', label: "O'zbek" },
    ],
  },
];

// Toggle Switch Component for Hide Balance
const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
  </label>
);

/**
 * User Profile Section Component
 */
const UserProfileSection = ({ onClose, navigate }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userEmail = "r*****1@ekuali.com";

  const handleNavigation = (route) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="border-b border-gray-200">
      {/* User Email Toggle */}
      <div
        className="flex items-center justify-between px-4 py-8 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-gray-600" />
          <span className="text-xs font-medium text-gray-600">{userEmail}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Profile Dropdown Content */}
      {isProfileOpen && (
        <div className="pb-2">
          <button
            onClick={() => handleNavigation('/profile')}
            className="w-full text-left px-4 py-3 text-xs text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Settings
          </button>
          <button
            onClick={() => handleNavigation('/trading-conditions')}
            className="w-full text-left px-4 py-3 text-xs text-gray-900 hover:bg-gray-100 transition-colors border-b border-gray-200"
          >
            Trading conditions
          </button>
          <button
            onClick={() => {
              console.log('Sign out clicked');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Balance Section Component
 */
const BalanceSection = () => {
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const balanceValue = "0.00";
  const currency = "USD";
  const accountId = "#1197981759115928122";

  const handleCopyAccountId = () => {
    navigator.clipboard.writeText(accountId);
  };

  return (
    <div>
      {/* Balance Toggle Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsBalanceOpen(!isBalanceOpen)}
      >
        <div className="flex items-center gap-3">
          <Wallet className="h-4 w-4 text-gray-600" />
          <span className={`text-xs font-semibold text-gray-800 ${isBalanceHidden ? 'blur-sm' : ''}`}>
            {balanceValue} {currency}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isBalanceOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Balance Dropdown Content */}
      {isBalanceOpen && (
        <div className="px-4 pb-4 space-y-3">
          {/* Hide Balance Toggle */}
          <div className="flex justify-between items-center border-t border-b border-gray-200 py-1">
            <span className="text-xs text-gray-900">Hide balance</span>
            <ToggleSwitch
              checked={isBalanceHidden}
              onChange={() => setIsBalanceHidden(!isBalanceHidden)}
            />
          </div>

          {/* Investment Wallet */}
          <div>
            <div className={`text-xs font-semibold text-gray-900 ${isBalanceHidden ? 'blur-sm' : ''}`}>
              {balanceValue} {currency}
            </div>
            <p className="text-xs text-gray-500 mt-1">Investment wallet</p>

            {/* Account ID with Copy */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">{accountId}</span>
              <button
                onClick={handleCopyAccountId}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
                title="Copy account ID"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Component for a single Menu Item in the mobile sidebar.
 */
const MobileSidebarItem = ({ item, currentPath, onNavigate, onClose }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(item.initialOpen || false);
  const Icon = item.icon;
  const isParentActive = !item.subItems && item.route === currentPath;

  const handleClick = () => {
    if (item.isCollapsible && item.subItems && item.subItems.length > 0) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else if (item.route) {
      onNavigate(item.route);
      onClose(); // Close sidebar after navigation
    }
  };

  const handleSubItemClick = (route) => {
    if (route) {
      onNavigate(route);
      onClose(); // Close sidebar after navigation
    }
  };

  return (
    <div className="w-full">
      {/* Menu Item Header */}
      <div
        className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 ${
          isParentActive ? 'bg-gray-100 border border-gray-500' : ''
        }`}
        onClick={handleClick}
      >
        {/* Icon */}
        <Icon className="h-4 w-4 text-gray-700 mr-4 flex-shrink-0" />

        {/* Label */}
        <span className="flex-1 text-xs font-medium text-gray-800">
          {item.label}
        </span>

        {/* 'New' Tag */}
        {item.isNew && (
          <span className="text-xs bg-blue-500 text-white px-2.5 py-1 rounded-full font-semibold">
            New
          </span>
        )}

        {/* Chevron for collapsible items */}
        {item.isCollapsible && item.subItems && item.subItems.length > 0 && (
          <div className="ml-3 transition-transform duration-200">
            {isSubMenuOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        )}
      </div>

      {/* Sub-Items */}
      {item.subItems && isSubMenuOpen && (
        <div className="border-l-4 border-gray-200">
          {item.hasNestedMenu ? (
            // Nested menu structure for Help section
            item.subItems.map((category) => (
              <div key={category.id} className="mb-2">
                {/* Category Header */}
                <div className="px-4 pt-3 pb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {category.label}
                  </span>
                </div>
                {/* Category Items */}
                {category.items?.map((categoryItem) => (
                  <div
                    key={categoryItem.id}
                    className="px-4 py-2.5 pl-8 cursor-pointer text-xs text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
                    onClick={() => handleSubItemClick(categoryItem.route)}
                  >
                    {categoryItem.label}
                  </div>
                ))}
              </div>
            ))
          ) : item.isLanguageSelector ? (
            // Language selector items
            item.subItems.map((langItem) => (
              <div
                key={langItem.id}
                className={`px-4 py-3 cursor-pointer text-xs transition-all duration-200 hover:bg-gray-100 ${
                  langItem.isSelected ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700'
                }`}
                onClick={() => {
                  console.log(`Language selected: ${langItem.label}`);
                  // Don't close sidebar on language selection
                }}
              >
                {langItem.label}
              </div>
            ))
          ) : (
            // Regular sub-items for other sections
            item.subItems.map((subItem) => {
              const isActive = subItem.route === currentPath;
              return (
                <div
                  key={subItem.id}
                  className={`flex items-center mt-1 w-[200px] ml-8 px-4 py-3 pl-4 cursor-pointer text-xs transition-all duration-200 rounded-md border border-transparent hover:bg-gray-200 hover:border-gray-500 active:bg-gray-200 ${
                    isActive ? 'bg-gray-200/60 text-gray-900 font-semibold rounded-md ' : 'text-gray-700'
                  }`}
                  onClick={() => handleSubItemClick(subItem.route)}
                >
                  <span className="flex-1">{subItem.label}</span>
                  {subItem.isExternal && (
                    <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

/**
 * The Mobile Sidebar Component - Only visible when hamburger menu is clicked
 */
const MobileSidebar = ({ isOpen, setIsOpen, onOpenChat }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (route) => {
    if (route === '/live-chat') {
      if (onOpenChat) onOpenChat();
    } else {
      navigate(route);
    }
  };

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[75%] max-w-[260px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200  flex-shrink:0">
          {/* <img 
            src="/finCRM-logo-dark (1).png" 
            alt="FinCRM Logo" 
            className="h-8 w-auto" 
          /> */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 rounded-sm border border-transparent hover:bg-gray-200 hover:border-gray-500 active:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-gray-100">
          {/* User Profile & Balance Section */}
          <div className="border-b border-gray-200">
            {/* User Profile Dropdown */}
            <UserProfileSection onClose={() => setIsOpen(false)} navigate={navigate} />
            
            {/* Balance Section */}
            <BalanceSection />
          </div>

          {/* Main Navigation */}
          <div className="py-2 pb-8">
            {sidebarItems.map((item) => (
              <MobileSidebarItem
                key={item.id}
                item={item}
                currentPath={location.pathname}
                onNavigate={handleNavigation}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </div>

          {/* Footer */}
          {/* <div className="py-4 border-t border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-400 text-center">
              FinCRM Trading Platform
            </div>
          </div> */}
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
