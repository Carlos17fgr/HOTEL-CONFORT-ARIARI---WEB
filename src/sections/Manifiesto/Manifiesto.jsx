import { useRef, useEffect, useMemo } from "react";
import "./Manifiesto.css";

const TEXTO =
  "En el corazón del Ariari, cada estadía invita a bajar el ritmo. Deja que hable el paisaje. Que se sienta la calma. Que el tiempo pase más despacio. Descansa sin prisas, descubre Granada y guarda una experiencia que permanece.";

export default function Manifiesto() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  const progressRef = useRef(0);
  const smoothRef = useRef(0);
  const rafRef = useRef(0);

  // Dividimos el texto en letras UNA sola vez (no en cada render) con useMemo
  const letras = useMemo(() => TEXTO.split(""), []);
  const totalLetras = letras.length;

  const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  useEffect(() => {
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tick = () => {
      if (reducedMQ.matches) {
        sectionRef.current?.style.setProperty("--manifest-progress", "1");
        if (imgRef.current) {
          imgRef.current.style.transform = "none";
          imgRef.current.style.filter = "none";
        }
        return;
      }

      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = Math.max(el.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-rect.top / totalScroll);

      smoothRef.current += (raw - smoothRef.current) * 0.095;

      const eased = easeInOutCubic(smoothRef.current);
      el.style.setProperty("--manifest-progress", eased.toFixed(4));

      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${(5 - 10 * eased).toFixed(3)}%, 0) scale(${(1.1 - 0.055 * eased).toFixed(4)})`;
        imgRef.current.style.filter = `saturate(${(0.82 + 0.14 * eased).toFixed(3)}) contrast(1.02) brightness(${(0.82 + 0.08 * eased).toFixed(3)})`;
      }

      if (Math.abs(raw - smoothRef.current) > 0.0005) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const requestTick = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    reducedMQ.addEventListener?.("change", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      reducedMQ.removeEventListener?.("change", requestTick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="hotel-manifesto" id="manifiesto" ref={sectionRef} aria-labelledby="manifiestoTitulo">
      <div className="hotel-manifesto__sticky">
        <div className="hotel-manifesto__media" aria-hidden="true">
          <img ref={imgRef} src="/images/lugares/manifiesto-ariari.jpg" alt="" />
        </div>
        <div className="hotel-manifesto__overlay" aria-hidden="true" />
        <div className="hotel-manifesto__grain" aria-hidden="true" />

        <div className="hotel-manifesto__content">
          <p className="hotel-manifesto__eyebrow">Hotel Confort Ariari · Granada, Meta</p>
          <h2 id="manifiestoTitulo">
            {letras.map((letra, i) => (
              <span
                key={i}
                className="hotel-manifesto__letter"
                style={{ "--letter-start": (0.84 * i) / Math.max(totalLetras - 1, 1) }}
              >
                {letra}
              </span>
            ))}
          </h2>
        </div>

        <div className="hotel-manifesto__hint" aria-hidden="true">
          <span>Sigue descubriendo</span><i></i>
        </div>
      </div>
    </section>
  );
}