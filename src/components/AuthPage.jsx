import { useState } from "react";
import { Eye, EyeOff, Mail, Check } from "lucide-react";
import Footer from "./Footer";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");

  // Password validation checks
  const hasLength = signupPassword.length >= 8 && signupPassword.length <= 15;
  const hasUpperLower =
    /[A-Z]/.test(signupPassword) && /[a-z]/.test(signupPassword);
  const hasNumber = /\d/.test(signupPassword);
  const hasSpecial =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(signupPassword);

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md pt-4 md:pt-12 lg:pt-16 py-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-8">
          Welcome to FinCRM
        </h1>

        {/* ================= RESET PASSWORD ================= */}
        {forgotPassword ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">
              Reset password
            </h2>

            <div>
              <label className="block text-sm mb-1">
                Your email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-1.5 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Mail className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button className="w-full bg-[#ffde02] hover:bg-yellow-300/80 text-black font-medium py-1.5 rounded-md cursor-pointer">
              Continue
            </button>

            <div className="text-center">
              <button
                onClick={() => setForgotPassword(false)}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
              >
                Sign In now
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab("signin")}
                className={`flex-1 py-3 text-sm font-medium cursor-pointer ${
                  activeTab === "signin"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                Sign in
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-3 text-sm font-medium cursor-pointer ${
                  activeTab === "signup"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                Create an account
              </button>
            </div>

            {/* ================= SIGN IN ================= */}
            {activeTab === "signin" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">
                    Your email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-4 py-1.5 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <Mail className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full border rounded-md px-4 py-1.5 border-gray-300 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button className="w-full bg-[#ffde02] hover:bg-yellow-300/80 text-black font-medium py-1.5 rounded-md cursor-pointer">
                  Sign in
                </button>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex-1 h-px bg-gray-300" />
                  Or sign in with
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                <button className="w-full border rounded-md py-1.5 border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setForgotPassword(true)}
                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                  >
                    I forgot my password
                  </button>
                </div>
              </div>
            )}

            {/* ================= SIGN UP ================= */}
            {activeTab === "signup" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">
                    Country / Region of residence
                  </label>
                  <select className="w-full border rounded-md px-4 py-1.5 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
                    <option>Select country</option>
                    <option>India</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Your email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full border rounded-md px-4 py-1.5 border-gray-300 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <Mail className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      className="w-full border rounded-md px-4 py-1.5 border-gray-300 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowSignupPassword(!showSignupPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    >
                      {showSignupPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <ul className="text-xs mt-2 space-y-1">
                    <li className={hasLength ? "text-green-600" : "text-gray-500"}>
                      {hasLength && (
                        <Check className="inline w-4 h-4 mr-1" />
                      )}
                      Between 8–15 characters
                    </li>
                    <li
                      className={
                        hasUpperLower ? "text-green-600" : "text-gray-500"
                      }
                    >
                      {hasUpperLower && (
                        <Check className="inline w-4 h-4 mr-1" />
                      )}
                      At least one upper and lower case letter
                    </li>
                    <li
                      className={hasNumber ? "text-green-600" : "text-gray-500"}
                    >
                      {hasNumber && (
                        <Check className="inline w-4 h-4 mr-1" />
                      )}
                      At least one number
                    </li>
                    <li
                      className={hasSpecial ? "text-green-600" : "text-gray-500"}
                    >
                      {hasSpecial && (
                        <Check className="inline w-4 h-4 mr-1" />
                      )}
                      At least one special character
                    </li>
                  </ul>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Partner code (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-1.5 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="mt-1" />
                  I declare and confirm that I am not a citizen or resident of the
                  US for tax purposes.
                </label>

                <button className="w-full bg-[#ffde02] hover:bg-yellow-300/80 text-black font-medium py-1.5 rounded-md cursor-pointer">
                  Register
                </button>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex-1 h-px bg-gray-300" />
                  Or create an account with
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                <button className="w-full border rounded-md py-1.5 border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
