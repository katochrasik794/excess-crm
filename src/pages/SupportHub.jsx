import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MessageSquarePlus, Phone, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';
import TopContainer from '../components/TopContainer';

const SupportHub = ({ onOpenChat }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const dropdownRef = useRef(null);

  const statuses = [
    'All',
    'New',
    'Under Review',
    'Action Required',
    'Escalated',
    'Reopened',
    'Solution Provided',
    'Closed'
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <TopContainer />
    <div className='bg-white'>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-8">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Support hub</h1>

      {/* Help Center Section */}
      <div className="space-y-4">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-700">Help center</h3>
        
        <div className="space-y-4 bg-[#f3f5f7] p-6 rounded-md ">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">How can we help you?</h2>
            <p className="text-gray-600">
              Your one-stop solution for all your needs. Find answers, troubleshoot issues, and explore guides.
            </p>
          </div>

          <div className="relative w-full bg-white max-w-5xl">
            <input
              type="text"
              placeholder="Please enter your question or keyword..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#ffde02] text-gray-900 rounded-md hover:bg-blue-700 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Contact us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Need Assistance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("https://my.exness.com/mfp/support_hub/images/contact-assistance.webp")' }}></div>
            <div className="p-5 flex flex-col flex-1 space-y-4">
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-bold text-gray-900">Need assistance?</h4>
                <p className="text-gray-600 text-sm">Complete the form and we will get back to you shortly.</p>
              </div>
              <button onClick={() => navigate('/open-a-ticket')} className="w-[170px] flex items-center justify-center gap-2 bg-[#ffde02] text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-300/80 transition-colors font-medium">
                <Plus size={18} />
                Open a ticket
              </button>
            </div>
          </div>

          {/* Card 2: Live Chat */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("https://my.exness.com/mfp/support_hub/images/contact-chat.webp")' }}></div>
            <div className="p-5 flex flex-col flex-1 space-y-4">
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-bold text-gray-900">Live chat</h4>
                <p className="text-gray-600 text-sm">Can't find the answers you're looking for? Chat with our Intelligent Assistant.</p>
              </div>
              <button 
                onClick={onOpenChat}
                className="w-[150px] flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                <MessageSquarePlus size={18} />
                Start chat
              </button>
            </div>
          </div>

          {/* Card 3: Phone Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("https://my.exness.com/mfp/support_hub/images/contact-help.webp")' }}></div>
            <div className="p-5 flex flex-col flex-1 space-y-4">
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-bold text-gray-900">Still need help?</h4>
                <p className="text-gray-600 text-sm">To speak with our support team, call us at</p>
                <a href="tel:+35725008105" className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                  <Phone size={18} />
                  +35725008105
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Tickets Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My tickets</h2>
        
        <div className="space-y-4 rounded-lg border border-dashed border-gray-500 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Filter Chip */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer select-none bg-white"
              >
                <span>Active statuses: {selectedStatus}</span>
                {isDropdownOpen ? (
                  <ChevronUp size={14} className="text-gray-500" />
                ) : (
                  <ChevronDown size={14} className="text-gray-500" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 ${
                        selectedStatus === status ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center p-12  text-center">
            <div className="bg-gray-100 p-3 rounded-full mb-3">
              <AlertCircle className="text-gray-400 w-10 h-10" />
            </div>
            <p className="text-gray-900 text-lg md:text-2xl font-medium">You don't have any tickets</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <Footer />
    </>
    
  );
};

export default SupportHub;
