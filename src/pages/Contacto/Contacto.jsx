import './Contacto.css'
import { useEffect } from 'react';

function Contacto() {
  useEffect(() => {
    /* Animación principal inspirada en el movimiento secuencial de Sade:
       primero se retira el panel izquierdo y después el derecho. */
    const cinema = document.querySelector("[data-contact-cinema]");
    const leftPanel = cinema?.querySelector("[data-cinema-left]");
    const rightPanel = cinema?.querySelector("[data-cinema-right]");
    const cinemaTitle = cinema?.querySelector("[data-cinema-title]");
    const cinemaScroll = cinema?.querySelector("[data-cinema-scroll]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
    const smoothstep = (value) => {
      const x = clamp(value);
      return x * x * (3 - 2 * x);
    };
    const mapRange = (value, start, end) => smoothstep((value - start) / (end - start));

    let targetProgress = 0;
    let currentProgress = 0;
    let cinemaFrame = null;

    const measureCinemaProgress = () => {
      if (!cinema) return 0;
      const rect = cinema.getBoundingClientRect();
      const distance = Math.max(cinema.offsetHeight - window.innerHeight, 1);
      return clamp(-rect.top / distance);
    };

    const drawCinema = () => {
      cinemaFrame = null;
      if (!cinema || reduceMotion.matches) return;

      currentProgress += (targetProgress - currentProgress) * 0.18;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress;

      const leftProgress = mapRange(currentProgress, 0.05, 0.42);
      const rightProgress = mapRange(currentProgress, 0.43, 0.82);
      const titleProgress = mapRange(currentProgress, 0.03, 0.25);
      const hintProgress = mapRange(currentProgress, 0.02, 0.18);

      if (leftPanel) {
        leftPanel.style.transform = `translate3d(0, ${(-102 * leftProgress).toFixed(3)}%, 0)`;
      }
      if (rightPanel) {
        rightPanel.style.transform = `translate3d(0, ${(-102 * rightProgress).toFixed(3)}%, 0)`;
      }
      if (cinemaTitle) {
        cinemaTitle.style.opacity = (1 - titleProgress).toFixed(4);
        cinemaTitle.style.transform = `translate3d(0, ${(-34 * titleProgress).toFixed(2)}px, 0) scale(${(1 - titleProgress * 0.035).toFixed(4)})`;
      }
      if (cinemaScroll) {
        cinemaScroll.style.opacity = (1 - hintProgress).toFixed(4);
        cinemaScroll.style.transform = `translate3d(0, ${(-14 * hintProgress).toFixed(2)}px, 0)`;
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        cinemaFrame = window.requestAnimationFrame(drawCinema);
      }
    };

    const requestCinemaUpdate = () => {
      if (!cinema || reduceMotion.matches) return;
      targetProgress = measureCinemaProgress();
      if (!cinemaFrame) cinemaFrame = window.requestAnimationFrame(drawCinema);
    };

    targetProgress = currentProgress = measureCinemaProgress();
    drawCinema();

    window.addEventListener("scroll", requestCinemaUpdate, { passive: true });
    window.addEventListener("resize", requestCinemaUpdate, { passive: true });

    const handleMotionChange = () => requestCinemaUpdate();
    reduceMotion.addEventListener?.("change", handleMotionChange);

    const revealItems = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.13,
      rootMargin: "0px 0px -8% 0px"
    });
    revealItems.forEach((item) => revealObserver.observe(item));

    // Limpieza de eventos al desmontar el componente
    return () => {
      window.removeEventListener("scroll", requestCinemaUpdate);
      window.removeEventListener("resize", requestCinemaUpdate);
      reduceMotion.removeEventListener?.("change", handleMotionChange);
      if (cinemaFrame) window.cancelAnimationFrame(cinemaFrame);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* APARTADO 1 */}
      <section className="ContactContent" data-contact-cinema>
        <div className="BoxAnimation">
          <div className="InfoContact">
            <p>hotel confort ariari</p>
            <h2>estamos cerca cuando nos necesitas.</h2>
            <span>granada | meta | colombia</span>
          </div>
          <article className="ItemAnimation ItemAnimation--Left" data-cinema-left data-reveal>
            <img src="/images/contacto/rigth-descanso.png" alt="img de descanso" />
            <div className='BoxShade'></div>
            <p>descanso</p>
          </article>
          <article className="ItemAnimation ItemAnimation--Rigth" data-cinema-right data-reveal>
            <img src="/images/contacto/left-hospitalidad.jpg" alt="img de hospitalidad" />
            <div className='BoxShade'></div>
            <p>hospitalidad</p>
          </article>
          <div className="ContactAnimationTitle" data-cinema-title>
            <span>hotel confort ariari</span>
            <h2 id='ItemTitle'>contacto</h2>
          </div>
          <div className="Av-Scroll" data-cinema-scroll>
            <span>desliza para continuar</span>
            <i></i>
          </div>
        </div>
      </section>


      {/* APARTADO 2 - UBICACION */}
      <section class="contact-location" id="ubicacion" aria-labelledby="locationTitle">
        <div class="contact-location__grid">
          <div class="contact-map" data-reveal>
            <iframe
              title="Ubicación del Hotel Confort Ariari en Granada, Meta"
              src="https://www.google.com/maps?q=Hotel%20Confort%20Ariari%2C%20Granada%2C%20Meta&output=embed"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen>
            </iframe>
          </div>

          <div class="contact-welcome" data-reveal>
            <p class="section-eyebrow"><span></span> Te esperamos</p>
            <h2 id="locationTitle">Siempre eres bienvenido en Ariari</h2>
            <p class="contact-welcome__lead">
              En el Hotel Confort Ariari encontrarás atención cercana, descanso y una ubicación ideal para descubrir Granada y la región del Ariari.
            </p>
            <p>
              Ya sea por turismo, trabajo o una celebración especial, nuestro equipo está listo para acompañarte desde antes de tu llegada.
            </p>

            <div class="contact-welcome__details">
              <div class="schedule-card">
                <div class="schedule-card__head">
                  <span>Día</span>
                  <span>Horario de atención</span>
                </div>
                <div><span>Lunes a viernes</span><strong>7:00 a. m. – 8:00 p. m.</strong></div>
                <div><span>Sábados y domingos</span><strong>8:00 a. m. – 6:00 p. m.</strong></div>
                <div><span>Recepción</span><strong>Atención 24 horas</strong></div>
              </div>

              <div class="arrival-list">
                <div>
                  <span class="contact-icon" aria-hidden="true">⌂</span>
                  <p><strong>Ubicación central</strong>Granada, Meta</p>
                </div>
                <div>
                  <span class="contact-icon" aria-hidden="true">P</span>
                  <p><strong>Parqueadero</strong>Disponible para huéspedes</p>
                </div>
                <div>
                  <span class="contact-icon" aria-hidden="true">✓</span>
                  <p><strong>Check-in / Check-out</strong>Consulta con recepción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APARTADO 3.... */}
      <section class="contact-form-section" id="escribenos" aria-labelledby="contactFormTitle">
            <div class="contact-form-section__background" aria-hidden="true">
                <img src="../IMG/1_RESERVAS.png" alt=""/>
            </div>
            <div class="contact-form-section__wash" aria-hidden="true"></div>

            <div class="contact-form-layout">
                <div class="contact-form-card" data-reveal>
                    <p class="section-eyebrow"><span></span> Estamos para ti</p>
                    <h2 id="contactFormTitle">Contáctanos</h2>
                    <p class="contact-form-card__intro">Escríbenos y nuestro equipo estará encantado de atender tu solicitud a la brevedad.</p>

                    <form class="contact-form" id="contactForm" novalidate>
                        <label>
                            <span>Nombre completo</span>
                            <input type="text" name="nombre" autocomplete="name" placeholder="Ingresa tu nombre completo" required/>
                        </label>
                        <label>
                            <span>Correo electrónico</span>
                            <input type="email" name="correo" autocomplete="email" placeholder="Ingresa tu correo electrónico" required/>
                        </label>
                        <label>
                            <span>Teléfono</span>
                            <input type="tel" name="telefono" autocomplete="tel" placeholder="Ingresa tu número de teléfono"/>
                        </label>
                        <label>
                            <span>Asunto</span>
                            <select name="asunto" required>
                                <option value="">Selecciona un asunto</option>
                                <option value="Reserva">Reserva</option>
                                <option value="Habitaciones">Habitaciones</option>
                                <option value="Eventos">Eventos</option>
                                <option value="Bicicletas">Bicicletas</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </label>
                        <label class="contact-form__message">
                            <span>Mensaje</span>
                            <textarea name="mensaje" rows="5" placeholder="Cuéntanos cómo podemos ayudarte..." required></textarea>
                        </label>
                        <button type="submit" class="contact-submit">
                            <span>Enviar mensaje</span>
                            <span aria-hidden="true">↗</span>
                        </button>
                        <p class="contact-form__status" id="contactFormStatus" aria-live="polite"></p>
                    </form>
                </div>

                <aside class="contact-info-stack" aria-label="Información de contacto">
                    <article class="contact-info-card" data-reveal>
                        <span class="contact-icon" aria-hidden="true">⌖</span>
                        <div><small>Ubicación</small><h3>Granada, Meta</h3><p>Región del Ariari, Colombia</p></div>
                    </article>
                    <article class="contact-info-card" data-reveal>
                        <span class="contact-icon" aria-hidden="true">☎</span>
                        <div><small>Atención directa</small><h3>Recepción</h3><p>+57 300 123 4567</p></div>
                    </article>
                    <article class="contact-info-card" data-reveal>
                        <span class="contact-icon" aria-hidden="true">◉</span>
                        <div><small>WhatsApp</small><h3>Respuesta rápida</h3><p>+57 300 123 4567</p></div>
                    </article>
                    <article class="contact-info-card" data-reveal>
                        <span class="contact-icon" aria-hidden="true">✉</span>
                        <div><small>Correo electrónico</small><h3>Reservas</h3><p>reservas@hotelconfortariari.com</p></div>
                    </article>
                    <article class="contact-info-card" data-reveal>
                        <span class="contact-icon" aria-hidden="true">◷</span>
                        <div><small>Horario</small><h3>Recepción 24 horas</h3><p>Atención todos los días</p></div>
                    </article>
                </aside>
            </div>
        </section>
        {/* APARTADO 4 */}
        <section class="contact-cta" data-reveal>
            <span aria-hidden="true">✦</span>
            <h2>¿Listo para tu próxima estadía?</h2>
            <br />
            <p>Consulta disponibilidad y prepara tu visita al corazón del Ariari.</p>
            <a href="/reservas">Ir a reservas <span>↗</span></a>
        </section>
    </>
  )
}

export default Contacto

