import './Card.css';

export function Card ({children}) {
  return (
    <section className="Card">
      {children}
    </section>
  )
}