import './Navbar.css';

export function Navbar() {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
  ];

  return (
    <nav className = "Navbar">
      <ul className = "Navbar__List">
        {menuItems.map((item) => (
          <li key={item.name}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
