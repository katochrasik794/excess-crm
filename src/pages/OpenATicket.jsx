import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopContainer from '../components/TopContainer';
import Footer from '../components/Footer';

const OpenATicket = () => {
  const navigate = useNavigate();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const ticketCategories = [
    {
      id: 'Payments',
      title: 'Payments',
      description: 'Deposit/Withdrawal issues, Internal transfer problem, Non-supported token/blockchain, Other.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path>
          <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path>
          <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path>
          <path d="M3 6v10c0 .888 .772 1.45 2 2"></path>
          <path d="M3 11c0 .888 .772 1.45 2 2"></path>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/payments'
    },
    {
      id: 'Account and Security',
      title: 'Account and Security',
      description: 'Change personal information, Change security type, Account access issue, Regulation & Legal, SMS & Emails, More.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/account-and-security'
    },
    {
      id: 'Exness Platforms',
      title: 'Exness platforms',
      description: 'Exness Terminal and Trade app, MetaTrader platforms, Portfolio investment management, Social trading.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/exness-platforms'
    },
    {
      id: 'Account Verification',
      title: 'Account verification',
      description: 'Invalid proof of identity document, Invalid proof of residence document, Other.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.3335 11.333V7.99967C5.3335 6.52692 6.5274 5.33301 8.00016 5.33301H11.3335M5.3335 20.6663V23.9997C5.3335 25.4724 6.5274 26.6663 8.00016 26.6663H11.3335M26.6668 11.333V7.99967C26.6668 6.52692 25.4729 5.33301 24.0002 5.33301H20.6669M26.6668 20.6663V23.9997C26.6668 25.4724 25.4729 26.6663 24.0002 26.6663H20.6669M20.0002 21.9997V21.333C20.0002 19.8602 18.8063 18.6663 17.3335 18.6663H14.6668C13.1941 18.6663 12.0002 19.8602 12.0002 21.333V21.9997M18.6668 11.9997C18.6668 13.4724 17.4729 14.6663 16.0002 14.6663C14.5274 14.6663 13.3335 13.4724 13.3335 11.9997C13.3335 10.5269 14.5274 9.33301 16.0002 9.33301C17.4729 9.33301 18.6668 10.5269 18.6668 11.9997Z" stroke="currentColor" strokeWidth="2.33" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/account-verification'
    },
    {
      id: 'Trading',
      title: 'Trading',
      description: 'MT4/5 Connection issues, Execution and slippage complaints, Wrong charges, Swap, Stop Out, Pricing issues.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.3335 5.33301V9.33301M9.3335 17.333V26.6663M22.6668 5.33301V9.33301M22.6668 22.6663V26.6663M5.3335 10.6663C5.3335 10.3127 5.47397 9.97358 5.72402 9.72353C5.97407 9.47348 6.31321 9.33301 6.66683 9.33301H12.0002C12.3538 9.33301 12.6929 9.47348 12.943 9.72353C13.193 9.97358 13.3335 10.3127 13.3335 10.6663V15.9997C13.3335 16.3533 13.193 16.6924 12.943 16.9425C12.6929 17.1925 12.3538 17.333 12.0002 17.333H6.66683C6.31321 17.333 5.97407 17.1925 5.72402 16.9425C5.47397 16.6924 5.3335 16.3533 5.3335 15.9997V10.6663ZM18.6668 10.6663C18.6668 10.3127 18.8073 9.97358 19.0574 9.72353C19.3074 9.47348 19.6465 9.33301 20.0002 9.33301H25.3335C25.6871 9.33301 26.0263 9.47348 26.2763 9.72353C26.5264 9.97358 26.6668 10.3127 26.6668 10.6663V21.333C26.6668 21.6866 26.5264 22.0258 26.2763 22.2758C26.0263 22.5259 25.6871 22.6663 25.3335 22.6663H20.0002C19.6465 22.6663 19.3074 22.5259 19.0574 22.2758C18.8073 22.0258 18.6668 21.6866 18.6668 21.333V10.6663Z" stroke="currentColor" strokeWidth="2.33" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/trading'
    },
    {
      id: 'Exness Programs',
      title: 'Exness programs',
      description: 'Premier and Partnership membership, Benefits, Digital Affiliates, General inquiries, Reward inquiries, Other.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"></path>
          <path d="M12 8l0 13"></path>
          <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"></path>
          <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5"></path>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/exness-programs'
    },
    {
      id: 'VPS',
      title: 'VPS',
      description: 'Terminal updates, High ping issue, Password issue, Unable to login, Software/language installation, Other.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.9996 16V6.94998C27.9996 5.31998 26.6802 4 25.0509 4H6.94873C5.31943 4 4 5.31998 4 6.94998V16M27.9996 16H4M27.9996 16L28 25.05C28 26.68 26.68 28 25.05 28H6.95C5.32 28 4 26.68 4 25.05V16M18 9.33333H22M18 21.3333H22" stroke="currentColor" strokeWidth="2.33" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: '/pa/support_hub/help_center/complaints/new/vps'
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.id === 'Payments') {
      setShowPaymentPopup(true);
    } else {
      navigate(category.link);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePopupContinue = () => {
    navigate('/transaction-history');
    setShowPaymentPopup(false);
  };

  return (
    <>
    <TopContainer />
    <div data-testid="request_issue" className="px-4 py-6 sm:px-6 md:px-8 lg:px-10 w-full max-w-7xl mx-auto
     relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-semibold mb-2 text-black">
          Open a ticket
        </h1>
        <p className="text-sm sm:text-[15px] text-gray-500 leading-relaxed">
          Please select a topic for your inquiry so we can assist you better:
        </p>
      </div>

      {/* Issues Grid */}
      <div 
        data-testid="issues"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
      >
        {ticketCategories.map((category) => (
          <div
            key={category.id}
            data-testid={`list_item-${category.id}`}
            onClick={() => handleCategoryClick(category)}
            className="group bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {/* Icon */}
            <div className={`text-black mb-4 ${category.id === 'Payments' ? '' : ''}`}>
              {category.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 text-black">
              {category.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-gray-500 leading-normal">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={handleBack}
          data-testid="request_issue_footer-back"
          className="px-6 py-2 rounded-lg border border-gray-300 text-black text-[15px] font-medium hover:bg-gray-50 hover:border-[#FFD100] transition-colors bg-white select-none"
        >
          Back
        </button>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setShowPaymentPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Popup Content */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-8">
              Go to Transaction History
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              For assistance on your transactions press continue button, 
              open the transaction and select "support request".
            </p>
            
            <div className="flex justify-end">
              <button
                onClick={handlePopupContinue}
                className="bg-[#FFD100] hover:bg-[#ffdb4d] text-black font-medium text-[15px] px-6 py-2.5 rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
    
  );
};

export default OpenATicket;
