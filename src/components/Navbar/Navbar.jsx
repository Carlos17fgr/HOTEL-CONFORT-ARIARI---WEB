import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">Hotel Confort</div>
      <nav className="navbar-links">
        <a href="/">Inicio</a>
        <a href="/habitaciones">Habitaciones</a>
        <a href="/reservas">Reservas</a>
        <a href="/nosotros">Nosotros</a>
        <a href="/contacto">Contacto</a>
      </nav>
    </header>
  )
}

export default Navbar
