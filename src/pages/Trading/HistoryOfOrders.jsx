
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download, Calendar as CalendarIcon, Inbox, ChevronLeft, ChevronRight } from 'lucide-react';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';
import { useAccounts } from '../../context/AccountContext';

const HistoryOfOrders = () => {
  const { getAllActiveAccounts } = useAccounts();
  const accountsData = getAllActiveAccounts();

  const [selectedAccount, setSelectedAccount] = useState(
    accountsData.active[0] || { accountType: 'Standard', mt5Login: '#196126793' }
  );
  const [activeTab, setActiveTab] = useState('closed');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all'); // default 'all' = All time label
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // date-range picker state
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const timeFilters = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom range' },
  ];

  // refs for outside-click closing
  const timeRootRef = useRef(null);
  useEffect(() => {
    const onDocClick = (e) => {
      if (timeRootRef.current && !timeRootRef.current.contains(e.target)) {
        setIsTimeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // helpers for calendar rendering
  const monthName = (d) => d.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = (d) => {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  };
  const startWeekday = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getDay(); // 0 Sunday
  const addMonths = (d, n) => {
    const nd = new Date(d.getFullYear(), d.getMonth() + n, 1);
    return nd;
  };

  const isSameDay = (a, b) => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  // const inRange = (day) => {
  //   if (!rangeStart || !rangeEnd) return false;
  //   return day >= startOfDay(rangeStart) && day <= startOfDay(rangeEnd);
  // };

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  const onDayClick = (day) => {
    // if no start -> set start
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(day);
      setRangeEnd(null);
      return;
    }

    // if start exists and no end
    if (rangeStart && !rangeEnd) {
      if (day >= startOfDay(rangeStart)) {
        setRangeEnd(day);
      } else {
        // picked earlier date -> start becomes new, end cleared
        setRangeStart(day);
        setRangeEnd(null);
      }
    }
  };

  const applyRange = () => {
    if (rangeStart && rangeEnd) {
      setSelectedTimeFilter('custom');
      setIsTimeDropdownOpen(false);
    } else {
      // If user didn't pick a valid end, don't apply — just close
      setIsTimeDropdownOpen(false);
    }
  };

  const cancelRange = () => {
    // reset selection UI but keep previously selected filter
    setRangeStart(null);
    setRangeEnd(null);
    setIsTimeDropdownOpen(false);
  };

  // render calendar days for viewDate
  const renderCalendar = (view) => {
    const totalDays = daysInMonth(view);
    const offset = startWeekday(view); // 0..6 (Sun..Sat)
    const cells = [];

    // we will render a 6x7 grid (42 cells) to keep height fixed
    for (let i = 0; i < 42; i++) {
      const dayIndex = i - offset + 1;
      if (dayIndex < 1 || dayIndex > totalDays) {
        cells.push(null);
      } else {
        cells.push(new Date(view.getFullYear(), view.getMonth(), dayIndex));
      }
    }

    return (
      <div className="grid grid-cols-7 gap-2 px-4 pb-4">
        {/* weekday headings (M T W T F S S in screenshot uses M..S) */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((wd) => (
          <div key={wd} className="text-xs text-gray-400 text-center">
            {wd}
          </div>
        ))}

        {cells.map((d, idx) => {
          if (!d) return <div key={idx} className="h-9" />;

          const isStart = isSameDay(d, rangeStart);
          const isEnd = isSameDay(d, rangeEnd);
          const within = rangeStart && rangeEnd && d >= startOfDay(rangeStart) && d <= startOfDay(rangeEnd);

          return (
            <button
              key={idx}
              onClick={() => onDayClick(d)}
              className={`relative h-9 flex items-center justify-center rounded cursor-pointer focus:outline-none
                ${isStart || isEnd ? 'bg-gray-900 text-white' : within ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
              `}
              aria-pressed={isStart || isEnd}
            >
              <span className={`${isStart || isEnd ? 'font-semibold' : 'font-normal'} text-sm`}>{d.getDate()}</span>

              {/* small dot under the date to mimic screenshot marker */}
              {isStart && !isEnd && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black" />
              )}
              {isEnd && !isStart && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <TopContainer />

      <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">History of orders</h1>

          {/* Account Dropdown */}
          <div className="mb-6">
            <label className="block text-xs text-gray-600 mb-2">Account</label>
            <div className="relative w-full max-w-sm">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white text-left text-sm"
              >
                <span className="text-gray-900">
                  {selectedAccount.accountType} {selectedAccount.mt5Login}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute z-10 left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {accountsData.active.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsAccountDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col">
                          <div className="font-semibold text-sm text-gray-900 mb-1">
                            {account.accountType}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                              MT5
                            </span>
                            <div className="text-sm text-gray-500">
                              {account.accountType} {account.mt5Login}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setActiveTab('closed')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'closed' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Closed orders
                </button>

                <button
                  onClick={() => setActiveTab('open')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'open' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Open orders
                </button>
              </div>

              {/* Time button (opens calendar popup instead of inline list for "All time") */}
              <div className="relative" ref={timeRootRef}>
                <button
                  onClick={() => setIsTimeDropdownOpen((s) => !s)}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white text-sm hover:bg-gray-50"
                >
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {selectedTimeFilter === 'custom'
                      ? `${rangeStart ? rangeStart.toLocaleDateString() : ''} — ${rangeEnd ? rangeEnd.toLocaleDateString() : ''}`
                      : timeFilters.find((f) => f.value === selectedTimeFilter)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTimeDropdownOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-md shadow-lg">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-xs text-gray-500">Select date range</div>
                      <div className="flex items-end justify-between mt-1">
                        <div className="text-lg font-semibold">Start &nbsp;<span className="font-normal text-gray-400">— End</span></div>
                        <div className="text-sm text-gray-500">{monthName(viewDate)}</div>
                      </div>
                    </div>

                    {/* month navigation and calendar */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewDate((v) => addMonths(v, -1))}
                            className="p-2 rounded hover:bg-gray-50"
                            aria-label="Prev month"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                          </button>

                          <div className="text-sm font-medium">{monthName(viewDate)}</div>

                          <button
                            onClick={() => setViewDate((v) => addMonths(v, 1))}
                            className="p-2 rounded hover:bg-gray-50"
                            aria-label="Next month"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* calendar grid */}
                      {renderCalendar(viewDate)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 px-4 py-3">
                      <button
                        onClick={cancelRange}
                        className="px-4 py-2 rounded border border-gray-200 bg-gray-50 text-sm text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={applyRange}
                        className="px-4 py-2 rounded bg-[#ffde02] bg:hover-yellow-300/80 text-sm text-black font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Download CSV */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4">
              <Inbox className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
            <p className="text-base text-gray-900">
              You don't have {activeTab === 'closed' ? 'closed' : 'open'} orders in this account
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HistoryOfOrders;
