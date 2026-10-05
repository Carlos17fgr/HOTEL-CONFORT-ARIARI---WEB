import React, { useState, useEffect, useRef } from "react";
import "./Bicicletas.css"; // <-- Asegúrate de que se llame igual a tu archivo CSS

export default function Bicicletas() {
    // Estados de modales
    const [reservaModalOpen, setReservaModalOpen] = useState(false);
    const [reglasModalOpen, setReglasModalOpen] = useState(false);
    const [selectedBike, setSelectedBike] = useState("");

    // Formulario de reserva
    const [formData, setFormData] = useState({
        nombre: "",
        documento: "",
        habitacion: "",
        tipo: "",
        tiempo: ""
    });
    const [formStatus, setFormStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs para Parallax y Scroll
    const containerRef = useRef(null);
    const heroBgRef = useRef(null);
    const routeImgRef = useRef(null);

    // Bloqueo de scroll al abrir modales
    useEffect(() => {
        const anyModalOpen = reservaModalOpen || reglasModalOpen;
        if (anyModalOpen) {
            document.body.classList.add("is-locked");
        } else {
            document.body.classList.remove("is-locked");
        }
    }, [reservaModalOpen, reglasModalOpen]);

    // Cerrar con Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setReservaModalOpen(false);
                setReglasModalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Parallax
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(window.scrollY, 0);

            // Parallax Hero
            if (heroBgRef.current) {
                const offset = Math.min(currentScrollY * 0.06, 42);
                heroBgRef.current.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.075)`;
            }

            // Parallax Ruta
            if (routeImgRef.current) {
                const routeSection = routeImgRef.current.closest(".bike-route");
                if (routeSection) {
                    const rect = routeSection.getBoundingClientRect();
                    if (rect.bottom > 0 && rect.top < window.innerHeight) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const translate = -9 + progress * 13;
                        routeImgRef.current.style.transform = `translate3d(0, ${translate.toFixed(2)}%, 0) scale(1.03)`;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // IntersectionObserver para las animaciones reveal
    useEffect(() => {
        if (!containerRef.current) return;

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16, rootMargin: "0px 0px -7% 0px" });

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-entered");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });

        const reveals = containerRef.current.querySelectorAll("[data-reveal]");
        reveals.forEach((el) => revealObserver.observe(el));

        const sections = containerRef.current.querySelectorAll("[data-section-reveal]");
        sections.forEach((el) => sectionObserver.observe(el));

        return () => {
            revealObserver.disconnect();
            sectionObserver.disconnect();
        };
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus("Solicitud preparada. La integración con recepción se conectará más adelante.");

        setTimeout(() => {
            setIsSubmitting(false);
        }, 1400);
    };

    const handleSelectBikeModal = (bikeName) => {
        setSelectedBike(bikeName);
        setFormData((prev) => ({ ...prev, tipo: bikeName }));
        setReservaModalOpen(true);
    };

    return (
        <div ref={containerRef} className="bike-page-wrapper">
            <main>
                {/* HERO */}
                <section className="bike-hero" id="inicioBicicletas" aria-labelledby="bikeHeroTitle">
                    <div className="bike-hero__background" aria-hidden="true">
                        <img ref={heroBgRef} src="/IMG/piscinaw.jpg" alt="" />
                    </div>
                    <div className="bike-hero__wash" aria-hidden="true"></div>
                    <div className="bike-hero__grain" aria-hidden="true"></div>

                    <div className="bike-hero__content">
                        <div className="bike-hero__copy" data-reveal>
                            <p className="section-eyebrow"><span></span> Servicio exclusivo</p>
                            <h1 id="bikeHeroTitle">Renta de<br /><em>bicicletas</em></h1>
                            <p className="bike-hero__description">
                                Recorre Granada y descubre el Ariari a tu propio ritmo. Un servicio de cortesía para huéspedes, con acompañamiento y recomendaciones de ruta.
                            </p>

                            <div className="bike-features" aria-label="Beneficios del servicio">
                                <div className="bike-feature">
                                    <span className="bike-feature__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24"><circle cx="6" cy="17" r="3.2" /><circle cx="18" cy="17" r="3.2" /><path d="M6 17l4-8h3l5 8M9 12h6M10 9H7" /></svg>
                                    </span>
                                    <span><strong>Bicicletas</strong> revisadas</span>
                                </div>
                                <div className="bike-feature">
                                    <span className="bike-feature__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24"><path d="M4 19V6l5-2 6 2 5-2v13l-5 2-6-2-5 2Z" /><path d="M9 4v13M15 6v13" /><circle cx="12" cy="11" r="1.5" /></svg>
                                    </span>
                                    <span><strong>Rutas</strong> recomendadas</span>
                                </div>
                                <div className="bike-feature">
                                    <span className="bike-feature__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24"><path d="M12 3a7 7 0 0 0-7 7v3h14v-3a7 7 0 0 0-7-7Z" /><path d="M7 13v2a5 5 0 0 0 10 0v-2M9 9h6" /></svg>
                                    </span>
                                    <span><strong>Casco</strong> incluido</span>
                                </div>
                            </div>
                        </div>

                        <div className="bike-hero__visual" data-reveal aria-hidden="true">
                            <div className="bike-hero__halo"></div>
                            <img src="/IMG/BICI.png" alt="" className="bike-hero__bike" />
                            <span className="bike-hero__label">Explora · Respira · Descubre</span>
                        </div>
                    </div>

                    <div className="bike-booking-bar" data-reveal>
                        <div className="bike-booking-item">
                            <span className="bike-booking-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                            </span>
                            <span><small>Horario de atención</small><strong>8:00 a. m. – 6:00 p. m.</strong></span>
                        </div>
                        <div className="bike-booking-item">
                            <span className="bike-booking-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24"><path d="M4 4h12l4 4-9 9-7-7V4Z" /><circle cx="9" cy="8" r="1" /></svg>
                            </span>
                            <span><small>Tarifa para huéspedes</small><strong>Sin costo adicional</strong></span>
                        </div>
                        <div className="bike-booking-item">
                            <span className="bike-booking-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M14 16a5 5 0 0 1 7 4" /></svg>
                            </span>
                            <span><small>Disponibilidad</small><strong>Sujeta a recepción</strong></span>
                        </div>
                        <button className="primary-button" type="button" onClick={() => setReservaModalOpen(true)}>
                            <span>Reservar bicicleta</span><span aria-hidden="true">→</span>
                        </button>
                    </div>
                </section>

                {/* SELECCIÓN DE BICICLETAS */}
                <section className="bike-selection" id="bicicletasDisponibles" aria-labelledby="bikeSelectionTitle" data-section-reveal>
                    <div className="bike-selection__heading" data-reveal>
                        <p className="section-eyebrow section-eyebrow--center"><span></span> Tu recorrido comienza aquí <span></span></p>
                        <h2 id="bikeSelectionTitle">Elige cómo quieres explorar</h2>
                        <p>Selecciona una opción y confirma la disponibilidad directamente con recepción.</p>
                    </div>

                    <div className="bike-card-grid">
                        <article className="bike-card" data-reveal>
                            <div className="bike-card__number">01</div>
                            <div className="bike-card__image">
                                <span className="bike-card__circle" aria-hidden="true"></span>
                                <img src="/IMG/BICI.png" alt="Bicicleta montañera disponible en el hotel" loading="lazy" />
                            </div>
                            <div className="bike-card__content">
                                <div>
                                    <p className="bike-card__tag">Senderos y recorridos largos</p>
                                    <h3>Montañera</h3>
                                    <p>Mayor estabilidad para caminos mixtos y recorridos por los alrededores de Granada.</p>
                                </div>
                                <button type="button" className="secondary-button" onClick={() => handleSelectBikeModal("Montañera")}>
                                    Seleccionar <span>↗</span>
                                </button>
                            </div>
                        </article>

                        <article className="bike-card bike-card--featured" data-reveal>
                            <div className="bike-card__number">02</div>
                            <div className="bike-card__image bike-card__image--photo">
                                <img src="/IMG/15.jpeg" alt="Bicicletas urbanas disponibles en el hotel" loading="lazy" />
                            </div>
                            <div className="bike-card__content">
                                <div>
                                    <p className="bike-card__tag">Paseos tranquilos</p>
                                    <h3>Urbana</h3>
                                    <p>Cómoda, ligera y perfecta para conocer el pueblo y realizar trayectos cortos.</p>
                                </div>
                                <button type="button" className="secondary-button" onClick={() => handleSelectBikeModal("Urbana")}>
                                    Seleccionar <span>↗</span>
                                </button>
                            </div>
                        </article>

                        <article className="bike-card" data-reveal>
                            <div className="bike-card__number">03</div>
                            <div className="bike-card__image bike-card__image--soft">
                                <span className="bike-card__circle" aria-hidden="true"></span>
                                <img src="/IMG/BICI.png" alt="Bicicleta para recorridos familiares" loading="lazy" />
                            </div>
                            <div className="bike-card__content">
                                <div>
                                    <p className="bike-card__tag">Recorrido acompañado</p>
                                    <h3>Familiar</h3>
                                    <p>Una alternativa cómoda para paseos calmados, siempre según talla y disponibilidad.</p>
                                </div>
                                <button type="button" className="secondary-button" onClick={() => handleSelectBikeModal("Familiar")}>
                                    Seleccionar <span>↗</span>
                                </button>
                            </div>
                        </article>
                    </div>
                </section>

                {/* RUTA */}
                <section className="bike-route" aria-labelledby="bikeRouteTitle">
                    <div className="bike-route__media" aria-hidden="true">
                        <img ref={routeImgRef} src="/IMG/hotel-confort-ariari-exterior-f8c2f2a.jpg" alt="" />
                    </div>
                    <div className="bike-route__overlay" aria-hidden="true"></div>
                    <div className="bike-route__content" data-reveal>
                        <p className="section-eyebrow section-eyebrow--light"><span></span> Antes de salir</p>
                        <h2 id="bikeRouteTitle">Pedalea con calma.<br />Nosotros te orientamos.</h2>
                        <p>En recepción te indicamos rutas sugeridas, condiciones del servicio y recomendaciones para disfrutar el recorrido de forma segura.</p>
                        <button type="button" className="outline-button" id="abrirReglas" onClick={() => setReglasModalOpen(true)}>
                            Ver reglas y horarios <span>↗</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* MODAL DE RESERVAS */}
            <div className={`modal ${reservaModalOpen ? "is-open" : ""}`} id="reservaModal" aria-hidden={!reservaModalOpen} role="dialog" aria-modal="true" aria-labelledby="reservaModalTitulo">
                <div className="modal__backdrop" onClick={() => setReservaModalOpen(false)}></div>
                <div className="modal__panel">
                    <button className="modal__close" type="button" onClick={() => setReservaModalOpen(false)} aria-label="Cerrar formulario">
                        <span></span>
                        <span></span>
                    </button>
                    <p className="section-eyebrow"><span></span> Solicitud de servicio</p>
                    <h2 id="reservaModalTitulo">Reserva tu bicicleta</h2>
                    <p className="modal__intro">Completa los datos básicos. La recepción confirmará disponibilidad y horario.</p>

                    <form className="bike-form" id="bikeReservationForm" onSubmit={handleFormSubmit}>
                        <label>
                            <span>Nombre completo</span>
                            <input
                                type="text"
                                name="nombre"
                                autoComplete="name"
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </label>
                        <div className="bike-form__row">
                            <label>
                                <span>Documento</span>
                                <input
                                    type="text"
                                    name="documento"
                                    inputMode="numeric"
                                    required
                                    value={formData.documento}
                                    onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                                />
                            </label>
                            <label>
                                <span>Habitación</span>
                                <input
                                    type="text"
                                    name="habitacion"
                                    required
                                    value={formData.habitacion}
                                    onChange={(e) => setFormData({ ...formData, habitacion: e.target.value })}
                                />
                            </label>
                        </div>
                        <div className="bike-form__row">
                            <label>
                                <span>Tipo de bicicleta</span>
                                <select
                                    name="tipo"
                                    id="tipoBicicleta"
                                    required
                                    value={formData.tipo || selectedBike}
                                    onChange={(e) => {
                                        setFormData({ ...formData, tipo: e.target.value });
                                        setSelectedBike(e.target.value);
                                    }}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="Montañera">Montañera</option>
                                    <option value="Urbana">Urbana</option>
                                    <option value="Familiar">Familiar</option>
                                </select>
                            </label>
                            <label>
                                <span>Tiempo estimado</span>
                                <select
                                    name="tiempo"
                                    required
                                    value={formData.tiempo}
                                    onChange={(e) => setFormData({ ...formData, tiempo: e.target.value })}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="1 hora">1 hora</option>
                                    <option value="2 horas">2 horas</option>
                                    <option value="3 horas">3 horas</option>
                                </select>
                            </label>
                        </div>
                        <button className="primary-button primary-button--full" type="submit" disabled={isSubmitting}>
                            <span>Enviar solicitud</span><span aria-hidden="true">→</span>
                        </button>
                        <p className="bike-form__status" id="bikeFormStatus" aria-live="polite">
                            {formStatus}
                        </p>
                    </form>
                </div>
            </div>

            {/* MODAL DE REGLAS */}
            <div className={`modal ${reglasModalOpen ? "is-open" : ""}`} id="reglasModal" aria-hidden={!reglasModalOpen} role="dialog" aria-modal="true" aria-labelledby="reglasModalTitulo">
                <div className="modal__backdrop" onClick={() => setReglasModalOpen(false)}></div>
                <div className="modal__panel modal__panel--rules">
                    <button className="modal__close" type="button" onClick={() => setReglasModalOpen(false)} aria-label="Cerrar reglas">
                        <span></span>
                        <span></span>
                    </button>
                    <p className="section-eyebrow"><span></span> Información importante</p>
                    <h2 id="reglasModalTitulo">Reglas y horarios</h2>
                    <ol className="rules-list">
                        <li><span>01</span>Servicio exclusivo para huéspedes registrados del hotel.</li>
                        <li><span>02</span>El préstamo depende de la disponibilidad y se confirma en recepción.</li>
                        <li><span>03</span>El usuario debe portar casco y devolver la bicicleta en el horario acordado.</li>
                        <li><span>04</span>Antes de salir se revisa el estado de la bicicleta junto con el huésped.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}