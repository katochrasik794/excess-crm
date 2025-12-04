// // src/pages/security/Security.jsx
// import React, { useMemo, useState } from "react";
// import { Eye, EyeOff, ChevronRight, ChevronDown, Check } from "lucide-react";
// import TopContainer from "../../components/TopContainer";
// import Footer from "../../components/Footer";

// /**
//  * Security.jsx
//  * - Change form renders inside the same password container (no new outer container)
//  * - TailwindCSS + lucide-react required
//  */

// export default function Security() {
//   const [changeOpen, setChangeOpen] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");
//   const [showNew, setShowNew] = useState(false);
//   const [showRepeat, setShowRepeat] = useState(false);

//   const emailMasked = "r****1@ekuali.com";

//   // validation rules
//   const rules = useMemo(() => {
//     const len = newPassword.length >= 8 && newPassword.length <= 15;
//     const upper = /[A-Z]/.test(newPassword);
//     const lower = /[a-z]/.test(newPassword);
//     const digit = /[0-9]/.test(newPassword);
//     const special = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=~`]/.test(newPassword);
//     const match = newPassword && newPassword === repeatPassword;
//     return { len, upper, lower, digit, special, match, count: newPassword.length };
//   }, [newPassword, repeatPassword]);

//   const allValid =
//     rules.len && rules.upper && rules.lower && rules.digit && rules.special && rules.match;

//   const onConfirm = () => {
//     if (!allValid) return;
//     // replace with API call
//     alert("Password changed (simulation)");
//     setNewPassword("");
//     setRepeatPassword("");
//     setChangeOpen(false);
//   };

//   const onCancel = () => {
//     setNewPassword("");
//     setRepeatPassword("");
//     setChangeOpen(false);
//   };

//   return (
//     <>
//       <TopContainer />

//       <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-10 py-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Security</h1>

//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Login details</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             Information for logging in to Exness. <br />
//             Change your password whenever you think it might have been compromised.
//           </p>

//           {/* Single bordered info box; change form will appear inside this same box */}
//           <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
//             {/* Login row */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center px-6 py-6 border-b border-gray-100">
//               <div className="md:col-span-5 text-sm text-gray-600">Login</div>
//               <div className="md:col-span-7 text-sm font-medium text-gray-900">{emailMasked}</div>
//             </div>

//             {/* Password row */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center px-6 py-6 border-b border-gray-100">
//               <div className="md:col-span-5 text-sm text-gray-600">Password</div>

//               <div className="md:col-span-4 text-sm text-gray-900 flex items-center">
//                 <div className="tracking-widest">••••••••••</div>
//               </div>

//               <div className="md:col-span-3 flex justify-start md:justify-end mt-4 md:mt-0">
//                 <button
//                   onClick={() => setChangeOpen((s) => !s)}
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   {changeOpen ? "Close" : "Change"}
//                   <span className="hidden md:inline">
//                     {changeOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//                   </span>
//                 </button>
//               </div>
//             </div>

//             {/* Inline change panel inside same container (no new outer container) */}
//             {changeOpen && (
//               // this row is still inside the same bordered box; no extra container wrapping outside the box
//               <div className="flex items-center justify-center px-6 py-6">
//                 <div className="w-full max-w-xl">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>

//                   {/* New password */}
//                   <label className="block text-sm text-gray-700 mb-2">New password</label>
//                   <div className="relative max-w-2xl">
//                     <input
//                       type={showNew ? "text" : "password"}
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                       placeholder=""
//                       maxLength={15}
//                     />
//                     <button
//                       onClick={() => setShowNew((s) => !s)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                       aria-label="Toggle show password"
//                       type="button"
//                     >
//                       {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//                     </button>
//                   </div>

//                   {/* checklist and char count */}
//                   <div className="mt-3 max-w-2xl flex items-start justify-between">
//                     <ul className="text-sm list-none space-y-2">
//                       {/* Between 8-15 characters */}
//                       <li className="flex items-start gap-3">
//                         <span className="mt-1">
//                           {rules.len ? (
//                             <Check className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
//                           )}
//                         </span>
//                         <span className={`text-sm ${rules.len ? "text-green-500" : "text-gray-700"}`}>
//                           Between 8-15 characters
//                         </span>
//                       </li>

//                       {/* At least one upper and one lower case letter */}
//                       <li className="flex items-start gap-3">
//                         <span className="mt-1">
//                           {rules.upper && rules.lower ? (
//                             <Check className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
//                           )}
//                         </span>
//                         <span className={`text-sm ${rules.upper && rules.lower ? "text-green-500" : "text-gray-700"}`}>
//                           At least one upper and one lower case letter
//                         </span>
//                       </li>

//                       {/* At least one number */}
//                       <li className="flex items-start gap-3">
//                         <span className="mt-1">
//                           {rules.digit ? (
//                             <Check className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
//                           )}
//                         </span>
//                         <span className={`text-sm ${rules.digit ? "text-green-500" : "text-gray-700"}`}>
//                           At least one number
//                         </span>
//                       </li>

//                       {/* At least one special character */}
//                       <li className="flex items-start gap-3">
//                         <span className="mt-1">
//                           {rules.special ? (
//                             <Check className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
//                           )}
//                         </span>
//                         <span className={`text-sm ${rules.special ? "text-green-500" : "text-gray-700"}`}>
//                           At least one special character
//                         </span>
//                       </li>

//                       {/* Passwords match */}
//                       <li className="flex items-start gap-3">
//                         <span className="mt-1">
//                           {rules.match ? (
//                             <Check className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
//                           )}
//                         </span>
//                         <span className={`text-sm ${rules.match ? "text-green-500" : "text-gray-700"}`}>
//                           Passwords match
//                         </span>
//                       </li>
//                     </ul>

//                     <div className="text-xs text-gray-400 pt-1">{rules.count}</div>
//                   </div>

//                   {/* Repeat new password */}
//                   <div className="mt-6 max-w-2xl">
//                     <label className="block text-sm text-gray-700 mb-2">Repeat new password</label>
//                     <div className="relative">
//                       <input
//                         type={showRepeat ? "text" : "password"}
//                         value={repeatPassword}
//                         onChange={(e) => setRepeatPassword(e.target.value)}
//                         className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                         placeholder=""
//                         maxLength={15}
//                       />
//                       <button
//                         onClick={() => setShowRepeat((s) => !s)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                         aria-label="Toggle show repeat password"
//                         type="button"
//                       >
//                         {showRepeat ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Confirm button */}
//                   <div className="mt-6 max-w-2xl">
//                     <button
//                       onClick={onConfirm}
//                       disabled={!allValid}
//                       className={`w-full px-4 py-3 rounded-md text-sm font-medium transition ${
//                         allValid
//                           ? "bg-[#ffde02] text-gray-900 hover:brightness-95"
//                           : "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
//                       }`}
//                     >
//                       Confirm
//                     </button>
//                   </div>

//                   {/* Cancel */}
//                   <div className="mt-4 max-w-2xl">
//                     <button
//                       onClick={onCancel}
//                       className="w-full px-4 py-3 rounded-md bg-gray-100 text-sm text-gray-700"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }



// src/pages/security/Security.jsx
import React, { useMemo, useState } from "react";
import { Eye, EyeOff, ChevronRight, ChevronDown, Check, LogOut, Trash2 } from "lucide-react";
import TopContainer from "../../components/TopContainer";
import Footer from "../../components/Footer";

/**
 * Security.jsx
 * - Change form renders inside the same password container (no new outer container)
 * - TailwindCSS + lucide-react required
 */

export default function Security() {
  const [changeOpen, setChangeOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  // NEW: verification method panel state
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(""); // 'email' | 'phone' | 'app' | 'push' | 'cant-access'

  const emailMasked = "r****1@ekuali.com";

  // validation rules
  const rules = useMemo(() => {
    const len = newPassword.length >= 8 && newPassword.length <= 15;
    const upper = /[A-Z]/.test(newPassword);
    const lower = /[a-z]/.test(newPassword);
    const digit = /[0-9]/.test(newPassword);
    const special = /[^A-Za-z0-9]/.test(newPassword);
    const match = newPassword && newPassword === repeatPassword;
    return { len, upper, lower, digit, special, match, count: newPassword.length };
  }, [newPassword, repeatPassword]);

  const allValid =
    rules.len && rules.upper && rules.lower && rules.digit && rules.special && rules.match;

  const onConfirm = () => {
    if (!allValid) return;
    // replace with API call
    alert("Password changed (simulation)");
    setNewPassword("");
    setRepeatPassword("");
    setChangeOpen(false);
  };

  const onCancel = () => {
    setNewPassword("");
    setRepeatPassword("");
    setChangeOpen(false);
  };

  // NEW: verification handlers
  const onVerificationNext = () => {
    if (!selectedMethod) return;
    // simulate action
    alert(`Selected verification method: ${selectedMethod}`);
    setVerificationOpen(false);
    setSelectedMethod("");
  };

  const onVerificationCancel = () => {
    setSelectedMethod("");
    setVerificationOpen(false);
  };

  return (
    <>
      <TopContainer />

      <div className="bg-white px-4 sm:px-8 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">Security</h1>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Login details</h2>
          <p className="text-sm text-gray-600 mb-6">
            Information for logging in to Exness. <br />
            Change your password whenever you think it might have been compromised.
          </p>

          {/* Single bordered info box; change form will appear inside this same box */}
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            {/* Login row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center px-6 py-6 border-b border-gray-100">
              <div className="md:col-span-5 text-sm text-gray-600">Login</div>
              <div className="md:col-span-7 text-sm font-medium text-gray-900">{emailMasked}</div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center px-6 py-6 border-b border-gray-100">
              <div className="md:col-span-5 text-sm text-gray-600">Password</div>

              <div className="md:col-span-4 text-sm text-gray-900 flex items-center">
                <div className="tracking-widest">••••••••••</div>
              </div>

              <div className="md:col-span-3 flex justify-start md:justify-end mt-4 md:mt-0">
                <button
                  onClick={() => setChangeOpen((s) => !s)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {changeOpen ? "Close" : "Change"}
                  <span className="hidden md:inline">
                    {changeOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                </button>
              </div>
            </div>

            

            {/* Inline change panel inside same container (existing Password change) */}
            {changeOpen && (
              // this row is still inside the same bordered box; no extra container wrapping outside the box
              <div className="flex items-center justify-center px-6 py-6">
                <div className="w-full max-w-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>

                  {/* New password */}
                  <label className="block text-sm text-gray-700 mb-2">New password</label>
                  <div className="relative max-w-2xl">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder=""
                      maxLength={15}
                    />
                    <button
                      onClick={() => setShowNew((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="Toggle show password"
                      type="button"
                    >
                      {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* checklist and char count */}
                  <div className="mt-3 max-w-2xl flex items-start justify-between">
                    <ul className="text-sm list-none space-y-2">
                      {/* Between 8-15 characters */}
                      <li className="flex items-start gap-3">
                        <span className="mt-1">
                          {rules.len ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </span>
                        <span className={`text-sm ${rules.len ? "text-green-500" : "text-gray-700"}`}>
                          Between 8-15 characters
                        </span>
                      </li>

                      {/* At least one upper and one lower case letter */}
                      <li className="flex items-start gap-3">
                        <span className="mt-1">
                          {rules.upper && rules.lower ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </span>
                        <span className={`text-sm ${rules.upper && rules.lower ? "text-green-500" : "text-gray-700"}`}>
                          At least one upper and one lower case letter
                        </span>
                      </li>

                      {/* At least one number */}
                      <li className="flex items-start gap-3">
                        <span className="mt-1">
                          {rules.digit ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </span>
                        <span className={`text-sm ${rules.digit ? "text-green-500" : "text-gray-700"}`}>
                          At least one number
                        </span>
                      </li>

                      {/* At least one special character */}
                      <li className="flex items-start gap-3">
                        <span className="mt-1">
                          {rules.special ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </span>
                        <span className={`text-sm ${rules.special ? "text-green-500" : "text-gray-700"}`}>
                          At least one special character
                        </span>
                      </li>

                      {/* Passwords match */}
                      <li className="flex items-start gap-3">
                        <span className="mt-1">
                          {rules.match ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          )}
                        </span>
                        <span className={`text-sm ${rules.match ? "text-green-500" : "text-gray-700"}`}>
                          Passwords match
                        </span>
                      </li>
                    </ul>

                    <div className="text-xs text-gray-400 pt-1">{rules.count}</div>
                  </div>

                  {/* Repeat new password */}
                  <div className="mt-6 max-w-2xl">
                    <label className="block text-sm text-gray-700 mb-2">Repeat new password</label>
                    <div className="relative">
                      <input
                        type={showRepeat ? "text" : "password"}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder=""
                        maxLength={15}
                      />
                      <button
                        onClick={() => setShowRepeat((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-label="Toggle show repeat password"
                        type="button"
                      >
                        {showRepeat ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <div className="mt-6 max-w-2xl">
                    <button
                      onClick={onConfirm}
                      disabled={!allValid}
                      className={`w-full px-4 py-3 rounded-md text-sm font-medium transition ${
                        allValid
                          ? "bg-[#ffde02] text-gray-900 hover:brightness-95"
                          : "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      Confirm
                    </button>
                  </div>

                  {/* Cancel */}
                  <div className="mt-4 max-w-2xl">
                    <button
                      onClick={onCancel}
                      className="w-full px-4 py-3 rounded-md bg-gray-100 text-sm text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

<div className="py-4 md:py-8">
                <h2 className="text-xl md:text-2xl  text-gray-900 mb-4 font-semibold">2-step verification</h2>
          <p className="text-sm text-gray-600">
            2 ensures that all sensitive transactions are authorized by you. <br />
We encourage you to enter verification codes to confirm these transactions.
          </p>
            </div>

          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            
            
            {/* NEW: Verification method row (placed below Password row) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center px-6 py-6 border-b border-gray-100">
              <div className="md:col-span-5 text-sm text-gray-600">Verification method</div>

              <div className="md:col-span-4 text-sm text-gray-900 flex items-center">
                <div className="font-medium">{emailMasked}</div>
              </div>

              <div className="md:col-span-3 flex justify-start md:justify-end mt-4 md:mt-0">
                <button
                  onClick={() => setVerificationOpen((s) => !s)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {verificationOpen ? "Close" : "Change"}
                  <span className="hidden md:inline">
                    {verificationOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                </button>
              </div>
            </div>

            {/* Inline change panel for Verification method */}
            {verificationOpen && (
              <div className="px-6 py-6 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change 2-Step verification</h3>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="space-y-4">
                      <label className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="vmethod"
                          value="email"
                          checked={selectedMethod === "email"}
                          onChange={() => setSelectedMethod("email")}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium">Email</div>
                          <div className="text-xs text-gray-500">{emailMasked}</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="vmethod"
                          value="phone"
                          checked={selectedMethod === "phone"}
                          onChange={() => setSelectedMethod("phone")}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium">New phone number</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="vmethod"
                          value="app"
                          checked={selectedMethod === "app"}
                          onChange={() => setSelectedMethod("app")}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium">Authentication app</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="vmethod"
                          value="push"
                          checked={selectedMethod === "push"}
                          onChange={() => setSelectedMethod("push")}
                          className="mt-1"
                        />
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm font-medium">Push notifications</div>
                          </div>
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Recommended</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="vmethod"
                          value="cant-access"
                          checked={selectedMethod === "cant-access"}
                          onChange={() => setSelectedMethod("cant-access")}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium">I can't access my device</div>
                        </div>
                      </label>
                    </fieldset>

                    <div className="mt-6 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={onVerificationNext}
                        disabled={!selectedMethod}
                        className={`w-full px-4 py-3 rounded-md text-sm font-medium transition ${
                          selectedMethod
                            ? "bg-[#ffde02] text-gray-900 hover:brightness-95"
                            : "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>

                      <button
                        type="button"
                        onClick={onVerificationCancel}
                        className="w-full px-4 py-3 rounded-md bg-gray-100 text-sm text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <section className="py-4 md:py-8 lg:py-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Device &amp; account security</h2>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-b border-gray-100">
          <div className="text-sm text-gray-700">
            Log out from all other devices except this one to secure your account.
          </div>

          <div className="mt-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-50 border border-red-100 text-red-700 hover:bg-red-100 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Log out from other devices</span>
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6">
          <div className="text-sm text-gray-700">
            This action cannot be reversed.
          </div>

          <div className="mt-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-50 border border-red-100 text-red-700 hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Terminate Exness Personal Area</span>
            </button>
          </div>
        </div>
      </div>
    </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
