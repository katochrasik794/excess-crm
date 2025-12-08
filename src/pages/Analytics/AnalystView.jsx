import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalystView.css';
import { FaSearch } from 'react-icons/fa';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const AnalystView = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Forex');
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Intraday');

  // Mock data for different categories
  const tradingData = {
    Forex: [
      {
        id: 1,
        pair: 'USD/CAD',
        timeframe: '30 MIN',
        time: '9:53 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 5:23:52 AM CET',
        chartImage: '/charts/usdcad.png',
        expectedMove: '-23 - 48 PIPS',
        moveDirection: 'down',
        target: '1.3775',
        pivot: '1.3860'
      },
      {
        id: 2,
        pair: 'AUD/USD',
        timeframe: '30 MIN',
        time: '9:51 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 5:21:37 AM CET',
        chartImage: '/charts/audusd.png',
        expectedMove: '6 - 21 PIPS',
        moveDirection: 'up',
        target: '0.6665',
        pivot: '0.6625'
      },
      {
        id: 3,
        pair: 'USD/CHF',
        timeframe: '30 MIN',
        time: '9:47 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 5:17:43 AM CET',
        chartImage: '/charts/usdchf.png',
        expectedMove: '20 - 35 PIPS',
        moveDirection: 'up',
        target: '0.8070',
        pivot: '0.8025'
      },
      {
        id: 16,
        pair: 'GBP/USD',
        timeframe: '30 MIN',
        time: '9:45 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 5:15:30 AM CET',
        chartImage: '/charts/gbpusd.png',
        expectedMove: '24 - 44 PIPS',
        moveDirection: 'up',
        target: '1.3380',
        pivot: '1.3310'
      },
      {
        id: 17,
        pair: 'EUR/USD',
        timeframe: '30 MIN',
        time: '9:42 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 5:12:49 AM CET',
        chartImage: '/charts/eurusd.png',
        expectedMove: '15 - 30 PIPS',
        moveDirection: 'up',
        target: '1.1680',
        pivot: '1.1630'
      },
      {
        id: 18,
        pair: 'USD/JPY',
        timeframe: '30 MIN',
        time: '8:58 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 4:28:57 AM CET',
        chartImage: '/charts/usdjpy.png',
        expectedMove: '45 - 70 PIPS',
        moveDirection: 'down',
        target: '154.30',
        pivot: '155.40'
      },
      {
        id: 19,
        pair: 'AUD/JPY',
        timeframe: '30 MIN',
        time: '4:46 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 12:16:21 AM CET',
        chartImage: '/charts/audjpy.png',
        expectedMove: '44 - 67 PIPS',
        moveDirection: 'down',
        target: '102.27',
        pivot: '103.34'
      },
      {
        id: 20,
        pair: 'EUR/GBP',
        timeframe: '30 MIN',
        time: '4:46 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 12:16:21 AM CET',
        chartImage: '/charts/eurgbp.png',
        expectedMove: '18 - 26 PIPS',
        moveDirection: 'up',
        target: '0.8763',
        pivot: '0.8720'
      }
    ],
    Crypto: [
      {
        id: 4,
        pair: 'XRP / Dollar',
        timeframe: '30 MIN',
        time: '10:38 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:08:58 AM CET',
        chartImage: '/charts/xrp.png',
        expectedMove: '4.95%',
        moveDirection: 'up',
        target: '2.1770',
        pivot: '2.0294'
      },
      {
        id: 5,
        pair: 'Dogecoin / Dollar',
        timeframe: '30 MIN',
        time: '10:38 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:08:16 AM CET',
        chartImage: '/charts/doge.png',
        expectedMove: '5.75%',
        moveDirection: 'up',
        target: '0.1489',
        pivot: '0.1372'
      },
      {
        id: 6,
        pair: 'Cardano / Dollar',
        timeframe: '30 MIN',
        time: '10:37 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:07:15 AM CET',
        chartImage: '/charts/cardano.png',
        expectedMove: '5.98%',
        moveDirection: 'up',
        target: '0.4499',
        pivot: '0.4140'
      },
      {
        id: 21,
        pair: 'Ether / USD',
        timeframe: '30 MIN',
        time: '10:35 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:05:57 AM CET',
        chartImage: '/charts/ether.png',
        expectedMove: '4.63%',
        moveDirection: 'up',
        target: '3,270',
        pivot: '3,063'
      },
      {
        id: 22,
        pair: 'Bitcoin / USD',
        timeframe: '30 MIN',
        time: '10:34 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:04:30 AM CET',
        chartImage: '/charts/bitcoin.png',
        expectedMove: '2.77%',
        moveDirection: 'up',
        target: '93,760',
        pivot: '90,140'
      },
      {
        id: 23,
        pair: 'Binance Coin / Dollar',
        timeframe: '30 MIN',
        time: '10:33 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 6:03:48 AM CET',
        chartImage: '/charts/binance.png',
        expectedMove: '4.85%',
        moveDirection: 'up',
        target: '945.3',
        pivot: '883.2'
      }
    ],
    Stocks: [
      {
        id: 24,
        pair: 'Alibaba',
        timeframe: 'DAILY',
        time: '4:25 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 11:55:35 PM CET',
        chartImage: '/charts/alibaba.png',
        expectedMove: '11.32%',
        moveDirection: 'up',
        target: '176.25',
        pivot: '150.39'
      },
      {
        id: 25,
        pair: 'Nvidia',
        timeframe: 'DAILY',
        time: '4:23 AM (UTC+5:30)',
        date: 'Tuesday, December 2, 2025 11:53:31 PM CET',
        chartImage: '/charts/nvidia.png',
        expectedMove: '12.86%',
        moveDirection: 'down',
        target: '158.12',
        pivot: '195.59'
      },
      {
        id: 26,
        pair: 'Meta Platforms',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/meta.png',
        expectedMove: '7.56%',
        moveDirection: 'up',
        target: '696.95',
        pivot: '614.40'
      },
      {
        id: 27,
        pair: 'Tesla',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/tesla.png',
        expectedMove: '15.42%',
        moveDirection: 'up',
        target: '496.51',
        pivot: '398.66'
      },
      {
        id: 28,
        pair: 'Apple',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/apple.png',
        expectedMove: '5.62%',
        moveDirection: 'up',
        target: '294.51',
        pivot: '269.24'
      },
      {
        id: 29,
        pair: 'Alphabet',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/alphabet.png',
        expectedMove: '12.48%',
        moveDirection: 'up',
        target: '360.13',
        pivot: '302.60'
      },
      {
        id: 30,
        pair: 'Amazon.com',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/amazon.png',
        expectedMove: '9.36%',
        moveDirection: 'up',
        target: '255.05',
        pivot: '220.77'
      },
      {
        id: 31,
        pair: 'Microsoft',
        timeframe: 'DAILY',
        time: '2:15 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:45:31 AM CET',
        chartImage: '/charts/microsoft.png',
        expectedMove: '7.30%',
        moveDirection: 'down',
        target: '456.11',
        pivot: '506.23'
      }
    ],
    Indices: [
      {
        id: 32,
        pair: 'Dow Jones',
        timeframe: 'DAILY',
        time: '2:03 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 9:33:48 PM CET',
        chartImage: '/charts/dowjones.png',
        expectedMove: '2.90%',
        moveDirection: 'up',
        target: '49,400',
        pivot: '46,600'
      },
      {
        id: 33,
        pair: 'Nasdaq 100',
        timeframe: 'DAILY',
        time: '2:00 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 9:30:11 PM CET',
        chartImage: '/charts/nasdaq100.png',
        expectedMove: '3.92%',
        moveDirection: 'up',
        target: '26,700.00',
        pivot: '25,000.00'
      },
      {
        id: 34,
        pair: 'S&P 500',
        timeframe: 'DAILY',
        time: '1:58 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 9:28:20 PM CET',
        chartImage: '/charts/sp500.png',
        expectedMove: '2.44%',
        moveDirection: 'up',
        target: '7,040.00',
        pivot: '6,700.00'
      },
      {
        id: 35,
        pair: 'Hang Seng',
        timeframe: 'DAILY',
        time: '11:08 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 6:38:10 AM CET',
        chartImage: '/charts/hangseng.png',
        expectedMove: '5.61%',
        moveDirection: 'down',
        target: '24,400',
        pivot: '26,500'
      },
      {
        id: 36,
        pair: 'Nikkei 225',
        timeframe: 'DAILY',
        time: '10:50 AM (UTC+5:30)',
        date: 'Friday, December 5, 2025 6:20:31 AM CET',
        chartImage: '/charts/nikkei225.png',
        expectedMove: '7.32%',
        moveDirection: 'down',
        target: '46,700',
        pivot: '51,300'
      },
      {
        id: 37,
        pair: 'Dax',
        timeframe: 'DAILY',
        time: '2:18 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:48:08 AM CET',
        chartImage: '/charts/dax.png',
        expectedMove: '2.93%',
        moveDirection: 'up',
        target: '24,380',
        pivot: '23,050'
      },
      {
        id: 38,
        pair: 'FTSE 100',
        timeframe: 'DAILY',
        time: '2:03 PM (UTC+5:30)',
        date: 'Monday, December 1, 2025 9:33:43 AM CET',
        chartImage: '/charts/ftse100.png',
        expectedMove: '2.11%',
        moveDirection: 'up',
        target: '9,911',
        pivot: '9,340'
      }
    ],
    Commodities: [
      {
        id: 39,
        pair: 'Silver',
        timeframe: '30 MIN',
        time: '8:42 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 4:12:40 AM CET',
        chartImage: '/charts/silver.png',
        expectedMove: '2.45%',
        moveDirection: 'down',
        target: '56.50',
        pivot: '58.60'
      },
      {
        id: 40,
        pair: 'Gold',
        timeframe: '30 MIN',
        time: '8:40 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 4:10:26 AM CET',
        chartImage: '/charts/gold.png',
        expectedMove: '0.69%',
        moveDirection: 'down',
        target: '4,180',
        pivot: '4,220'
      },
      {
        id: 41,
        pair: 'Crude Oil (WTI)',
        timeframe: '30 MIN',
        time: '8:28 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 3:58:20 AM CET',
        chartImage: '/charts/crudeoil.png',
        expectedMove: '1.16%',
        moveDirection: 'up',
        target: '60.80',
        pivot: '59.75'
      },
      {
        id: 42,
        pair: 'Brent (ICE)',
        timeframe: '30 MIN',
        time: '8:27 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 3:57:04 AM CET',
        chartImage: '/charts/brent.png',
        expectedMove: '1.22%',
        moveDirection: 'up',
        target: '64.55',
        pivot: '63.40'
      },
      {
        id: 43,
        pair: 'Natural Gas (NYMEX)',
        timeframe: '30 MIN',
        time: '7:50 AM (UTC+5:30)',
        date: 'Monday, December 8, 2025 3:20:38 AM CET',
        chartImage: '/charts/naturalgas.png',
        expectedMove: '7.40%',
        moveDirection: 'down',
        target: '4.7400',
        pivot: '5.2800'
      }
    ]
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setSelectedTimeframe('Intraday'); // Reset to Intraday when opening a new card
  };

  const handleBackToList = () => {
    setSelectedCard(null);
  };

  // Generate dummy chart data based on selected card and timeframe
  const generateChartData = (card, timeframe = 'Intraday') => {
    if (!card) return [];
    
    const basePrice = parseFloat(card.pivot.replace(',', ''));
    const targetPrice = parseFloat(card.target.replace(',', ''));
    const isUptrend = card.moveDirection === 'up';
    
    const data = [];
    // Different number of points for different timeframes
    const numPoints = timeframe === 'Intraday' ? 50 : timeframe === 'Daily' ? 30 : 20;
    // Different volatility for different timeframes
    const volatility = timeframe === 'Intraday' ? 0.02 : timeframe === 'Daily' ? 0.03 : 0.05;
    
    for (let i = 0; i < numPoints; i++) {
      const progress = i / numPoints;
      const randomVariation = (Math.random() - 0.5) * (basePrice * volatility);
      
      let price;
      if (isUptrend) {
        price = basePrice + (targetPrice - basePrice) * progress + randomVariation;
      } else {
        price = basePrice - (basePrice - targetPrice) * progress + randomVariation;
      }
      
      // Add MA20 and MA50 lines
      const ma20 = price * (1 + (Math.random() - 0.5) * 0.01);
      const ma50 = price * (1 + (Math.random() - 0.5) * 0.015);
      
      data.push({
        time: `Dec ${Math.floor(1 + i / 2)}`,
        price: parseFloat(price.toFixed(4)),
        ma20: parseFloat(ma20.toFixed(4)),
        ma50: parseFloat(ma50.toFixed(4)),
      });
    }
    
    return data;
  };

  // Filter cards based on search query
  const getFilteredCards = () => {
    const cards = tradingData[activeFilter];
    if (!searchQuery.trim()) {
      return cards;
    }
    return cards.filter(card => 
      card.pair.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleTrade = (pair) => {
    navigate('/my-account');
  };

  return (
    <>
    <TopContainer />

      <div className="analyst-view p-4 md:px-8 w-full lg:px-10 max-w-7xl mx-auto">
      <div className="analyst-view-header">
        <h1>Analyst Views</h1>
        
      </div>

{!selectedCard ? (
      <>
        <div className="w-full flex justify-end mb-10 ">
      <div className="relative w-80">
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Symbol or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            pl-10 pr-4 py-2
            rounded-full
            bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-300
            text-gray-700
          "
        />
      </div>
    </div>

      <div className="filter-buttons">
        {['Forex', 'Crypto', 'Stocks', 'Indices', 'Commodities'].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>


      <div className="trading-cards-grid">
        {getFilteredCards().map((card) => (
          <div 
            key={card.id} 
            className="trading-card"
            onClick={() => handleCardClick(card)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-header">
              <div className="pair-info">
                <h3>{card.pair}</h3>
                <span className="timeframe">{card.timeframe}</span>
              </div>
              <div className="time-info">
                <span className="time">{card.time}</span>
              </div>
            </div>

            <div className="card-date">
              <p>{card.date}</p>
            </div>

            <div className="chart-container">
              {/* Mini Trading Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={generateChartData(card)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10 }}
                    hide={true}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    hide={true}
                    domain={['auto', 'auto']}
                  />
                  
                  {/* Reference Lines */}
                  <ReferenceLine 
                    y={parseFloat(card.target.replace(',', ''))} 
                    stroke={card.moveDirection === 'up' ? '#22c55e' : '#ef4444'}
                    strokeWidth={2}
                  />
                  <ReferenceLine 
                    y={parseFloat(card.pivot.replace(',', ''))} 
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  
                  {/* Price Line */}
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={card.moveDirection === 'up' ? '#22c55e' : '#ef4444'}
                    strokeWidth={2}
                    dot={false}
                  />
                  
                  {/* MA Lines - lighter */}
                  <Line 
                    type="monotone" 
                    dataKey="ma20" 
                    stroke="#fbbf24" 
                    strokeWidth={1}
                    dot={false}
                    opacity={0.6}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma50" 
                    stroke="#a78bfa" 
                    strokeWidth={1}
                    dot={false}
                    opacity={0.6}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card-details">
              <div className="expected-move">
                <span className="label">Expected Move</span>
                <span className={`value ${card.moveDirection}`}>
                  {card.moveDirection === 'up' ? '▲' : '▼'} {card.expectedMove}
                </span>
              </div>

              <div className="trading-levels">
                <div className="level">
                  <span className="label">Target</span>
                  <span className="value">{card.target}</span>
                </div>
                <div className="level">
                  <span className="label">Pivot</span>
                  <span className="value">{card.pivot}</span>
                </div>
              </div>
            </div>

            <button className="trade-btn" onClick={() => handleTrade(card.pair)}>
              Trade
            </button>
          </div>
        ))}
        
        {/* No Results Message */}
        {getFilteredCards().length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No trading pairs found matching "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with a different symbol or name</p>
          </div>
        )}
      </div>
      </>
    ) : (
      /* Detail View */
      <div className="detail-view-container">
        {/* Home Link */}
        <div className='flex items-center justify-between'>
          <button 
          onClick={handleBackToList}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <span>🏠</span>
          <span>Home</span>
        </button>

      <div className="relative w-72">
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Symbol or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            pl-12 pr-4 py-1
            rounded-full
            bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-300
            text-gray-700
          "
        />
      </div>

        </div>
        

        {/* Intraday/Daily/Weekly Stats */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedTimeframe('Intraday')}
            className={`px-4 py-2 border rounded text-sm font-medium flex items-center gap-2 transition-all cursor-pointer hover:opacity-80 ${
              selectedTimeframe === 'Intraday'
                ? 'bg-red-100 border-red-400 text-red-800 ring-2 ring-red-300'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
          >
            <span>Intraday: 14 - 39 PIPS</span>
            <span>🔻</span>
          </button>
          <button
            onClick={() => setSelectedTimeframe('Daily')}
            className={`px-4 py-2 border rounded text-sm font-medium flex items-center gap-2 transition-all cursor-pointer hover:opacity-80 ${
              selectedTimeframe === 'Daily'
                ? 'bg-red-100 border-red-400 text-red-800 ring-2 ring-red-300'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
          >
            <span>Daily: 234 - 328 PIPS</span>
            <span>🔻</span>
          </button>
          <button
            onClick={() => setSelectedTimeframe('Weekly')}
            className={`px-4 py-2 border rounded text-sm font-medium flex items-center gap-2 transition-all cursor-pointer hover:opacity-80 ${
              selectedTimeframe === 'Weekly'
                ? 'bg-green-100 border-green-400 text-green-800 ring-2 ring-green-300'
                : 'bg-green-50 border-green-300 text-green-700'
            }`}
          >
            <span>Weekly: 279 - 489 PIPS</span>
            <span>🔺</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Chart */}
          <div className="lg:col-span-2 border border-gray-300 rounded-xl p-2">
            {/* Pair Header */}
            <div className="flex justify-between items-center mb-4 bg-gray-200/30  px-2 py-1 rounded-sm">
              <div className="flex items-center gap-3 ">
                <h2 className="text-sm font-bold">{selectedCard.pair}</h2>
                <span className="px-3 py-1 bg-gray-200 rounded text-xs font-semibold">{selectedCard.timeframe}</span>
              </div>
              <div className="text-sm text-gray-600">{selectedCard.time}</div>
            </div>

            <div className="text-sm text-gray-500 mb-4">{selectedCard.date}</div>

            {/* Trading Chart */}
            <div className="w-full bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={generateChartData(selectedCard, selectedTimeframe)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  
                  {/* Reference Lines for Target and Pivot */}
                  <ReferenceLine 
                    y={parseFloat(selectedCard.target.replace(',', ''))} 
                    stroke={selectedCard.moveDirection === 'up' ? '#22c55e' : '#ef4444'}
                    strokeDasharray="5 5"
                    label={{ value: `Target: ${selectedCard.target}`, position: 'right', fill: selectedCard.moveDirection === 'up' ? '#22c55e' : '#ef4444' }}
                  />
                  <ReferenceLine 
                    y={parseFloat(selectedCard.pivot.replace(',', ''))} 
                    stroke="#2563eb"
                    strokeDasharray="5 5"
                    label={{ value: `Pivot: ${selectedCard.pivot}`, position: 'right', fill: '#2563eb' }}
                  />
                  
                  {/* Moving Average Lines */}
                  <Line 
                    type="monotone" 
                    dataKey="ma20" 
                    stroke="#f59e0b" 
                    strokeWidth={1.5}
                    dot={false}
                    name="MA 20"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma50" 
                    stroke="#8b5cf6" 
                    strokeWidth={1.5}
                    dot={false}
                    name="MA 50"
                  />
                  
                  {/* Price Line */}
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={selectedCard.moveDirection === 'up' ? '#22c55e' : '#ef4444'}
                    strokeWidth={2}
                    dot={false}
                    name="Price"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              {/* Chart Legend */}
              <div className="flex gap-6 mt-4 text-xs justify-center">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-0.5 ${selectedCard.moveDirection === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-amber-500"></div>
                  <span>MA 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500"></div>
                  <span>MA 50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-0.5 border-t-2 border-dashed ${selectedCard.moveDirection === 'up' ? 'border-green-500' : 'border-red-500'}`}></div>
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 border-t-2 border-dashed border-blue-500"></div>
                  <span>Pivot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Trading Info */}
          <div className="space-y-2 p-2 rounded-xl  bg-gray-200/30 ">
            <h3 className="text-[18px] font-bold">{selectedCard.pair} Intraday: the {selectedCard.moveDirection === 'up' ? 'upside' : 'downside'} prevails.</h3>

            {/* Target Level */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Target level found at</p>
              <p className={`text-lg font-bold ${selectedCard.moveDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {selectedCard.moveDirection === 'up' ? '🔺' : '🔻'} {selectedCard.target}
              </p>
            </div>

            {/* Pivot Level */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Pivot level found at</p>
              <p className="text-lg font-bold text-blue-600">{selectedCard.pivot}</p>
            </div>

            {/* Resistance Level */}
            <div className="pb-3 flex items-center justify-between border-b border-gray-500">
              <p className="text-sm text-gray-600">Resistance level found at</p>
              <p className="text-lg font-bold text-green-600">
                {parseFloat(selectedCard.target.replace(',', '')) + 0.05}
              </p>
            </div>

            {/* Our Preference */}
            <div className="mt-4">
              <h4 className="font-bold text-base mb-2">Our preference</h4>
              <p className="text-sm text-gray-700">
                {selectedCard.moveDirection === 'up' 
                  ? `Long positions above ${selectedCard.pivot} with targets at ${selectedCard.target} in extension.`
                  : `Short positions below ${selectedCard.pivot} with targets at ${selectedCard.target} in extension.`
                }
              </p>
            </div>

            {/* Alternative Scenario */}
            <div className="mt-4">
              <h4 className="font-bold text-base mb-2">Alternative scenario</h4>
              <p className="text-sm text-gray-700">
                {selectedCard.moveDirection === 'up'
                  ? `Below ${selectedCard.pivot} look for further downside with targets.`
                  : `Above ${selectedCard.pivot} look for further upside with targets.`
                }
              </p>
            </div>

            {/* Comment */}
            <div className="mt-4">
              <h4 className="font-bold text-base mb-2">Comment</h4>
              <p className="text-sm text-gray-700">
                The immediate trend remains {selectedCard.moveDirection === 'up' ? 'up' : 'down'} and the momentum is {selectedCard.moveDirection === 'up' ? 'strong' : 'weak'}.
              </p>
            </div>

            {/* Trade Button */}
            <button 
              className="w-[250px] mt-6 py-3 ml-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
              onClick={() => handleTrade(selectedCard.pair)}
            >
              Trade
            </button>
          </div>
        </div>
      </div>
    )}


      <div className="w-full mt-6 border-t border-gray-900 pt-8 text-sm text-gray-700 leading-relaxed">
      <p>
        © 2025 Trading Central. All Rights Reserved. The information contained herein; (1) is
        proprietary to Trading Central and/or its content providers; (2) may not be copied or
        distributed; (3) is not warranted to be accurate, complete or timely; and (4) does not
        constitute advice or a recommendation by Exness, Trading Central or its content providers in
        respect of the investment in financial instruments. Neither Exness nor Trading Central nor
        its content providers are responsible for any damages or losses arising from any use of this
        information. Past performance is no guarantee of future results.
      </p>

      <p className="mt-4">
        Pricing, historical chart data and fundamental company data are provided by Morningstar
        Research Inc.
      </p>

      <p className="mt-4">
        Technical Event® is a registered trademark of Trading Central.
      </p>

      <p className="mt-4">
        Trading Central products and services are protected under U.S. Patent Nos.: 6,801,201;
        7,469,226; 7,469,238; 7,835,966; and 7,853,506; and corresponding foreign patents.
      </p>
    </div>
    </div>

    <Footer />
    </>
    
  );
};

export default AnalystView;
