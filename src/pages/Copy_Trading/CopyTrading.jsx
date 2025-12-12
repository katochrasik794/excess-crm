// src/pages/CopyTrading.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft, FiStar } from "react-icons/fi";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

const strategies = [
  {
    id: 1,
    rank: 1,
    name: "Nghiên Forex X4",
    returnRate: "1175%",
    fee: "30%",
    investors: 7510,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 2,
    rank: 2,
    name: "Ds Steady Growth",
    returnRate: "114%",
    fee: "30%",
    investors: 3265,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 3,
    rank: 3,
    name: "Nghiên Forex X1",
    returnRate: "387%",
    fee: "30%",
    investors: 3095,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 4,
    rank: 4,
    name: "Chiến lược million U",
    returnRate: "3259%",
    fee: "30%",
    investors: 2209,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 5,
    rank: 5,
    name: "AI Trade Bot",
    returnRate: "100120%",
    fee: "50%",
    investors: 1887,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 6,
    rank: 6,
    name: "EZSignals Team",
    returnRate: "37%",
    fee: "25%",
    investors: 1885,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
];

// --- extra dummy data for pagination ---
const extraStrategies = [
  {
    id: 7,
    rank: 7,
    name: "DINO Scalping",
    returnRate: "4523%",
    fee: "25%",
    investors: 1513,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 8,
    rank: 8,
    name: "PRICE ACTION Trading",
    returnRate: "45154%",
    fee: "25%",
    investors: 1475,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 9,
    rank: 9,
    name: "Yasser Fx",
    returnRate: "134759%",
    fee: "30%",
    investors: 1393,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 10,
    rank: 10,
    name: "CRYPTO LEGEND GREEN",
    returnRate: "481%",
    fee: "30%",
    investors: 1327,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  // some more dummy rows so pagination clearly works
  {
    id: 11,
    rank: 11,
    name: "Alpha Trend Rider",
    returnRate: "963%",
    fee: "20%",
    investors: 1204,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 12,
    rank: 12,
    name: "Golden Grid Pro",
    returnRate: "178%",
    fee: "25%",
    investors: 1150,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 13,
    rank: 13,
    name: "Steady Income FX",
    returnRate: "245%",
    fee: "15%",
    investors: 1103,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 14,
    rank: 14,
    name: "Night Scalper Bot",
    returnRate: "5021%",
    fee: "40%",
    investors: 982,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 15,
    rank: 15,
    name: "Index Swing Master",
    returnRate: "623%",
    fee: "30%",
    investors: 875,
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
];

const currencyItems = [
  { code: "XAU", country: null },
  { code: "USD", country: "US" },
  { code: "JPY", country: "JP" },
  { code: "GBP", country: "GB" },
  { code: "CAD", country: "CA" },
  { code: "CHF", country: "CH" },
  { code: "EUR", country: "FR" },
  { code: "AUD", country: "AU" },
  { code: "NZD", country: "NZ" },
  { code: "XAG", country: null },
  { code: "DKK", country: "DK" },
  { code: "HKD", country: "HK" },
  { code: "NZD", country: "NZ" },
  { code: "XAG", country: null },
  { code: "DKK", country: "DK" },
  { code: "HKD", country: "HK" },
  { code: "ILS", country: "IL" },
  { code: "MXN", country: "MX" },
  { code: "NOK", country: "NO" },
  { code: "PLN", country: "PL" },
  { code: "RUB", country: "RU" },
  { code: "SEK", country: "SE" },
  { code: "SGD", country: "SG" },
  { code: "TRY", country: "TR" },
  { code: "ZAR", country: "ZA" },
  { code: "BTC", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" },
  { code: "LTC", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580" },
  { code: "BCH", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" },
  { code: "ETH", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
];

const currencyFull = [
  { code: "XAU", country: null },
  { code: "USD", country: "US" },
  { code: "JPY", country: "JP" },
  { code: "GBP", country: "GB" },
  { code: "CAD", country: "CA" },
  { code: "CHF", country: "CH" },
  { code: "EUR", country: "FR" },
  { code: "AUD", country: "AU" },
  { code: "NZD", country: "NZ" },
  { code: "XAG", country: null },
  { code: "DKK", country: "DK" },
  { code: "HKD", country: "HK" },
  { code: "ILS", country: "IL" },
  { code: "MXN", country: "MX" },
  { code: "NOK", country: "NO" },
  { code: "PLN", country: "PL" },
  { code: "RUB", country: "RU" },
  { code: "SEK", country: "SE" },
  { code: "SGD", country: "SG" },
  { code: "TRY", country: "TR" },
  { code: "ZAR", country: "ZA" },
  { code: "BTC", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" },
  { code: "LTC", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580" },
  { code: "BCH", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" },
  { code: "ETH", country: null, cryptoImage: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" },
];

// Dummy strategies per currency for the currency-specific list view (ids start at 200)
const currencyStrategies = [
  { id: 200, name: "Yasser Fx", owner: "YASIR FARAJ A ALNEFAIE", investors: 1389, fee: "30%", returnRate: "138966%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 201, name: "AI Trade Bot", owner: "RASHEEDHB", investors: 1695, fee: "50%", returnRate: "110085%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 202, name: "FX Hunter", owner: "HAI CUONG LY", investors: 957, fee: "20%", returnRate: "62206%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 203, name: "PRICE ACTION Trading", owner: "DUC CUONG NGUYEN", investors: 1680, fee: "25%", returnRate: "47884%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 204, name: "Trading thầm lặng", owner: "NGUYEN DUC", investors: 866, fee: "30%", returnRate: "29468%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 205, name: "Auto profit", owner: "RANDA Al-Bassousi", investors: 292, fee: "30%", returnRate: "27691%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 206, name: "Slow is fast", owner: "小波刘", investors: 404, fee: "30%", returnRate: "25078%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "USD" },
  { id: 207, name: "New York Traders", owner: "MIR WALI", investors: 256, fee: "30%", returnRate: "24943%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "USD" },
  { id: 208, name: "The5ers Trading", owner: "DONG NGO VAN", investors: 660, fee: "0%", returnRate: "21500%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "USD" },
  { id: 209, name: "BTC Reversal Matrix", owner: "HESHAM KASSEM", investors: 177, fee: "30%", returnRate: "20668%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "BTC" },
  { id: 210, name: "BTC Momentum", owner: "Satoshi Fan", investors: 482, fee: "25%", returnRate: "12500%", img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579", currency: "BTC" },
  { id: 211, name: "LTC Swing", owner: "Lite Miner", investors: 98, fee: "20%", returnRate: "8600%", img: "https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580", currency: "LTC" },
  { id: 212, name: "ETH HODL", owner: "Ether Lover", investors: 760, fee: "30%", returnRate: "9400%", img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880", currency: "ETH" },
  { id: 213, name: "BCH Breakout", owner: "Cash Trader", investors: 44, fee: "30%", returnRate: "4300%", img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579", currency: "BCH" },
  // add more items so pagination shows >1 page for some currencies
  { id: 214, name: "XAU Swing A", owner: "Trader A", investors: 120, fee: "15%", returnRate: "3200%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 215, name: "XAU Swing B", owner: "Trader B", investors: 98, fee: "10%", returnRate: "2100%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "XAU" },
  { id: 216, name: "USD Growth A", owner: "Trader C", investors: 220, fee: "5%", returnRate: "1500%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "USD" },
  { id: 217, name: "USD Growth B", owner: "Trader D", investors: 310, fee: "7%", returnRate: "1800%", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8", currency: "USD" },
  { id: 218, name: "MXN Opportunistic", owner: "Trader MX", investors: 45, fee: "12%", returnRate: "900%", img: "https://flags.fmcdn.net/data/flags/mini/mx.png", currency: "MXN" },
  { id: 219, name: "PLN Value", owner: "Trader PL", investors: 61, fee: "8%", returnRate: "740%", img: "https://flags.fmcdn.net/data/flags/mini/pl.png", currency: "PLN" },
];

const allStrategies = [...strategies, ...extraStrategies];

const ITEMS_PER_PAGE = 6;

const CopyTrading = () => {
  const [showAll, setShowAll] = useState(false);
  const [showRecentlyAll, setShowRecentlyAll] = useState(false);
  const [showCurrencyAll, setShowCurrencyAll] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoriteStrategies") || "[]");
    } catch (e) {
      return [];
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [activeTab, setActiveTab] = useState("discover");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("recentlyViewedStrategies") || "[]");
      setRecentlyViewed(saved);
    } catch (error) {
      console.error("Error loading recently viewed strategies:", error);
    }
  }, []);

  const favoriteItems = useMemo(() => {
    return favorites
      .map((id) =>
        allStrategies.find((s) => s.id === id) ||
        recentlyViewed.find((r) => r.id === id) ||
        currencyStrategies.find((c) => c.id === id)
      )
      .filter(Boolean);
  }, [favorites, recentlyViewed]);

  const bestStrategy = useMemo(() => {
    return allStrategies.reduce((prev, curr) => {
      const prevVal = parseFloat(prev.returnRate.replace(/[%$,]/g, ''));
      const currVal = parseFloat(curr.returnRate.replace(/[%$,]/g, ''));
      return (prevVal > currVal) ? prev : curr;
    }, allStrategies[0]);
  }, []);

  const handleCardClick = (strategy) => {
    navigate(`/copy-trading/${strategy.id}`, { state: { strategy } });
  };

  const totalPages = Math.ceil(allStrategies.length / ITEMS_PER_PAGE);

  const paginatedData = allStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenAll = () => {
    setShowAll(true);
    setCurrentPage(1);
  };

  const handleCloseAll = () => {
    setShowAll(false);
  };

  const handleOpenRecentlyAll = () => {
    setShowRecentlyAll(true);
  };

  const handleCloseRecentlyAll = () => {
    setShowRecentlyAll(false);
  };

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const handleOpenCurrencyAll = (code = null) => {
    // If this handler is attached directly to an onClick (without args),
    // the browser will pass a MouseEvent as the first argument. Detect
    // that and treat it as "no specific currency selected".
    const selected = code && code?.target ? null : code;
    setSelectedCurrency(selected);
    setShowCurrencyAll(true);
    setCurrentPage(1);
  };

  const handleCloseCurrencyAll = () => {
    setShowCurrencyAll(false);
    setSelectedCurrency(null);
  };

  const toggleFavorite = (strategy, e) => {
    // prevent row click navigation
    if (e && e.stopPropagation) e.stopPropagation();

    const id = strategy.id;
    const exists = favorites.includes(id);
    let updated;
    if (exists) {
      updated = favorites.filter((fid) => fid !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("favoriteStrategies", JSON.stringify(updated));
    } catch (err) {
      // ignore
    }

    setToast({ show: true, message: exists ? "Removed from favorites" : "Saved to favorites" });
    setTimeout(() => setToast({ show: false, message: "" }), 2200);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // currency-specific filtered & paginated data when a currency is selected
  const filteredCurrencyStrategies = selectedCurrency
    ? currencyStrategies.filter((cs) => cs.currency === selectedCurrency)
    : [];

  const currencyTotalPages = Math.max(1, Math.ceil(filteredCurrencyStrategies.length / ITEMS_PER_PAGE));

  const currencyPaginated = filteredCurrencyStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <TopContainer />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          {showCurrencyAll ? (
            <div>
              <button
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                onClick={handleCloseCurrencyAll}
              >
                <FiChevronLeft className="w-4 h-4" />
                Back
              </button>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">By currency</h2>

              {selectedCurrency ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {(() => {
                        const info = currencyFull.find((x) => x.code === selectedCurrency) || { code: selectedCurrency };
                        return info.country ? (
                          <ReactCountryFlag svg countryCode={info.country} style={{ width: '18px', height: '18px' }} title={info.code} />
                        ) : info.cryptoImage ? (
                          <img src={info.cryptoImage} alt={info.code} className="w-5 h-5 object-contain" />
                        ) : (
                          <span className="text-xs font-semibold">{info.code}</span>
                        );
                      })()}
                    </div>
                    <h3 className="text-base font-semibold">{selectedCurrency}</h3>
                  </div>

                  {currencyPaginated.length === 0 ? (
                    <div className="p-6 bg-white rounded-lg border border-gray-100 text-sm text-gray-500">No strategies for {selectedCurrency}</div>
                  ) : (
                    <div className="space-y-3">
                      {currencyPaginated.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => handleCardClick(s)}
                          className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <img src={s.img} alt={s.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{s.name}</p>
                              {s.owner && <p className="text-xs text-gray-500 mt-1">{s.owner}</p>}
                            </div>
                          </div>

                          <div className="flex items-center gap-8 text-right text-xs sm:text-sm">
                            <div className="min-w-[70px]">
                              <p className="font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                              <p className="text-gray-500 text-[10px] sm:text-xs">Investors</p>
                            </div>
                            <div className="min-w-[60px]">
                              <p className="font-semibold text-gray-900">{s.fee ?? "-"}</p>
                              <p className="text-gray-500 text-[10px] sm:text-xs">Fee</p>
                            </div>
                            <div className="min-w-[80px]">
                              <p className="font-semibold text-gray-900">{s.returnRate ?? "-"}</p>
                              <p className="text-gray-500 text-[10px] sm:text-xs">Return</p>
                            </div>

                            <div className="flex-shrink-0 ml-3">
                              <button
                                onClick={(e) => toggleFavorite(s, e)}
                                className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
                                aria-label={favorites.includes(s.id) ? "Unfavorite" : "Save to favorites"}
                              >
                                {favorites.includes(s.id) ? (
                                  <AiFillStar className="w-5 h-5 text-yellow-400" />
                                ) : (
                                  <FiStar className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination for currency list */}
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 mb-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-md border ${
                        currentPage === 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Prev
                    </button>

                    {Array.from({ length: currencyTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm flex items-center justify-center ${
                          currentPage === page ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(currencyTotalPages, p + 1))}
                      disabled={currentPage === currencyTotalPages}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-md border ${
                        currentPage === currencyTotalPages
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {currencyFull.map((c) => {
                    const count = currencyStrategies.filter((cs) => cs.currency === c.code).length;
                    return (
                      <button
                        key={c.code}
                        onClick={() => handleOpenCurrencyAll(c.code)}
                        className={`border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 bg-white text-left hover:shadow-sm ${count === 0 ? 'opacity-80' : ''}`}
                      >
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                          {c.country ? (
                            <ReactCountryFlag svg countryCode={c.country} style={{ width: '28px', height: '28px' }} title={c.code} />
                          ) : c.cryptoImage ? (
                            <img src={c.cryptoImage} alt={c.code} className="w-7 h-7 object-contain" />
                          ) : (
                            <span className="text-sm font-semibold">{c.code}</span>
                          )}
                        </div>
                        <div className="text-xs font-medium text-gray-800">{c.code}</div>
                        <div className="text-[11px] text-gray-500">{count > 0 ? `${count} strategies` : 'No data'}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : showRecentlyAll ? (
            <div>
              <button
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                onClick={handleCloseRecentlyAll}
              >
                <FiChevronLeft className="w-4 h-4" />
                Back
              </button>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Recently viewed
              </h2>

              <div className="space-y-3">
                {recentlyViewed.map((s, idx) => (
                  <div
                    key={`${s.id}-${idx}`}
                    onClick={() => handleCardClick(s)}
                    className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={s.img}
                        alt={s.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {s.name}
                        </p>
                        {s.owner && (
                          <p className="text-xs text-gray-500 mt-1">{s.owner}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-8 text-right text-xs sm:text-sm">
                      <div className="min-w-[70px]">
                        <p className="font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                        <p className="text-gray-500 text-[10px] sm:text-xs">Investors</p>
                      </div>
                      <div className="min-w-[60px]">
                        <p className="font-semibold text-gray-900">{s.fee ?? "-"}</p>
                        <p className="text-gray-500 text-[10px] sm:text-xs">Fee</p>
                      </div>
                      <div className="min-w-[80px]">
                        <p className="font-semibold text-gray-900">{s.returnRate ?? "-"}</p>
                        <p className="text-gray-500 text-[10px] sm:text-xs">Return</p>
                      </div>

                      {/* Star favorite button */}
                      <div className="flex-shrink-0 ml-3">
                        <button
                          onClick={(e) => toggleFavorite(s, e)}
                          className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
                          aria-label={favorites.includes(s.id) ? "Unfavorite" : "Save to favorites"}
                        >
                          {favorites.includes(s.id) ? (
                            <AiFillStar className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <FiStar className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {showAll ? (
                <div>
                  {/* Back */}
                  <button
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                    onClick={handleCloseAll}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                    Most Copied
                  </h2>

                  {/* Full list with columns */}
                  <div className="space-y-3">
                    {paginatedData.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleCardClick(s)}
                        className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                      >
                        {/* Left: rank + name */}
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="w-6 text-sm text-gray-500">{s.rank}</span>
                          <img
                            src={s.img}
                            alt={s.name}
                            className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                              {s.name}
                            </p>
                          </div>
                        </div>

                        {/* Right: Return / Fee / Investors */}
                        <div className="flex items-center gap-6 text-right text-xs sm:text-sm">
                          <div className="min-w-[70px]">
                            <p className="font-semibold text-gray-900">{s.returnRate}</p>
                            <p className="text-gray-500 text-[10px] sm:text-xs">Return</p>
                          </div>
                          <div className="min-w-[60px]">
                            <p className="font-semibold text-gray-900">{s.fee}</p>
                            <p className="text-gray-500 text-[10px] sm:text-xs">Fee</p>
                          </div>
                          <div className="min-w-[80px]">
                            <p className="font-semibold text-gray-900">
                              {s.investors.toLocaleString("en-US")}
                            </p>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                              Investors
                            </p>
                          </div>

                          {/* Star favorite button for Most Copied rows */}
                          <div className="flex-shrink-0 ml-3">
                            <button
                              onClick={(e) => toggleFavorite(s, e)}
                              className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
                              aria-label={favorites.includes(s.id) ? "Unfavorite" : "Save to favorites"}
                            >
                              {favorites.includes(s.id) ? (
                                <AiFillStar className="w-5 h-5 text-yellow-400" />
                              ) : (
                                <FiStar className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 mb-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-md border ${
                        currentPage === 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm flex items-center justify-center ${
                            currentPage === page
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-md border ${
                        currentPage === totalPages
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <h1 className="text-[26px] sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                    Copy Trading
                  </h1>

                  {/* Top tabs */}
                  <div className="border-b border-gray-200 mb-6">
                    <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                      <button
                        onClick={() => setActiveTab("discover")}
                        className={`pb-3 -mb-[1px] ${
                          activeTab === "discover"
                            ? "border-b-2 border-gray-900 font-medium text-gray-900"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        Discover strategies
                      </button>
                      <button
                        onClick={() => setActiveTab("favorites")}
                        className={`pb-3 ${
                          activeTab === "favorites" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        Favorites
                      </button>
                      <button
                        onClick={() => setActiveTab("assets")}
                        className={`pb-3 ${
                          activeTab === "assets" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        Assets
                      </button>
                      <button
                        onClick={() => setActiveTab("mycopy")}
                        className={`pb-3 ${
                          activeTab === "mycopy" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        My copy strategies
                      </button>
                    </div>
                  </div>

                  {/* Filter pills (only show on Discover tab) */}
                  {activeTab === "discover" && (
                    <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        All strategies
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        Most Copied
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        Recently viewed
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        Return with Moderate Drawdown
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        Best Return for 3 months
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        Low Fee
                      </button>
                      <button className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap">
                        New Strategies
                      </button>
                    </div>
                  )}

                  {/* Content area: show discover or favorites */}
                  {activeTab === "discover" && (
                    <>
                      {/* Most Copied header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Most Copied</h2>
                        <button
                          className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                          onClick={handleOpenAll}
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>

                      {/* Strategies list (small preview) */}
                      <div className="bg-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
                          {strategies.map((strategy, idx) => (
                            <div
                              key={strategy.id}
                              onClick={() => handleCardClick(strategy)}
                              className={`py-4 border-b border-gray-100 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition p-2 rounded-lg ${
                                idx >= strategies.length - 2 ? "lg:last:border-b-0" : ""
                              }`}
                            >
                              {/* Left side: rank + info */}
                              <div className="flex items-center gap-4 min-w-0">
                                <span className="w-5 text-sm text-gray-500">{strategy.rank}</span>
                                <img
                                  src={strategy.img}
                                  alt={strategy.name}
                                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                    {strategy.name}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-4 mt-1 text-xs sm:text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <span className="text-xs">📈</span>
                                      {strategy.returnRate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="text-xs">$</span>
                                      {strategy.fee}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right side: investors */}
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                  {strategy.investors.toLocaleString("en-US")}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">Investors</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "favorites" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Favorites</h2>
                      </div>

                      {favoriteItems.length === 0 ? (
                        <div className="p-6 bg-white rounded-lg border border-gray-100 text-sm text-gray-500">No favorites yet</div>
                      ) : (
                        <div className="space-y-3">
                          {favoriteItems.map((s, idx) => (
                            <div
                              key={`${s.id}-${idx}`}
                              onClick={() => handleCardClick(s)}
                              className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                <img
                                  src={s.img}
                                  alt={s.name}
                                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{s.name}</p>
                                  {s.owner && <p className="text-xs text-gray-500 mt-1">{s.owner}</p>}
                                </div>
                              </div>

                              <div className="flex items-center gap-8 text-right text-xs sm:text-sm">
                                <div className="min-w-[70px]">
                                  <p className="font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                                  <p className="text-gray-500 text-[10px] sm:text-xs">Investors</p>
                                </div>
                                <div className="min-w-[60px]">
                                  <p className="font-semibold text-gray-900">{s.fee ?? "-"}</p>
                                  <p className="text-gray-500 text-[10px] sm:text-xs">Fee</p>
                                </div>
                                <div className="min-w-[80px]">
                                  <p className="font-semibold text-gray-900">{s.returnRate ?? "-"}</p>
                                  <p className="text-gray-500 text-[10px] sm:text-xs">Return</p>
                                </div>

                                <div className="flex-shrink-0 ml-3">
                                  <button
                                    onClick={(e) => toggleFavorite(s, e)}
                                    className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
                                    aria-label={favorites.includes(s.id) ? "Unfavorite" : "Save to favorites"}
                                  >
                                    {favorites.includes(s.id) ? (
                                      <AiFillStar className="w-5 h-5 text-yellow-400" />
                                    ) : (
                                      <FiStar className="w-5 h-5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}


                  {/* Best Strategy Banner (show only on Discover tab) */}
                  {activeTab === "discover" && (
                    <div className="mt-10 mb-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Best strategy by return per 3 months</h3>
                      </div>

                      <div className=" px-4 py-1 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                              <img
                                src={bestStrategy.img}
                                alt={bestStrategy.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                  <p className="font-semibold text-gray-900 truncate pr-2 text-sm sm:text-base">{bestStrategy.name}</p>
                                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                                     <span>↗ Return {bestStrategy.returnRate}</span>
                                  </p>
                              </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCardClick(bestStrategy); }}
                                className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-medium rounded-lg transition"
                              >
                                Details
                              </button>
                              <button className="flex-1 sm:flex-none px-4 py-2 bg-[#ffd200] hover:bg-[#ffca00] text-gray-900 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap">
                                Invest 10 USD
                              </button>
                          </div>
                      </div>
                    </div>
                  )}

                  {/* Recently Viewed (show only on Discover tab) */}
                  {activeTab === "discover" && recentlyViewed.length > 0 && (
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recently viewed</h2>
                        <button onClick={handleOpenRecentlyAll} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                         See all
                         <FiChevronRight />
                        </button>
                      </div>

                      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {recentlyViewed.map((s, i) => (
                          <div
                            key={`${s.id}-${i}`}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[160px] w-[160px] sm:min-w-[110px] sm:w-[110px] flex-shrink-0 cursor-pointer group"
                          >
                            <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/2] mb-3">
                              <img
                                src={s.img}
                                alt={s.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Overlay gradient optional */}
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="font-bold text-gray-900 text-sm sm:text-base truncate mb-1">{s.name}</p>
                            <p className="text-gray-600 text-xs sm:text-sm font-medium">↗ {s.returnRate}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* By currency horizontal scroll */}
                  {activeTab === "discover" && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">By currency</h3>
                        <button onClick={handleOpenCurrencyAll} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>

                      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 no-scrollbar">
                        {currencyItems.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => handleOpenCurrencyAll(c.code)}
                            className="min-w-[76px] w-[76px] sm:w-[96px] bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-xs text-gray-700"
                          >
                            <div className="w-10 h-10 flex items-center justify-center">
                              {c.country ? (
                                <ReactCountryFlag
                                  svg
                                  countryCode={c.country}
                                  style={{ width: '22px', height: '22px' }}
                                  title={c.code}
                                />
                              ) : c.cryptoImage ? (
                                <img src={c.cryptoImage} alt={c.code} className="w-5 h-5 object-contain" />
                              ) : (
                                <span className="text-sm font-semibold">{c.code}</span>
                              )}
                            </div>
                            <div className="text-xs font-medium truncate">{c.code}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Toast notification */}
      {toast.show && (
        <div className="fixed left-1/2 top-20 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg shadow-md">
            <AiOutlineCheckCircle className="w-5 h-5" />
            <div className="text-sm">{toast.message}</div>
            <button
              onClick={() => setToast({ show: false, message: "" })}
              className="ml-2 text-emerald-700 hover:text-emerald-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CopyTrading;
