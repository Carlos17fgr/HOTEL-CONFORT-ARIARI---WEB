import React from 'react';

export default function RoomsCTA() {
  return (
    <section className="rooms-cta" aria-labelledby="roomsCtaTitle">
      <div className="rooms-cta__media" aria-hidden="true">
        <img src="/images/hotel-confort-ariari-exterior.jpg" alt="Hotel Confort Ariari Exterior" />
      </div>
      <div className="rooms-cta__veil" aria-hidden="true"></div>
      
      <div className="rooms-cta__content">
        <p className="rooms-eyebrow">
          <span></span> Tu descanso comienza aquí
        </p>
        <h2 id="roomsCtaTitle">
          Encuentra el espacio<br />
          ideal para tu visita.
        </h2>
        <a href="/reservas" className="rooms-button rooms-button--light">
          Reservar habitación <span>↗</span>
        </a>
      </div>
    </section>
  );
}