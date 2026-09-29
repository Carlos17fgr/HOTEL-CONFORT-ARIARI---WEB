import React from 'react';

export default function RoomsStory({ rooms, activeRoom, setActiveRoom, roomRefs }) {
  return (
    <section className="rooms-story" id="detallesHabitaciones" aria-labelledby="roomsStoryTitle">
      {/* 1. ENCABEZADO DE LA SECCIÓN */}
      <div className="rooms-story__heading">
        <p className="rooms-eyebrow rooms-eyebrow--dark">
          <span></span> Habitaciones y suites
        </p>
        <h2 id="roomsStoryTitle">
          Cada estancia tiene<br />
          <em>su propio ritmo.</em>
        </h2>
      </div>

      <div className="rooms-story__layout">
        {/* 2. COLUMNA IZQUIERDA: MARCO VISUAL STICKY CON IMÁGENES Y CONTADOR */}
        <div className="rooms-story__visual" aria-live="polite">
          <div className="rooms-story__frame">
            {rooms.map((room, index) => (
              <figure 
                key={room.id} 
                className={`rooms-story__image ${activeRoom === index ? 'is-active' : ''}`}
              >
                <img src={room.image} alt={room.alt} />
              </figure>
            ))}

            {/* BARRA DE PROGRESO Y CONTADOR DINÁMICO */}
            <div className="rooms-story__counter" aria-hidden="true">
              <span>{String(activeRoom + 1).padStart(2, '0')}</span>
              <i>
                <b style={{ transform: `scaleX(${(activeRoom + 1) / rooms.length})` }}></b>
              </i>
              <span>{String(rooms.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* 3. COLUMNA DERECHA: TARJETAS CON LA INFORMACIÓN DETALLADA */}
        <div className="rooms-story__details">
          {rooms.map((room, index) => (
            <article
              key={room.id}
              ref={(el) => (roomRefs.current[index] = el)}
              className={`room-detail ${activeRoom === index ? 'is-active' : ''}`}
              tabIndex={0}
              onMouseEnter={() => setActiveRoom(index)}
              onFocus={() => setActiveRoom(index)}
            >
              <p className="room-detail__number">{room.number}</p>
              <p className="room-detail__label">{room.label}</p>
              <h3>{room.title}</h3>
              <p className="room-detail__description">{room.description}</p>
              
              <ul className="room-detail__features">
                {room.features.map((feat, fIndex) => (
                  <li key={fIndex}>
                    <span>{feat.key}</span>
                    <strong>{feat.value}</strong>
                  </li>
                ))}
              </ul>

              <a href="/reservas" className="rooms-button rooms-button--dark">
                Consultar disponibilidad <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}