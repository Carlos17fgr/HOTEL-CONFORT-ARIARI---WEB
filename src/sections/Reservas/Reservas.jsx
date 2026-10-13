import React, { useEffect, useRef, useState } from 'react';
import './Reservas.css';

export default function Reservas() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // En cuanto el 20% de la sección asoma en pantalla, activamos la entrada de los textos
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="home-reserva-section" id="reservas">
      <div className="home-reserva-sticky">
        <div className="home-reserva-fondo">
          <img 
            src="/images/contacto/rigth-descanso.png" 
            alt="Hotel Confort Ariari - Reserva Directa" 
            onError={(e) => { e.target.src = "/IMG/1_RESERVAS.png"; }}
          />
        </div>
        <div className="home-reserva-velo"></div>

        <div className={`home-reserva-contenido ${isVisible ? 'animate-in' : ''}`}>
          <div className="home-reserva-encabezado">
            <div className="home-reserva-eyebrow-wrapper">
              <span className="home-reserva-line"></span>
              <span className="home-reserva-eyebrow">RESERVA DIRECTA · HOTEL CONFORT ARIARI</span>
            </div>
            <h2>Tu estadía <br /><span className="home-reserva-italic">comienza aquí.</span></h2>
            <p>Elige las fechas de tu visita y consulta la opción ideal para descansar en Granada, Meta.</p>
          </div>

          <form className="home-reserva-bar" onSubmit={(e) => e.preventDefault()}>
            <label className="home-reserva-campo">
              <span className="home-reserva-label">CHECK-IN</span>
              <div className="home-reserva-control">
                <input type="date" defaultValue="2026-10-14" />
              </div>
            </label>

            <label className="home-reserva-campo">
              <span className="home-reserva-label">CHECK-OUT</span>
              <div className="home-reserva-control">
                <input type="date" defaultValue="2026-10-15" />
              </div>
            </label>

            <label className="home-reserva-campo">
              <span className="home-reserva-label">HABITACIONES</span>
              <div className="home-reserva-control">
                <select>
                  <option>1 habitación, 2 personas</option>
                  <option>1 habitación, 1 persona</option>
                  <option>2 habitaciones, 4 personas</option>
                </select>
                <span className="home-reserva-chevron">⌄</span>
              </div>
            </label>

            <button className="home-reserva-submit" type="button" onClick={() => window.location.href='/reservas'}>
              <span>BUSCAR DISPONIBILIDAD</span>
              <span>↗</span>
            </button>
          </form>

          <p className="home-reserva-nota">MEJOR ATENCIÓN · RESERVA DIRECTA · ACOMPAÑAMIENTO PERSONALIZADO</p>
        </div>

        <div className={`home-reserva-hint ${isVisible ? 'animate-in' : ''}`} aria-hidden="true">
          <span>CONTINÚA</span><i></i>
        </div>
      </div>
    </section>
  );
}