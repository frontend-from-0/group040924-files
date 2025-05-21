import { createContext, useState, useContext } from 'react';
import { quotes as intialQuotes } from './quotes';
import { ReactNode } from 'react';
import { Quote } from './types';

export const QuotesContext = createContext<Quote[] | undefined>(undefined);
export const QuotesDispatchContext = createContext<React.Dispatch<React.SetStateAction<Quote[]>> | undefined>(undefined);

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({
  children,
}: QuotesContextProviderProps) => {
  const [quotes, setQuotes] = useState(intialQuotes);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={setQuotes}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
