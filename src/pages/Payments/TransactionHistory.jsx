import React, { useEffect, useRef, useState } from "react";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";
import {
  Clock,
  Download,
  Filter,
  ChevronDown,
  HelpCircle,
  X,
} from "lucide-react";

const ranges = [
  { id: "3d", label: "Last 3 days" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "3m", label: "Last 3 months" },
  { id: "custom", label: "Custom date" },
];

const transactionTypes = [
  "All transaction types",
  "Deposit",
  "Withdrawal",
  "Transfer",
  "Refund",
  "Reward",
  "Rebate",
  "Investment",
  "Performance fee",
  "Agent commission",
];

const statuses = ["All statuses", "Processing", "Done", "Rejected"];

const accounts = ["All accounts"];

const TransactionHistory = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // "range" | "type" | "status" | "account" | null
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(ranges[1]); // default Last 7 days
  const [selectedType, setSelectedType] = useState(transactionTypes[0]);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => setOpenDropdown((prev) => (prev === key ? null : key));

  const resetFilters = () => {
    setSelectedRange(ranges[1]);
    setSelectedType(transactionTypes[0]);
    setSelectedStatus(statuses[0]);
    setSelectedAccount(accounts[0]);
    setOpenDropdown(null);
  };

  return (
    <>
      <TopContainer />
      <div className="min-h-screen bg-white flex flex-col items-center">
        <div className="p-4 md:px-8 w-full lg:px-10 max-w-7xl" ref={containerRef}>
          {/* Top row: Title + Get support */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl lg:text-[32px] font-semibold text-gray-900">
              Transaction history
            </h2>
            <a href="#support" className="text-sm text-blue-600 hover:underline">
              Get support
            </a>
          </div>

          {/* Filter pills row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Range pill */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("range")}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm"
                style={{ backgroundColor: "#6c8595" }}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "range"}
              >
                <span className="text-xs font-medium">{selectedRange.label}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "range" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "range" && (
                <ul
                  role="listbox"
                  className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  {ranges.map((r) => (
                    <li
                      key={r.id}
                      onClick={() => {
                        setSelectedRange(r);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedRange.id === r.id ? "bg-gray-50" : ""
                      }`}
                    >
                      {r.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Transaction types pill - hidden on tablet and below */}
            <div className="relative hidden md:block">
              <button
                onClick={() => toggleDropdown("type")}
                className="flex items-center gap-2 bg-gray-200/70 text-gray-800 px-4 py-2 rounded-full text-sm"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "type"}
              >
                <span className="text-xs font-medium">{selectedType}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "type" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "type" && (
                <ul
                  role="listbox"
                  className="absolute left-0 mt-2 w-44 max-h-88 overflow-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  {transactionTypes.map((t) => (
                    <li
                      key={t}
                      onClick={() => {
                        setSelectedType(t);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedType === t ? "bg-gray-50" : ""
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Statuses pill - hidden on tablet and below */}
            <div className="relative hidden md:block">
              <button
                onClick={() => toggleDropdown("status")}
                className="flex items-center gap-2 bg-gray-200/70 text-gray-800 px-4 py-2 rounded-full text-sm"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "status"}
              >
                <span className="text-xs font-medium">{selectedStatus}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "status" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "status" && (
                <ul
                  role="listbox"
                  className="absolute left-0 mt-2 w-30 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  {statuses.map((s) => (
                    <li
                      key={s}
                      onClick={() => {
                        setSelectedStatus(s);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedStatus === s ? "bg-gray-50" : ""
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accounts pill - hidden on tablet and below */}
            <div className="relative hidden md:block">
              <button
                onClick={() => toggleDropdown("account")}
                className="flex items-center gap-2 bg-gray-200/70 text-gray-800 px-4 py-2 rounded-full text-sm"
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "account"}
              >
                <span className="text-xs font-medium">{selectedAccount}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "account" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "account" && (
                <ul
                  role="listbox"
                  className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  {accounts.map((a) => (
                    <li
                      key={a}
                      onClick={() => {
                        setSelectedAccount(a);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedAccount === a ? "bg-gray-50" : ""
                      }`}
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Spacer + Actions */}
            <div className="ml-auto flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex md:hidden items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Transaction panel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-2">
            <div className="text-center py-16">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-gray-400" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No transaction matches your filters
              </h3>
              <p className="text-gray-500 mb-6">Try changing your search terms</p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-md bg-[#ffde02] hover:bg-yellow-300/80 text-sm font-medium text-gray-900"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Mobile Filter Popup */}
      {isFilterOpen && (
        <div className="fixed top-10 left-8 rounded-xl z-[60] bg-white flex flex-col md:hidden border border-gray-100 w-full max-w-2xl h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b  border-gray-100"> 
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {/* Transaction types */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Transaction types</h3>
              <div className="flex flex-wrap gap-2">
                {transactionTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedType === t
                        ? "bg-[#6c8595] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedStatus === s
                        ? "bg-[#6c8595] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Account</h3>
              <div className="flex flex-wrap gap-2">
                {accounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAccount(a)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedAccount === a
                        ? "bg-[#6c8595] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex justify-between">
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-gray-100 text-gray-900 rounded-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className={`px-6 py-2 rounded-sm font-medium transition-colors ${
                selectedType !== transactionTypes[0] || selectedStatus !== statuses[0] || selectedAccount !== accounts[0]
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  : "border border-gray-300 text-gray-400 hover:bg-gray-50"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionHistory;
