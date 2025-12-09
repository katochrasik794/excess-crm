import React, { useState } from 'react';
import TopContainer from '../../components/TopContainer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MarketNews = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const tags = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'DollarIndex'];

  const newsItems = [
    {
      id: 6,
      title: 'AUD: RBA expected to hold rates steady tomorrow – Commerzbank »',
      author: 'FXStreet Insights Team',
      time: 'Dec 8, 10:44 GMT',
      summary: 'The Reserve Bank of Australia (RBA) is widely expected to keep interest rates unchanged, with markets already pricing in the decision ahead of tomorrow\'s announcement.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=150', 
      tags: ['AUDUSD', 'BANKS', 'RBA', 'TECHNICAL ANALYSIS', 'AUSTRALIA'],
      fullContent: (
        <div className="mt-6 space-y-4 text-gray-800">
           <p>The Reserve Bank of Australia (RBA) is widely expected to keep interest rates unchanged, with markets already pricing in the decision ahead of tomorrow's announcement. Despite a higher-than-expected inflation print in November, the RBA is unlikely to signal any imminent rate hikes, potentially limiting further Australian Dollar (AUD) gains, Commerzbank's FX analyst Michael Pfister notes.</p>
           
           <h3 className="text-3xl font-bold text-[#141d22] pt-4 pb-2">AUD bulls may face disappointment</h3>
           
           <p className="text-gray-600">"Early tomorrow morning (European time), the Australian central bank (RBA) will announce its final interest rate decision of the year. All the economists surveyed by Bloomberg expect interest rates to remain unchanged. Decision-makers already rejected the idea of a further interest rate cut in November, and not much has changed since then. Instead, the first full monthly inflation report came as a further surprise on the upside, moving further away from the upper limit of the 2-3% target range at 3.8% year-on-year."</p>
           
           <p className="text-gray-600">"The actual interest rate decision is likely to have been fully priced in, given current expectations. However, it is questionable whether there will be any indications in the coming months that would support expectations of interest rate hikes in the next year. These expectations only really emerged last month and were certainly one of the factors behind the higher AUD/USD levels."</p>
           
           <p className="text-gray-600">"Nevertheless, we do not expect the central bank to signal a rate hike more clearly tomorrow, given that it recently still delivered rate cuts. You never know, but that would be an extremely quick turnaround for a G10 central bank. Some AUD bulls could therefore be disappointed tomorrow, which would hurt the Aussie."</p>
        </div>
      )
    },
    {
      id: 1,
      title: 'EUR holds steady near mid-1.16s – Scotiabank »',
      author: 'FXStreet Insights Team',
      time: 'Dec 8, 13:51 GMT',
      summary: 'The Euro (EUR) is entering Monday\'s NA session flat to the US Dollar (USD) with an extension of its recent consolidation in the mid-1.16s, Scotiabank\'s Chief FX Strategists Shaun Osborne and Eric Theoret report.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=150',
      tags: ['EURUSD', 'BANKS', 'ECB', 'TECHNICAL ANALYSIS'],
      fullContent: (
        <div className="mt-6 space-y-4 text-gray-800">
           <p>The Euro is maintaining its position near the mid-1.16s as market participants await further drivers. Technical indicators suggest a neutral outlook in the short term, with resistance forming near 1.1680 and support at 1.1620.</p>
           <p>"We continue to see consolidation as the most likely scenario for now," notes Shaun Osborne. "Investments in the Eurozone remain steady, but lack of strong catalytic events is keeping volatility low."</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'EUR/USD fluctuates within previous ranges awaiting the Fed »',
      author: 'Guillermo Alcala',
      time: 'Dec 8, 12:55 GMT',
      summary: 'EUR/USD shows marginal gains on Monday, trading near 1.1650, after giving away most ot the daily gains during the European morning session.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200&h=150',
      tags: ['EURUSD', 'CURRENCIES', 'MAJORS', 'FED', 'SEO'],
      fullContent: (
         <div className="mt-6 space-y-4 text-gray-800">
            <h3 className="text-2xl font-bold text-[#141d22]">Awaiting Federal Reserve Direction</h3>
            <p>The pair has been fluctuating within a tight range of 1.1630 - 1.1670. Traders are predominantly on the sidelines ahead of the upcoming Federal Reserve meeting, which is expected to shed light on the future of interest rate hikes.</p>
            <p>Current sentiment remains cautiously optimistic for the USD, potentially putting downside pressure on the pair if the Fed strikes a hawkish tone.</p>
         </div>
      )
    },
    {
      id: 3,
      title: 'EUR: EU considers using frozen Russian reserves to fund Ukraine – Commerzbank »',
      author: 'FXStreet Insights Team',
      time: 'Dec 8, 11:50 GMT',
      summary: 'Since the US has effectively halted its financial assistance to Ukraine, it has fallen to the European Union to support the Kyiv government financially. And this aid is urgently needed — Ukraine\'s funds are expected to run dry as early as April.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200&h=150',
      tags: ['BANKS', 'EURUSD', 'RUSSIANFEDERATION', 'EUROPE', 'TECHNICAL ANALYSIS'],
      fullContent: (
          <div className="mt-6 space-y-4 text-gray-800">
             <p>The European Union is exploring legal avenues to utilize frozen Russian central bank assets to aid Ukraine's reconstruction and funding needs. This move comes as US aid packages face delays.</p>
             <p>Legal experts warn of potential precedents this could set for international finance, but EU leaders emphasize the moral imperative of supporting Ukraine.</p>
          </div>
      )
    },
    {
      id: 4,
      title: 'ECB\'s Kazimir: Supports holding interest rates steady in December »',
      author: 'Sagar Dua',
      time: 'Dec 8, 11:30 GMT',
      summary: 'European Central Bank (ECB) policymaker Peter Kazimir said in the European session on Monday that he doesn\'t see any reason of monetary policy adjustment in the policy meeting this month.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=150',
      tags: ['EURUSD', 'ECB', 'INTERESTRATE'],
      fullContent: (
          <div className="mt-6 space-y-4 text-gray-800">
             <p>"The current data does not support a rate hike in December," Kazimir stated. "Inflation is trending downwards, albeit slowly, and we need to allow the previous hikes to fully transmit through the economy."</p>
             <p>Markets reacted positively to these comments, seeing stability in the Eurozone's monetary policy for the remainder of the year.</p>
          </div>
      )
    },
    {
      id: 5,
      title: 'EUR/USD holds firm around 1.1650 ahead of ECB signals – BBH »',
      author: 'FXStreet Insights Team',
      time: 'Dec 8, 11:27 GMT',
      summary: 'EUR/USD is steady near 1.1650 as ECB\'s Isabel Schnabel signals comfort with markets pricing in a potential future rate hike, BBH FX analysts report.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200&h=150',
      tags: ['EURUSD', 'TECHNICAL ANALYSIS', 'BANKS', 'ECB'],
       fullContent: (
          <div className="mt-6 space-y-4 text-gray-800">
             <p>Isabel Schnabel's recent comments have reinforced the ECB's data-dependent approach. While not committing to a hike, the acknowledgement of market pricing suggests the central bank is keeping its options open.</p>
          </div>
      )
    }
  ];

  return (
    <>
      <TopContainer />
      <div className="bg-white min-h-screen p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#141d22] mb-8">Market News</h1>

        {/* Tags Section */}
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-1 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 bg-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-8 last:border-0">
              <div className="flex gap-6">
                {/* Image */}
                <div className="flex-shrink-0 w-[120px] h-[90px] rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 
                     onClick={() => toggleItem(item.id)}
                     className="text-lg font-bold text-[#141d22] hover:text-[#2962ff] cursor-pointer mb-2 flex items-start gap-1"
                  >
                    {item.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="font-bold text-gray-900">{item.author}</span>
                    <span>|</span>
                    <span>{item.time}</span>
                  </div>

                  {expandedItems[item.id] ? (
                      <div>
                        {item.fullContent}
                      </div>
                  ) : (
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {item.summary}
                      </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-[#141d22] text-[10px] font-bold rounded uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => toggleItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 ml-4 p-2"
                    >
                      {expandedItems[item.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarketNews;
