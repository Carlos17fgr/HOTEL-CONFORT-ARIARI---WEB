import React from 'react';

export default function RoomsIntro({ rooms, activeRoom, onJump }) {
  return (
    <section className="rooms-intro" aria-labelledby="roomsIntroTitle">
      <div className="rooms-intro__inner">
        <p className="section-eyebrow section-eyebrow--center">
          <span></span> Elige cómo quieres descansar <span></span>
        </p>
        <h2 id="roomsIntroTitle">
          Confort sencillo.<br />
          <em>Detalles que se sienten.</em>
        </h2>
        <p>
          Conservamos una experiencia cercana y funcional: habitaciones cómodas, 
          ambientes serenos y soluciones pensadas para cada tipo de viaje.
        </p>

        <nav className="rooms-jump" aria-label="Ir a un tipo de habitación">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              type="button"
              className={activeRoom === index ? "is-active" : ""}
              onClick={() => onJump(index)}
              aria-pressed={activeRoom === index}
            >
              {room.shortName}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}