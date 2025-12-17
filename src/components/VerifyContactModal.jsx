import React from 'react';

// --- Icon Components (Lucide-style SVGs) ---
const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ClipboardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// --- Step Item Component ---
const VerificationStep = ({ icon, step, title, subtitle }) => (
  <div className="flex items-start py-5 border-b border-gray-100 last:border-b-0">
    <div className="flex-shrink-0 mr-4 mt-1">
      {React.cloneElement(icon, { className: 'w-6 h-6 text-gray-400' })}
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-0.5">
        <span className="text-lg font-bold mr-2 text-gray-800">{step}.</span> {title}
      </h3>
      <p className="text-sm text-gray-600">
        {subtitle}
      </p>
    </div>
  </div>
);

// Main component must be named 'App' for the environment to run correctly
const VerifyContactModal = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-xl mx-auto rounded-xl shadow-2xl transform transition-transform duration-300 scale-100">
        
        {/* Header */}
        <header className="p-6 border-b border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
            Verify your contact details
          </h2>
          <p className="text-base text-gray-500">
            This process takes less than 5 minutes
          </p>
        </header>

        {/* Body / Steps */}
        <div className="px-6">
          
          <div className="">
            
            <VerificationStep
              icon={<MailIcon />}
              step={1}
              title="Confirm email address"
              subtitle="ro******81@ekuali.com"
            />
            
            <VerificationStep
              icon={<ClipboardIcon />}
              step={2}
              title="Add profile information"
              subtitle="Get a more tailored experience"
            />
            
            <VerificationStep
              icon={<PhoneIcon />}
              step={3}
              title="Confirm phone number"
              subtitle="Make your account more secure"
            />
            
          </div>

        </div>

        {/* Footer / Actions */}
        <footer className="px-6 py-3">
          <div className="space-y-4">
            {/* Primary Button */}
            <button
              onClick={onClose}
              className="w-full py-[6px] bg-[#ffde02] text-gray-900 font-semibold text-md rounded-sm shadow-lg hover:bg-yellow-300/80 transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 cursor-pointer"
            >
              Get started now
            </button>

            {/* Secondary Button */}
            <button
              onClick={onClose}
              className="w-full py-[6px] bg-gray-100 text-gray-700 font-semibold text-md rounded-sm hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
            >
              Do it later
            </button>
          </div>

          {/* Security Text */}
          <p className="mt-6 flex items-center justify-center text-xs text-gray-500">
            <LockIcon className="w-4 h-4 mr-1.5 text-gray-400" />
            All data is encrypted for security
          </p>
        </footer>
        
      </div>
    </div>
  );
};

export default VerifyContactModal;