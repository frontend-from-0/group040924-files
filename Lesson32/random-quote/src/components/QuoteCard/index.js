export const QuoteCard = ({ quote, author }) => {
  return (
    <section className='bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 max-w-2xl my-5 mx-auto rounded-md p-10 text-lg'>
      <p>{quote}</p>
      <p>{author}</p>
    </section>
  );
};
