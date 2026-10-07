import React, { useState, useEffect, useRef } from "react";
import "./Reservas.css";

// =========================================================================
// 1. UTILIDADES Y CONSTANTES
// =========================================================================
const formatCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
const money = (val) => formatCOP.format(val || 0).replace("COP", "COP ").trim();

const isSameDay = (d1, d2) =>
  Boolean(d1 && d2) &&
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const dateDiffNights = (start, end) =>
  Math.max(1, Math.round((end - start) / 86400000));

const toISODate = (date) => {
  if (!date) return "";
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 10);
};

const parseLocalDate = (value) => {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const formatShortDate = (date) =>
  date
    ? date
        .toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
        .replace(/\./g, "")
    : "";

// DATOS DE HABITACIONES
const ROOMS_DATA = [
  {
    id: "superior",
    type: "habitaciones",
    title: "Habitación Superior",
    image: "/IMG/reserva/habitacionone.jpg",
    guests: "2 adultos",
    capacity: 2,
    description: "Espacio confortable con diseño cálido, cama amplia y ambiente sereno para descansar después de recorrer el Ariari.",
    inclusions: ["Desayuno americano incluido", "WiFi de alta velocidad", "Aire acondicionado"],
    price: 420000,
    discount: "-15%",
    available: true,
  },
  {
    id: "deluxe",
    type: "habitaciones",
    title: "Habitación Deluxe con Balcón",
    image: "/IMG/reserva/habitaciontwo.jpg",
    guests: "2 adultos",
    capacity: 2,
    description: "Amplia, luminosa y preparada para una estadía especial, con balcón privado y detalles pensados para tu comodidad.",
    inclusions: ["Desayuno americano incluido", "Balcón privado", "Vista exterior"],
    price: 560000,
    discount: "-20%",
    available: true,
  },
  {
    id: "familiar",
    type: "familiares",
    title: "Habitación Familiar",
    image: "/IMG/reserva/habitacionthree.jpg",
    guests: "4 personas",
    capacity: 4,
    description: "Una alternativa cómoda para familias o grupos pequeños, con mayor amplitud y distribución práctica.",
    inclusions: ["Desayuno americano incluido", "Capacidad familiar", "Acompañamiento recepción"],
    price: 480000,
    discount: "Agotada",
    available: false,
  },
];

// DATOS DE EXTRAS
const EXTRAS_DATA = [
  {
    id: "desayuno",
    title: "Desayuno en la habitación",
    icon: "☕",
    image: "/IMG/12.jpeg",
    description: "Recibe un desayuno preparado para iniciar el día con calma, sin salir de tu habitación.",
    price: 38000,
    unit: "por persona",
  },
  {
    id: "detalle",
    title: "Detalle especial",
    icon: "✦",
    image: "/IMG/img4.jpg",
    description: "Decoración sencilla y elegante para cumpleaños, aniversarios o una llegada especial.",
    price: 65000,
    unit: "por reserva",
  },
  {
    id: "bicicletas",
    title: "Ruta en bicicleta",
    icon: "⌁",
    image: "/IMG/15.jpeg",
    description: "Consulta en recepción rutas recomendadas para recorrer Granada con tranquilidad.",
    price: 0,
    unit: "cortesía según disponibilidad",
  },
  {
    id: "late",
    title: "Late check-out",
    icon: "◷",
    image: "/IMG/1_RESERVAS.png",
    description: "Extiende tu salida para descansar un poco más. Sujeto a disponibilidad del hotel.",
    price: 45000,
    unit: "por habitación",
  },
];

// =========================================================================
// 2. COMPONENTE: HERO Y CALENDARIO
// =========================================================================
const HeroCalendar = ({ checkIn, checkOut, onSelectDates, onUnlockFlow }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(new Date(checkIn.getFullYear(), checkIn.getMonth(), 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthLabel = viewDate.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
  const hasCompleteRange = checkIn && checkOut && checkOut > checkIn;

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleDayClick = (dayNumber) => {
    const selected = new Date(year, month, dayNumber);
    if (selected < addDays(today, 1)) return;

    if (!checkIn || hasCompleteRange || selected <= checkIn) {
      onSelectDates(selected, null);
    } else {
      onSelectDates(checkIn, selected);
    }
  };

  return (
    <section className="booking-hero booking-hero--cinematic" id="reservaInicio">
      <div className="booking-hero__media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster="/IMG/1_RESERVAS.png">
          <source src="/VIDEOS/Luxury Hotel Video Reel 2023.mp4" type="video/mp4" />
        </video>
        <img src="/IMG/1_RESERVAS.png" alt="" />
      </div>
      <div className="booking-hero__veil" aria-hidden="true"></div>

      <div className="booking-arrival-card is-visible">
        <div className="booking-arrival-card__top">
          <div>
            <small>Llegada</small>
            <strong>{checkIn ? checkIn.toLocaleDateString("es-CO", { day: "numeric", month: "long" }) : "Selecciona llegada"}</strong>
          </div>
          <div>
            <small>Salida</small>
            <strong>{checkOut ? checkOut.toLocaleDateString("es-CO", { day: "numeric", month: "long" }) : "Selecciona salida"}</strong>
          </div>
        </div>

        <div className="booking-calendar" aria-label="Calendario de reserva">
          <div className="booking-calendar__head">
            <button type="button" onClick={handlePrevMonth} aria-label="Mes anterior">‹</button>
            <strong>{monthLabel}</strong>
            <button type="button" onClick={handleNextMonth} aria-label="Mes siguiente">›</button>
          </div>

          <div className="booking-calendar__week" aria-hidden="true">
            <span>LU</span><span>MA</span><span>MI</span><span>JU</span><span>VI</span><span>SA</span><span>DO</span>
          </div>

          <div className="booking-calendar__days">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <span key={`blank-${i}`}></span>
            ))}
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
              const date = new Date(year, month, day);
              const isPast = date < addDays(today, 1);
              const isStart = isSameDay(date, checkIn);
              const isEnd = isSameDay(date, checkOut);
              const isInRange = checkIn && checkOut && date > checkIn && date < checkOut;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(day)}
                  className={`${isStart ? "is-start" : ""} ${isEnd ? "is-end" : ""} ${isInRange ? "is-in-range" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="booking-calendar__note">
            Selecciona fecha de entrada y salida. La disponibilidad se actualiza automáticamente en el siguiente paso.
          </p>
        </div>

        <button
          className={`booking-arrival-card__button ${!hasCompleteRange ? "is-disabled" : ""}`}
          type="button"
          disabled={!hasCompleteRange}
          onClick={onUnlockFlow}
        >
          Buscar disponibilidad <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

// =========================================================================
// 4. COMPONENTE: BARRA DE HERRAMIENTAS (TOOLBAR)
// =========================================================================
const BookingToolbar = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  adults,
  childrenCount,
  childAges,
  onUpdateGuests,
  onApplyPromo,
}) => {
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const guestRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const guestsSummary = `${adults} ${adults === 1 ? "adulto" : "adultos"}${
    childrenCount > 0 ? `, ${childrenCount} ${childrenCount === 1 ? "niño" : "niños"}` : ""
  }`;

  return (
    <div className={`booking-toolbar is-visible ${isGuestOpen ? "has-open-guests" : ""}`}>
      <label className="toolbar-field toolbar-field--date">
        <span className="toolbar-icon" aria-hidden="true">⌑</span>
        <span className="toolbar-copy">
          <small>Check-in</small>
          <input
            type="date"
            value={toISODate(checkIn)}
            min={toISODate(addDays(new Date(), 1))}
            onChange={(e) => onCheckInChange(parseLocalDate(e.target.value))}
          />
        </span>
      </label>

      <label className="toolbar-field toolbar-field--date">
        <span className="toolbar-icon" aria-hidden="true">⌑</span>
        <span className="toolbar-copy">
          <small>Check-out</small>
          <input
            type="date"
            value={toISODate(checkOut)}
            min={toISODate(checkIn ? addDays(checkIn, 1) : addDays(new Date(), 2))}
            onChange={(e) => onCheckOutChange(parseLocalDate(e.target.value))}
          />
        </span>
      </label>

      <div className={`guest-selector ${isGuestOpen ? "is-open" : ""}`} ref={guestRef}>
        <button
          className="guest-trigger"
          type="button"
          aria-expanded={isGuestOpen}
          onClick={() => setIsGuestOpen(!isGuestOpen)}
        >
          <span className="toolbar-icon" aria-hidden="true">◌</span>
          <span className="toolbar-copy">
            <small>Ocupación</small>
            <strong>{guestsSummary}</strong>
          </span>
        </button>

        {isGuestOpen && (
          <div className="guest-panel" aria-label="Seleccionar huéspedes">
            <div className="guest-row">
              <div>
                <strong>Adultos</strong>
                <small>Desde 13 años</small>
              </div>
              <div className="guest-counter">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={() => onUpdateGuests(adults - 1, childrenCount, childAges)}
                >
                  −
                </button>
                <b>{adults}</b>
                <button
                  type="button"
                  disabled={adults >= 6}
                  onClick={() => onUpdateGuests(adults + 1, childrenCount, childAges)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="guest-row">
              <div>
                <strong>Niños</strong>
                <small>0 a 12 años</small>
              </div>
              <div className="guest-counter">
                <button
                  type="button"
                  disabled={childrenCount <= 0}
                  onClick={() => {
                    const newAges = childAges.slice(0, childrenCount - 1);
                    onUpdateGuests(adults, childrenCount - 1, newAges);
                  }}
                >
                  −
                </button>
                <b>{childrenCount}</b>
                <button
                  type="button"
                  disabled={childrenCount >= 5}
                  onClick={() => {
                    const newAges = [...childAges, 6];
                    onUpdateGuests(adults, childrenCount + 1, newAges);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {childrenCount > 0 && (
              <div className="child-ages">
                <p>Edad de los niños</p>
                {childAges.map((age, idx) => (
                  <label key={idx}>
                    <span>Niño {idx + 1}</span>
                    <select
                      value={age}
                      onChange={(e) => {
                        const newAges = [...childAges];
                        newAges[idx] = Number(e.target.value);
                        onUpdateGuests(adults, childrenCount, newAges);
                      }}
                    >
                      {Array.from({ length: 13 }, (_, i) => (
                        <option key={i} value={i}>
                          {i} {i === 1 ? "año" : "años"}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="promo-field">
        <input
          type="text"
          placeholder="Código promocional"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
        />
        <button
          type="button"
          aria-label="Aplicar código"
          onClick={() => onApplyPromo(promoInput)}
        >
          →
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// 5. PASO 1: SELECCIÓN DE HABITACIONES
// =========================================================================
const StepRooms = ({ selectedRoom, onSelectRoom, nights }) => {
  const [filter, setFilter] = useState("all");

  const filteredRooms = ROOMS_DATA.filter(
    (room) => filter === "all" || room.type === filter
  );

  return (
    <section className="booking-panel is-visible">
      <div className="booking-section-head is-visible">
        <div>
          <p className="booking-eyebrow"><span></span> Disponibilidad</p>
          <h2>Elige tu habitación</h2>
          <p>Habitaciones preparadas para descansar en Granada, Meta. Selecciona una opción para continuar.</p>
        </div>
      </div>

      <div className="booking-benefits is-visible">
        <span><i>◇</i> Mejor tarifa garantizada</span>
        <span><i>✦</i> Reserva directa, más beneficios</span>
        <span><i>☏</i> Acompañamiento por WhatsApp</span>
        <span><i>⌁</i> WiFi de alta velocidad</span>
      </div>

      <div className="booking-filters is-visible">
        <span>Filtrar por:</span>
        <button
          className={filter === "all" ? "is-active" : ""}
          type="button"
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={filter === "habitaciones" ? "is-active" : ""}
          type="button"
          onClick={() => setFilter("habitaciones")}
        >
          Habitaciones
        </button>
        <button
          className={filter === "familiares" ? "is-active" : ""}
          type="button"
          onClick={() => setFilter("familiares")}
        >
          Familiares
        </button>
      </div>

      <div className="room-grid is-visible">
        {filteredRooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          return (
            <article
              key={room.id}
              className={`room-card ${isSelected ? "is-selected" : ""} ${!room.available ? "is-unavailable" : ""}`}
            >
              <div className="room-card__image">
                <img src={room.image} alt={room.title} loading="lazy" />
                <span className="room-card__badge">{room.discount}</span>
              </div>
              <div className="room-card__body">
                <h3>{room.title}</h3>
                <div className="room-card__meta">
                  <span>{room.guests}</span>
                  <span>{nights} {nights === 1 ? "noche" : "noches"}</span>
                </div>
                <p>{room.description}</p>
                <div className="room-card__links">
                  <span>Más info</span>
                  <span>Ver calendario</span>
                </div>
                <div className="room-card__inclusions">
                  {room.inclusions.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>
                <div className="room-card__bottom">
                  <div className="room-card__price">
                    <small>Desde</small>
                    <strong>{money(room.price)}</strong>
                    <span>por noche</span>
                  </div>
                  <button
                    className="room-card__select"
                    type="button"
                    disabled={!room.available}
                    onClick={() => onSelectRoom(room)}
                  >
                    {isSelected ? "Elegida" : !room.available ? "Agotada" : "Seleccionar"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

// =========================================================================
// 6. PASO 2: EXTRAS
// =========================================================================
const StepExtras = ({ extrasState, onUpdateExtra, onGoStep, extrasTotal, selectedRoom }) => {
  return (
    <section className="booking-panel is-visible">
      <div className="booking-section-head is-visible">
        <button className="back-link" type="button" onClick={() => onGoStep(1)} aria-label="Volver">←</button>
        <div>
          <p className="booking-eyebrow"><span></span> Detalles de estadía</p>
          <h2>Agrega extras</h2>
          <p>Completa tu visita con experiencias y servicios opcionales. Puedes continuar sin agregar extras.</p>
        </div>
      </div>

      <div className="extras-grid is-visible">
        {EXTRAS_DATA.map((extra) => (
          <article key={extra.id} className="extra-card">
            <div className="extra-card__image">
              <img src={extra.image} alt={extra.title} loading="lazy" />
            </div>
            <div className="extra-card__body">
              <span className="extra-card__icon" aria-hidden="true">{extra.icon}</span>
              <h3>{extra.title}</h3>
              <p>{extra.description}</p>
              <div className="extra-card__footer">
                <div className="extra-card__price">
                  <strong>{extra.price === 0 ? "Cortesía" : money(extra.price)}</strong>
                  <small>{extra.unit}</small>
                </div>
                <div className="extra-counter">
                  <button
                    type="button"
                    onClick={() => onUpdateExtra(extra.id, Math.max(0, (extrasState[extra.id] || 0) - 1))}
                  >
                    −
                  </button>
                  <b>{extrasState[extra.id] || 0}</b>
                  <button
                    type="button"
                    onClick={() => onUpdateExtra(extra.id, Math.min(6, (extrasState[extra.id] || 0) + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="booking-bottom-bar is-visible">
        <div>
          <span>Total extras</span>
          <strong>{money(extrasTotal)}</strong>
          <small>{selectedRoom ? selectedRoom.title : "Selecciona una habitación para continuar"}</small>
        </div>
        <button className="gold-button" type="button" onClick={() => onGoStep(3)}>
          Continuar <span>→</span>
        </button>
      </div>
    </section>
  );
};

// =========================================================================
// 7. PASO 3: CONFIRMACIÓN Y CHECKOUT
// =========================================================================
const StepCheckout = ({ selectedRoom, onGoStep, checkIn, checkOut, guestsSummary }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    documento: "",
    ciudad: "",
    llegada: "",
    motivo: "",
    mensaje: "",
    terms: false,
    privacy: false,
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms || !formData.privacy) {
      alert("Debes aceptar los términos y el tratamiento de datos.");
      return;
    }
    setStatusMessage("¡Solicitud enviada con éxito! Nos comunicaremos contigo vía WhatsApp o llamada.");
  };

  return (
    <section className="booking-panel is-visible">
      <div className="booking-section-head is-visible">
        <button className="back-link" type="button" onClick={() => onGoStep(2)} aria-label="Volver">←</button>
        <div>
          <p className="booking-eyebrow"><span></span> Último paso</p>
          <h2>Confirma tu estancia</h2>
          <p>Revisa los datos de tu reserva. La confirmación se enviará a recepción.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <form className="checkout-card is-visible" onSubmit={handleSubmit}>
          {selectedRoom && (
            <div className="selected-room-strip">
              <img src={selectedRoom.image} alt={selectedRoom.title} />
              <div>
                <h3>{selectedRoom.title}</h3>
                <p>{formatShortDate(checkIn)} → {formatShortDate(checkOut)} · {guestsSummary}</p>
              </div>
              <button type="button" onClick={() => onGoStep(1)}>Cambiar</button>
            </div>
          )}

          <div className="help-strip">
            <span aria-hidden="true">☎</span>
            <p>Si necesitas ayuda, recepción puede acompañarte por llamada o WhatsApp antes de confirmar.</p>
          </div>

          <div className="form-card">
            <div className="form-card__top">
              <h3>Datos del huésped</h3>
              <span>Transacción segura</span>
            </div>

            <div className="form-grid">
              <label>
                <span>Nombre del huésped *</span>
                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" />
              </label>
              <label>
                <span>Apellidos *</span>
                <input type="text" name="apellidos" required value={formData.apellidos} onChange={handleChange} placeholder="Tus apellidos" />
              </label>
              <label>
                <span>Correo electrónico *</span>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
              </label>
              <label>
                <span>Teléfono *</span>
                <input type="tel" name="telefono" required value={formData.telefono} onChange={handleChange} placeholder="+57 300 000 0000" />
              </label>
              <label>
                <span>Documento *</span>
                <input type="text" name="documento" required value={formData.documento} onChange={handleChange} placeholder="Número de documento" />
              </label>
              <label>
                <span>Ciudad *</span>
                <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} placeholder="Ciudad de residencia" />
              </label>
              <label>
                <span>Hora de llegada *</span>
                <select name="llegada" required value={formData.llegada} onChange={handleChange}>
                  <option value="">Selecciona una hora</option>
                  <option>Antes de 12:00 p. m.</option>
                  <option>12:00 p. m. - 3:00 p. m.</option>
                  <option>3:00 p. m. - 6:00 p. m.</option>
                  <option>Después de 6:00 p. m.</option>
                </select>
              </label>
              <label>
                <span>Motivo del viaje *</span>
                <select name="motivo" required value={formData.motivo} onChange={handleChange}>
                  <option value="">Selecciona</option>
                  <option>Descanso</option>
                  <option>Negocios</option>
                  <option>Evento</option>
                  <option>Turismo</option>
                </select>
              </label>
              <label className="form-grid__full">
                <span>Solicitud especial</span>
                <textarea name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos si necesitas algo especial"></textarea>
              </label>
            </div>

            <label className="check-line">
              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
              <span>He leído y acepto los términos y condiciones de reserva.</span>
            </label>
            <label className="check-line">
              <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} required />
              <span>Acepto el tratamiento de mis datos personales.</span>
            </label>

            <button className="gold-button gold-button--full" type="submit">
              <span>Enviar solicitud y confirmar</span> <span aria-hidden="true">→</span>
            </button>
            {statusMessage && <p className="form-status">{statusMessage}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

// =========================================================================
// 8. BARRA LATERAL: STEPPER Y RESUMEN
// =========================================================================
const BookingSidebar = ({ currentStep, onGoStep, checkIn, checkOut, nights, guestsSummary, childAges, selectedRoom, extrasState, discount }) => {
  const extrasTotal = EXTRAS_DATA.reduce((acc, ex) => acc + ex.price * (extrasState[ex.id] || 0), 0);
  const roomPrice = (selectedRoom?.price || 0) * nights;
  const subtotal = roomPrice + extrasTotal;
  const taxes = Math.round(subtotal * 0.1);
  const total = Math.max(0, subtotal + taxes - discount);

  const activeExtras = EXTRAS_DATA.filter((ex) => (extrasState[ex.id] || 0) > 0);

  return (
    <aside className="booking-progress is-visible">
      <div className="booking-progress__logo">
        <img src="/IMG/logos/logo-hca-premium.png" alt="Hotel Confort Ariari" />
        <span>Pago seguro · Datos protegidos</span>
      </div>

      <ol className="progress-steps" id="progressSteps">
        <li className={currentStep === 1 ? "is-active" : currentStep > 1 ? "is-complete" : ""}>
          <button type="button" onClick={() => onGoStep(1)}>
            <span>01</span>
            <strong>Habitación</strong>
            <small>Elige tu espacio</small>
          </button>
        </li>
        <li className={currentStep === 2 ? "is-active" : currentStep > 2 ? "is-complete" : ""}>
          <button type="button" onClick={() => onGoStep(2)}>
            <span>02</span>
            <strong>Extras</strong>
            <small>Personaliza tu visita</small>
          </button>
        </li>
        <li className={currentStep === 3 ? "is-active" : ""}>
          <button type="button" onClick={() => onGoStep(3)}>
            <span>03</span>
            <strong>Confirmación</strong>
            <small>Datos y resumen</small>
          </button>
        </li>
      </ol>

      <div className="summary-card is-visible" style={{ marginTop: "20px" }}>
        <div className="summary-card__top">
          <div>
            <h3>Resumen</h3>
            <small>Hotel Confort Ariari</small>
          </div>
          <small>{currentStep}/3</small>
        </div>

        <div className="summary-row">
          <span>Fechas</span>
          <strong>{formatShortDate(checkIn)} → {formatShortDate(checkOut)}</strong>
        </div>
        <div className="summary-row">
          <span>Noches</span>
          <strong>{nights}</strong>
        </div>
        <div className="summary-row">
          <span>Huéspedes</span>
          <strong>{guestsSummary}</strong>
        </div>
        {childAges.length > 0 && (
          <div className="summary-row summary-row--muted">
            <span>Niños</span>
            <strong>{childAges.map((a) => `${a} años`).join(", ")}</strong>
          </div>
        )}
        <div className="summary-row">
          <span>Habitación</span>
          <strong>{selectedRoom ? selectedRoom.title : "Pendiente"}</strong>
        </div>
        {activeExtras.length > 0 && (
          <div className="summary-row summary-row--muted">
            <span>Extras</span>
            <strong>{activeExtras.map((e) => `${e.title} x${extrasState[e.id]}`).join(", ")}</strong>
          </div>
        )}
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{money(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Impuestos (10%)</span>
          <strong>{money(taxes)}</strong>
        </div>
        {discount > 0 && (
          <div className="summary-row">
            <span>Descuento</span>
            <strong>- {money(discount)}</strong>
          </div>
        )}
        <div className="summary-row summary-row--total">
          <span>Total</span>
          <strong>{money(total)}</strong>
        </div>
        <div className="summary-note">
          <b>✓</b>
          <span>La reserva queda lista para conectar con recepción o pasarela de pago.</span>
        </div>
      </div>
    </aside>
  );
};

// =========================================================================
// 9. FOOTER INTERACTIVO CON CANVAS
// =========================================================================
const FooterCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame = null;
    const flowers = [];

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Flower {
      constructor() {
        this.radius = 16 + Math.random() * 8;
        this.speed = 0.4 + Math.random() * 0.4;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
        this.rotation = Math.random() * Math.PI;
      }
      update() {
        this.y -= this.speed;
        this.rotation += 0.005;
        if (this.y < -this.radius * 2) {
          this.y = canvas.height + this.radius * 2;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "#F1C280";
        for (let i = 0; i < 12; i++) {
          ctx.rotate((Math.PI * 2) / 12);
          ctx.beginPath();
          ctx.ellipse(0, -this.radius * 0.7, this.radius * 0.25, this.radius * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#231510";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 7; i++) flowers.push(new Flower());

    const animate = () => {
      ctx.fillStyle = "#2B1714";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      flowers.forEach((f) => {
        f.update();
        f.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="footer-container">
      <div className="header-background-js">
        <canvas ref={canvasRef} id="fondoAnimado"></canvas>
      </div>

      <div className="footer-content">
        <div className="logo-container">
          <img src="/IMG/logos/logo-hca-premium.png" alt="Logo HCA" className="logo-img" />
        </div>
        <div className="social-links">
          <a href="#" className="social-icon" aria-label="Facebook"><img src="/IMG/facebook (1).png" alt="Facebook" className="icon-img" /></a>
          <a href="#" className="social-icon" aria-label="WhatsApp"><img src="/IMG/whatsapp 2.png" alt="WhatsApp" className="icon-img" /></a>
          <a href="#" className="social-icon" aria-label="Correo"><img src="/IMG/sobre-de-correo-electronico.png" alt="Correo" className="icon-img" /></a>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#conocenos">Conócenos</a></li>
            <li><a href="#cuartos">Habitaciones</a></li>
            <li><a href="#reservas">Reservas</a></li>
            <li><a href="#gastronomia">Gastronomía</a></li>
            <li><a href="#eventos">Eventos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="header-credits">
          <p>Derechos reservados diseño - Samuel Rojas - 2026</p>
        </div>
      </div>
    </footer>
  );
};

// =========================================================================
// 10. COMPONENTE PRINCIPAL (EXPORTADO)
// =========================================================================
export default function Reservas() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ESTADO GLOBAL COMPLETO
  const [checkIn, setCheckIn] = useState(addDays(today, 1));
  const [checkOut, setCheckOut] = useState(addDays(today, 2));
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS_DATA[1]); // Deluxe preseleccionada
  const [extrasState, setExtrasState] = useState(
    Object.fromEntries(EXTRAS_DATA.map((e) => [e.id, 0]))
  );
  const [isFlowUnlocked, setIsFlowUnlocked] = useState(false);

  const nights = checkIn && checkOut ? dateDiffNights(checkIn, checkOut) : 1;
  const guestsSummary = `${adults} ${adults === 1 ? "adulto" : "adultos"}${
    childrenCount > 0 ? `, ${childrenCount} ${childrenCount === 1 ? "niño" : "niños"}` : ""
  }`;

  const handleSelectDates = (start, end) => {
    setCheckIn(start);
    setCheckOut(end);
  };

  const handleUnlockFlow = () => {
    setIsFlowUnlocked(true);
    setTimeout(() => {
      document.getElementById("bookingFlow")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setCurrentStep(2); // Avanza automáticamente al paso 2
    document.getElementById("bookingFlow")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateExtra = (id, count) => {
    setExtrasState((prev) => ({ ...prev, [id]: count }));
  };

  const handleApplyPromo = (code) => {
    if (code.trim().toUpperCase() === "ARIARI10") {
      setDiscount(50000);
      alert("¡Código ARIARI10 aplicado! Descuento de $50.000 COP");
    } else {
      setDiscount(0);
      alert("Código promocional inválido");
    }
  };

  const extrasTotal = EXTRAS_DATA.reduce(
    (acc, ex) => acc + ex.price * (extrasState[ex.id] || 0),
    0
  );

  return (
    <div className={`booking-page ${!isFlowUnlocked ? "booking-intro-active" : ""}`}>
      {/* Hero con Calendario */}
      <HeroCalendar
        checkIn={checkIn}
        checkOut={checkOut}
        onSelectDates={handleSelectDates}
        onUnlockFlow={handleUnlockFlow}
      />

      {/* 3. Flujo Principal Completo */}
      {isFlowUnlocked && (
        <section className="booking-flow is-unlocked" id="bookingFlow">
          <div className="booking-shell">
            {/* Barra lateral de pasos y resumen */}
            <BookingSidebar
              currentStep={currentStep}
              onGoStep={(step) => setCurrentStep(step)}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              guestsSummary={guestsSummary}
              childAges={childAges}
              selectedRoom={selectedRoom}
              extrasState={extrasState}
              discount={discount}
            />

            {/* Contenido dinámico según el paso activo */}
            <div className="booking-content">
              <BookingToolbar
                checkIn={checkIn}
                checkOut={checkOut}
                onCheckInChange={(newDate) => setCheckIn(newDate)}
                onCheckOutChange={(newDate) => setCheckOut(newDate)}
                adults={adults}
                childrenCount={childrenCount}
                childAges={childAges}
                onUpdateGuests={(ad, ch, ages) => {
                  setAdults(ad);
                  setChildrenCount(ch);
                  setChildAges(ages);
                }}
                onApplyPromo={handleApplyPromo}
              />

              {currentStep === 1 && (
                <StepRooms
                  selectedRoom={selectedRoom}
                  onSelectRoom={handleSelectRoom}
                  nights={nights}
                />
              )}

              {currentStep === 2 && (
                <StepExtras
                  extrasState={extrasState}
                  onUpdateExtra={handleUpdateExtra}
                  onGoStep={(s) => setCurrentStep(s)}
                  extrasTotal={extrasTotal}
                  selectedRoom={selectedRoom}
                />
              )}

              {currentStep === 3 && (
                <StepCheckout
                  selectedRoom={selectedRoom}
                  onGoStep={(s) => setCurrentStep(s)}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guestsSummary={guestsSummary}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Footer Interactivo */}
      {isFlowUnlocked && <FooterCanvas />}
    </div>
  );
}