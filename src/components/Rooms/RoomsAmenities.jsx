import React from 'react';

const amenitiesData = [
  { number: "01", title: "Recepción 24 horas", desc: "Acompañamiento cuando lo necesites durante tu estancia." },
  { number: "02", title: "WiFi disponible", desc: "Conexión para trabajar, comunicarte o planear tu recorrido." },
  { number: "03", title: "Ambiente climatizado", desc: "Espacios frescos y cómodos para descansar en el clima del Meta." },
  { number: "04", title: "Información turística", desc: "Recomendaciones para descubrir Granada y los alrededores del Ariari." }
];

export default function RoomsAmenities() {
  return (
    <section className="rooms-amenities" aria-labelledby="roomsAmenitiesTitle">
      <div className="rooms-amenities__top">
        <p className="section-eyebrow section-eyebrow--center">
          <span></span> En cada estancia <span></span>
        </p>
        <h2 id="roomsAmenitiesTitle">Lo necesario para descansar bien.</h2>
      </div>

      <div className="rooms-amenities__grid">
        {amenitiesData.map((item, index) => (
          <article key={index}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}