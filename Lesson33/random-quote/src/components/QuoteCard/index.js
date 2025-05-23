import {useQuotesDispatchContext, QuotesActionType} from '../../QuotesContextProvider';

export const QuoteCard = ({ quote, author, likedBy }) => {
  const dispatch = useQuotesDispatchContext();

  function handleClick () {
    dispatch({type: QuotesActionType.LIKE_QUOTE, payload: {quote: quote}});
  }
  
  return (
    <section className='bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 max-w-2xl my-5 mx-auto rounded-md p-10 text-lg'>
      <p>{quote}</p>
      <p>{author}</p>
      <button onClick={handleClick}>Like {likedBy}</button>
    </section>
  );
};
