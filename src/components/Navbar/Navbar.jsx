import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-luxury">
        <div className="navbar-content">
          {/* Botón Hamburguesa Izquierda */}
          <button 
            className={`menu-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Logo Centrado con tu imagen */}
          <Link to="/" className="logo-container" onClick={closeMenu}>
            <img 
              src="/images/logo/logo-hca-premium.png" 
              alt="Hotel Confort Ariari" 
              className="logo-img" 
            />
          </Link>

          {/* Botón Reservar Derecha */}
          <Link to="/reservas" className="btn-reservar-top" onClick={closeMenu}>
            RESERVAR <span className="arrow">↗</span>
          </Link>
        </div>
      </header>

      {/* Menú Desplegable Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <nav className="menu-nav">
          <ul className="menu-list">
            <li><Link to="/" onClick={closeMenu}><span className="menu-num">01</span> INICIO</Link></li>
            <li><Link to="/conocenos" onClick={closeMenu}><span className="menu-num">02</span> CONOCENOS</Link></li>
            <li><Link to="/habitaciones" onClick={closeMenu}><span className="menu-num">03</span> HABITACIONES</Link></li>
            <li><Link to="/reservas" onClick={closeMenu}><span className="menu-num">04</span> RESERVAS</Link></li>
            <li><Link to="/servicios" onClick={closeMenu}><span className="menu-num">05</span> SERVICIOS</Link></li>
            <li><Link to="/bicicletas" onClick={closeMenu}><span className="menu-num">06</span> BICICLETAS</Link></li>
            <li><Link to="/contacto" onClick={closeMenu}><span className="menu-num">07</span> CONTACTO</Link></li>
            <li><Link to="/acceso" onClick={closeMenu}><span className="menu-num">08</span> ACCESO</Link></li>
          </ul>

          <div className="menu-footer">
            <p className="menu-location">GRANADA, META · COLOMBIA</p>
            <p className="menu-phone">+57 310 000 0000</p>
          </div>
        </nav>
      </div>
    </>
  );
}
