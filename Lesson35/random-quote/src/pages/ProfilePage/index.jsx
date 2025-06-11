import {
  useQuotesContext,
  useQuotesDispatchContext,
} from '../../QuotesContextProvider';
import {useState} from 'react';

export const ProfilePage = () => {
  const quotes = useQuotesContext();
  const dispatch = useQuotesDispatchContext();
  const [error, setError] = useState('');

  function handleClick(currentQuote) {
    dispatch((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((prevQuote) => {
        if (prevQuote.quote === currentQuote.quote) {
          if (prevQuote.likedBy > 0) {
            return {
              quote: prevQuote.quote,
              author: prevQuote.author,
              likedBy: prevQuote.likedBy - 1,
            };

          } else {
            setError('Cannot dislike the quote.');
            return prevQuote;
          }
        } else {
          return prevQuote;
        }
      });

      return updatedQuotes;
    });
  }

  return (
    <main>
      <h1>Profile page</h1>
      <div>Use information placeholder ....</div>
      <h2>Liked quotes</h2>
      {error && <p>{error}</p>} 
      {quotes && quotes.length > 0 ? (
        quotes.map((quote) => (
          <section className='bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 max-w-2xl my-5 mx-auto rounded-md p-10 text-lg'>
            <p>{quote.quote}</p>
            <p>{quote.author}</p>
            <button onClick={() => handleClick(quote)}>Dislike</button>
          </section>
        ))
      ) : (
        <></>
      )}
    </main>
  );
};
