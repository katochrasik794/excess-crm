import React, { useState } from 'react';
import TopContainer from '../components/TopContainer';
import { Star, TrendingUp, User, DollarSign, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

const CopyTrading = () => {
  const [activeTab, setActiveTab] = useState('STRATEGIES');
  const [activeChip, setActiveChip] = useState('ALL');

  const tabs = [
    { id: 'STRATEGIES', label: 'Discover strategies' },
    { id: 'FAVOURITES', label: 'Favorites' },
    { id: 'INVESTMENTS', label: 'Assets' },
    { id: 'ACCOUNTS_LIST', label: 'My copy strategies' },
  ];

  const chips = [
    { id: 'ALL', label: 'All strategies' },
    { id: 'MOST_COPIED', label: 'Most Copied' },
    { id: 'MODERATE_DRAWDOWN', label: 'Return with Moderate Drawdown' },
    { id: 'BEST_RETURN_3M', label: 'Best Return for 3 months' },
    { id: 'LOW_FEE', label: 'Low Fee' },
    { id: 'NEW', label: 'New Strategies' },
  ];

  const currencies = [
    { code: 'XAU', name: 'XAU'},
    { code: 'USD', name: 'USD'},
    { code: 'JPY', name: 'JPY'},
    { code: 'GBP', name: 'GBP'},
    { code: 'CAD', name: 'CAD'},
    { code: 'CHF', name: 'CHF'},
    { code: 'EUR', name: 'EUR'},
    { code: 'AUD', name: 'AUD'},
    { code: 'NZD', name: 'NZD'},
    { code: 'XAG', name: 'XAG'},
    { code: 'DKK', name: 'DKK'},
    { code: 'HKD', name: 'HKD'},
  ];

  const mostCopied = [
    { id: 1, name: 'Nghiền Forex X4', return: 1258, fee: 30, investors: 7267, icon: 'N', color: 'bg-yellow-500', isImage: true, image: 'https://images.unsplash.com/photo-1620288627223-537a5bb03632?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'Ds Steady Growth', return: 116, fee: 30, investors: 3289, icon: 'D', color: 'bg-blue-600', isImage: true, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'Nghiền Forex X1', return: 444, fee: 30, investors: 3114, icon: 'N', color: 'bg-yellow-500', isImage: true, image: 'https://images.unsplash.com/photo-1620288627223-537a5bb03632?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, name: 'Chiến lược million U', return: 3189, fee: 30, investors: 2076, icon: 'C', color: 'bg-green-600', isImage: true, image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 5, name: 'EZSignals Team', return: 38, fee: 25, investors: 1890, icon: 'E', color: 'bg-purple-600', isImage: true, image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 6, name: 'AI Trade Bot', return: 143529, fee: 50, investors: 1838, icon: 'A', color: 'bg-indigo-600', isImage: true, image: 'https://images.unsplash.com/photo-1531297461136-8200b7109019?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  const moderateDrawdown = [
    { id: 1, name: 'FX Hunter', return: 61870, fee: 20, investors: 721, image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 2, name: 'New York Traders', return: 25762, fee: 30, investors: 85, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 3, name: 'Auto profit', return: 23298, fee: 30, investors: 254, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 4, name: 'The5ers Trading', return: 20531, fee: 0, investors: 588, image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 5, name: 'BTC Reversal Matrix', return: 16479, fee: 30, investors: 173, image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=300&h=200' },
  ];

  const bestReturn3M = [
    { id: 1, name: 'AI Trade Bot', return: 143529, fee: 50, investors: 1838, image: 'https://images.unsplash.com/photo-1531297461136-8200b7109019?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 2, name: 'Yasser Fx', return: 130564, fee: 30, investors: 1427, image: 'https://images.unsplash.com/photo-1565106430482-8c6e74390732?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 3, name: 'FX Hunter', return: 61870, fee: 20, investors: 721, image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 4, name: 'PRICE ACTION Trading', return: 43060, fee: 25, investors: 1390, image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 5, name: 'Trading thầm lặng', return: 27275, fee: 30, investors: 790, image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=300&h=200' },
  ];

  const lowFee = [
    { id: 1, name: 'The5ers Trading', return: 20531, fee: 0, investors: 588, image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 2, name: 'GOLD LEGEND-LVG50', return: 2729, fee: 0, investors: 65, image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 3, name: 'Đồng Xuu Ma Thuật A', return: 2429, fee: 0, investors: 209, image: 'https://images.unsplash.com/photo-1621504450168-b8c6816bc7ac?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 4, name: 'Big Win Trade', return: 1976, fee: 0, investors: 80, image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 5, name: 'Money Money', return: 1622, fee: 0, investors: 308, image: 'https://images.unsplash.com/photo-1565514020176-dbf2277f241e?auto=format&fit=crop&q=80&w=300&h=200' },
  ];

  const newStrategies = [
    { id: 1, name: 'ULTIMATE ATM', return: 59, fee: 30, investors: 4, image: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 2, name: 'Smart Alpha Strategy', return: 47, fee: 5, investors: 0, image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 3, name: 'El-Alem Strategy_2', return: 67, fee: 30, investors: 1, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 4, name: 'My last dice', return: 15, fee: 0, investors: 0, image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 5, name: 'El-Alem Strategy_3', return: 60, fee: 30, investors: 1, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=300&h=200' },
  ];

  const StrategyCard = ({ name, returnVal, fee, investors, image }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer min-w-[280px]">
      <div className="relative h-32 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-4 text-white drop-shadow-md">
           <div className="font-bold text-lg">{name}</div>
           <Star className="text-yellow-400 fill-yellow-400 w-4 h-4 inline-block mt-[-4px]" />
        </div>
        <div className="absolute top-2 right-2">
           <Star className="text-white hover:text-yellow-400 cursor-pointer w-5 h-5" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-green-600 gap-1">
            <span className="text-xs font-medium text-gray-500 uppercase">Return</span>
          </div>
          <div className="text-xl font-bold text-[#141d22]">{returnVal}%</div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User size={14} className="text-gray-400" />
            <span className="font-medium text-[#141d22]">{investors}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={14} className="text-gray-400" />
            <span className="font-medium text-[#141d22]">{fee}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, showSeeAll = true }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-[#141d22]">{title}</h2>
      {showSeeAll && (
        <button className="flex items-center text-gray-500 hover:text-gray-900 text-sm font-medium">
          See all <ChevronRight size={16} />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <TopContainer />
      <div className="max-w-[1248px] mx-auto px-6 py-6 font-sans">
        <h1 className="text-3xl font-bold text-[#141d22] mb-6">Copy Trading</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8 flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[15px] font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#141d22]'
                  : 'text-gray-500 hover:text-[#141d22]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#141d22]" />
              )}
            </button>
          ))}
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveChip(chip.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                activeChip === chip.id
                  ? 'bg-[#141d22] text-white border-[#141d22]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="flex gap-8 items-start mb-16">
            {/* Most Copied List */}
            <div className="flex-1">
                <SectionHeader title="Most Copied" />
                <div className="space-y-4">
                {mostCopied.map((item, index) => (
                    <div key={item.id} className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer group">
                        <div className="w-6 text-gray-400 font-medium text-sm">{index + 1}</div>
                        <div className="w-12 h-9 rounded bg-cover bg-center mr-4 relative border border-gray-200 overflow-hidden">
                            <img src={item.image} alt="" className="w-full h-full object-cover"/>
                             <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs" style={{display: 'none'}}>
                                {item.icon}
                             </div>
                        </div>
                        <div className="flex-1">
                             <div className="font-bold text-[#141d22] text-sm mb-1 group-hover:text-blue-600 transition-colors">{item.name}</div>
                             <div className="flex items-center gap-4 text-xs text-gray-500">
                                 <div className="flex items-center gap-1 text-green-600 font-medium">
                                     <TrendingUp size={12} /> {item.return}%
                                 </div>
                                 <div className="flex items-center gap-1">
                                     <DollarSign size={12} /> {item.fee}%
                                 </div>
                             </div>
                        </div>
                        <div className="text-right">
                             <div className="font-bold text-[#141d22] text-sm">{item.investors}</div>
                             <div className="text-xs text-gray-400">Investors</div>
                        </div>
                    </div>
                ))}
                </div>
            </div>

             
        </div>

        {/* Highlight Card */}
<div className="w-full">
  <div className="border border-gray-200 rounded-xl px-4 py-4 sm:px-6 sm:py-5 bg-white shadow-sm">

    {/* Title */}
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">🔥</span>
      <h3 className="font-bold text-[#141d22] text-base sm:text-lg">
        Best strategy by return per 3 months
      </h3>
    </div>

    {/* Strategy Row */}
    <div className="flex items-center justify-between gap-4">

      {/* Image + Text */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=200&h=150"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="font-bold text-[#141d22] text-sm sm:text-base">
            high return 3months2
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-1">
            <TrendingUp size={14} />
            <span>Return 9986%</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button className="py-2 px-4 rounded border border-gray-300 font-semibold text-[#141d22] hover:bg-gray-50 transition-colors text-sm sm:text-base">
          Details
        </button>
        <button className="py-2 px-4 rounded bg-[#FFD95A] font-semibold text-[#141d22] hover:bg-[#ffcf33] transition-colors text-sm sm:text-base">
          Invest 10 USD
        </button>
      </div>
    </div>
  </div>
</div>


        {/* By Currency */}
        <div className="my-12">
            <SectionHeader title="By currency" />
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {currencies.map((curr) => (
                    <div key={curr.code} className="min-w-[120px] h-[80px] border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:shadow-md cursor-pointer bg-white transition-all">
                        <div className="w-8 h-8 rounded-full bg-gray-100 mb-2 flex items-center justify-center font-bold text-xs text-gray-500 border border-gray-200">
                             {curr.code[0]}
                        </div>
                        <span className="text-sm font-bold text-[#141d22]">{curr.code}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Carousel Sections */}
        <div className="space-y-12">
             <div>
                <SectionHeader title="Return with Moderate Drawdown" />
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                    {moderateDrawdown.map(strategy => <StrategyCard key={strategy.id} {...strategy} />)}
                </div>
             </div>
             
             <div>
                <SectionHeader title="Best Return for 3 months" />
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                    {bestReturn3M.map(strategy => <StrategyCard key={strategy.id} {...strategy} />)}
                </div>
             </div>

             <div>
                <SectionHeader title="Low Fee" />
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                    {lowFee.map(strategy => <StrategyCard key={strategy.id} {...strategy} />)}
                </div>
             </div>

             <div>
                <SectionHeader title="New Strategies" />
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                    {newStrategies.map(strategy => <StrategyCard key={strategy.id} {...strategy} />)}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTrading;
