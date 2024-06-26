import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BALANCE = 1000;

interface AccountDetails {
  firstName: string;
  lastName: string;
  iban: string;
}

interface Transaction {
  id: number;
  amount: number;
  account: AccountDetails;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (amount: number, account: AccountDetails) => void;
  balance: number;
  topUp: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

const TRANSACTIONS_KEY = 'transactions';
const BALANCE_KEY = 'balance';

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(BALANCE);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);
        const savedBalance = await AsyncStorage.getItem(BALANCE_KEY);
        if (savedTransactions !== null) {
          setTransactions(JSON.parse(savedTransactions));
        }
        if (savedBalance !== null) {
          setBalance(parseFloat(savedBalance));
        }
      } catch (error) {
        console.error('Failed to load transactions and balance from AsyncStorage', error);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        await AsyncStorage.setItem(BALANCE_KEY, balance.toString());
      } catch (error) {
        console.error('Failed to save transactions and balance to AsyncStorage', error);
      }
    };

    saveTransactions();
  }, [transactions, balance]);

  const addTransaction = (amount: number, account: AccountDetails) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount,
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - amount);
  };

  const topUp = () => {
    setBalance(BALANCE);
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, balance, topUp }}>
      {children}
    </TransactionContext.Provider>
  );
};
