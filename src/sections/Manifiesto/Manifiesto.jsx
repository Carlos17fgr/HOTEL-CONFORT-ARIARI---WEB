import { useEffect, useRef } from 'react';
import './Manifiesto.css';

const TEXTO_MANIFIESTO = "En el corazón del Ariari, cada estadía invita a bajar el ritmo. Deja que hable el paisaje. Que se sienta la calma. Que el tiempo pase más despacio. Descansa sin prisas, descubre Granada y guarda una experiencia que permanece.";

const FONDO_ATARDECER_ARBOL = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop";

export default function Manifiesto() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyEl = stickyRef.current;
    const textEl = textRef.current;
    const bgImgEl = bgImgRef.current;

    if (!section || !stickyEl || !textEl) return;

    // Fragmentación por palabras y caracteres
    if (!textEl.dataset.prepared) {
      textEl.textContent = '';
      const words = TEXTO_MANIFIESTO.split(' ');
      
      let totalChars = 0;
      words.forEach(w => (totalChars += w.length));
      
      let currentCharIdx = 0;

      words.forEach((wordText, wIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'manifiesto-word';

        [...wordText].forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'manifiesto-char';
          charSpan.textContent = char;
          const charProgress = currentCharIdx / Math.max(totalChars - 1, 1);
          charSpan.dataset.progress = charProgress.toFixed(4);
          wordSpan.appendChild(charSpan);
          currentCharIdx++;
        });

        textEl.appendChild(wordSpan);

        if (wIdx < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'manifiesto-space';
          spaceSpan.innerHTML = '&nbsp;';
          textEl.appendChild(spaceSpan);
        }
      });

      textEl.dataset.prepared = 'true';
    }

    let interpolatedProgress = 0;
    let targetProgress = 0;
    let animationFrameId = null;

    const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
    const charSpans = textEl.querySelectorAll('.manifiesto-char');

    const renderLoop = () => {
      interpolatedProgress += (targetProgress - interpolatedProgress) * 0.085;

      // 1. Encendido progresivo de texto
      charSpans.forEach((span) => {
        const charStart = parseFloat(span.dataset.progress);
        if (interpolatedProgress >= charStart) {
          span.classList.add('active');
        } else {
          span.classList.remove('active');
        }
      });

      // 2. Zoom progresivo suave al fondo (de escala 1.0 a 1.18)
      if (bgImgEl) {
        const scale = 1 + interpolatedProgress * 0.18;
        bgImgEl.style.transform = `scale(${scale})`;
      }

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
    <section id="manifiesto" ref={sectionRef} className="manifiesto-section">
      <div ref={stickyRef} className="manifiesto-sticky pin-top">
        <div className="manifiesto-fondo">
          <img 
            ref={bgImgRef}
            src="/images/home/paisaje-ariari.jpg" 
            alt="Atardecer Paisaje Ariari - Hotel Confort Ariari" 
            onError={(e) => { 
              e.target.onerror = null;
              e.target.src = FONDO_ATARDECER_ARBOL; 
            }}
          />
        </div>
        <div className="manifiesto-velo"></div>

        <div className="manifiesto-contenido">
          <div className="manifiesto-eyebrow-wrapper">
            <span className="manifiesto-line"></span>
            <span className="manifiesto-eyebrow">
              HOTEL CONFORT ARIARI · GRANADA, META
            </span>
          </div>

          <h2 ref={textRef} className="manifiesto-texto">
            {TEXTO_MANIFIESTO}
          </h2>
        </div>
      </div>
    </section>
  );
} 