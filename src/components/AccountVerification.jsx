import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopContainer from './TopContainer';
import Footer from './Footer';

const AccountVerification = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('');

  const issueGroups = [
    {
      title: 'Document verification issue',
      options: [
        { id: 'invalid-poi', label: 'Invalid proof of identity document' },
        { id: 'invalid-por', label: 'Invalid proof of residence document' },
        { id: 'other', label: 'Other' },
      ]
    },
  ];

  const handleIssueChange = (id) => {
    setSelectedIssue(id);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedIssue) {
      console.log('Selected Issue:', selectedIssue);
      // Navigate to next step or handle submission
    }
  };

  return (
    <>
    <TopContainer />
    <h1 className="text-[32px] font-bold text-[#141d22] mb-2 px-4 md:px-8 lg:px-10">
          Please select the ticket category
        </h1>
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-6 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-10">
      {/* Left Side - Form */}
      <div className="flex-1">
        

        {/* Horizontal Stepper (Mobile/Tablet) */}
        <div className="lg:hidden mb-8 px-4">
          <div className="flex items-center w-full mx-auto">
            {/* Step 1 */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#8b9194] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2" />
            
            {/* Step 2 */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#141d22] flex items-center justify-center text-white text-[14px] font-bold">
              2
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2" />
            
            {/* Step 3 */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[14px] font-bold">
              3
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2" />

            {/* Step 4 */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[14px] font-bold">
              4
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {issueGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="text-[16px] font-semibold text-[#141d22] mb-4">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.options.map((option) => (
                  <label 
                    key={option.id} 
                    className="flex items-center cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                      <input 
                        type="radio"
                        name="issue"
                        value={option.id}
                        checked={selectedIssue === option.id}
                        onChange={() => handleIssueChange(option.id)}
                        className="peer appearance-none w-5 h-5 border-[2px] border-gray-300 rounded-full checked:border-[#141d22] checked:border-[6px] transition-all duration-200"
                      />
                    </div>
                    <span className="text-[15px] text-[#141d22] hover:text-black">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 mt-12 mb-8">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#141d22] text-[15px] font-medium transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedIssue}
            className={`px-6 py-2.5 rounded-lg text-[#141d22] text-[15px] font-medium transition-colors ${
              selectedIssue 
                ? 'bg-[#ffde02] hover:bg-[#FFDB4D] cursor-pointer' 
                : 'bg-[#ffde02] hover:bg-[#FFDB4D] cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Side - Stepper */}
      <div className="hidden lg:block w-[300px] pt-4">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gray-200" style={{ height: 'calc(100% - 32px)' }}></div>

          <div className="space-y-8 relative">
            {/* Step 1: Category - Completed */}
            <div className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#8b9194] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex-1 pt-[2px]">
                <div className="text-[15px] font-semibold text-[#141d22] leading-none mb-1">
                  Category
                </div>
                <div className="text-[13px] text-gray-500">
                  Account verification
                </div>
              </div>
            </div>

            {/* Step 2: Subcategory - Active */}
            <div className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#141d22] flex items-center justify-center text-white text-[13px] font-bold">
                2
              </div>
              <div className="flex-1 pt-[2px]">
                <div className="text-[15px] font-bold text-[#141d22] leading-none">
                  Subcategory
                </div>
              </div>
            </div>

            {/* Step 3: Specific issue - Inactive */}
            <div className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[13px] font-bold">
                3
              </div>
              <div className="flex-1 pt-[2px]">
                <div className="text-[15px] font-medium text-gray-400 leading-none">
                  Specific issue
                </div>
              </div>
            </div>

            {/* Step 4: Summary - Inactive */}
            <div className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[13px] font-bold">
                4
              </div>
              <div className="flex-1 pt-[2px]">
                <div className="text-[15px] font-medium text-gray-400 leading-none">
                  Summary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AccountVerification;
