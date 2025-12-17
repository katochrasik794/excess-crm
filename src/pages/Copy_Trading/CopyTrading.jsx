// src/pages/CopyTrading.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft, FiStar, FiTrendingUp, FiInfo, FiClock, FiInbox, FiEye, FiDownload, FiLink, FiDollarSign, FiChevronUp, FiExternalLink } from "react-icons/fi";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

const FAQItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
        <button 
            className="flex items-start justify-between w-full text-left mb-3 group"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className="text-base text-gray-700 font-medium select-text group-hover:text-gray-900 transition-colors">{question}</span>
            <FiChevronUp 
                className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
        </button>
        {isOpen && (
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                {children}
            </div>
        )}
    </div>
  );
};

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

const moderateDrawdownStrategies = [
  {
    id: 301,
    name: "Auto profit",
    returnRate: "29998%",
    fee: "30%",
    investors: 291,
    owner: "RANDA Al-Basousi",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 302,
    name: "The5ers Trading",
    returnRate: "22568%",
    fee: "0%",
    investors: 826,
    owner: "DONG NGO VAN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
    badge: "FUNDED"
  },
  {
    id: 303,
    name: "Auto profit 2",
    returnRate: "16203%",
    fee: "30%",
    investors: 30,
    owner: "RANDA Al-Basousi",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 304,
    name: "GOLD LEGEND ONE",
    returnRate: "15434%",
    fee: "30%",
    investors: 578,
    owner: "SHOKY HASAN",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 305,
    name: "CRYPTO LEGEND 19",
    returnRate: "11922%",
    fee: "30%",
    investors: 862,
    owner: "محمد الأمير فراج احمد",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 306,
    name: "AT Master Pro",
    returnRate: "11500%",
    fee: "25%",
    investors: 141,
    owner: "MINH ANH BUI",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 307,
    name: "Master Lãi Kép",
    returnRate: "11393%",
    fee: "30%",
    investors: 1019,
    owner: "VAN THINH NGUYEN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 308,
    name: "BLOCKCHAIN TRADE ONE",
    returnRate: "10145%",
    fee: "50%",
    investors: 530,
    owner: "ABDALLAH AMIN",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 309,
    name: "CRYPTO LEGEND 20",
    returnRate: "9427%",
    fee: "30%",
    investors: 333,
    owner: "محمد الأمير فراج احمد",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 310,
    name: "GOLD System 2",
    returnRate: "9062%",
    fee: "25%",
    investors: 137,
    owner: "VAN TRA PHAN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  // Extra pages for pagination
  { id: 311, name: "Steady Growth Hub", returnRate: "8900%", fee: "25%", investors: 110, owner: "Trader One", country: "US", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 312, name: "Alpha Returns", returnRate: "8500%", fee: "30%", investors: 95, owner: "Trader Two", country: "GB", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 313, name: "Beta Scalper", returnRate: "8100%", fee: "20%", investors: 205, owner: "Trader Three", country: "FR", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 314, name: "Gamma Ray Fx", returnRate: "7800%", fee: "15%", investors: 330, owner: "Trader Four", country: "DE", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
];

const bestReturnStrategies = [
  {
    id: 401,
    name: "Yasser Fx",
    returnRate: "155873%",
    fee: "30%",
    investors: 1332,
    owner: "YASIR FARAJ A ALNEFAIE",
    country: "SA",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 402,
     name: "AI Trade Bot",
     returnRate: "117639%",
     fee: "50%",
     investors: 1545,
     owner: "RASHEEDH:B",
     country: "IN",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 403,
     name: "PRICE ACTION Trading",
     returnRate: "47884%",
     fee: "25%",
     investors: 1851,
     owner: "DUC CUONG NGUYEN",
     country: "VN",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 404,
     name: "Trading thầm lặng",
     returnRate: "31840%",
     fee: "30%",
     investors: 841,
     owner: "NGUYEN DUC",
     country: "VN",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 405,
     name: "Auto profit",
     returnRate: "29998%",
     fee: "30%",
     investors: 291,
     owner: "RANDA Al-Basousi",
     country: "EG",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 406,
     name: "Slow is fast",
     returnRate: "23717%",
     fee: "30%",
     investors: 394,
     owner: "小波刘",
     country: "CN",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 407,
     name: "The5ers Trading",
     returnRate: "22568%",
     fee: "0%",
     investors: 826,
     owner: "DONG NGO VAN",
     country: "VN",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
     badge: "FUNDED"
  },
  {
     id: 408,
     name: "BTC Reversal Matrix",
     returnRate: "20110%",
     fee: "30%",
     investors: 139,
     owner: "HESHAM KASSEM",
     country: "SA",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 409,
     name: "CRYPTO LEGEND 15",
     returnRate: "17773%",
     fee: "30%",
     investors: 525,
     owner: "سعدالدين احمد سعدالدين احمد",
     country: "EG",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
     id: 410,
     name: "Auto profit 2",
     returnRate: "16203%",
     fee: "30%",
     investors: 30,
     owner: "RANDA Al-Basousi",
     country: "EG",
     img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  // Extra items for pagination
  { id: 411, name: "XAUUSD Pro", returnRate: "15900%", fee: "25%", investors: 120, owner: "Trader X", country: "US", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 412, name: "Forex Master", returnRate: "14500%", fee: "30%", investors: 155, owner: "Trader Y", country: "GB", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
];

const lowFeeStrategies = [
  {
    id: 501,
    name: "The5ers Trading",
    returnRate: "22568%",
    fee: "0%",
    investors: 822,
    owner: "DONG NGO VAN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
    badge: "FUNDED CERTIFICATE"
  },
  {
    id: 502,
    name: "GOLD LEGEND-LVG50",
    returnRate: "5716%",
    fee: "0%",
    investors: 73,
    owner: "PHAM HUNG",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 503,
    name: "Raixt Trade",
    returnRate: "3536%",
    fee: "0%",
    investors: 18,
    owner: "ABDUL MOIZ",
    country: "PK",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 504,
    name: "Đồng Xuu Ma Thuật A",
    returnRate: "3360%",
    fee: "0%",
    investors: 268,
    owner: "BUI NHAT",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 505,
    name: "Elite Trade",
    returnRate: "1831%",
    fee: "0%",
    investors: 22,
    owner: "TUNG DUY NGUYEN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 506,
    name: "招财",
    returnRate: "1155%",
    fee: "0%",
    investors: 70,
    owner: "布佳林",
    country: "CN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 507,
    name: "Thợ Xây xau 4",
    returnRate: "1044%",
    fee: "0%",
    investors: 75,
    owner: "THI KIM DUYEN HUYNH",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 508,
    name: "Quỹ Tư Nhân - Growth",
    returnRate: "736%",
    fee: "0%",
    investors: 16,
    owner: "NGOC DINH DO",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 509,
    name: "AAA luckyll 77",
    returnRate: "522%",
    fee: "0%",
    investors: 26,
    owner: "MUNG CHEUNG LAI",
    country: "HK",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 510,
    name: "MASTERMIND",
    returnRate: "493%",
    fee: "0%",
    investors: 12,
    owner: "ASAD MEHMOOD",
    country: "PK",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  // Extra for pagination
  { id: 511, name: "Zero Fee Hero", returnRate: "450%", fee: "0%", investors: 50, owner: "Trader Z", country: "US", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 512, name: "Fee Free FX", returnRate: "410%", fee: "0%", investors: 45, owner: "Trader F", country: "GB", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
];

const newStrategies = [
  {
    id: 601,
    name: "WIN GOLD TRADER",
    returnRate: "550%",
    fee: "10%",
    days: "30",
    owner: "PHAN THANG",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 602,
    name: "手动策略111111",
    returnRate: "493%",
    fee: "30%",
    days: "30",
    owner: "亮于",
    country: "CN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 603,
    name: "GoldBTC Titan",
    returnRate: "308%",
    fee: "20%",
    days: "30",
    owner: "CHALANGPOT CHAISOMPAN",
    country: "TH",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 604,
    name: "TP addict",
    returnRate: "109%",
    fee: "10%",
    days: "30",
    owner: "AFAN THENGRANA",
    country: "ID",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 605,
    name: "100ReturnPro",
    returnRate: "862%",
    fee: "20%",
    days: "30",
    owner: "Ahmed Abdlehamid",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 606,
    name: "THU NHẬP THỤ ĐỘNG 1",
    returnRate: "17%",
    fee: "0%",
    days: "30",
    owner: "ĐỖ MINH",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 607,
    name: "SteadyGold",
    returnRate: "36%",
    fee: "10%",
    days: "30",
    owner: "LE HOAI THUONG NGUYEN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 608,
    name: "Disciplined Trader",
    returnRate: "6%",
    fee: "5%",
    days: "30",
    owner: "JUNJI DANAO",
    country: "PH",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 609,
    name: "DƯƠNG TUẤN",
    returnRate: "82%",
    fee: "25%",
    days: "30",
    owner: "DƯƠNG TUẤN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 610,
    name: "FX-CRYPTO PRO-001",
    returnRate: "50%",
    fee: "20%",
    days: "30",
    owner: "Văn Hoàng Trường",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
    // Extra for pagination
  { id: 611, name: "New Gen Trader", returnRate: "45%", fee: "15%", days: "30", owner: "Trader N", country: "US", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 612, name: "Alpha Start", returnRate: "55%", fee: "10%",    days: "30",
    owner: "Trader A",
    country: "GB",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
];

const allStrategiesList = [
  {
    id: 701,
    name: "Yasser Fx",
    returnRate: "155873%",
    fee: "30%",
    investors: 1330,
    owner: "YASIR FARAJ A ALNEFAIE",
    country: "SA",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 702,
    name: "AI Trade Bot",
    returnRate: "117639%",
    fee: "50%",
    investors: 1545,
    owner: "RASHEEDH:B",
    country: "IN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 703,
    name: "PRICE ACTION Trading",
    returnRate: "47884%",
    fee: "25%",
    investors: 1857,
    owner: "DUC CUONG NGUYEN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 704,
    name: "Trading thầm lặng",
    returnRate: "31840%",
    fee: "30%",
    investors: 842,
    owner: "NGUYEN DUC",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 705,
    name: "Auto profit",
    returnRate: "29998%",
    fee: "30%",
    investors: 293,
    owner: "RANDA Al-Basousi",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 706,
    name: "Slow is fast",
    returnRate: "23717%",
    fee: "30%",
    investors: 393,
    owner: "小波刘",
    country: "CN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 707,
    name: "The5ers Trading",
    returnRate: "22568%",
    fee: "0%",
    investors: 825,
    owner: "DONG NGO VAN",
    country: "VN",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 708,
    name: "BTC Reversal Matrix",
    returnRate: "20110%",
    fee: "30%",
    investors: 140,
    owner: "HESHAM KASSEM",
    country: "SA",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 709,
    name: "CRYPTO LEGEND 15",
    returnRate: "17773%",
    fee: "30%",
    investors: 525,
    owner: "سعدالدين احمد سعدالدين احمد",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
  {
    id: 710,
    name: "Auto profit 2",
    returnRate: "16203%",
    fee: "30%",
    investors: 30,
    owner: "RANDA Al-Basousi",
    country: "EG",
    img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8",
  },
    // Extra items for pagination
  { id: 711, name: "Gold Scalper", returnRate: "15000%", fee: "25%", investors: 100, owner: "Trader G", country: "US", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
  { id: 712, name: "Forex King", returnRate: "14000%", fee: "30%", investors: 90, owner: "Trader K", country: "GB", img: "https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" },
];

const allStrategies = [...strategies, ...extraStrategies, ...moderateDrawdownStrategies, ...bestReturnStrategies, ...lowFeeStrategies, ...newStrategies, ...allStrategiesList];

const ITEMS_PER_PAGE = 6;

const CopyTrading = () => {
  const [showAll, setShowAll] = useState(false);
  const [showRecentlyAll, setShowRecentlyAll] = useState(false);
  const [showCurrencyAll, setShowCurrencyAll] = useState(false);
  const [showModerateAll, setShowModerateAll] = useState(false);
  const [showBestReturnAll, setShowBestReturnAll] = useState(false);
  const [showLowFeeAll, setShowLowFeeAll] = useState(false);
  const [showNewStrategiesAll, setShowNewStrategiesAll] = useState(false);
  const [showAllStrategiesAll, setShowAllStrategiesAll] = useState(false);
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
  
  const handleOpenModerateAll = () => {
    setShowModerateAll(true);
    setCurrentPage(1);
  }

  const handleCloseModerateAll = () => {
    setShowModerateAll(false);
  }

  const handleOpenBestReturnAll = () => {
    setShowBestReturnAll(true);
    setCurrentPage(1);
  }

  const handleCloseBestReturnAll = () => {
    setShowBestReturnAll(false);
  }

  const handleOpenLowFeeAll = () => {
    setShowLowFeeAll(true);
    setCurrentPage(1);
  }

  const handleCloseLowFeeAll = () => {
    setShowLowFeeAll(false);
  }

  const handleOpenNewStrategiesAll = () => {
    setShowNewStrategiesAll(true);
    setCurrentPage(1);
  }

  const handleCloseNewStrategiesAll = () => {
    setShowNewStrategiesAll(false);
  }

  const handleOpenAllStrategiesAll = () => {
    setShowAllStrategiesAll(true);
    setCurrentPage(1);
  }

  const handleCloseAllStrategiesAll = () => {
    setShowAllStrategiesAll(false);
  }

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

  // Moderate pagination logic
  const moderateTotalPages = Math.ceil(moderateDrawdownStrategies.length / ITEMS_PER_PAGE);
  const moderatePaginated = moderateDrawdownStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  // Best Return pagination logic
  const bestReturnTotalPages = Math.ceil(bestReturnStrategies.length / ITEMS_PER_PAGE);
  const bestReturnPaginated = bestReturnStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Low Fee pagination logic
  const lowFeeTotalPages = Math.ceil(lowFeeStrategies.length / ITEMS_PER_PAGE);
  const lowFeePaginated = lowFeeStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // New Strategies pagination logic
  const newStrategiesTotalPages = Math.ceil(newStrategies.length / ITEMS_PER_PAGE);
  const newStrategiesPaginated = newStrategies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // All Strategies pagination logic
  const allStrategiesTotalPages = Math.ceil(allStrategiesList.length / ITEMS_PER_PAGE);
  const allStrategiesPaginated = allStrategiesList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


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
            {showModerateAll ? (
                 <div>
                    {/* Back Button */}
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                        onClick={handleCloseModerateAll}
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                        Return with Moderate Drawdown
                    </h2>

                    {/* Moderate List */}
                    <div className="space-y-4">
                        {moderatePaginated.map((s, idx) => (
                            <div
                                key={`${s.id}-${idx}`}
                                onClick={() => handleCardClick(s)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-4 hover:bg-gray-50 transition cursor-pointer hover:shadow-sm"
                            >
                                {/* Left Side */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={s.img}
                                        alt={s.name}
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {s.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {s.country && (
                                                <ReactCountryFlag 
                                                    svg 
                                                    countryCode={s.country} 
                                                    style={{ width: '16px', height: '16px' }} 
                                                    title={s.country}    
                                                />
                                            )}
                                            <p className="text-xs uppercase text-gray-500 font-medium">
                                                {s.owner || "UNKOWN"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Stats */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-right">
                                    <div className="min-w-[70px]">
                                        <p className="text-base font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Investors</p>
                                    </div>
                                    <div className="min-w-[60px]">
                                        <p className="text-base font-semibold text-gray-900">{s.fee}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Fee</p>
                                    </div>
                                    <div className="min-w-[90px]">
                                        <p className="text-base font-semibold text-gray-900">{s.returnRate}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Return</p>
                                    </div>

                                    {/* Star Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleFavorite(s, e)}
                                            className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
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

                    {/* Pagination for Moderate List */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 mb-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: moderateTotalPages }, (_, i) => i + 1).map((page) => (
                             <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full text-xs sm:text-sm flex items-center justify-center transition-colors ${
                                    currentPage === page 
                                    ? "bg-gray-200 text-gray-900 font-semibold" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                             >
                                {page}
                             </button>
                        ))}
                         <button
                            onClick={() => setCurrentPage((p) => Math.min(moderateTotalPages, p + 1))}
                            disabled={currentPage === moderateTotalPages}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === moderateTotalPages ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &gt;
                        </button>
                    </div>

                 </div>
            ) : showBestReturnAll ? (
                <div>
                    {/* Back Button */}
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                        onClick={handleCloseBestReturnAll}
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                        Best Return for 3 months
                    </h2>

                    {/* Best Return List */}
                    <div className="space-y-4">
                        {bestReturnPaginated.map((s, idx) => (
                            <div
                                key={`${s.id}-${idx}`}
                                onClick={() => handleCardClick(s)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-4 hover:bg-gray-50 transition cursor-pointer hover:shadow-sm"
                            >
                                {/* Left Side */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={s.img}
                                        alt={s.name}
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {s.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {s.country && (
                                                <ReactCountryFlag 
                                                    svg 
                                                    countryCode={s.country} 
                                                    style={{ width: '16px', height: '16px' }} 
                                                    title={s.country}    
                                                />
                                            )}
                                            <p className="text-xs uppercase text-gray-500 font-medium truncate">
                                                {s.owner || "UNKNOWN"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Stats */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-right">
                                    <div className="min-w-[70px]">
                                        <p className="text-base font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Investors</p>
                                    </div>
                                    <div className="min-w-[60px]">
                                        <p className="text-base font-semibold text-gray-900">{s.fee}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Fee</p>
                                    </div>
                                    <div className="min-w-[90px]">
                                        <p className="text-base font-semibold text-gray-900">{s.returnRate}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Return</p>
                                    </div>

                                    {/* Star Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleFavorite(s, e)}
                                            className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
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

                    {/* Pagination for Best Return List */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 mb-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: bestReturnTotalPages }, (_, i) => i + 1).map((page) => (
                             <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full text-xs sm:text-sm flex items-center justify-center transition-colors ${
                                    currentPage === page 
                                    ? "bg-gray-200 text-gray-900 font-semibold" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                             >
                                {page}
                             </button>
                        ))}
                         <button
                            onClick={() => setCurrentPage((p) => Math.min(bestReturnTotalPages, p + 1))}
                            disabled={currentPage === bestReturnTotalPages}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === bestReturnTotalPages ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &gt;
                        </button>
                    </div>

                </div>
            ) : showLowFeeAll ? (
                <div>
                    {/* Back Button */}
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                        onClick={handleCloseLowFeeAll}
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                        Low Fee
                    </h2>

                    {/* Low Fee List */}
                    <div className="space-y-4">
                        {lowFeePaginated.map((s, idx) => (
                            <div
                                key={`${s.id}-${idx}`}
                                onClick={() => handleCardClick(s)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-4 hover:bg-gray-50 transition cursor-pointer hover:shadow-sm"
                            >
                                {/* Left Side */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={s.img}
                                        alt={s.name}
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {s.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {s.country && (
                                                <ReactCountryFlag 
                                                    svg 
                                                    countryCode={s.country} 
                                                    style={{ width: '16px', height: '16px' }} 
                                                    title={s.country}    
                                                />
                                            )}
                                            <p className="text-xs uppercase text-gray-500 font-medium truncate">
                                                {s.owner || "UNKNOWN"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Stats */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-right">
                                    <div className="min-w-[70px]">
                                        <p className="text-base font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Investors</p>
                                    </div>
                                    <div className="min-w-[60px]">
                                        <p className="text-base font-semibold text-gray-900">{s.fee}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Fee</p>
                                    </div>
                                    <div className="min-w-[90px]">
                                        <p className="text-base font-semibold text-gray-900">{s.returnRate}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Return</p>
                                    </div>

                                    {/* Star Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleFavorite(s, e)}
                                            className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
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

                    {/* Pagination for Low Fee List */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 mb-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: lowFeeTotalPages }, (_, i) => i + 1).map((page) => (
                             <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full text-xs sm:text-sm flex items-center justify-center transition-colors ${
                                    currentPage === page 
                                    ? "bg-gray-200 text-gray-900 font-semibold" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                             >
                                {page}
                             </button>
                        ))}
                         <button
                            onClick={() => setCurrentPage((p) => Math.min(lowFeeTotalPages, p + 1))}
                            disabled={currentPage === lowFeeTotalPages}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === lowFeeTotalPages ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &gt;
                        </button>
                    </div>

                </div>
            ) : showNewStrategiesAll ? (
                <div>
                     {/* Back Button */}
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                        onClick={handleCloseNewStrategiesAll}
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        New Strategies
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Strategies are displayed in the catalog 30 days after their first trade.
                    </p>

                    {/* New Strategies List */}
                    <div className="space-y-4">
                        {newStrategiesPaginated.map((s, idx) => (
                            <div
                                key={`${s.id}-${idx}`}
                                onClick={() => handleCardClick(s)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-4 hover:bg-gray-50 transition cursor-pointer hover:shadow-sm"
                            >
                                {/* Left Side */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={s.img}
                                        alt={s.name}
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {s.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {s.country && (
                                                <ReactCountryFlag 
                                                    svg 
                                                    countryCode={s.country} 
                                                    style={{ width: '16px', height: '16px' }} 
                                                    title={s.country}    
                                                />
                                            )}
                                            <p className="text-xs uppercase text-gray-500 font-medium truncate">
                                                {s.owner || "UNKNOWN"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Stats */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-right">
                                    <div className="min-w-[70px]">
                                        <p className="text-base font-semibold text-gray-900">{s.returnRate}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Return</p>
                                    </div>
                                    <div className="min-w-[60px]">
                                        <p className="text-base font-semibold text-gray-900">{s.fee}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Fee</p>
                                    </div>
                                    <div className="min-w-[90px]">
                                        <p className="text-base font-semibold text-gray-900">{s.days}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Days</p>
                                    </div>

                                    {/* Star Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleFavorite(s, e)}
                                            className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
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

                    {/* Pagination for New Strategies List */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 mb-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: newStrategiesTotalPages }, (_, i) => i + 1).map((page) => (
                             <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full text-xs sm:text-sm flex items-center justify-center transition-colors ${
                                    currentPage === page 
                                    ? "bg-gray-200 text-gray-900 font-semibold" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                             >
                                {page}
                             </button>
                        ))}
                         <button
                            onClick={() => setCurrentPage((p) => Math.min(newStrategiesTotalPages, p + 1))}
                            disabled={currentPage === newStrategiesTotalPages}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === newStrategiesTotalPages ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            ) : showAllStrategiesAll ? (
               <div>
                     {/* Back Button */}
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 hover:text-gray-900"
                        onClick={handleCloseAllStrategiesAll}
                    >
                        <FiChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                        All Strategies
                    </h2>

                    {/* All Strategies List */}
                    <div className="space-y-4">
                        {allStrategiesPaginated.map((s, idx) => (
                            <div
                                key={`${s.id}-${idx}`}
                                onClick={() => handleCardClick(s)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl px-4 py-4 hover:bg-gray-50 transition cursor-pointer hover:shadow-sm"
                            >
                                {/* Left Side */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={s.img}
                                        alt={s.name}
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {s.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {s.country && (
                                                <ReactCountryFlag 
                                                    svg 
                                                    countryCode={s.country} 
                                                    style={{ width: '16px', height: '16px' }} 
                                                    title={s.country}    
                                                />
                                            )}
                                            <p className="text-xs uppercase text-gray-500 font-medium truncate">
                                                {s.owner || "UNKNOWN"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Stats */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-right">
                                    <div className="min-w-[70px]">
                                        <p className="text-base font-semibold text-gray-900">{(s.investors || 0).toLocaleString("en-US")}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Investors</p>
                                    </div>
                                    <div className="min-w-[60px]">
                                        <p className="text-base font-semibold text-gray-900">{s.fee}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Fee</p>
                                    </div>
                                    <div className="min-w-[90px]">
                                        <p className="text-base font-semibold text-gray-900">{s.returnRate}</p>
                                        <p className="text-gray-500 text-[11px] uppercase">Return</p>
                                    </div>

                                    {/* Star Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleFavorite(s, e)}
                                            className="p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
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

                    {/* Pagination for All Strategies List */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 mb-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: allStrategiesTotalPages }, (_, i) => i + 1).map((page) => (
                             <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full text-xs sm:text-sm flex items-center justify-center transition-colors ${
                                    currentPage === page 
                                    ? "bg-gray-200 text-gray-900 font-semibold" 
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                             >
                                {page}
                             </button>
                        ))}
                         <button
                            onClick={() => setCurrentPage((p) => Math.min(allStrategiesTotalPages, p + 1))}
                            disabled={currentPage === allStrategiesTotalPages}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-50 ${currentPage === allStrategiesTotalPages ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            ) : showCurrencyAll ? (
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
                        } cursor-pointer`}
                      >
                        Discover strategies
                      </button>
                      <button
                        onClick={() => setActiveTab("favorites")}
                        className={`pb-3 ${
                          activeTab === "favorites" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        } cursor-pointer`}
                      >
                        Favorites
                      </button>
                      <button
                        onClick={() => setActiveTab("assets")}
                        className={`pb-3 ${
                          activeTab === "assets" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        } cursor-pointer`}
                      >
                        Assets
                      </button>
                      <button
                        onClick={() => setActiveTab("mycopy")}
                        className={`pb-3 ${
                          activeTab === "mycopy" ? "-mb-[1px] border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-500 hover:text-gray-900"
                        } cursor-pointer`}
                      >
                        My copy strategies
                      </button>
                    </div>
                  </div>

                  {/* Filter pills (only show on Discover tab) */}
                  {activeTab === "discover" && (
                    <div className="flex gap-3 overflow-x-auto pb-2 mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      <button
                            onClick={handleOpenAllStrategiesAll}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                        >
                          All strategies
                        </button>
                      <button
                          className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                          onClick={handleOpenAll}
                        >
                          Most Copied
                        </button>
                      <button onClick={handleOpenRecentlyAll} className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200">
                         Recently viewed
                        </button>
                      <button
                            onClick={handleOpenModerateAll}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                        >
                          Return with Moderate Drawdown
                        </button>
                      <button
                            onClick={handleOpenBestReturnAll}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                        >
                          Best Return for 3 months
                        </button>
                      <button
                            onClick={handleOpenLowFeeAll}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                        >
                          Low Fee
                        </button>
                      <button
                            onClick={handleOpenNewStrategiesAll}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs whitespace-nowrap text-sm text-gray-800 hover:text-gray-900 flex items-center gap-1 cursor-pointer bg-gray-200"
                        >
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
                          className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
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
                        <div className="flex flex-col items-center justify-center p-10 bg-white min-h-[300px]">
                            <div className="text-gray-300 mb-4">
                                <FiStar className="w-16 h-16 stroke-1" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                            <p className="text-gray-500 mb-6 text-sm">When you save strategies to favorites, they will appear here</p>
                            <button 
                                onClick={() => setActiveTab('discover')}
                                className="bg-[#ffd200] hover:bg-[#ffde02] text-black font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Discover strategies
                            </button>
                        </div>
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

                  {activeTab === "assets" && (
                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                      {/* Left Side - Empty State */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Investments</h2>
                        <div className="flex flex-col items-center justify-center p-10 bg-white min-h-[300px]">
                            <div className="text-gray-300 mb-4">
                                <FiInbox className="w-16 h-16 stroke-1" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">There are no active investments</h3>
                            <p className="text-gray-500 mb-6 text-sm">When you start investing, investments will appear here</p>
                            <button 
                                onClick={() => setActiveTab('discover')}
                                className="bg-[#ffd200] hover:bg-[#ffde02] text-black font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Discover strategies
                            </button>
                        </div>
                      </div>

                      {/* Right Side - Sidebar */}
                      <div className="w-full md:w-[320px] space-y-4">
                            {/* Assets Card */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                                    <span>Assets</span>
                                    <FiInfo className="w-4 h-4" />
                                </div>
                                <div className="text-2xl font-semibold text-gray-900 mb-2">0.00 USD</div>
                                <div className="text-sm text-gray-500">Invested 0.00 USD</div>
                            </div>

                            {/* Investment Wallet Card */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-600 mb-4">Investment wallet 0.00 USD</div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => navigate('/deposit')}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer"
                                    >
                                        Deposit
                                    </button>
                                    <button 
                                        onClick={() => navigate('/withdraw')}
                                        className="flex-1 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer"
                                    >
                                        Withdraw
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                                        <FiClock className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Help Center Link */}
                            <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Copy Trading Help Center</span>
                                <FiChevronRight className="text-gray-400 group-hover:text-gray-600" />
                            </button>
                      </div>
                    </div>
                  )}


                  {/* Best Strategy Banner (show only on Discover tab) */}
                  {activeTab === "discover" && (
                    <div className="mt-10 mb-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Best strategy by return per 3 months</h3>
                      </div>

                      <div className=" px-4 py-1 flex flex-col sm:flex-row items-center justify-between gap-4 transition-shadow">
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
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate(`/copy-trading/${bestStrategy.id}`, { state: { strategy: bestStrategy, autoInvest: true, fixedAmount: 10 } }); }}
                                className="flex-1 sm:flex-none px-4 py-2 bg-[#ffd200] hover:bg-[#ffca00] text-gray-900 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap"
                              >
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
                        <button onClick={handleOpenRecentlyAll} className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer">
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
                        <button onClick={handleOpenCurrencyAll} className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer">
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>

                      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 no-scrollbar">
                        {currencyItems.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => handleOpenCurrencyAll(c.code)}
                            className="min-w-[76px] w-[76px] sm:w-[96px] bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-xs text-gray-700 hover:border-gray-300 transition-colors"
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

                  {/* Return with Moderate Drawdown */}
                  {activeTab === "discover" && (
                    <div className="mb-10">
                       <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Return with Moderate Drawdown</h3>
                        <button
                            onClick={handleOpenModerateAll}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {moderateDrawdownStrategies.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[220px] w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex-shrink-0 group relative"
                          >
                             {/* Head Image */}
                             <div className="relative h-28 w-full bg-gray-100">
                                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                
                                {/* Title on image */}
                                <div className="absolute bottom-3 left-3 right-3">
                                     <p className="text-white font-bold text-sm truncate">{s.name}</p>
                                </div>
                                
                                {/* Star */}
                                <div className="absolute top-2 right-2">
                                    <button
                                      onClick={(e) => toggleFavorite(s, e)}
                                      className="text-white/80 hover:text-yellow-400 transition-colors"
                                    >
                                       {favorites.includes(s.id) ? (
                                          <AiFillStar className="w-5 h-5 text-yellow-400" />
                                       ) : (
                                          <FiStar className="w-5 h-5" />
                                       )}
                                    </button>
                                </div>
                                
                                {/* Badge if exists */}
                                {s.badge && <div className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-[10px] font-bold text-black rounded-sm">{s.badge}</div>}
                             </div>
                             
                             {/* Body */}
                             <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs text-gray-500">Return</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">👤</span> {s.investors}
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-bold text-gray-900">{s.returnRate}</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">$</span> {s.fee}
                                    </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Best Return for 3 months */}
                   {activeTab === "discover" && (
                    <div className="mb-10">
                       <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Best Return for 3 months</h3>
                        <button
                            onClick={handleOpenBestReturnAll}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {bestReturnStrategies.map((s) => (
                           <div
                            key={s.id}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[220px] w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex-shrink-0 group relative"
                          >
                             {/* Head Image */}
                             <div className="relative h-28 w-full bg-gray-100">
                                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                
                                {/* Title on image */}
                                <div className="absolute bottom-3 left-3 right-3">
                                     <p className="text-white font-bold text-sm truncate">{s.name}</p>
                                </div>
                                
                                {/* Star */}
                                <div className="absolute top-2 right-2">
                                    <button
                                      onClick={(e) => toggleFavorite(s, e)}
                                      className="text-white/80 hover:text-yellow-400 transition-colors"
                                    >
                                       {favorites.includes(s.id) ? (
                                          <AiFillStar className="w-5 h-5 text-yellow-400" />
                                       ) : (
                                          <FiStar className="w-5 h-5" />
                                       )}
                                    </button>
                                </div>

                                {/* Badge if exists */}
                                {s.badge && <div className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-[10px] font-bold text-black rounded-sm">{s.badge}</div>}
                             </div>
                             
                             {/* Body */}
                             <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs text-gray-500">Return</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">👤</span> {s.investors}
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-bold text-gray-900">{s.returnRate}</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">$</span> {s.fee}
                                    </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Low Fee */}
                   {activeTab === "discover" && (
                    <div className="mb-10">
                       <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Low Fee</h3>
                        <button
                            onClick={handleOpenLowFeeAll}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {lowFeeStrategies.map((s) => (
                           <div
                            key={s.id}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[220px] w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex-shrink-0 group relative"
                          >
                             {/* Head Image */}
                             <div className="relative h-28 w-full bg-gray-100">
                                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                
                                {/* Title on image */}
                                <div className="absolute bottom-3 left-3 right-3">
                                     <p className="text-white font-bold text-sm truncate">{s.name}</p>
                                </div>
                                
                                {/* Star */}
                                <div className="absolute top-2 right-2">
                                    <button
                                      onClick={(e) => toggleFavorite(s, e)}
                                      className="text-white/80 hover:text-yellow-400 transition-colors"
                                    >
                                       {favorites.includes(s.id) ? (
                                          <AiFillStar className="w-5 h-5 text-yellow-400" />
                                       ) : (
                                          <FiStar className="w-5 h-5" />
                                       )}
                                    </button>
                                </div>

                                {/* Badge if exists */}
                                {s.badge && <div className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-[10px] font-bold text-black rounded-sm">{s.badge}</div>}
                             </div>
                             
                             {/* Body */}
                             <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs text-gray-500">Return</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">👤</span> {s.investors}
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-bold text-gray-900">{s.returnRate}</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">$</span> {s.fee}
                                    </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Strategies */}
                   {activeTab === "discover" && (
                    <div className="mb-10">
                       <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">New Strategies</h3>
                        <button
                            onClick={handleOpenNewStrategiesAll}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {newStrategies.map((s) => (
                           <div
                            key={s.id}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[220px] w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex-shrink-0 group relative"
                          >
                             {/* Head Image */}
                             <div className="relative h-28 w-full bg-gray-100">
                                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                
                                {/* Title on image */}
                                <div className="absolute bottom-3 left-3 right-3">
                                     <p className="text-white font-bold text-sm truncate">{s.name}</p>
                                </div>
                                
                                {/* Star */}
                                <div className="absolute top-2 right-2">
                                    <button
                                      onClick={(e) => toggleFavorite(s, e)}
                                      className="text-white/80 hover:text-yellow-400 transition-colors"
                                    >
                                       {favorites.includes(s.id) ? (
                                          <AiFillStar className="w-5 h-5 text-yellow-400" />
                                       ) : (
                                          <FiStar className="w-5 h-5" />
                                       )}
                                    </button>
                                </div>
                             </div>
                             
                             {/* Body */}
                             <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs text-gray-500">Return</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">👤</span> {s.investors}
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-bold text-gray-900">{s.returnRate}</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-700">
                                         <span className="text-xs">$</span> {s.fee}
                                    </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Strategies */}
                   {activeTab === "discover" && (
                    <div className="mb-10">
                       <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">All strategies</h3>
                        <button
                            onClick={handleOpenAllStrategiesAll}
                            className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-sm px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                          See all
                          <FiChevronRight className="text-lg leading-none" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                        {allStrategiesList.map((s) => (
                           <div
                            key={s.id}
                            onClick={() => handleCardClick(s)}
                            className="min-w-[140px] w-[140px] cursor-pointer flex-shrink-0 group"
                          >
                             {/* Image */}
                             <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                             </div>
                             
                             {/* Info */}
                             <div>
                                <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{s.name}</h4>
                                <div className="flex items-center gap-1 text-gray-700 text-xs">
                                     <FiTrendingUp className="w-3 h-3" />
                                     <span>{s.returnRate}</span>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "mycopy" && (
                    <div className="space-y-12">
                        {/* 1. Header Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="flex-1 max-w-xl">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Join Copy Trading</h2>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Boost your income by sharing your trading strategies with over 50 000 investors.
                                </p>
                                <button onClick={() => navigate('/copy-trading/create')} className="bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer">
                                    Create your first strategy
                                </button>
                            </div>
                            
                            {/* Visual Card Representation */}
                            <div className="relative w-full max-w-sm h-64 mx-auto lg:mx-0">
                                {/* Card 1: Back */}
                                <div className="absolute top-0 right-0 w-64 p-4 bg-white rounded-xl shadow-lg transform rotate-3 z-10 border border-gray-100 opacity-60 scale-90 translate-x-4 -translate-y-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="bg-gray-100 rounded px-2 py-0.5 text-xs text-gray-500 flex items-center gap-1"><FiEye /> Public</div>
                                        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                                    </div>
                                    <div className="h-20 bg-gray-100 rounded-lg mb-2"></div>
                                    <div className="font-bold text-lg mb-1">Passive income</div>
                                    <div className="flex justify-between text-xs">
                                        <div><span className="font-bold block text-base">899%</span>Return</div>
                                        <div className="text-right"><span className="font-bold block text-base text-red-500">-17%</span>Drawdown</div>
                                    </div>
                                </div>

                                {/* Card 2: Front */}
                                <div className="absolute top-8 right-8 left-4 bottom-0 bg-white rounded-xl shadow-xl z-20 border border-gray-100 p-4 transform -rotate-2">
                                     <div className="flex justify-between items-center mb-2">
                                        <div className="bg-gray-100 rounded px-2 py-0.5 text-xs text-gray-500 flex items-center gap-1"><FiEye /> Private</div>
                                        <img src="https://my.exness.com/st/media/user_photo/f7/f7fdf29da38742deb3b3c96dc4ffac88_340x210.jpg?v=8" className="h-6 w-6 rounded-full object-cover" alt="User" />
                                    </div>
                                    <div className="h-24 bg-gray-800 rounded-lg mb-3 relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80" alt="Strategy" />
                                        <div className="absolute bottom-2 left-2 text-white font-bold">Steady growth</div>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <div>
                                            <span className="font-bold block text-xl text-gray-900">588%</span>
                                            <span className="text-xs text-gray-500">Return</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold block text-xl text-gray-900">-12%</span>
                                            <span className="text-xs text-gray-500">Drawdown</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Start Earning Now Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Start earning now</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white border border-gray-100 rounded-xl p-6">
                                    <div className="text-gray-400 mb-4 text-sm font-medium">Step 1</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Create a strategy</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Choose between a private strategy (shared via link) or a public strategy (visible to everyone).
                                    </p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-6">
                                    <div className="text-gray-400 mb-4 text-sm font-medium">Step 2</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Attract investors</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Invite investors by sharing your strategy link, or wait for investors to find your public strategy on the Copy Trading platform.
                                    </p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-6">
                                    <div className="text-gray-400 mb-4 text-sm font-medium">Step 3</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Earn your fee</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Earn a performance fee of up to 50% when you generate a profit for your investors.
                                    </p>
                                    <div className="mt-4">
                                        <a href="#" className="text-blue-600 text-sm font-medium hover:underline decoration-dashed underline-offset-4">How to calculate performance fees</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Investors Stats Section */}
                         <div>
                            <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold text-gray-900 mb-2">More than 54 300 investors</h2>
                            <p className="text-gray-900 mb-4 text-xl md:text-2xl">are ready to invest in your strategies</p>
                            <p className="text-xs text-gray-400 mb-6">Monthly unique investors on the Copy Trading platform in Q1 2025.</p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Top earning strategies</h3>
                            
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-4 px-6 font-medium text-gray-500">Strategy provider's country</th>
                                            <th className="py-4 px-6 font-medium text-gray-500">Strategy ID</th>
                                            <th className="py-4 px-6 font-medium text-gray-500 text-right">Paid performance fee</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { country: "Vietnam", code: "VN", id: "110020***", fee: "1 550 676.19 USD" },
                                            { country: "Vietnam", code: "VN", id: "227605***", fee: "1 239 461.03 USD" },
                                            { country: "Thailand", code: "TH", id: "227826***", fee: "601 728.03 USD" },
                                            { country: "Pakistan", code: "PK", id: "110002***", fee: "585 886.57 USD" },
                                            { country: "Egypt", code: "EG", id: "110328***", fee: "520 314.50 USD" },
                                        ].map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 flex items-center gap-3">
                                                    <ReactCountryFlag svg countryCode={item.code} style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                                                    <span className="text-gray-700 font-medium">{item.country}</span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">{item.id}</td>
                                                <td className="py-4 px-6 text-right font-medium text-gray-900">{item.fee}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-8 text-xs text-gray-400">Since 2019</div>
                            <button className="mt-4 bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
                                Start monetizing your strategy
                            </button>
                        </div>

                        {/* 4. Promote Strategy Banner */}
                        <div className="bg-purple-50 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                             <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Earn even more by promoting your strategy online</h2>
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    In addition to your performance fee, you'll also earn a partner reward. Simply share your strategy using the link or QR code to start earning.
                                </p>
                                <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-sm transition-colors">
                                    Learn more
                                </button>
                             </div>
                             <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center opacity-50">
                                <FiDollarSign className="w-16 h-16 text-gray-400" />
                             </div>
                        </div>

                         {/* 5. Live Strategies Check */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Check out some live strategies...</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                                {strategies.slice(0, 5).map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => handleCardClick(s)}
                                        className="min-w-[240px] w-[240px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex-shrink-0 group"
                                    >
                                        <div className="relative h-32 w-full">
                                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cover" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
                                                <h4 className="text-white font-bold text-sm drop-shadow-md">{s.name}</h4>
                                            </div>
                                        </div>
                                        <div className="p-4 grid grid-cols-2 gap-4">
                                            <div>
                                                 <p className="text-xs text-gray-500">Return</p>
                                                 <p className="text-lg font-bold text-gray-900">{s.returnRate}</p>
                                            </div>
                                            <div className="text-right">
                                                 <p className="text-xs text-gray-500 flex items-center justify-end gap-1">👤 {s.investors}</p>
                                                 <p className="text-sm font-medium text-gray-900 mt-1">$ {s.fee}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="min-w-[60px] flex items-center justify-center">
                                    <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                             <button className="mt-6 bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">
                                Become a strategy provider
                            </button>
                        </div>
                        
                        {/* 6. Download App Banner */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Download the Exness Copy Trading app</h2>
                                <p className="text-gray-600 mb-6">Explore trading strategies and copy the trades of experienced traders.</p>
                                
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <div className="bg-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 min-w-[140px]">
                                        <div className="bg-gray-800 text-white p-1 rounded"><FiLink /></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase text-gray-500">View</span>
                                            <span className="font-bold text-sm text-gray-900">QR-code</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-8">
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="text-2xl font-bold text-gray-900">4</span>
                                            <span className="text-sm text-gray-400">/5</span>
                                            <AiFillStar className="text-gray-900 w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-500">Over 1M downloads</div>
                                        <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Google Play" />
                                        </button>
                                    </div>
                                    <div className="w-px bg-gray-200 hidden sm:block"></div>
                                      <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="text-2xl font-bold text-gray-900">4.6</span>
                                            <span className="text-sm text-gray-400">/5</span>
                                             <AiFillStar className="text-gray-900 w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-500">Over 500K downloads</div>
                                        <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
                                             <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" className="h-8" alt="App Store" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/3 relative h-64 md:h-auto overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-white border border-gray-100 flex items-center justify-center">
                                <div className="absolute right-0 bottom-0 w-3/4">
                                     {/* Abstract chart graphic */}
                                     <svg viewBox="0 0 100 50" className="w-full h-full text-green-400 opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
                                         <path d="M0 40 Q 20 50 40 30 T 80 20 T 100 5" />
                                     </svg>
                                </div>
                                <div className="z-10 text-center">
                                     <div className="text-5xl font-bold text-gray-900 italic mb-1">542<span className="text-xl not-italic">.71%</span></div>
                                     <div className="text-xs text-gray-400">Sep 2, 2024 - Jan 3, 2025</div>
                                </div>
                            </div>
                        </div>

                        <hr></hr>

                        {/* 7. FAQ Section */}
                        <div className="pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-10">FAQ</h2>

                            <div className="space-y-12">
                                {/* Fees */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-20 border-b border-gray-100 pb-12">
                                    <div className="w-full md:w-1/4">
                                        <h3 className="text-lg font-bold text-gray-900">Fees</h3>
                                    </div>
                                    <div className="w-full md:w-3/4 space-y-8">
                                        <FAQItem question="How is the performance fee calculated?">
                                            <p>For each strategy, you can set a performance fee rate ranging from 0% to 50%. This rate is applied to the incremental profit of the investment, calculated as: <span className="font-semibold">Incremental Profit = Profit since inception – Profit Threshold</span>. If there is no incremental profit, no performance fee is paid.</p>
                                            <p>Example:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Previous highest profit (profit threshold): 2000 USD</li>
                                                <li>Current profit: 2500 USD</li>
                                                <li>Incremental profit: 2500 USD – 2000 USD = 500 USD</li>
                                                <li>Fee rate: 20%</li>
                                                <li>Performance fee: 500 USD × 20% = 100 USD</li>
                                            </ul>
                                        </FAQItem>
                                        
                                        <FAQItem question="How often are fees paid to strategy providers?">
                                            <div className="text-sm text-gray-600 leading-relaxed">
                                                The performance fee is paid once a month at the end of the billing period. The billing period ends on the last Friday of every month, between 23:50 UTC+0 and 23:59:59 UTC+0. You can track the expected fee for the current period in the ‘Overview’ section.
                                            </div>
                                        </FAQItem>
                                    </div>
                                </div>

                                {/* Trading and allocation */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-20 border-b border-gray-100 pb-12">
                                    <div className="w-full md:w-1/4">
                                        <h3 className="text-lg font-bold text-gray-900">Trading and allocation</h3>
                                    </div>
                                    <div className="w-full md:w-3/4 space-y-8">
                                        <FAQItem question="What kind of accounts are used for Copy Trading? Are they different from regular trading accounts?">
                                            <div className="text-sm text-gray-600 leading-relaxed">
                                                No, Copy Trading uses the same real accounts as trading. You get access to all the same features and benefits — including full support for MT4 and MT5 platforms, as well as the complete range of trading instruments available on Exness.
                                            </div>
                                        </FAQItem>
                                        
                                        <FAQItem question="How does order allocation work?">
                                            <p>As soon as you place a new order, a copied order is placed in the investment. Only new orders are copied when an investment starts. If you close an order, the investment follows the same action. Investors cannot manually modify or select individual orders to copy.</p>
                                            <p>Orders are sized based on the copy coefficient: <span className="font-semibold">Investment Equity / Strategy’s Equity</span>, with four-decimal precision. This ensures precise allocation, even for small investment sizes. The strategy's equity is calculated at the moment before the strategy provider opens the order. The calculation is applied individually to each order.</p>
                                            <p>Example:<br/>If a strategy provider has 10,000 USD equity and opens a 1-lot trade, an investor with 1,001 USD in investment equity will copy 0.1001 lots.</p>
                                        </FAQItem>
                                    </div>
                                </div>

                                {/* Attracting Investors */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-20 border-b border-gray-100 pb-12">
                                    <div className="w-full md:w-1/4">
                                        <h3 className="text-lg font-bold text-gray-900">Attracting Investors</h3>
                                    </div>
                                    <div className="w-full md:w-3/4 space-y-8">
                                        <FAQItem question="How can investors follow and invest in my strategy?">
                                            <p>To allow others to invest in your strategy, follow these steps:</p>
                                            <ol className="list-decimal pl-5 space-y-2">
                                                <li><span className="font-medium">Share your strategy link:</span> Once you create a strategy, you can invite investors by sharing the link on social networks or via direct messages.</li>
                                                <li><span className="font-medium">Make your strategy publicly visible:</span> If you enable Public and meet the necessary requirements, your strategy will appear in the Copy Trading platform catalog.</li>
                                            </ol>
                                            <p>To copy your strategy, investors must click Create investment. If they already have an Exness account, no additional account setup is required.</p>
                                        </FAQItem>
                                    </div>
                                </div>

                                {/* Privacy */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-20 border-b border-gray-100 pb-12">
                                    <div className="w-full md:w-1/4">
                                        <h3 className="text-lg font-bold text-gray-900">Privacy</h3>
                                    </div>
                                    <div className="w-full md:w-3/4 space-y-8">
                                        <FAQItem question="Can I hide my strategy from the catalog?">
                                            <div className="text-sm text-gray-600 leading-relaxed">
                                                You can enable Private mode for any strategy. This makes it exclusively accessible via a shared link.
                                            </div>
                                        </FAQItem>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="flex justify-between items-center mt-6">
                                <button className="text-sm font-semibold text-gray-900 hover:underline">All articles</button>
                                <button className="text-sm font-semibold text-gray-900 hover:underline flex items-center gap-1">Help Center <FiExternalLink /></button>
                            </div>
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
