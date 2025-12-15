import { useState } from "react";
import { X, Mail, FileText, Smartphone, Lock, User } from "lucide-react";
import { FiUser } from "react-icons/fi";

// A helper component for each step's structure
const Step = ({ number, title, features, isActive = false }) => (
  <div className="relative flex">
    {/* Step Number and Connector Line */}
    <div className="flex flex-col items-center mr-4">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          isActive ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        {number}
      </div>
      {/* Vertical line connecting steps (only for steps 1 and 2) */}
      {number < 3 && (
        <div className="flex-grow w-px bg-gray-300 ml-3.5 mt-1"></div>
      )}
    </div>

    {/* Step Content */}
    <div className="flex-1 pb-8">
      <h4
        className={`text-base font-semibold ${
          isActive ? "text-gray-900" : "text-gray-300"
        }`}
      >
        {title}
      </h4>
      <div className="text-sm text-gray-600 mt-1">
        <div className="font-medium text-gray-300 mb-1">Features and Limits</div>
        <ul className="list-disc ml-5 space-y-1">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/**
 * Verification Steps Modal
 */
const VerificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 backdrop-blur  z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
              Verification steps
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              This will take about 10 minutes
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-8 h-6" />
          </button>
        </div>

        {/* Body (Steps) */}
        <div className="px-6 py-2 space-y-1 overflow-y-auto">
          <Step
            number={1}
            title="Confirm email and phone number"
            features={["Withdrawals"]}
            isActive={true}
          />
          <Step
            number={2}
            title="Verify your identity"
            features={[
              "Deposits up to 10,000 USD",
              "Global and local payment methods",
              "Bank card and crypto payments",
              "Trading",
            ]}
          />
          <Step
            number={3}
            title="Verify residential address"
            features={["Unlimited deposits"]}
          />
        </div>

        {/* Footer (Action Button) */}
        <div className="p-4 flex justify-end">
          <button className="bg-[#ffde02] text-gray-900 px-6 py-2 rounded-sm text-base text-md hover:bg-yellow-500 transition-colors">
            Start now
          </button>
        </div>
      </div>
    </div>
  );
};

// A helper component for each step's structure
const ProfileStep = ({ Icon, title, description, isActive = false }) => (
  <div className="flex space-x-4 items-start pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
    <div
      className={`p-2 rounded-lg ${
        isActive ? "text-gray-500" : " text-gray-500"
      }`}
    >
      <Icon className="w-7 h-7" />
    </div>
    <div className="flex-1">
      <h4
        className={`text-base  ${
          isActive ? "text-gray-900" : "text-gray-700"
        }`}
      >
        {title}
      </h4>
      <p
        className={`text-sm ${
          isActive ? "text-gray-600" : "text-gray-500"
        } mt-0.5`}
      >
        {description}
      </p>
    </div>
  </div>
);

const ContactVerificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 backdrop-blur z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-start border-b border-gray-100">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold  text-gray-900">
              Verify your contact details
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              This process takes less than 5 minutes
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Steps) */}
        <div className="p-6 space-y-2 overflow-y-auto">
          <ProfileStep
            Icon={Mail}
            title="1. Confirm email address"
            description="ro-----81@ekuali.com" // Mock email address
            isActive={true}
          />
          <ProfileStep
            Icon={FileText}
            title="2. Add profile information"
            description="Get a more tailored experience"
          />
          <ProfileStep
            Icon={Smartphone}
            title="3. Confirm phone number"
            description="Make your account more secure"
          />
        </div>

        {/* Footer (Actions and Security Note) */}
        <div className="p-6 pt-4 flex flex-col items-center">
          <div className="flex space-x-3 w-full justify-end">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-sm text-sm hover:bg-gray-300 transition-colors"
            >
              Do it later
            </button>
            <button className="bg-[#ffde02] text-gray-900 px-6 py-2 rounded-sm text-sm hover:bg-yellow-500 transition-colors">
              Get started now
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Lock className="w-3 h-3 mr-1" />
            All data is encrypted for security
          </div>
        </div>
      </div>
    </div>
  );
};

const TopContainer = () => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div>
      {/* 1. Top Alert/Header Banner */}
      <div className="bg-[#fff9eb] py-5 mb-4 flex justify-center">
  <div className="w-full max-w-7xl px-2 md:px-8 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center flex-wrap gap-y-4">

    {/* LEFT SIDE: USER ICON + MESSAGE */}
    <div className="flex items-center gap-6 mb-3 lg:mb-0">
      <div className="">
        <FiUser className="w-8 h-8 px-1 py-1 md:w-10 md:h-10 text-gray-700 rounded-full border-4 border-gray-200" />
      </div>

      <p className="text-sm md:text-md font-medium text-gray-800">
        Hello. Fill in your account details to make your first deposit
      </p>
    </div>

    {/* RIGHT SIDE: BUTTONS */}
    <div className="flex space-x-3">
      <button
        onClick={() => setIsVerificationModalOpen(true)}
        className="text-sm font-medium text-gray-900 hover:underline bg-[#d5d7d966] px-3 py-2 rounded-sm"
      >
        Learn more
      </button>

      <button
        onClick={() => setIsProfileModalOpen(true)}
        className="bg-[#ffde02] text-gray-900 px-4 py-2 rounded-sm text-sm hover:bg-yellow-500 transition-colors"
      >
        Complete profile
      </button>
    </div>

  </div>
</div>


      {/* 6. Modals */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
      <ContactVerificationModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default TopContainer;
