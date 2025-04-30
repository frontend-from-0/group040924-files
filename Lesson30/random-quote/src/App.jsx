import {quotes as intialQuotes} from './quotes';
import './App.css';
import {QuoteCard} from './components/QuoteCard';
import {useState} from 'react';

function App() {
  const [quotes, setQuotes] = useState(intialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);


  function handleNextQuoteClick () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);

  }

  return (
    <div className="App">
      <QuoteCard quote={quotes[currentIndex].quote} author={quotes[currentIndex].author} />

      <button onClick={handleNextQuoteClick}>Next quote</button>
    </div>
  );
}

export default App;

