import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import ExnessTerminal from './pages/Trading/ExnessTerminal'
import MyAccount from './pages/Trading/MyAccount'
import OpenAccount from './pages/Trading/OpenAccount'
import Deposit from './pages/Payments/Deposit'
import Withdraw from './pages/Payments/Withdraw'
import Performance from './pages/Trading/Performance'
import HistoryOfOrders from './pages/Trading/HistoryOfOrders'
import SetUpAccount from './pages/Trading/SetUpAccount'

const App = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <div className="border-b border-gray-300">
          <Topbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="content flex h-[92%]">
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<MyAccount />} />
              <Route path="/open-account" element={<OpenAccount />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/exness-terminal" element={<ExnessTerminal />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/history-of-orders" element={<HistoryOfOrders />} />
              <Route path="/set-up-account" element={<SetUpAccount />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App