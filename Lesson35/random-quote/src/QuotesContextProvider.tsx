import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from 'react';
import { ReactNode } from 'react';
import { Quote } from './types';
import { collection, getDocs } from 'firebase/firestore';
import { collections, db } from './firebase';

export const QuotesContext = createContext<Quote[] | undefined>(undefined);

export const QuotesDispatchContext = createContext<
  Dispatch<SetQuotesAction | LikeDislikeQuoteAction> | undefined
>(undefined);

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({
  children,
}: QuotesContextProviderProps) => {
  // const [quotes, setQuotes] = useState(intialQuotes);
  const [quotes, dispatch] = useReducer(quotesReducer, []);

  useEffect(() => {
    getDocs(collection(db, collections.quotes))
      .then((querySnapshot) => {
        const quotesFromDB = querySnapshot.forEach((doc) => doc.data());
        // Set quotes state to quotesFromDB
      })
      .catch((error) =>
        console.error('An error occured when fetching all quotes', error),
      );
  }, []);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export enum QuotesActionType {
  SET_QUOTES = 'SET_QUOTES',
  LIKE_QUOTE = 'LIKE_QUOTE',
  DISLIKE_QUOTE = 'DISLIKE_QUOTE',
  ADD_NEW_QUOTE = 'ADD_NEW_QUOTE',
  UPDATE_QUOTE = 'UPDATE_QUOTE',
  DELETE_QUOTE = 'DELETE_QUOTE',
}

type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};

type LikeDislikeQuoteAction = {
  type: QuotesActionType.DISLIKE_QUOTE | QuotesActionType.LIKE_QUOTE;
  payload: {
    quote: string;
  };
};

function quotesReducer(
  state: Quote[],
  action: SetQuotesAction | LikeDislikeQuoteAction,
): Quote[] {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;

    case QuotesActionType.LIKE_QUOTE:
      console.log('Triggered like quote action');
      const updatedQuotes = state.map((prevQuote: Quote) => {
        if (prevQuote.quote === action.payload.quote) {
          return { ...prevQuote, likedBy: prevQuote.likedBy + 1 };
        } else {
          return prevQuote;
        }
      });

      return updatedQuotes;

    // TODO: ADD Dislike quote action case

    default:
      console.error(
        `Unsupported Quotes Action Type used. Supported types: ${QuotesActionType.SET_QUOTES}, ${QuotesActionType.LIKE_QUOTE}, ${QuotesActionType.DISLIKE_QUOTE}`,
      );
      return state;
  }
}

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
