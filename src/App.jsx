import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccountProvider } from './context/AccountContext'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
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

// Simple placeholder component for routes without pages yet
const PlaceholderPage = ({ title }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600">This page is under development.</p>
  </div>
);

const App = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <AccountProvider>
      <Router>
      <div className="h-screen flex flex-col">
        <div className="border-b border-gray-300">
          <Topbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="content flex flex-1 overflow-hidden">
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
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
              <Route path="/analyst-view" element={<PlaceholderPage title="Analyst View" />} />
              <Route path="/market-news" element={<PlaceholderPage title="Market News" />} />
              <Route path="/economic-calendar" element={<PlaceholderPage title="Economic Calendar" />} />
              
              {/* Benefits Routes */}
              <Route path="/trading-conditions" element={<PlaceholderPage title="Trading Conditions" />} />
              <Route path="/savings" element={<PlaceholderPage title="Savings" />} />
              <Route path="/virtual-private-server" element={<PlaceholderPage title="Virtual Private Server" />} />
              
              {/* Other Routes */}
              <Route path="/copy-trading" element={<PlaceholderPage title="Copy Trading" />} />
              <Route path="/support-hub" element={<PlaceholderPage title="Support Hub" />} />
              
              {/* Settings Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/security" element={<Security />} />
              <Route path="/trading-terminal-settings" element={<PlaceholderPage title="Trading Terminal Settings" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
    </AccountProvider>
  )
}

export default App