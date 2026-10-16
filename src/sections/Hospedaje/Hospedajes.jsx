import { useEffect, useRef } from 'react';
import './Hospedajes.css';

const TARJETAS_EXPERIENCIAS = [
  {
    id: "01",
    categoria: "BIENESTAR",
    titulo: "Piscina y relajación",
    subtext: "Un espacio tranquilo para bajar el ritmo y disfrutar del clima del Meta."
  },
  {
    id: "02",
    categoria: "GASTRONOMÍA",
    titulo: "Sabores que acompañan",
    subtext: "Detalles y sabores pensados para convertir cada momento en una experiencia."
  },
  {
    id: "03",
    categoria: "DESCANSO",
    titulo: "Habitaciones confortables",
    subtext: "Espacios modernos, serenos y preparados para descansar después de cada recorrido."
  },
  {
    id: "04",
    categoria: "EXPLORAR",
    titulo: "Recorre el Ariari",
    subtext: "Explora la biodiversidad y los paisajes del Ariari en caminatas únicas."
  }
];

export default function Hospedajes() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const bgContentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyEl = stickyRef.current;
    const bgContentEl = bgContentRef.current;
    const containerEl = containerRef.current;

    if (!section || !stickyEl || !bgContentEl || !containerEl) return;

    let interpolatedProgress = 0;
    let targetProgress = 0;
    let animationFrameId = null;

    const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);

    const renderLoop = () => {
      const delta = targetProgress - interpolatedProgress;
      interpolatedProgress += delta * 0.045;

      // 1. FASE 1: TEXTO DE FONDO
      const bgProgress = clamp(interpolatedProgress / 0.35);
      const scaleBg = 1 - bgProgress * 0.22;
      const blurBg = bgProgress * 12;
      const opacityBg = 1 - bgProgress * 0.65;
      const translateYBg = -bgProgress * 50;

      bgContentEl.style.transform = `translate3d(0, ${translateYBg}px, 0) scale(${scaleBg})`;
      bgContentEl.style.filter = `blur(${blurBg}px)`;
      bgContentEl.style.opacity = `${opacityBg}`;

      // 2. FASE 2: ENTRADA Y CENTRADO DE TARJETAS
      const cardsProgress = clamp((interpolatedProgress - 0.1) / 0.9);

      const baseTrackX = 100 - cardsProgress * 215; // en vw
      const deltaX = 35; // Espaciado horizontal en vw

      const cardElms = containerEl.querySelectorAll('.hospedaje-card');

      cardElms.forEach((card, idx) => {
        const posX = baseTrackX + idx * deltaX;
        const distFromCenter = posX - 32;

        const posY = 11 + distFromCenter * 0.72; 

        let rot = (distFromCenter / 28) * 3.8;
        rot = Math.max(-4.5, Math.min(4.5, rot));

        card.style.transform = `translate3d(${posX}vw, ${posY}vh, 0) rotate(${rot}deg)`;

        if (Math.abs(distFromCenter) < 14) {
          card.classList.add('is-focused');
        } else {
          card.classList.remove('is-focused');
        }
      });

      if (Math.abs(targetProgress - interpolatedProgress) > 0.0001) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      targetProgress = clamp(-rect.top / totalScrollable);

      if (rect.top > 0) {
        stickyEl.classList.remove('pin-fixed', 'pin-bottom');
        stickyEl.classList.add('pin-top');
      } else if (rect.bottom < windowHeight) {
        stickyEl.classList.remove('pin-top', 'pin-fixed');
        stickyEl.classList.add('pin-bottom');
      } else {
        stickyEl.classList.remove('pin-top', 'pin-bottom');
        stickyEl.classList.add('pin-fixed');
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hospedajes" ref={sectionRef} className="mas-hospedaje-section">
      <div ref={stickyRef} className="mas-hospedaje-sticky pin-top">
        
        {/* Círculos decorativos esquinas */}
        <svg className="mas-hospedaje-circle top-right" viewBox="0 0 300 300" aria-hidden="true">
          <circle cx="300" cy="0" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="0" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="0" r="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="0" r="290" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <svg className="mas-hospedaje-circle bottom-left" viewBox="0 0 300 300" aria-hidden="true">
          <circle cx="0" cy="300" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="300" r="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="300" r="290" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* 1. Texto de fondo */}
        <div ref={bgContentRef} className="mas-hospedaje-container">
          <div className="mas-hospedaje-eyebrow">
            <span className="sparkle">✦</span>
            <span className="eyebrow-text">MÁS QUE HOSPEDAJE</span>
            <span className="sparkle">✦</span>
          </div>

          <h2 className="mas-hospedaje-titulo">
            <span>DESCANSA.</span>
            <span>DISFRUTA.</span>
            <span>DESCUBRE.</span>
          </h2>

          <p className="mas-hospedaje-subtitulo">
            Piscina, gastronomía, habitaciones y recorridos para vivir Granada con comodidad y a tu propio ritmo.
          </p>

          <div className="mas-hospedaje-indicador">
            <span>DESLIZA PARA DESCUBRIR</span>
            <span className="indicador-linea"></span>
          </div>
        </div>

        {/* 2. Galería de tarjetas */}
        <div ref={containerRef} className="hospedaje-cards-diagonal-track">
          {TARJETAS_EXPERIENCIAS.map((tarjeta) => (
            <article key={tarjeta.id} className="hospedaje-card">
              <span className="card-number">{tarjeta.id}</span>
              <div className="card-media-overlay"></div>
              
              <div className="card-bottom-content">
                <div className="card-text-group">
                  <span className="card-category">{tarjeta.categoria}</span>
                  <h3 className="card-title">{tarjeta.titulo}</h3>
                  <p className="card-description">{tarjeta.subtext}</p>
                </div>

                <div className="card-button" title="Ver detalles">
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}