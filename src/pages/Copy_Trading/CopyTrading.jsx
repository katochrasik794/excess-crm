// src/pages/CopyTrading.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
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

const allStrategies = [...strategies, ...extraStrategies];

const ITEMS_PER_PAGE = 6;

const CopyTrading = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
    <TopContainer />
    <div className=" bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        {showAll ? (
          <>
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
          </>
        ) : (
          <>
            {/* Header */}
            <h1 className="text-[26px] sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Copy Trading
            </h1>

            {/* Top tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                <button className="pb-3 -mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900">
                  Discover strategies
                </button>
                <button className="pb-3 text-gray-500 hover:text-gray-900">
                  Favorites
                </button>
                <button className="pb-3 text-gray-500 hover:text-gray-900">
                  Assets
                </button>
                <button className="pb-3 text-gray-500 hover:text-gray-900">
                  My copy strategies
                </button>
              </div>
            </div>

            {/* Filter pills */}
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

            {/* Most Copied header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Most Copied
              </h2>
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
                      <span className="w-5 text-sm text-gray-500">
                        {strategy.rank}
                      </span>
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
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default CopyTrading;
