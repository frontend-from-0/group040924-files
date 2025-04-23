# Random Quote Generator app

## High-Level Overview

### App Component
- Stores a list/array of quote objects (each quote can have text + author).
- Maintains the current quote index in state.
- Passes the current quote to a “QuoteBox” component via props.
- Includes a button (“New Quote” or whatever you prefer) that, when clicked, updates the state to point to a random quote in the array.

### QuoteBox Component
- Receives the quote and author via props and displays them in JSX.
