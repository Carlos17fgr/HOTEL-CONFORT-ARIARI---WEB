import { useEffect, useRef } from 'react';

export default function RoomsHero() {
  const videoRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current || !copyRef.current) return;
      const scrollY = window.scrollY;
      
      // Efecto suave de zoom y opacidad en el scroll
      const scale = 1.08 + Math.min(scrollY * 0.0003, 0.1);
      const opacity = Math.max(1 - scrollY * 0.002, 0);

      videoRef.current.style.transform = `scale(${scale})`;
      copyRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpieza esencial en React
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="rooms-hero" aria-labelledby="roomsHeroTitle">
      <div className="rooms-hero__sticky">
        <video 
          ref={videoRef} 
          className="rooms-hero__video" 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="/IMG/1_RESERVAS.png"
        >
          <source src="/VIDEOS/Luxury Hotel Video Reel 2023.mp4" type="video/mp4" />
        </video>

        <div className="rooms-hero__shade" aria-hidden="true"></div>
        <div className="rooms-hero__grain" aria-hidden="true"></div>

        <div className="rooms-hero__content" ref={copyRef}>
          <p className="rooms-eyebrow"><span></span> Descanso en el corazón del Ariari</p>
          <h1 id="roomsHeroTitle">Habitaciones<br /><em>para sentirte en casa</em></h1>
          <p>Espacios tranquilos, atención cercana y todo lo necesario para descansar después de descubrir Granada.</p>
          <div className="rooms-hero__actions">
            <a href="#detallesHabitaciones" className="rooms-button rooms-button--light">
              Conocer habitaciones <span>↓</span>
            </a>
            <a href="reserva.html" className="rooms-link">
              Consultar disponibilidad <span>↗</span>
            </a>
          </div>
        </div>

        <div className="rooms-hero__meta" aria-hidden="true">
          <span>Granada · Meta</span><i></i><span>Hotel Confort Ariari</span>
        </div>
      </div>
    </section>
  );
}