import { QuoteCard } from "../../components/QuoteCard";
import { Button } from "../../components/Button";
import { useQuotesContext } from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";

export const MainPage = () => {
  const quotes = useQuotesContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }
  return (
    <main>
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
      />

      <Button label="Next quote" handleOnClick={handleNextQuoteClick} />
    </main>
  );
};
