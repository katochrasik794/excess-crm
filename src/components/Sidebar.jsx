import React, { useState } from 'react';
import {
  ChevronsLeft, ChevronsRight,
  ChevronDown, ChevronUp,
  BarChart3, Clock, ExternalLink,
  Shield, Heart, Settings, Copy,
  Wallet, TrendingUp, Users,
} from 'lucide-react';

// --- Data Structure for Sidebar Navigation ---
const sidebarItems = [
  {
    id: 'trading',
    label: 'Trading',
    icon: TrendingUp,
    isCollapsible: true,
    initialOpen: false,
    subItems: [
      { id: 'my-accounts', label: 'My accounts', icon: Users, isLink: true },
      { id: 'performance', label: 'Performance', icon: BarChart3, isLink: true },
      { id: 'history', label: 'History of orders', icon: Clock, isLink: true },
      { id: 'terminal', label: 'Exness Terminal', icon: ExternalLink, isExternal: true },
    ],
  },
    {
    id: 'payments',
    label: 'Payments & wallet',
    icon: Wallet,
    isCollapsible: true,
    subItems: [
      { id: 'deposit', label: 'Deposit', icon: Users, isLink: true },
      { id: 'withdrawal', label: 'Withdrawal', icon: BarChart3, isLink: true },
      { id: 'transaction', label: 'Transaction history', icon: Clock, isLink: true },
      { id: 'crypto', label: 'Crypto wallet', icon: ExternalLink, isLink: true },
    ],
  },
    {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    isCollapsible: true,
    subItems: [
      { id: 'analyst', label: 'Analyst View', icon: Users, isLink: true },
      { id: 'market', label: 'Market News', icon: BarChart3, isLink: true },
      { id: 'economic', label: 'Economic Calendar', icon: ExternalLink, isExternal: true },
    ],
  },
  {
    id: 'benefits',
    label: 'Exness benefits',
    icon: Shield,
    isCollapsible: true,
    subItems: [
      { id: 'tradingcondition', label: 'Trading Conditions', icon: Users, isLink: true },
      { id: 'savings', label: 'Savings', icon: BarChart3, isLink: true },
      { id: 'virtual', label: 'Virtual Private Server', icon: Clock, isLink: true },
    ],
  },
  { id: 'copy-trading', label: 'Copy Trading', icon: Copy, isCollapsible: false },
  { id: 'support', label: 'Support hub', icon: Heart, isCollapsible: false, isNew: true },
    {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    isCollapsible: true,
    subItems: [
      { id: 'profile', label: 'Profile', icon: Users, isLink: true },
      { id: 'security', label: 'Security', icon: BarChart3, isLink: true },
      { id: 'tradingterminal', label: 'Trading Terminal', icon: Clock, isLink: true },
    ],
  },
];

/**
 * Component for a single Menu Item or Sub-Menu Header.
 * Handles the display logic for both expanded and collapsed states.
 */
const SidebarItem = ({ item, isExpanded }) => {
  // Local state to manage the expansion of sub-menus (like 'Trading')
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(item.initialOpen || false);

  const Icon = item.icon;

  const baseClasses = "flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200";
  const expandedClasses = "hover:bg-gray-100";
  const collapsedClasses = "hover:bg-gray-100 justify-center";
  const activeClasses = ''; // No tab selected by default

  // Toggles the sub-menu if the item is collapsible
  const handleClick = () => {
    if (item.isCollapsible) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <div className="w-full">
      {/* Menu Item Header */}
      <div
        className={`${baseClasses} ${isExpanded ? expandedClasses : collapsedClasses} ${activeClasses} ${item.subItems?.length === 0 ? 'mb-1' : ''}`}
        onClick={handleClick}
      >
        {/* Icon (always visible) */}
        <Icon className={`w-5 h-5 text-gray-700 transition-all duration-200 ${isExpanded ? 'mr-3' : ''}`} />

        {isExpanded && (
          <>
            {/* Label (only visible when expanded) */}
            <span className="flex-1 whitespace-nowrap text-sm font-medium text-gray-800">
              {item.label}
            </span>

            {/* 'New' Tag */}
            {item.isNew && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-auto">
                New
              </span>
            )}

            {/* Chevron for collapsible items */}
            {item.isCollapsible && (
              <div className="ml-auto transition-transform duration-200">
                {isSubMenuOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sub-Items (only rendered when expanded and sub-menu is open) */}
      {isExpanded && item.subItems && isSubMenuOpen && (
        <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-gray-200 ml-3">
          {item.subItems.map((subItem) => (
            <div
              key={subItem.id}
              className="p-2 rounded-lg cursor-pointer text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-200/50"
            >
              {subItem.label}
              {subItem.isExternal && <ExternalLink className="w-3 h-3 ml-2 inline-block align-text-bottom text-gray-400" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


/**
 * The main Sidebar Component that manages its own expanded state.
 * It is designed to be the default export of this file.
 */
const Sidebar = ({ isExpanded, setIsExpanded, isSidebarOpen, setIsSidebarOpen }) => {
   const [isHoveredOpen, setIsHoveredOpen] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setIsHoveredOpen(false);
  };

  const widthClass = isExpanded ? 'w-70' : 'w-13';
  const controlLabel = isExpanded ? '' : '';

  return (
    <div
      className={`${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 flex mt-14' : 'hidden'} lg:flex lg:relative lg:inset-auto flex-col h-[calc(90vh-px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink:0 ${widthClass}`}
      style={{ willChange: 'width' }}
    >
      {/* Scrollable Navigation Area */}
      <div
        className={`flex-1 overflow-y-auto space-y-2 h-[80%] transition-all duration-300 ${isExpanded ? 'px-4 py-1 pr-2' : 'p-1'}`}
        onMouseEnter={() => { if (!isExpanded) { setIsExpanded(true); setIsHoveredOpen(true); } }}
        onMouseLeave={() => { if (isHoveredOpen) { setIsExpanded(false); setIsHoveredOpen(false); } }}
      >
        {sidebarItems.map((item) => (
          <SidebarItem key={item.id} item={item} isExpanded={isExpanded} />
        ))}
      </div>

      {/* Collapse/Expand Control Button */}
      <div className={`flex justify-center border-t border-gray-200 hover:bg-gray-100 transition-all duration-300 ${isExpanded ? 'px-4' : 'px-1'}`}>
        <button
          onClick={toggleSidebar}
          title={controlLabel}
          className="flex items-center justify-center p-2 rounded-lg text-gray-600 "
        >
          <div className={`p-1 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
            {/* The ChevronsLeft icon is used for the control button, and we rotate it for the expanded state */}
            <ChevronsLeft className="w-5 h-5" />
          </div>
          {isExpanded && <span className="ml-3 text-sm font-medium">{controlLabel}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;