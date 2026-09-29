import { useEffect, useRef } from 'react';
import './Manifiesto.css';

const TEXTO_MANIFIESTO = "Diseñamos un santuario de descanso en el corazón del Ariari, donde la arquitectura sostenible se entrelaza con el servicio personalizado para redefinir el concepto del lujo natural.";

export default function Manifiesto() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    const imgEl = imageRef.current;

    if (!section || !textEl) return;

    // Fragmentación de caracteres con manejo estricto de espacios
    if (!textEl.dataset.prepared) {
      const chars = [...TEXTO_MANIFIESTO];
      const maxIndex = Math.max(chars.length - 1, 1);
      textEl.textContent = '';

      chars.forEach((char, idx) => {
        const span = document.createElement('span');
        span.className = 'manifesto-letter';
        // Si el caracter es espacio, insertamos un espacio de no separación
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--letter-start', (idx / maxIndex).toFixed(4));
        textEl.appendChild(span);
      });
      textEl.dataset.prepared = 'true';
    }

    let interpolatedProgress = 0;
    let targetProgress = 0;
    let animationFrameId = null;

    const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);

    const renderLoop = () => {
      // Interpolación lineal (LERP) para suavizar la animación
      interpolatedProgress += (targetProgress - interpolatedProgress) * 0.085;

      section.style.setProperty('--manifest-progress', interpolatedProgress.toFixed(4));

      if (imgEl) {
        const scale = 1.1 - 0.08 * interpolatedProgress;
        const translateY = (10 - 20 * interpolatedProgress).toFixed(2);
        imgEl.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }

      if (Math.abs(targetProgress - interpolatedProgress) > 0.0001) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      targetProgress = clamp(-rect.top / scrollableHeight);

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="manifiesto" ref={sectionRef} className="manifiesto-section">
      <div className="manifiesto-container">
        <span className="manifiesto-label">NUESTRA PHILOSOPHIA</span>
        <h2 ref={textRef} className="manifiesto-text">
          {TEXTO_MANIFIESTO}
        </h2>
        <div className="manifiesto-media">
          <img 
            ref={imageRef} 
            src="/IMG/manifiesto.jpg" 
            alt="Entorno natural Hotel Confort Ariari" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}