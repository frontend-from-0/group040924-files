import './App.css';
import {Navbar} from './components/Navbar';
import {Card} from './components/Card';

// parameter are props in React
export function App() {
  return (
    // JSX syntax - HTML-like syntax
    <div className='App'>
      <header className="App-header">
        <Navbar />

        <Card>
          <h2>First card</h2>
          <p>This is the first card for our application</p>
        </Card>

        <Card>
          <h2>Contact form</h2>
          <form>
            <div>
            <label htmlFor="name">
              Name:
              </label>
              <input type="text" id="name" name="name" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </Card>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
