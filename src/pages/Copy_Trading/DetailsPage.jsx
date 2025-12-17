import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiChevronDown, FiExternalLink, FiChevronRight } from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

const TABS = ["Overview", "Orders", "Strategy news", "About Strategy Provider"];

const DetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [amount, setAmount] = useState("");
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle auto-invest from navigation state
  React.useEffect(() => {
    if (location.state?.autoInvest && location.state?.fixedAmount) {
       setAmount(location.state.fixedAmount);
       // Scroll to invest section after a brief delay ensuring render
       setTimeout(() => {
          document.getElementById('invest-section')?.scrollIntoView({ behavior: 'smooth' });
          inputRef.current?.focus();
       }, 100);
    }
  }, [location.state]);
  const { id } = useParams();
  
  // Use passed strategy or fallback/dummy
  // Ideally, you'd fetch by ID if location.state is missing
  const strategy = location.state?.strategy || {
    id: id || 'default', // Ensure ID exists
    name: "Nghiên Forex X4", 
    returnRate: "1175%",
    rank: "1",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", // fixed missing image in default
    fee: "30%",
    investors: 7510
  };

  React.useEffect(() => {
      if (strategy && strategy.id) {
          try {
              const saved = JSON.parse(localStorage.getItem("recentlyViewedStrategies") || "[]");
              // Remove if exists to move to top
              const filtered = saved.filter(s => s.id !== strategy.id);
              filtered.unshift(strategy);
              // limit to 10
              const newSaved = filtered.slice(0, 10);
              localStorage.setItem("recentlyViewedStrategies", JSON.stringify(newSaved));
          } catch (e) {
              console.error("Failed to save recently viewed", e);
          }
      }
  }, [strategy]);

  const handleBack = () => {
      navigate(-1);
  }

  return (
    <>
    <TopContainer />
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-6">
        {/* Back link */}
        <button 
          onClick={handleBack}
          className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <span className="text-lg">&#8249;</span>
          <span>Back</span>
        </button>

        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-2 mb-6">
          {/* Strategy card */}
          <div 
            onClick={() => setActiveTab("About Strategy Provider")}
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            
            <div className="flex flex-col gap-16">
              <div>
                <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-sm font-semibold text-gray-900 overflow-hidden">
                   {strategy.img ? (
                      <img src={strategy.img} alt={strategy.name} className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-xs">{strategy.name.substring(0, 2).toUpperCase()}</span>
                   )}
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-[#141d22]">
                    {strategy.name}
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    THI QUYNH TRANG NGUYEN • 3Y
                  </p>
            </div>
              

              <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm text-gray-600">
                <div>
                  <p className="text-gray-500 mb-1">Return 3M</p>
                  <p className="font-semibold text-emerald-500">+{strategy.returnRate}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Maximum drawdown</p>
                  <p className="font-semibold text-red-500">-78.17%</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Active investors</p>
                  <p className="font-semibold">{strategy.investors ? strategy.investors.toLocaleString("en-US") : "7 526"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invest card */}
          <div id="invest-section" className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Create investment
            </h2>
            <label className="block text-xs text-gray-500 mb-1">Amount</label>
            <div className="relative mb-2">
              <input
                type="number"
                ref={inputRef}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="0.00"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                USD
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mb-4">
              From <span className="font-semibold">10 USD</span> to{" "}
              <span className="font-semibold">200 850 USD</span>
            </p>
            <button className="w-full rounded-lg bg-[#ffd200] hover:bg-[#ffca00] transition text-sm font-semibold py-2.5">
              Invest
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 flex flex-wrap gap-8 text-sm">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 -mb-px border-b-2 transition ${
                  isActive
                    ? "border-gray-900 text-gray-900 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        {/* TAB CONTENT */}
        {activeTab === "Overview" && <OverviewContent strategy={strategy} onTabChange={setActiveTab} />}
        {activeTab === "Orders" && <OrdersContent />}
        {activeTab === "Strategy news" && <NewsContent />}
        {activeTab === "About Strategy Provider" && <ProviderContent />}
      </div>
    </div>
    <Footer />
    </>
    
  );
};

/* ---------------- Overview Tab ---------------- */

const OverviewContent = ({ strategy, onTabChange }) => {
   const [metric, setMetric] = useState("Return");
   const [timeRange, setTimeRange] = useState("3 M");
   const [showShareModal, setShowShareModal] = useState(false);
   const [aboutTranslated, setAboutTranslated] = useState(false);

  // Generate realistic-looking chart data
  const chartData = useMemo(() => {
     const points = [];
     let days;
     switch(timeRange) {
         case "1 D": days = 24; break; // Hourly
         case "1 W": days = 7; break;
         case "1 M": days = 30; break;
         case "3 M": days = 90; break;
         case "6 M": days = 180; break;
         case "YTD": days = 200; break;
         case "1 Y": days = 365; break;
         case "All": days = 500; break;
         default: days = 90;
     }

     // Initial value based on metric
     let value = metric === "Return" ? 0 : 2000;
     const now = new Date();
     
     for (let i = 0; i < days; i++) {
        const date = new Date(now);
        if (timeRange === "1 D") {
            date.setHours(now.getHours() - (days - i));
        } else {
            date.setDate(now.getDate() - (days - i));
        }
        
        // Simulate the specific shape in screenshot: slow rise, drop, recovery
        const progress = i / days;
        let change = 0;
        
        if (progress < 0.7) {
             // Steady rise
             change = Math.random() * 5 + 1; 
        } else if (progress < 0.72) {
             // Sharp drop similar to screenshot
             change = -(Math.random() * 100 + 400);
        } else {
             // Recovery
             change = Math.random() * 15 + 5;
        }

        // Apply scale/modification based on metric
        if (metric === "Equity") {
            // Scale "percentage point" changes to "currency" roughly
            // and add some noise so it doesn't look identical
            change = change * 15 + (Math.random() * 100 - 50);
            value += change;
            if (value < 0) value = 0; // Prevent negative equity
        } else {
            value += change;
        }

        // Force start value
        if (i===0) value = metric === "Return" ? 0 : 2000;

        points.push({
            date: timeRange === "1 D" 
                ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
            value: Number(value.toFixed(2))
        });
     }
     return points;
  }, [timeRange, metric]);

  return (
    <div className="space-y-8">
      {/* Strategy performance & summary */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Strategy performance Left: chart */}
        <div className="flex-1 bg-white rounded-lg min-h-[400px]">
           
           {/* Header */}
           <div className="mb-6">
              <h3 className="text-[17px] font-semibold text-gray-900 mb-4">
                Strategy performance
              </h3>
              
              <div className="flex border border-gray-200 rounded-md w-fit overflow-hidden">
                 <button 
                    onClick={() => setMetric("Return")}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${metric === "Return" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:text-gray-900"}`}
                 >
                    Return
                 </button>
                 <div className="w-px bg-gray-200"></div>
                 <button 
                    onClick={() => setMetric("Equity")}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${metric === "Equity" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:text-gray-900"}`}
                 >
                    Equity
                 </button>
              </div>
           </div>

           {/* Stats & Filters Row */}
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
               <div>
                   <div className="flex items-baseline gap-1 mb-1">
                       {(() => {
                           const val = metric === "Return" 
                             ? (strategy.returnRate ? (parseFloat(strategy.returnRate.replace('%','')) * 0.95).toFixed(2) + "%" : "1134.94%")
                             : "$26,450.20";
                           const [integerPart, decimalPart] = val.split('.');
                           return (
                               <>
                                   <span className="text-4xl font-bold text-gray-900">{integerPart}</span>
                                   {decimalPart && (
                                       <span className="text-2xl font-bold text-gray-900">.{decimalPart}</span>
                                   )}
                               </>
                           );
                       })()}
                       
                       <div className="relative group ml-1">
                            <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 self-center mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01"/>
                            </svg>
                       </div>
                   </div>
                   <p className="text-gray-500 text-sm">Sep 10, 2025 - Dec 10, 2025</p>
               </div>

               <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg">
                   {["1 D", "1 W", "1 M", "3 M", "6 M", "YTD", "1 Y", "All"].map(range => (
                       <button
                           key={range}
                           onClick={() => setTimeRange(range)}
                           className={`px-3 py-1 rounded text-[13px] font-medium transition-all ${
                               timeRange === range
                               ? "bg-slate-500 text-white shadow-sm"
                               : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                           }`}
                       >
                           {range}
                       </button>
                   ))}
               </div>
           </div>

           {/* Chart */}
           <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#6b7280' }} 
                        minTickGap={50}
                        dy={10}
                    />
                    <YAxis 
                        orientation="right" 
                        axisLine={false} 
                        tick={{ fontSize: 11, fill: '#6b7280' }} 
                        tickFormatter={(value) => {
                            if (metric === "Return") return `${value >= 1000 ? (value/1000).toFixed(1) + 'K' : value}%`;
                            return `$${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`;
                        }}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#111827', fontWeight: 600 }}
                        formatter={(value) => [
                            metric === "Return" ? `${value}%` : `$${value}`, 
                            metric
                        ]}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={1.5}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Right: summary card */}
        <div className="w-full xl:w-[340px] space-y-10 pl-4">
          
          {/* Summary of terms */}
          <div>
            <div className="relative inline-flex items-center gap-2 mb-6 group cursor-help">
               <h3 className="text-[19px] font-semibold text-gray-900">
                 Summary of terms
               </h3>
               <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                  <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2"></line>
               </svg>

               {/* Tooltip Content */}
               <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 bottom-full mb-2 w-[320px] text-xs bg-white text-left p-4 rounded-lg shadow-xl border border-gray-100 z-50 text-[13px] leading-relaxed text-gray-600">
                   <div className="space-y-1">
                       <div>
                           <p className="font-semibold text-gray-900 mb-1 text-xs">Minimum investment</p>
                           <p className="text-xs">This is the smallest amount of money you can invest in this strategy. The Strategy Provider may change this limit at any time.</p>
                       </div>
                       
                       <div>
                           <p className="font-semibold text-gray-900 mb-1 text-xs">Performance fee</p>
                           <p className="text-xs">This is the percentage of profit that investors will pay to the strategy provider at the end of a billing period. The performance fee rate is defined by the strategy provider as they create the strategy.</p>
                           <a href="#" className="text-blue-600 underline mt-1 inline-block text-xs">Learn more</a>
                       </div>

                       <div>
                           <p className="font-semibold text-gray-900 mb-1 text-xs">Billing period</p>
                           <p className="text-xs">This is a set amount of time between fee payments. Billing periods end on the last Friday of the month, which is when a new period begins.</p>
                           <a href="#" className="text-blue-600 underline mt-1 inline-block text-xs">Learn more</a>
                       </div>
                   </div>
                   {/* Tooltip Arrow */}
                   <div className="absolute left-6 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <span className="text-gray-400 text-sm">Minimum investment</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-3 mb-1.5"></div>
                <span className="font-medium text-gray-900 text-sm">10 USD</span>
              </div>
              
              <div className="flex items-end justify-between">
                <span className="text-gray-400 text-sm">Performance fee</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-3 mb-1.5"></div>
                <span className="font-medium text-gray-900 text-sm">{strategy.fee}</span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-400">Billing period</span>
                  <span className="text-gray-900 font-medium">17 days remaining</span>
                </div>
                {/* Custom Progress Bar Style */}
                <div className="w-full h-1.5 rounded-full bg-[#e5e7eb] overflow-hidden">
                  <div className="h-full w-1/3 bg-[#5c6c7f]" />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 mt-1.5 hover:text-gray-500">
                  <span>Nov 29</span>
                  <span>Dec 27</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Profile */}
          <div>
             <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-[17px] font-semibold text-gray-900 uppercase">
                  THI QUYNH TRANG NGUYEN
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                   <span className="text-lg">🇻🇳</span>
                   <span className="text-[13px]">From VN.</span>
                </div>
             </div>

             <div className="flex items-center gap-1.5 mb-5">
                <div className="w-3.5 h-3.5 rounded-full border border-green-600 flex items-center justify-center">
                   <svg className="w-2.5 h-2.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                   </svg>
                </div>
                <span className="text-green-600 text-sm font-medium">Identity verified</span>
             </div>

             <div className="flex items-end justify-between mb-4">
                <span className="text-gray-900 text-[15px] font-medium">Low Trading Reliability Level</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-2 mb-1.5"></div>
                <div className="flex items-center gap-2">
                    {/* Ring Chart Icon Placeholder */}
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-red-400 transform -rotate-45"></div>
                    <span className="text-gray-900 font-medium">30</span>
                    <span className="text-green-600 text-xs font-bold">↑ 2</span>
                </div>
             </div>

             <p className="text-[14px] text-gray-700 leading-relaxed mb-4">
                Kênh đầu tư Forex của mình đã có kinh nghiệm trên 5 năm với lợi nhuận ổn định , rủi ro thấp. Các bạn tham khảo và đồng hành cùng mình nhé !
             </p>

             <button 
                onClick={() => onTabChange("About Strategy Provider")}
                className="text-gray-900 text-sm underline decoration-gray-900 underline-offset-4 flex items-center gap-1 hover:text-gray-600 hover:decoration-gray-600 transition-colors"
             >
               Full profile
               <FiChevronRight className="text-lg" />
             </button>
          </div>

          
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        
      <div className="flex flex-col  gap-6 w-full max-w-[720px]">
        {/* About strategy*/}
        <div className="flex-1 bg-white w-full max-w-3xl py-8 border-t border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            About strategy
          </h3>
          
          <p className="text-[15px] text-gray-900 mb-2">
            {aboutTranslated 
              ? "Results are the best explanation in this market. Watch and copy!" 
              : "Kết quả là lời giải thích tốt nhất trong thị trường này . Xem rồi coppy đi nhé !"}
          </p>
          
          <button 
            onClick={() => setAboutTranslated(!aboutTranslated)}
            className="text-sm text-gray-500 border-b border-dashed border-gray-400 pb-0.5 hover:text-gray-900 mb-8"
          >
            {aboutTranslated ? "See original" : "Translate"}
          </button>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-5">
             {/* Created */}
             <div className="flex items-end justify-between">
                <span className="text-gray-500 text-sm">Created</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-2 mb-1.5"></div>
                <span className="text-gray-900 text-sm font-medium">Jul 10, 2025 (4M 29d 18h)</span>
             </div>

             {/* Leverage */}
             <div className="flex items-end justify-between">
                <span className="text-gray-500 text-sm">Leverage</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-2 mb-1.5"></div>
                <span className="text-gray-900 text-sm font-medium">1:200</span>
             </div>

             {/* Account */}
             <div className="flex items-end justify-between">
                <span className="text-gray-500 text-sm">Account</span>
                <div className="flex-grow border-b border-dotted border-gray-300 mx-2 mb-1.5"></div>
                <div className="flex items-center gap-1.5">
                   <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded font-medium">MT5</span>
                   <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded font-medium">Pro</span>
                   <span className="text-gray-900 text-sm font-medium">#227606676</span>
                </div>
             </div>
          </div>
        </div>

        {/* Trading instruments + open orders */}
        <div className="w-full max-w-3xl space-y-12">
          
          {/* Trading instruments */}
          <div>
             <div className="flex items-center gap-1.5 mb-4">
                <h3 className="text-[19px] font-semibold text-gray-900">
                  Trading instruments
                </h3>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             
             {/* Progress Bar */}
             <div className="h-3 w-full rounded-full flex overflow-hidden mb-4 bg-orange-50">
               <div className="h-full bg-[#ffcd90] w-[97%]" />
               <div className="h-full bg-[#5145cd] w-[3%]" />
             </div>

             {/* Legend */}
             <div className="flex gap-12 text-sm">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffcd90]" />
                      <span className="text-gray-600">XAUUSD</span>
                   </div>
                   <p className="pl-4 font-semibold text-gray-900">97%</p>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#5145cd]" />
                       <span className="text-gray-600">BTCUSD</span>
                   </div>
                   <p className="pl-4 font-semibold text-gray-900">3%</p>
                </div>
             </div>
          </div>

          {/* Open Orders */}
          <div>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-4">
              Open orders
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               {/* Empty State Content */}
               <div className="py-10 flex flex-col items-center justify-center">
                  <div className="mb-3 text-gray-400">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                     </svg>
                  </div>
                  <p className="text-sm text-gray-900 font-medium">There are currently no open orders</p>
               </div>
               
               {/* Footer Action */}
               <div 
                 onClick={() => onTabChange("Orders")}
                 className="border-t border-gray-100 flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
               >
                  <span className="text-sm font-semibold text-gray-900">Show all</span>
                  <FiChevronRight className="text-gray-400 text-lg" />
               </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* strategy News & Invite */}
      <div className="w-full max-w-[330px] space-y-8 pt-8">
        
        {/* Strategy News - Plain Text layout */}
        <div>
          <h2 className="text-[17px] font-semibold text-gray-900 mb-3">Strategy news</h2>

          <p className="text-gray-400 text-xs mb-1">Dec 5, 2025</p>

          <p className="text-gray-900 text-[13px] leading-relaxed mb-3">
            Các chiến lược hiện đang quá tải , đừng quên nghiền vẩn rs tiền 2000usd mỗi ngày , 
            các bạn vẫn được nhận lãi kép ! 12/12 sẽ có đợt sale cuối cùng của năm , cùng đón chờ n...
          </p>

          <button 
            onClick={() => onTabChange("Strategy news")}
            className="flex items-center text-gray-900 text-sm font-medium underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900 transition-all"
          >
            Show all
            <FiChevronRight className="ml-1 text-lg text-gray-400" />
          </button>
        </div>

        {/* Invite & Earn Card */}
        <div className="bg-[#fcfaff] border border-purple-50 rounded-xl p-5 relative overflow-hidden">
          <div className="relative z-10 pr-2">
            <h3 className="text-[15px] font-semibold text-gray-900">Invite and earn</h3>
            <p className="text-gray-900 text-[13px] mt-1 leading-normal mb-4 max-w-[180px]">
              Share this strategy with others and earn from
              their investments.
            </p>

            <button 
              onClick={() => setShowShareModal(true)}
              className="bg-[#eeedf0] hover:bg-[#e4e2e6] text-gray-900 text-xs font-semibold px-4 py-2 rounded-[4px] transition-colors"
            >
              Share strategy
            </button>
          </div>

          {/* Coin Illustration Placeholder */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24">
             {/* Simple CSS Coin representation */}
             <div className="w-full h-full rounded-full border-[12px] border-[#f3f0f7] bg-white opacity-50"></div>
          </div>
        </div>
      </div>
      
      </div>

      {/* Bottom section: investors & FAQ */}
      <div className="flex flex-col gap-6">
        {/* Investors CTA */}
        <div className="w-full bg-gray-50 max-w-3xl rounded-lg border border-gray-200 p-6 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[17px] font-bold text-gray-900">
               {strategy.investors ? strategy.investors.toLocaleString("en-US") : "7 526"} investors and counting
            </h3>
            <p className="text-[15px] text-gray-600 mt-1 mb-5">
              Join if this strategy matches your goals.
            </p>
            <button 
              onClick={() => {
                document.getElementById('invest-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded bg-[#f3f4f6] hover:bg-[#e5e7eb] text-gray-900 text-sm font-medium transition-colors"
            >
              Invest now
            </button>
          </div>

          {/* Styles for right illustration (checkmark) placeholder */}
          <div className="hidden sm:block pr-4">
             <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                 </svg>
             </div>
          </div>
        </div>

         {/* FAQ */}
        <div className="w-full max-w-3xl">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Frequently asked questions
          </h3>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
             <div className="divide-y divide-gray-100">
                <FAQItem
                  question="How does copying work?"
                  answer="Each trade made by the strategy provider is opened on your investment with a volume that depends on your invested amount and the copying coefficient."
                />
                <FAQItem
                  question="What fees will I pay when I invest?"
                  answer="You pay a performance fee on the profit generated by this strategy. The fee is already configured by the provider and charged automatically."
                />
                <FAQItem
                  question="When is the performance fee charged?"
                  answer="The fee is charged at the end of each billing period or when the investment is closed. Each new period starts immediately after the previous one ends."
                />
             </div>
             
             {/* Footer row in card */}
             <div className="border-t border-gray-100 px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="font-semibold text-sm text-gray-900">All articles</span>
                <span className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                  Help Center <FiExternalLink />
                </span>
             </div>
          </div>

          <p className="mt-6 text-xs text-gray-400 leading-relaxed">
            Past performance does not guarantee future results. Exness is not liable for Strategy Provider content or investment losses. Investing
            is risky.
          </p>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-900 text-[15px]">{question}</span>
        <FiChevronDown 
          className={`text-gray-400 text-lg transition-transform duration-200 ${open ? "rotate-180" : ""}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 text-sm text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Orders Tab ---------------- */

const OrdersContent = () => {
  const [filter, setFilter] = useState("Open");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
      <div className="p-5 border-b border-gray-100">
        <div className="inline-flex items-center p-1 rounded-md border border-gray-200">
          <button
            onClick={() => setFilter("Open")}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              filter === "Open"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setFilter("Closed")}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              filter === "Closed"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      <div className="p-0">
        {filter === "Open" ? <OpenOrdersView /> : <ClosedOrdersView />}
      </div>
    </div>
  );
};

const OpenOrdersView = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="mb-4 text-gray-400">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <p className="text-[15px] text-gray-900 font-medium">
      There are currently no open orders
    </p>
  </div>
);

const ClosedOrdersView = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Dummy data matching screenshot with added details
  const groups = [
    {
      date: "Today",
      profit: "+8.33 USD",
      orders: [
        {
          id: "191519615",
          symbol: "XAUUSD",
          type: "Sell",
          openTime: "Dec 10, 5:33:51 AM",
          closeTime: "Dec 10, 6:03:15 AM",
          lots: "0.02",
          openPrice: "4207.658",
          closePrice: "4210.458",
          profit: "-5.60 USD",
          duration: "29 min 24 sec",
          swap: "0.00 USD"
        },
        {
          id: "191519616",
          symbol: "XAUUSD",
          type: "Sell",
          openTime: "Dec 10, 5:39:29 AM",
          closeTime: "Dec 10, 5:50:36 AM",
          lots: "0.02",
          openPrice: "4210.28",
          closePrice: "4212.011",
          profit: "-3.46 USD",
          duration: "11 min 07 sec",
          swap: "0.00 USD"
        },
        {
          id: "191519617",
          symbol: "XAUUSD",
          type: "Sell",
          openTime: "Dec 10, 5:48:08 AM",
          closeTime: "Dec 10, 5:50:34 AM",
          lots: "0.02",
          openPrice: "4213.962",
          closePrice: "4212.27",
          profit: "+3.38 USD",
          duration: "2 min 26 sec",
          swap: "0.00 USD"
        },
        {
          id: "191519618",
          symbol: "XAUUSD",
          type: "Sell",
          openTime: "Dec 10, 4:36:53 AM",
          closeTime: "Dec 10, 4:45:35 AM",
          lots: "0.02",
          openPrice: "4207.552",
          closePrice: "4207.45",
          profit: "+0.20 USD",
          duration: "8 min 42 sec",
          swap: "0.00 USD"
        },
        {
          id: "191519619",
          symbol: "XAUUSD",
          type: "Buy",
          openTime: "Dec 10, 1:25:59 AM",
          closeTime: "Dec 10, 1:27:34 AM",
          lots: "0.02",
          openPrice: "4213.511",
          closePrice: "4214.665",
          profit: "+2.31 USD",
          duration: "1 min 35 sec",
          swap: "0.00 USD"
        },
      ],
    },
    {
      date: "Yesterday",
      profit: "+57.24 USD",
      orders: [
        {
          id: "191519620",
          symbol: "XAUUSD",
          type: "Buy",
          openTime: "Dec 9, 3:59:27 PM",
          closeTime: "Dec 9, 3:59:54 PM",
          lots: "0.02",
          openPrice: "4212.746",
          closePrice: "4213.073",
          profit: "+0.66 USD",
          duration: "27 sec",
          swap: "0.00 USD"
        },
      ]
    }
  ];

  return (
    <div className="overflow-x-auto text-[13px]">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="text-gray-500 font-medium">
          <tr className="[&>th]:py-4 [&>th]:px-4 border-b border-gray-100">
            <th className="pl-6">Symbol</th>
            <th>Type</th>
            <th>Opening time</th>
            <th>Closing time</th>
            <th>Lots</th>
            <th>Opening price</th>
            <th>Closing price</th>
            <th className="pr-6 text-right">Profit</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, grpIdx) => (
            <React.Fragment key={grpIdx}>
              {/* Date Header Row */}
              <tr className="bg-white border-b border-gray-50">
                <td colSpan={7} className="py-3 px-6 text-gray-500 font-medium">
                  {group.date}
                </td>
                <td className="py-3 px-6 text-right font-semibold text-emerald-500">
                  {group.profit}
                </td>
              </tr>
              {/* Orders */}
              {group.orders.map((order) => {
                 const isExpanded = expandedId === order.id;
                 return (
                  <React.Fragment key={order.id}>
                    <tr 
                        onClick={() => toggleExpand(order.id)}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50' : ''}`}
                    >
                      <td className="py-3 pl-6 pr-4">
                        <div className="flex items-center gap-2">
                           {/* Gold Icon Placeholder */}
                           <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-[10px] text-yellow-700 font-bold border border-yellow-200">
                             Au
                           </div>
                           <span className="font-medium text-gray-900">{order.symbol}</span>
                        </div>
                      </td>
                      <td className="px-4">
                        <span 
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                                order.type === 'Sell' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            {order.type}
                        </span>
                      </td>
                      <td className="px-4 text-gray-600">{order.openTime}</td>
                      <td className="px-4 text-gray-600">{order.closeTime}</td>
                      <td className="px-4 text-gray-900">{order.lots}</td>
                      <td className="px-4 text-gray-900">{order.openPrice}</td>
                      <td className="px-4 text-gray-900">{order.closePrice}</td>
                      <td className="px-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                            <span className={`font-medium ${order.profit.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                {order.profit}
                            </span>
                             <div className={`p-1 rounded-full transition-transform duration-200 ${isExpanded ? 'bg-gray-200 rotate-180' : ''}`}>
                                <FiChevronDown className="text-gray-500 text-lg" />
                             </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {isExpanded && (
                        <tr className="bg-gray-50 border-b border-gray-100">
                           <td colSpan={8} className="py-4 px-6">
                               <div className="flex flex-col gap-2">
                                   <div className="text-[13px]">
                                       <span className="font-semibold text-gray-900 w-24 inline-block">Duration</span>
                                       <span className="text-gray-900">{order.duration}</span>
                                   </div>
                                   <div className="text-[13px]">
                                       <span className="font-semibold text-gray-900 w-24 inline-block">Swap</span>
                                       <span className="text-gray-900">{order.swap}</span>
                                   </div>
                                   <div className="text-[13px] flex items-center">
                                       <span className="font-semibold text-gray-900 w-24 inline-block">Order ID</span>
                                       <div className="flex items-center gap-2 text-gray-900">
                                            <span>{order.id}</span>
                                            <FiExternalLink className="text-gray-400 rotate-0 cursor-pointer hover:text-gray-600" /> {/* Simulating copy/external link icon */}
                                       </div>
                                   </div>
                               </div>
                           </td>
                        </tr>
                    )}
                  </React.Fragment>
                 );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---------------- Strategy News Tab ---------------- */

const NewsItem = ({ item }) => {
  const [translated, setTranslated] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 py-8 border-b border-gray-100 last:border-0">
      {/* Date */}
      <div className="w-32 flex-shrink-0">
        <span className="text-xs text-gray-400 font-medium">{item.date}</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-[13px] text-gray-900 leading-relaxed whitespace-pre-line mb-2">
          {translated ? item.englishText : item.originalText}
        </p>
        
        <button 
          onClick={() => setTranslated(!translated)}
          className="text-xs text-gray-500 border-b border-dashed border-gray-400 pb-0.5 hover:text-gray-900 transition-colors"
        >
          {translated ? "Show original" : "Translate"}
        </button>
      </div>

      {/* Likes */}
      <div className="w-24 flex-shrink-0 flex justify-end md:justify-start">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
           <svg 
             className="w-4 h-4 text-gray-400" 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
           </svg>
           <span>{item.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

const NewsContent = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const news = [
    {
      date: "Dec 5, 2025",
      originalText: "Các chiến lược hiện đang quá tải , đừng quên nghiền vẩn rs tiền 2000usd mỗi ngày , các bạn vẫn được nhận lãi kép ! 12/12 sẽ có đợt sale cuối cùng của năm , cùng đón chờ nhé !",
      englishText: "Current strategies are overloaded, don't forget to withdraw $2000 daily, you still receive compound interest! 12/12 will have the last sale of the year, stay tuned!",
      likes: 169,
    },
    {
      date: "Dec 1, 2025",
      originalText: "Link đăng kí nhận backcom : https://one.exnessonelink.com/a/7k4o649z75 Hoặc mã giới thiệu : 7k4o649z75 Nếu đã có bài khoản đổi link ref qua id : 1094299919843378904 Hiện bên mình dang backcom 100% mốc kim cương , mọi người ủng hộ mình nhé !",
      englishText: "Registration link for backcom: https://one.exnessonelink.com/a/7k4o649z75 Or referral code: 7k4o649z75. If you already have an account, change ref link via id: 1094299919843378904. Currently providing 100% diamond tier backcom, please support me!",
      likes: 102,
    },
    {
      date: "Nov 28, 2025",
      originalText: "Như vậy là 1 tháng nữa đã gần như trôi qua , hôm nay là 1 ngày với đường giá vô cùng bất ổn , mình không vào được lệnh , và cũng không muốn rủi ro ! Hi vọng sang tháng sau tháng cuối cùng của năm 2025 chúng ta sẽ có những lượt lệnh giao dịch tốt ! Cảm ơn các bạn !",
      englishText: "So another month has nearly passed, today is a day with extremely unstable price action, I couldn't enter orders, and didn't want to risk it! Hoping for next month, the last month of 2025, we will have good trading orders! Thank you all!",
      likes: 333,
    },
    {
      date: "Nov 26, 2025",
      originalText: "Chào các bạn , đăng kí ủng hộ mình nhé ! Minh backcom 100% các bạn nhắn hỗ trợ dưới dây nha !\nhttps://www.facebook.com/groups/nghienforextrader\nhttps://t.me/nghienforextrader\nhttps://zalo.me/g/clntri740",
      englishText: "Hello everyone, please register to support me! I offer 100% backcom, please message support below!\nhttps://www.facebook.com/groups/nghienforextrader\nhttps://t.me/nghienforextrader\nhttps://zalo.me/g/clntri740",
      likes: 118,
    },
    {
      date: "Nov 13, 2025",
      originalText: "https://t.me/nghienforextrader https://zalo.me/g/clntri740 https://www.tiktok.com/@nghienforex2?_t=ZS-90t81ps5ioZ&_r=1",
      englishText: "https://t.me/nghienforextrader https://zalo.me/g/clntri740 https://www.tiktok.com/@nghienforex2?_t=ZS-90t81ps5ioZ&_r=1",
      likes: 98,
    },
    {
      date: "Nov 10, 2025",
      originalText: "Hế lô anh em đừng quên chương trình sale khủng giảm giá sốc ngày 11.11 nhé ! Chi duy nhất 1 ngày trong tháng ! Tri ân các bạn đã tin tưởng nhóm mình !",
      englishText: "Hello guys, don't forget the huge shocking sale event on 11.11! Only one day in the month! Gratitude to you for trusting our group!",
      likes: 175,
    },
    {
      date: "Nov 7, 2025",
      originalText: "Các tài khoản sẽ reset về 2000 đô vào mỗi buổi sáng nhé ! Mọi người full ko đầu tư được vẫn được tính vốn +lời / tk mình !",
      englishText: "Accounts will reset to $2000 every morning! Everyone who is full and can't invest will still have capital + profit calculated / my account!",
      likes: 146,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 min-h-[400px]">
      <div className="mb-4 text-xs text-gray-400">
        Exness is not responsible for any investment losses or the accuracy of forecasts and content in the News Feed.
      </div>
      
      <div className="border-t border-gray-100">
        {news.slice(0, visibleCount).map((item, i) => (
          <NewsItem key={i} item={item} />
        ))}
      </div>

      {visibleCount < news.length && (
        <div className="mt-2">
          <button 
            onClick={() => setVisibleCount(news.length)}
            className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 rounded transition-colors"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- Provider Tab ---------------- */

const ProviderContent = () => {
  const [translated, setTranslated] = useState(false);
  const [timeRange, setTimeRange] = useState("6 M");

  const originalBio = "Kênh đầu tư Forex của mình đã có kinh nghiệm trên 5 năm với lợi nhuận ổn định , rủi ro thấp. Các bạn tham khảo và đồng hành cùng mình nhé !";
  const englishBio = "My Forex investment channel has over 5 years of experience with stable profits and low risk. Please consult and join me!";

  // Mock data for the graph
  const generateData = (days) => {
    const data = [];
    let value = 50;
    for (let i = 0; i < days; i++) {
        // Create a trend similar to the screenshot (flat then drop then recovery)
        if (i < days * 0.6) value = 55;
        else if (i < days * 0.65) value = 30; // drop
        else value += Math.random() * 2 - 0.5; // gradual recovery
        
        value = Math.max(20, Math.min(95, value));
        
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
            value: Math.round(value)
        });
    }
    return data;
  };

  const graphData = useMemo(() => {
     switch(timeRange) {
         case "1 M": return generateData(30);
         case "3 M": return generateData(90);
         case "6 M": return generateData(180);
         case "1 Y": return generateData(365);
         case "All time": return generateData(500);
         default: return generateData(180);
     }
  }, [timeRange]);

  return (
    <div className="space-y-2 pb-10">
      {/* 1. Header & Bio */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-[17px] font-semibold text-gray-900 uppercase">
                THI QUYNH TRANG NGUYEN
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
                <span className="text-lg">🇻🇳</span>
                <span className="text-[13px]">From VN.</span>
            </div>
        </div>

        <div className="flex items-center gap-1.5 mb-6">
            <div className="w-3.5 h-3.5 rounded-full border border-green-600 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <span className="text-green-600 text-sm font-medium">Identity verified</span>
        </div>

        <div className="max-w-3xl">
            <p className="text-[14px] text-gray-900 leading-relaxed mb-2">
                {translated ? englishBio : originalBio}
            </p>
            <button 
                onClick={() => setTranslated(!translated)}
                className="text-sm text-gray-500 border-b border-dashed border-gray-400 pb-0.5 hover:text-gray-900"
            >
                {translated ? "Show original" : "Translate"}
            </button>
        </div>
      </div>

      {/* 2. Trading Reliability Level Stats */}
      <div className="bg-white rounded-lg p-6">
         <div className="flex items-center gap-2 mb-8">
            <h3 className="text-[17px] font-semibold text-gray-900">Trading Reliability Level</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
            </svg>
         </div>

         <div className="flex flex-col md:flex-row gap-8 md:gap-32 lg:gap-68">
             {/* Left Column */}
            <div className="space-y-8 relative">
                {/* Connecting Line (Vertical) */}
                <div className="hidden md:block absolute left-[26px] top-6 bottom-6 w-px bg-gray-200 -z-10"></div>
                <div className="hidden md:block absolute left-[26px] top-6 w-3 border-t border-gray-200 -ml-3"></div>
                <div className="hidden md:block absolute left-[26px] top-1/2 w-3 border-t border-gray-200 -ml-3"></div>
                <div className="hidden md:block absolute left-[26px] bottom-6 w-3 border-t border-gray-200 -ml-3"></div>

                {/* Item 1 */}
                <div className="flex items-center gap-4 bg-white">
                    <div className="w-14 h-14 rounded-full border-4 border-l-red-500 border-t-red-500 border-r-gray-100 border-b-gray-100 rotate-45 flex items-center justify-center">
                         <div className="-rotate-45 font-bold text-gray-700 text-xs">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                         </div>
                    </div>
                    <div>
                        <p className="text-gray-900 font-semibold mb-0.5">Low</p>
                        <p className="text-gray-500 text-[13px]"><span className="font-medium text-gray-900">30</span>/100</p>
                    </div>
                </div>

                 {/* Item 2 */}
                 <div className="flex items-center gap-4 bg-white">
                    <div className="w-14 h-14 rounded-full border-4 border-gray-200 flex items-center justify-center relative">
                         <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-r-transparent border-b-transparent border-l-transparent rotate-45"></div>
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium mb-0.5 text-sm">Safety score</p>
                        <p className="text-gray-500 text-[13px]"><span className="font-medium text-gray-900">62</span>/100</p>
                    </div>
                </div>

                 {/* Item 3 */}
                 <div className="flex items-center gap-4 bg-white">
                    <div className="w-14 h-14 rounded-full border-4 border-gray-200 flex items-center justify-center">
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium mb-0.5 text-sm">VaR score</p>
                        <p className="text-gray-500 text-[13px]"><span className="font-medium text-gray-900">8</span>/100</p>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 relative">
                 {/* Item 1 */}
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-green-500 flex items-center justify-center bg-green-50">
                         <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                         </svg>
                    </div>
                    <div>
                        <p className="text-gray-900 font-semibold text-[15px]">Significant</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center">
                         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                         </svg>
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium mb-0.5 text-sm">Extent score</p>
                        <p className="text-gray-900 font-semibold text-[15px]">554</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 flex items-center justify-center">
                         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                         </svg>
                    </div>
                    <div>
                        <p className="text-gray-900 font-medium mb-0.5 text-sm">Trading days</p>
                        <p className="text-gray-900 font-semibold text-[15px]">198</p>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* 3. Trading Reliability history Graph */}
      <div className="bg-white rounded-lg p-6">
         <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
            <div>
               <h3 className="text-[17px] font-semibold text-gray-900 mb-2">Trading Reliability history</h3>
               <div className="space-y-1">
                   <p className="text-[13px] text-gray-900 flex items-center gap-2">
                       Last 7 days <span className="text-green-600 font-semibold">↑ 2</span>
                   </p>
                   <p className="text-[13px] text-gray-900 flex items-center gap-2">
                       Last 30 days <span className="text-green-600 font-semibold">↑ 11</span>
                   </p>
               </div>
            </div>

            <div className="flex bg-gray-100 rounded p-1 gap-1">
                {["1 M", "3 M", "6 M", "1 Y", "All time"].map(btn => (
                    <button
                      key={btn}
                      onClick={() => setTimeRange(btn)}
                      className={`px-3 py-1 rounded text-[13px] font-medium transition-colors ${
                          timeRange === btn 
                          ? "bg-slate-500 text-white shadow-sm" 
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>
         </div>

         <div className="h-[300px] w-full relative">
              {/* Colored Y-Axis Bar Simulation */}
              <div className="absolute right-0 top-6 bottom-8 w-1 flex flex-col items-center justify-between text-[10px] text-gray-400">
                  <div className="w-1.5 h-full rounded-sm bg-gradient-to-b from-green-500 via-yellow-400 to-red-500 relative">
                     <span className="absolute -right-6 -top-2">100</span>
                     <span className="absolute -right-5 top-[30%]">70</span>
                     <span className="absolute -right-5 top-[60%]">40</span>
                     <span className="absolute -right-5 -bottom-2">0</span>
                  </div>
              </div>

              <ResponsiveContainer width="95%" height="100%">
                 <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#6b7280'}} 
                        minTickGap={30}
                    />
                    <YAxis 
                        orientation="right" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={false} 
                        domain={[0, 100]} 
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#111827', fontWeight: 600 }}
                    />
                    <Line 
                        type="stepAfter" 
                        dataKey="value" 
                        stroke="#374151" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                 </LineChart>
              </ResponsiveContainer>
              
              <div className="absolute bottom-0 left-0">
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
                      <FiChevronDown className="rotate-90" />
                  </button>
              </div>
         </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value }) => (
  <div className="border border-gray-200 rounded-lg p-3">
    <p className="text-[11px] text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

const ShareModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[480px] relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 pb-2 flex justify-between items-start">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">Share strategy</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Use the link or QR code to share the strategy and earn the partner reward
                </p>
            </div>
            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="p-6 pt-4 space-y-6">
            
            {/* Strategy Link Section */}
            <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Strategy link</p>
                <div className="flex gap-3">
                    <div className="bg-gray-50 flex-1 px-3 py-2 rounded border border-transparent text-sm text-gray-600 truncate">
                        https://social-trading.exness.com/strat...
                    </div>
                    <button className="bg-[#ffd900] hover:bg-[#f5d000] text-gray-900 text-sm font-medium px-4 py-2 rounded transition-colors whitespace-nowrap">
                        Copy link
                    </button>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-gray-50 rounded-lg p-4 flex gap-6">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">QR-code</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                        This QR code contains the same partner link
                    </p>
                    <div className="flex gap-1 text-[13px]">
                        <button className="text-blue-600 hover:underline font-medium">Copy png</button>
                        <span className="text-gray-400">/</span>
                        <button className="text-blue-600 hover:underline font-medium">Download</button>
                    </div>
                </div>
                <div className="w-24 h-24 bg-white p-2 rounded border border-gray-100 flex-shrink-0">
                    {/* Placeholder QR Code */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" 
                      alt="QR Code" 
                      className="w-full h-full"
                    />
                </div>
            </div>

            {/* Footer Link */}
            <div>
                <a href="#" className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium w-fit">
                    More about Partnership Program
                    <FiExternalLink />
                </a>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
