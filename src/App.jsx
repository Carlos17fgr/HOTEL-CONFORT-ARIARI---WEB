import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Habitaciones from './pages/Habitaciones/Habitaciones';
import Nosotros from './pages/Nosotros/Nosotros';
import Reservas from './pages/Reservas/Reservas';
import Contacto from './pages/Contacto/Contacto';
import Bicicletas from './pages/Bicicletas/Bicicletas';
import Login from './pages/Login/Login';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PlaceholderPage({ title }) {
  return (
    <main style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
      backgroundColor: '#0b0f14',
      padding: '140px 2rem 5rem',
      textAlign: 'center'
    }}>
      <span style={{ color: '#c5a059', letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>
        Experiencias Ariari
      </span>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', marginBottom: '1rem' }}>
        {title}
      </h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '520px', lineHeight: '1.6' }}>
        Estamos preparando esta sección para ofrecerte una experiencia inolvidable en el corazón del Meta. Muy pronto disponible.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conocenos" element={<Nosotros />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/servicios" element={<PlaceholderPage title="Servicios Exclusivos" />} />
        <Route path="/bicicletas" element={<Bicicletas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
