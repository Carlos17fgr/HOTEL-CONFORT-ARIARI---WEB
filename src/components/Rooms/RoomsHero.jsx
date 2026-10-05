import React, { useEffect, useRef } from 'react';

export default function RoomsHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    // 1. Pausa automática si el video no está visible en pantalla (de tu Seccion_Cuartos_2.js)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.04 }
    );
    observer.observe(hero);

    // 2. Parallax y escala con Scroll
    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);

      const scale = 1.08 + progress * 0.075;
      const brightness = 0.76 - progress * 0.12;
      const copyOpacity = Math.max(1 - progress * 1.5, 0);
      const copyY = progress * -68;

      if (video) {
        video.style.transform = `scale(${scale.toFixed(4)})`;
        video.style.filter = `saturate(.78) contrast(1.02) brightness(${brightness.toFixed(3)})`;
      }
      if (copyRef.current) {
        copyRef.current.style.opacity = copyOpacity.toFixed(4);
        copyRef.current.style.transform = `translate3d(0, ${copyY.toFixed(3)}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpieza de eventos
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="rooms-hero" ref={heroRef} id="habitacionesInicio" aria-labelledby="roomsHeroTitle">
      <div className="rooms-hero__sticky">
        <video
          ref={videoRef}
          className="rooms-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/IMG/1_RESERVAS.png"
        >
          <source src="/videos/hero/hero-video.mp4" type="video/mp4" />
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
            <a href="/reservas" className="rooms-link">
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