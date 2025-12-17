import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AccountProvider } from './context/AccountContext'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import MobileSidebar from './components/MobileSidebar'
import ExnessTerminal from './pages/Trading/ExnessTerminal'
import MyAccount from './pages/Trading/MyAccount'
import OpenAccount from './pages/Trading/OpenAccount'
import Deposit from './pages/Payments/Deposit'
import Withdraw from './pages/Payments/Withdraw'
import TransactionHistory from './pages/Payments/TransactionHistory'
import CryptoWallet from './pages/Payments/CryptoWallet'
import Transfer from './components/Transfer'
import Performance from './pages/Trading/Performance'
import HistoryOfOrders from './pages/Trading/HistoryOfOrders'
import SetUpAccount from './pages/Trading/SetUpAccount'
import Profile from './pages/Settings/Profile'
import Security from './pages/Settings/Security'
import TradingTerminal from './pages/Settings/TradingTerminal'
import TradingConditions from './pages/Fincrm_Benefits/TradingConditions'
import Savings from './pages/Fincrm_Benefits/Savings'
import VirtualPrivateServer from './pages/Fincrm_Benefits/VirtualPrivateServer'
import SupportHub from './pages/SupportHub'
import OpenATicket from './pages/OpenATicket'
import AnalystView from './pages/Analytics/AnalystView'
import MarketNews from './pages/Analytics/MarketNews'
import CopyTrading from './pages/Copy_Trading/CopyTrading'
import DetailsPage from './pages/Copy_Trading/DetailsPage'
import CreateStrategy from './pages/Copy_Trading/CreateStrategy'
import AccountSecurity from './components/AccountSecurity'
import ExnessPlatforms from './components/ExnessPlatforms'

import AccountVerification from './components/AccountVerification'
import Trading_ from './components/Trading_'
import ExnessPrograms from './components/ExnessPrograms'
import Vps from './components/Vps'
import ChatBot from './components/ChatBot'
import AuthPage from './components/AuthPage'

// Simple placeholder component for routes without pages yet
const PlaceholderPage = ({ title }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600">This page is under development.</p>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  const [isExpanded, setIsExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-gray-300">
        <Topbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} isAuthPage={isAuthPage} />
      </div>
      <div className="content flex flex-1 overflow-hidden">
        {!isAuthPage && <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        {!isAuthPage && <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onOpenChat={() => setIsChatOpen(true)} />}
        <main className="flex-1 overflow-y-auto">
          {!isAuthPage && <ChatBot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />}
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<MyAccount />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/open-account" element={<OpenAccount />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/exness-terminal" element={<ExnessTerminal />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/history-of-orders" element={<HistoryOfOrders />} />
            <Route path="/set-up-account" element={<SetUpAccount />} />

            {/* Payments & Wallet Routes */}
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/crypto-wallet" element={<CryptoWallet />} />
            <Route path="/transfer" element={<Transfer />} />

            {/* Analytics Routes */}
            <Route path="/analyst-view" element={<AnalystView />} />
            <Route path="/market-news" element={<MarketNews />} />
            <Route path="/economic-calendar" element={<PlaceholderPage title="Economic Calendar" />} />

            {/* Benefits Routes */}
            <Route path="/trading-conditions" element={<TradingConditions />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/virtual-private-server" element={<VirtualPrivateServer />} />

            {/* Other Routes */}
            <Route path="/copy-trading" element={<CopyTrading />} />
            <Route path="/support-hub" element={<SupportHub onOpenChat={() => setIsChatOpen(true)} />} />
            <Route path="/open-a-ticket" element={<OpenATicket />} />

            {/* Settings Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/security" element={<Security />} />
            <Route path="/trading-terminal-settings" element={<TradingTerminal />} />

            {/* Ticket Routes */}
            <Route path="/pa/support_hub/help_center/complaints/new/account-and-security" element={<AccountSecurity />} />
            <Route path="/pa/support_hub/help_center/complaints/new/exness-platforms" element={<ExnessPlatforms />} />
            <Route path="/pa/support_hub/help_center/complaints/new/account-verification" element={<AccountVerification />} />
            <Route path="/pa/support_hub/help_center/complaints/new/trading" element={<Trading_ />} />
            <Route path="/pa/support_hub/help_center/complaints/new/exness-programs" element={<ExnessPrograms />} />
            <Route path="/pa/support_hub/help_center/complaints/new/vps" element={<Vps />} />
            <Route path="/copy-trading/create" element={<CreateStrategy />} />
            <Route path="/copy-trading/:id" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AccountProvider>
      <Router>
        <AppContent />
      </Router>
    </AccountProvider>
  );
};

export default App