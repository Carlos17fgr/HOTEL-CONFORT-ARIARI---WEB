import { useState, useEffect, useRef } from "react";
import "./Hero.css";

const WORDS = ["excepcional", "inolvidable", "sofisticada", "exclusiva", "perfecta"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const wordRef = useRef(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (wordRef.current) {
      setWidth(Math.ceil(wordRef.current.getBoundingClientRect().width + 10));
    }
  }, [index]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setLeaving(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setLeaving(false);
      }, 700);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="inicio hero-premium" id="inicio">
      <video className="video hero-video" autoPlay loop muted playsInline preload="metadata" poster="/images/lugares/exterior.jpg">
        <source src="/videos/hero/luxury-hotel-reel.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <p className="hero-side-note hero-side-note-left"><span></span>Hospitalidad llanera</p>
      <p className="hero-side-note hero-side-note-right"><span></span>Granada · Meta</p>

      <div className="contenido-inicio hero-content">
        <p className="hero-kicker">Hotel Confort Ariari · Tu descanso en el corazón del Meta</p>

        <div className="texto-inicio hero-copy">
          <h1 className="titulo-carrusel" aria-label={`Estadía ${WORDS[index]}`}>
            <span className="palabra-fija">Estadía</span>
            <span className="palabra-rotativa" style={width ? { width } : undefined}>
              <span
                ref={wordRef}
                className={`palabra-actual ${leaving ? "salir" : "is-visible"}`}
              >
                {WORDS[index]}
              </span>
            </span>
          </h1>

          <div className="linea-inicio" />

          <div className="fila-inferior-inicio">
            <p className="subtitulo">Descanso, atención cercana y experiencias para descubrir el Ariari.</p>
            <a className="hero-scroll-link" href="/reserva">
              <span>Reserva tu estadía</span>
              <span className="hero-scroll-icon" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}