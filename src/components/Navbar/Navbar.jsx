import { useState } from 'react';
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
          <a href="#" className="logo-container" onClick={closeMenu}>
            <img 
              src="/images/logo/logo-hca-premium.png" 
              alt="Hotel Confort Ariari" 
              className="logo-img" 
            />
          </a>

          {/* Botón Reservar Derecha */}
          <a href="#reserva" className="btn-reservar-top" onClick={closeMenu}>
            RESERVAR <span className="arrow">↗</span>
          </a>
        </div>
      </header>

      {/* Menú Desplegable Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <nav className="menu-nav">
          <ul className="menu-list">
           <li><a href="#inicio" onClick={closeMenu}><span className="menu-num">01</span> INICIO</a></li>
          <li><a href="#conocenos" onClick={closeMenu}><span className="menu-num">02</span> CONOCENOS</a></li>
          <li><a href="#habitaciones" onClick={closeMenu}><span className="menu-num">03</span> HABITACIONES</a></li>
          <li><a href="#reservas" onClick={closeMenu}><span className="menu-num">04</span> RESERVAS</a></li>
          <li><a href="#servicios" onClick={closeMenu}><span className="menu-num">05</span> SERVICIOS</a></li>
          <li><a href="#bicicletas" onClick={closeMenu}><span className="menu-num">06</span> BICICLETAS</a></li>
          <li><a href="#contacto" onClick={closeMenu}><span className="menu-num">07</span> CONTACTO</a></li>
          <li><a href="#acceso" onClick={closeMenu}><span className="menu-num">08</span> ACCESO</a></li>
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