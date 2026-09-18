import { useState, useEffect, useRef, useCallback } from "react";
import "./Reservas.css";

export default function Reserva() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const copyRef = useRef(null);
  const formRef = useRef(null);
  const notaRef = useRef(null);
  const camposRef = useRef([]); // acá van a ir empujándose los .reserva-campo y el botón

  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  const progressRef = useRef(0);
  const smoothRef = useRef(0);
  const rafRef = useRef(0);
  const topRef = useRef(0);
  const heightRef = useRef(1);

  // Ref callback: cada vez que React monta un .reserva-campo, lo agrega al array
  const addCampoRef = (el) => {
    if (el && !camposRef.current.includes(el)) {
      camposRef.current.push(el);
    }
  };

  const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / Math.max(edge1 - edge0, 0.0001));
    return t * t * t * (t * (6 * t - 15) + 10);
  };

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    topRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    heightRef.current = Math.max(sectionRef.current.offsetHeight - window.innerHeight, 1);
  }, []);

  const applyStyles = useCallback((mobile, reduced) => {
    const { current: img } = imgRef;
    const { current: copy } = copyRef;
    const { current: form } = formRef;
    const { current: nota } = notaRef;
    const campos = camposRef.current;

    if (mobile || reduced) {
      [img, copy, form, nota, ...campos].forEach((el) => el?.removeAttribute("style"));
      return;
    }

    const p = smoothRef.current;

    const t1 = smoothstep(0.02, 0.56, p);
    const t2 = smoothstep(0.06, 0.43, p);
    const t3 = smoothstep(0.16, 0.69, p);
    const t4 = smoothstep(0.76, 1, p);

    if (img) {
      img.style.transform = `scale(${lerp(1.12, 1.025, t1).toFixed(4)}) translate3d(0, ${lerp(1.8, -1.1, p).toFixed(2)}%, 0)`;
      img.style.filter = `saturate(${lerp(0.84, 1.02, t1).toFixed(3)})`;
    }
    if (copy) {
      copy.style.opacity = String(t2);
      copy.style.filter = `blur(${lerp(9, 0, t2).toFixed(2)}px)`;
      copy.style.transform = `translate3d(0, ${lerp(92, 0, t2).toFixed(2)}px, 0)`;
    }
    if (form) {
      form.style.opacity = String(t3);
      form.style.clipPath = `inset(${lerp(92, 0, t3).toFixed(2)}% 0 0 0 round 16px)`;
      form.style.transform = `translate3d(0, ${lerp(185, -10, t3).toFixed(2)}px, 0) scale(${lerp(0.95, 1, t3).toFixed(4)})`;
    }
    campos.forEach((el, i) => {
      const t = smoothstep(0.24 + 0.055 * i, 0.64 + 0.045 * i, p);
      el.style.opacity = String(t);
      el.style.transform = `translate3d(0, ${lerp(34, 0, t).toFixed(2)}px, 0)`;
    });
    if (nota) {
      const t5 = smoothstep(0.56, 0.82, p);
      nota.style.opacity = String(t5 * (1 - 0.15 * t4));
      nota.style.transform = `translate3d(0, ${lerp(16, 0, t5).toFixed(2)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const mobileMQ = window.matchMedia("(max-width: 780px)");
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tick = () => {
      rafRef.current = 0;
      if (mobileMQ.matches || reducedMQ.matches) {
        applyStyles(true, true);
        return;
      }
      smoothRef.current += 0.065 * (progressRef.current - smoothRef.current);
      applyStyles(false, false);
      if (Math.abs(progressRef.current - smoothRef.current) > 0.0002) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      progressRef.current = clamp((window.scrollY - topRef.current) / heightRef.current);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // fechas por defecto: hoy, mañana, pasado mañana
    const toISO = (d) => new Date(d.getTime() - 60000 * d.getTimezoneOffset()).toISOString().split("T")[0];
    const hoy = new Date();
    hoy.setHours(12, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);
    setFechaEntrada((prev) => prev || toISO(manana));
    const pasado = new Date(hoy);
    pasado.setDate(pasado.getDate() + 2);
    setFechaSalida((prev) => prev || toISO(pasado));

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mobileMQ.addEventListener?.("change", onResize);
    reducedMQ.addEventListener?.("change", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mobileMQ.removeEventListener?.("change", onResize);
      reducedMQ.removeEventListener?.("change", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyStyles, measure]);

  // Cuando cambia el check-in, ajustamos el mínimo y valor del check-out (igual que tu JS original)
  const handleEntradaChange = (e) => {
    const value = e.target.value;
    setFechaEntrada(value);
    if (!value) return;
    if (!fechaSalida || fechaSalida <= value) {
      const next = new Date(`${value}T12:00:00`);
      next.setDate(next.getDate() + 1);
      setFechaSalida(next.toISOString().split("T")[0]);
    }
  };

  return (
    <section className="reserva-reveal" id="reservas" ref={sectionRef} aria-labelledby="reservaTitulo">
      <div className="reserva-reveal-sticky">
        <div className="reserva-fondo" aria-hidden="true">
          <img ref={imgRef} src="/images/servicios/1-reservas.png" alt="" />
        </div>
        <div className="reserva-velo" aria-hidden="true" />

        <div className="reserva-contenido">
          <div className="reserva-encabezado" ref={copyRef}>
            <span className="reserva-eyebrow">Reserva directa · Hotel Confort Ariari</span>
            <h2 id="reservaTitulo">Tu estadía comienza aquí.</h2>
            <p>Elige las fechas de tu visita y consulta la opción ideal para descansar en Granada, Meta.</p>
          </div>

          <form className="reserva-bar" ref={formRef} aria-label="Consultar disponibilidad" onSubmit={(e) => e.preventDefault()}>
            <label className="reserva-campo" ref={addCampoRef} style={{ "--campo": 0 }}>
              <span className="reserva-label">Check-in</span>
              <span className="reserva-control">
                <input
                  type="date"
                  aria-label="Fecha de llegada"
                  value={fechaEntrada}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleEntradaChange}
                />
                <span className="reserva-icono" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img"><path d="M7 3v3M17 3v3M4.5 9.2h15M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" /></svg>
                </span>
              </span>
            </label>

            <label className="reserva-campo" ref={addCampoRef} style={{ "--campo": 1 }}>
              <span className="reserva-label">Check-out</span>
              <span className="reserva-control">
                <input
                  type="date"
                  aria-label="Fecha de salida"
                  value={fechaSalida}
                  min={fechaEntrada}
                  onChange={(e) => setFechaSalida(e.target.value)}
                />
                <span className="reserva-icono" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img"><path d="M7 3v3M17 3v3M4.5 9.2h15M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" /></svg>
                </span>
              </span>
            </label>

            <label className="reserva-campo reserva-campo-huespedes" ref={addCampoRef} style={{ "--campo": 2 }}>
              <span className="reserva-label">Habitaciones</span>
              <span className="reserva-control">
                <select aria-label="Habitaciones y huéspedes" defaultValue="1-2">
                  <option value="1-2">1 habitación, 2 personas</option>
                  <option value="1-1">1 habitación, 1 persona</option>
                  <option value="1-3">1 habitación, 3 personas</option>
                  <option value="2-4">2 habitaciones, 4 personas</option>
                </select>
                <span className="reserva-chevron" aria-hidden="true">⌄</span>
              </span>
            </label>

            <button
              className="reserva-submit"
              type="button"
              ref={addCampoRef}
              style={{ "--campo": 3 }}
              aria-label="Buscar disponibilidad"
              onClick={() => (window.location.href = "/reserva")}
            >
              <span>Buscar disponibilidad</span>
              <span className="reserva-submit-flecha" aria-hidden="true">↗</span>
            </button>
          </form>

          <p className="reserva-nota" ref={notaRef}>Mejor atención · Reserva directa · Acompañamiento personalizado</p>
        </div>

        <div className="reserva-scroll-indicador" aria-hidden="true">
          <span>Continúa</span><i></i>
        </div>
      </div>
    </section>
  );
}