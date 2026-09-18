import { useState, useEffect } from 'react';
import './Hero.css';

const words = ["excepcional", "auténtica", "inolvidable", "exclusiva"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('fade-out');
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimationClass('fade-in');
      }, 400); // Tiempo de la animación de salida
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-editorial" id="inicio">
      {/* Video de fondo */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/videos/hero/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Capa oscura para legibilidad */}
      <div className="hero-bg-overlay"></div>

      <div className="hero-container">
        {/* Metadatos superiores (Hospitalidad Llanera / Granada - Meta) */}
        <div className="hero-top-meta">
          
          <span>◇ HOSPITALIDAD LLANERA</span>
          <span>◇ GRANADA - META</span>
        </div>

        {/* Bloque inferior agrupado */}
        <div className="hero-content-bottom">
          <p className="hero-pretitle">HOTEL CONFORT ARIARI · TU DESCANSO EN EL CORAZÓN DEL META</p>
          
          <h1 className="hero-title">
            Estadía <span className={`title-italic-gold ${animationClass}`}>{words[currentWordIndex]}</span>
          </h1>

          <div className="hero-bottom-bar">
            <p className="hero-description">
              Descanso, atención cercana y experiencias para descubrir el Ariari.
            </p>
            <a href="#reserva" className="hero-action-link">
              RESERVA TU ESTADÍA <span className="action-circle">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}