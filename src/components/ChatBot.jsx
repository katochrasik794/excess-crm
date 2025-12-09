import React from 'react';

const ChatBot = ({ isOpen, onToggle }) => {
  const BotAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-[#ffde02] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#141d22]">
           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#ffde02"/>
           <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
           <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end pointer-events-none">
      {/* Chat Window - visible on all screens when open */}
      {isOpen && (
        <div className="pointer-events-auto w-[380px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] bg-white rounded-xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-200">
           {/* Header */}
           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-[16px] text-gray-900">Exness Assistant</h3>
             <div className="flex items-center gap-2">
               <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                 </svg>
               </button>
               <button onClick={onToggle} className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
               </button>
             </div>
           </div>

           {/* Chat Content */}
           <div className="flex-1 overflow-y-auto p-4 bg-white scrollbar-thin scrollbar-thumb-gray-200">
              
              {/* Message 1 */}
              <div className="flex gap-3 mb-6">
                <BotAvatar />
                <div className="max-w-[80%]">
                   <div className="bg-[#f4f5f7] p-3 rounded-2xl rounded-tl-none text-[14px] text-gray-800 leading-relaxed">
                     Welcome back 👋 What would you like help with today?
                   </div>
                   <div className="text-[11px] text-gray-400 mt-1 ml-1">Bot • 20:34</div>
                </div>
              </div>

               {/* Separator Date */}
               <div className="flex items-center justify-center mb-6">
                 <span className="text-[12px] text-gray-400">Today</span>
               </div>
               
               {/* Message 2 */}
              <div className="flex gap-3 mb-6">
                <BotAvatar />
                <div className="max-w-[80%]">
                   <div className="bg-[#f4f5f7] p-3 rounded-2xl rounded-tl-none text-[14px] text-gray-800 leading-relaxed">
                     Welcome back 👋 What would you like help with today?
                   </div>
                   <div className="text-[11px] text-gray-400 mt-1 ml-1">Bot • 12:28</div>
                </div>
              </div>

              {/* Chat Started Separator */}
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-[12px] text-gray-400">Chat started at 14:37</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>
              
              <div className="text-center px-8 mb-6">
                <p className="text-[12px] text-gray-400 text-center leading-normal">
                    Please note that the assistant will not remember past chats
                </p>
              </div>

              {/* New Message Separator */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] bg-gray-300 flex-1"></div>
                <span className="text-[13px] text-[#141d22]">New message(s)</span>
                <div className="h-[1px] bg-gray-300 flex-1"></div>
              </div>

              {/* Message 3 (New) */}
              <div className="flex gap-3 mb-4">
                <BotAvatar />
                <div className="max-w-[80%]">
                   <div className="bg-[#f4f5f7] p-3 rounded-2xl rounded-tl-none text-[14px] text-gray-800 leading-relaxed">
                     Welcome back 👋 What would you like help with today?
                   </div>
                   <div className="text-[11px] text-gray-400 mt-1 ml-1">Bot • 14:37</div>
                </div>
              </div>

           </div>
           
           {/* Footer input */}
           <div className="p-4 border-t border-gray-100 bg-white">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Type your message"
                 className="w-full pl-4 pr-16 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#ffde02] focus:ring-1 focus:ring-[#ffde02] text-[14px] placeholder-gray-400 transition-shadow"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <span className="text-[11px] text-gray-400">0/400</span>
                 <button className="text-gray-400 hover:text-[#141d22] transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                   </svg>
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Toggle Button - only visible on desktop (lg and up) */}
      <div className="hidden lg:inline-flex relative pointer-events-auto">
        <button 
          onClick={onToggle}
          className="w-14 h-14 bg-[#ffde02] hover:bg-[#FFDB4D] rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-50"
          aria-label={isOpen ? "Close chat" : "Chat with support"}
        >
          {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#141d22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
             </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#141d22" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
              <path d="M12 11l0 .01"></path>
              <path d="M8 11l0 .01"></path>
              <path d="M16 11l0 .01"></path>
            </svg>
          )}
        </button>
        {/* Badge (only show when closed) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white z-50 pointer-events-none">
            1
          </span>
        )}
      </div>
    </div>
  );
};


export default ChatBot;
