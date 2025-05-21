import { createContext, useState, useContext } from "react";

export const QuoteIndexContext = createContext(undefined);
export const QuoteIndexDispatchContext = createContext(undefined);

export const QuoteIndexContextProvider = ({children}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  return (
    <QuoteIndexContext.Provider value={quoteIndex}>
      <QuoteIndexDispatchContext.Provider value={setQuoteIndex}>
        {children}
      </QuoteIndexDispatchContext.Provider>
    </QuoteIndexContext.Provider>
  )
};

export const useQuoteIndexContext = () => useContext(QuoteIndexContext);
export const useQuoteIndexDispatchContext = () => useContext(QuoteIndexDispatchContext);