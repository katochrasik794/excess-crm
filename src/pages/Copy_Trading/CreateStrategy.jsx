
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiInfo, FiEye, FiEyeOff, FiCopy } from 'react-icons/fi';
import TopContainer from '../../components/TopContainer';
import Footer from '../../components/Footer';


const CreateStrategy = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [visibility, setVisibility] = useState('public');
    const [accountType, setAccountType] = useState('standard');
    const [showPassword, setShowPassword] = useState(false);
    const [setupData, setSetupData] = useState({
        performanceFee: '5%',
        maxLeverage: '1:200',
        platform: 'MT5',
        password: '',
        executionType: 'Market',
        strategyName: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetupData(prev => ({ ...prev, [name]: value }));
    };

    const steps = [
        "Set strategy visibility",
        "Choose account type",
        "Set up account",
        "Add name and description",
        "Add profile picture"
    ];

    const handleNext = () => {
        if (currentStep <= steps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <>
        <TopContainer />
        <div className="px-4 md:px-8 lg:px-10 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Copy Trading</h1>
            
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
                {/* Main Content Card */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                        {currentStep === 1 && (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Set strategy visibility</h2>
                                <p className="text-gray-500 mb-8">Choose who can see your strategy. You can change these settings at any time.</p>
                                
                                <div className="space-y-4 mb-10">
                                    {/* Public Strategy Option */}
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input 
                                                type="radio" 
                                                name="visibility" 
                                                value="public"
                                                checked={visibility === 'public'}
                                                onChange={(e) => setVisibility(e.target.value)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-gray-500 peer-checked:border-4 transition-all"></div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Public strategy</div>
                                            <div className="text-gray-500 text-sm">A public strategy can be viewed by anyone.</div>
                                        </div>
                                    </label>

                                    {/* Private Strategy Option */}
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input 
                                                type="radio" 
                                                name="visibility" 
                                                value="private"
                                                checked={visibility === 'private'}
                                                onChange={(e) => setVisibility(e.target.value)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-gray-500 peer-checked:border-4 transition-all"></div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Private strategy</div>
                                            <div className="text-gray-500 text-sm">
                                                A private strategy is only accessible using a link. You can select who you choose to share the link with.
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Choose account type</h2>
                                <p className="text-gray-500 mb-8">There is no commission for any of the account types.</p>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    {/* Standard Card */}
                                    <div 
                                        onClick={() => {
                                            setAccountType('standard');
                                            handleNext();
                                        }}
                                        className={`border rounded-lg p-6 cursor-pointer transition-all ${accountType === 'standard' ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="text-center mb-12">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Standard</h3>
                                            <span className="inline-block px-2 py-0.5 bg-[#fff8d6] text-xs font-medium text-gray-800 rounded">
                                                Most popular
                                            </span>
                                            <p className="text-sm text-gray-600 mt-3 px-2">
                                                A great account for all types of traders
                                            </p>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b border-gray-300">
                                                <span className="text-gray-500">Spread</span>
                                                <span className="font-semibold text-gray-900">From 0.2</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-500">Execution</span>
                                                <span className="font-semibold text-gray-900">Market</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pro Card */}
                                    <div 
                                        onClick={() => {
                                            setAccountType('pro');
                                            handleNext();
                                        }}
                                        className={`border rounded-lg p-6 cursor-pointer transition-all ${accountType === 'pro' ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                                            <span className="inline-block px-2 py-0.5 bg-[#e0f2f1] text-xs font-medium text-gray-800 rounded">
                                                Instant or market execution
                                            </span>
                                            <p className="text-sm text-gray-600 mt-3 px-2">
                                                Low spreads with both instant and market execution
                                            </p>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">Spread</span>
                                                <span className="font-semibold text-gray-900">From 0.1</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-500">Execution</span>
                                                <span className="font-semibold text-gray-900">Market or instant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#eaf4fe] p-3 rounded-md flex items-start gap-3 mb-8">
                                    <FiInfo className="w-5 h-5 text-[#2980b9] shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-700">
                                        Trading conditions and copying process for all account types can be found on the <span className="text-[#2980b9] font-medium underline cursor-pointer">Account types</span> page.
                                    </p>
                                </div>
                            </>

                        )}

                        {currentStep === 3 && (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Set up account</h2>
                                
                                <div className="space-y-6 mb-8">
                                    {/* Performance Fee */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                            Performance fee <FiInfo className="text-gray-400" />
                                        </label>
                                        <select 
                                            name="performanceFee"
                                            value={setupData.performanceFee}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                                        >
                                            <option>5%</option>
                                            <option>10%</option>
                                            <option>15%</option>
                                            <option>20%</option>
                                            <option>25%</option>
                                            <option>30%</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">You can change performance fee later at any time</p>
                                    </div>

                                    {/* Execution Type - Only for Pro */}
                                    {accountType === 'pro' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Execution type
                                            </label>
                                            <div className="flex gap-6">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="executionType" 
                                                        value="Market"
                                                        checked={setupData.executionType === 'Market'}
                                                        onChange={handleChange}
                                                        className="accent-slate-600 w-4 h-4"
                                                    />
                                                    <span className="text-gray-700 font-medium flex items-center gap-1">Market <FiInfo className="text-gray-400 w-3.5 h-3.5" /></span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="executionType" 
                                                        value="Instant"
                                                        checked={setupData.executionType === 'Instant'}
                                                        onChange={handleChange}
                                                        className="accent-slate-600 w-4 h-4"
                                                    />
                                                    <span className="text-gray-700 font-medium flex items-center gap-1">Instant <FiInfo className="text-gray-400 w-3.5 h-3.5" /></span>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Max Leverage */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Max leverage
                                        </label>
                                        <select 
                                            name="maxLeverage"
                                            value={setupData.maxLeverage}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                                        >
                                            <option>1:200</option>
                                            <option>1:500</option>
                                            <option>1:1000</option>
                                            <option>1:2000</option>
                                            <option>Unlimited</option>
                                        </select>
                                    </div>

                                    {/* Platform */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Platform
                                        </label>
                                        <select 
                                            name="platform"
                                            value={setupData.platform}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                                        >
                                            <option>MT5</option>
                                            <option>MT4</option>
                                        </select>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={setupData.password}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md p-2.5 pr-10 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <FiEye /> : <FiEyeOff />}
                                            </button>
                                        </div>
                                            <ul className="mt-2 space-y-1">
                                                {/* Length Check */}
                                                <li className={`flex items-center gap-2 text-xs ${setupData.password.length >= 8 && setupData.password.length <= 15 ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {setupData.password.length >= 8 && setupData.password.length <= 15 ? (
                                                        <FiCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-1 h-1 rounded-full border border-gray-400 mx-1.5 flex-shrink-0"></div>
                                                    )}
                                                    Between 8-15 characters
                                                </li>

                                                {/* Case Check */}
                                                <li className={`flex items-center gap-2 text-xs ${/(?=.*[a-z])(?=.*[A-Z])/.test(setupData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {/(?=.*[a-z])(?=.*[A-Z])/.test(setupData.password) ? (
                                                        <FiCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-1 h-1 rounded-full border border-gray-400 mx-1.5 flex-shrink-0"></div>
                                                    )}
                                                    At least one upper and one lower case letter
                                                </li>

                                                {/* Number Check */}
                                                <li className={`flex items-center gap-2 text-xs ${/\d/.test(setupData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {/\d/.test(setupData.password) ? (
                                                        <FiCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-1 h-1 rounded-full border border-gray-400 mx-1.5 flex-shrink-0"></div>
                                                    )}
                                                    At least one number
                                                </li>

                                                {/* Special Character Check */}
                                                <li className={`flex items-center gap-2 text-xs ${/[^A-Za-z0-9]/.test(setupData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {/[^A-Za-z0-9]/.test(setupData.password) ? (
                                                        <FiCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-1 h-1 rounded-full border border-gray-400 mx-1.5 flex-shrink-0"></div>
                                                    )}
                                                    At least one special character
                                                </li>
                                            </ul>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 4 && (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add name and description</h2>
                                
                                <div className="space-y-6 mb-8">
                                    {/* Strategy Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Strategy name
                                        </label>
                                        <input 
                                            type="text"
                                            name="strategyName"
                                            value={setupData.strategyName}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                                        />
                                        <div className={`flex items-center gap-2 text-xs mt-1 ${setupData.strategyName.length >= 10 ? 'text-green-600' : 'text-gray-500'}`}>
                                            {setupData.strategyName.length >= 10 ? (
                                                <FiCheck className="w-3.5 h-3.5" />
                                            ) : (
                                                <div className="w-1 h-1 rounded-full border border-gray-400 mx-1.5"></div>
                                            )}
                                            Must be at least 10 characters
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea 
                                            name="description"
                                            value={setupData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none resize-none"
                                        ></textarea>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Attract more investors by adding an exciting description of your strategy (optional). Max. 150 characters
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 5 && (
                            <>
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900">Add profile picture</h2>
                                    <button 
                                        onClick={handleSkip}
                                        className="text-gray-500 hover:text-gray-700 font-medium underline decoration-dashed underline-offset-4 text-sm pt-2"
                                    >
                                        Skip
                                    </button>
                                </div>
                                <p className="text-gray-500 mb-8 max-w-2xl">
                                    Your profile picture will appear on all your strategies, so choose one that will inspire investors to copy you!
                                </p>
                                
                                <div className="border border-dashed border-gray-200 rounded-lg p-10 mb-8 flex flex-col items-center justify-center text-center bg-white">
                                    <label className="cursor-pointer">
                                        <button className="px-8 py-3 bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold rounded mb-3 pointer-events-none">
                                            Browse
                                        </button>
                                        <input type="file" className="hidden" accept=".jpg,.png" />
                                    </label>
                                    <p className="text-gray-500">Or drag and drop your image here</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Image requirements</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Min. size: 740 x 450 pixels
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> File size: {'<'}15MB
                                        </li>
                                        <li className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> File type: .png or .jpg
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}

                        {currentStep === 6 && (
                            <div className="py-12 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full border-4 border-[#22c55e] flex items-center justify-center mb-6">
                                    <FiCheck className="w-8 h-8 text-[#22c55e]" strokeWidth={3} />
                                </div>
                                
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                                <p className="text-gray-600 mb-10">
                                    You have successfully created {setupData.strategyName || 'Strategy'} strategy
                                </p>

                                <div className="w-full max-w-lg mb-12">
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <span className="text-gray-500">Account number</span>
                                        <div className="flex items-center gap-2 font-semibold text-gray-900">
                                            <FiCopy className="text-gray-400" /> 228019594
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <span className="text-gray-500">Server</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 w-full justify-end">
                                    <button 
                                        onClick={() => navigate('/copy-trading')}
                                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded transiton-colors"
                                    >
                                        Close
                                    </button>
                                    <button 
                                        onClick={() => navigate('/deposit')}
                                        className="px-6 py-2 bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold rounded transition-colors"
                                    >
                                        Make deposit
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Footer Buttons (Hide on Success Step) */}
                        {currentStep < 6 && (
                        <div className="flex justify-end gap-3 pt-4">
                            <button 
                                onClick={handleBack}
                                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded transition-colors cursor-pointer"
                            >
                                Back
                            </button>
                            {/* Continue Button (Hidden for Step 2) */}
                            {currentStep !== 2 && (
                                <button 
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-[#ffd200] hover:bg-[#ffde02] text-black font-semibold rounded transition-colors cursor-pointer"
                                >
                                    Continue
                                </button>
                            )}
                            {currentStep === 5 && null}
                        </div>
                        )}
                    </div>
                </div>



                {/* Right Sidebar Stepper (Hide on Success Step) */}
                {currentStep < 6 && (
                <div className="w-full lg:w-80">
                    <div className="relative pl-4 pt-2">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isActive = stepNumber === currentStep;
                            const isPast = stepNumber < currentStep;
                            
                            return (
                                <div key={index} className="relative pb-8 last:pb-0 flex items-start gap-4">
                                    {/* Connecting Line */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute left-[13px] top-7 bottom-0 w-px bg-gray-200" />
                                    )}
                                    
                                    {/* Circle Indicator */}
                                    <div className={`
                                        z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors
                                        ${isPast ? 'bg-slate-500 text-white' : isActive ? 'bg-slate-500 text-white' : 'bg-gray-200 text-gray-400'}
                                    `}>
                                        {isPast ? <FiCheck className="w-4 h-4" /> : stepNumber}
                                    </div>
                                    
                                    {/* Text */}
                                    <div className={`text-sm pt-1 transition-colors ${isActive ? 'font-bold text-gray-900' : isPast ? 'font-medium text-gray-900' : 'font-medium text-gray-400'}`}>
                                        {step}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default CreateStrategy;
