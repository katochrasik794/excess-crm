import React, { createContext, useContext, useState, useEffect } from 'react';

// Default mock accounts - used as fallback if localStorage is empty
const defaultAccounts = {
  Real: [
    {
      id: 1,
      accountType: "Standard",
      mt5Login: "#123456789",
      balance: "1,250.00 USD",
      platform: "MT5",
      server: "EU1",
      freeMargin: "1,000.00 USD",
      actualLeverage: "1:100",
      adjustLeverage: "1:200",
      equity: "1,250.00 USD",
      floatingPnL: "0.00 USD",
    },
  ],
  Demo: [
    {
      id: 2,
      accountType: "Demo",
      mt5Login: "#987654321",
      balance: "0.00 USD",
      platform: "MT5",
      server: "DEMO1",
      freeMargin: "0.00 USD",
      actualLeverage: "1:500",
      adjustLeverage: "1:500",
      equity: "0.00 USD",
      floatingPnL: "0.00 USD",
    },
  ],
  Archived: [
    {
      id: 8,
      accountType: "Standard",
      mt5Login: "#195971218",
      balance: "0.00 USD",
      platform: "MT5",
      server: "ARCH1",
      freeMargin: "0.00 USD",
      actualLeverage: "1:100",
      adjustLeverage: "1:100",
      equity: "0.00 USD",
      floatingPnL: "0.00 USD",
      reason: "Account archived due to inactivity",
    },
  ],
};

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  // Initialize from localStorage or use default accounts
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('exness_accounts');
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  // Listen for localStorage changes (when MyAccount updates it)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('exness_accounts');
      if (saved) {
        setAccounts(JSON.parse(saved));
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Also set up a periodic check for localStorage changes in same tab
    const intervalId = setInterval(() => {
      const saved = localStorage.getItem('exness_accounts');
      if (saved) {
        const parsedAccounts = JSON.parse(saved);
        // Only update if actually different to avoid unnecessary re-renders
        setAccounts(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(parsedAccounts)) {
            return parsedAccounts;
          }
          return prev;
        });
      }
    }, 500); // Check every 500ms

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Add a new account
  const addAccount = (accountType, newAccount) => {
    const updatedAccounts = {
      ...accounts,
      [accountType]: [...(accounts[accountType] || []), newAccount],
    };
    setAccounts(updatedAccounts);
    localStorage.setItem('exness_accounts', JSON.stringify(updatedAccounts));
  };

  // Update an existing account
  const updateAccount = (accountType, accountId, updatedData) => {
    const updatedAccounts = {
      ...accounts,
      [accountType]: accounts[accountType].map((acc) =>
        acc.id === accountId ? { ...acc, ...updatedData } : acc
      ),
    };
    setAccounts(updatedAccounts);
    localStorage.setItem('exness_accounts', JSON.stringify(updatedAccounts));
  };

  // Remove an account
  const removeAccount = (accountType, accountId) => {
    const updatedAccounts = {
      ...accounts,
      [accountType]: accounts[accountType].filter((acc) => acc.id !== accountId),
    };
    setAccounts(updatedAccounts);
    localStorage.setItem('exness_accounts', JSON.stringify(updatedAccounts));
  };

  // Get all accounts for dropdown (Real + Demo as active, Archived separate)
  const getAllActiveAccounts = () => {
    const realAccounts = accounts.Real || [];
    const demoAccounts = accounts.Demo || [];
    const archivedAccounts = accounts.Archived || [];
    
    return {
      active: [...realAccounts, ...demoAccounts],
      archived: archivedAccounts,
    };
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        addAccount,
        updateAccount,
        removeAccount,
        getAllActiveAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};
