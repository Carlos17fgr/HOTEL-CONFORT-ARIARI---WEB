import { useState } from 'react';
import './Habitaciones.css';

const HABITACIONES = [
  {
    id: 'suite-imperial',
    title: 'Suite Ariari Imperial',
    category: 'Lujo Superior',
    capacity: '2 Personas',
    price: '$650.000 / noche',
    description: 'Espaciosa suite con terraza privada, vista panorámica a la serranía y jacuzzi exterior hidromasaje.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    features: ['Jacuzzi Privado', 'Cama King Size', 'Vista Panorámica', 'Room Service 24/7']
  },
  {
    id: 'villa-eco',
    title: 'Villa Eco Deluxe',
    category: 'Naturaleza & Confort',
    capacity: '4 Personas',
    price: '$480.000 / noche',
    description: 'Integrada completamente con la naturaleza, incluye piscina privada y ducha tropical al aire libre.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    features: ['Piscina Privada', '2 Camas Queen', 'Ducha Exterior', 'Desayuno Incluido']
  },
  {
    id: 'junior-suite',
    title: 'Junior Suite Confort',
    category: 'Confort Ejecutivo',
    capacity: '2 Personas',
    price: '$320.000 / noche',
    description: 'Espacio ideal para parejas o estancias de trabajo, con iluminación cálida y acabados en madera noble.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    features: ['Cama King', 'Wi-Fi Alta Velocidad', 'Escritorio', 'Caja Fuerte']
  }
];

export default function Habitaciones() {
  const [activeRoomId, setActiveRoomId] = useState(HABITACIONES[0].id);
  const activeRoom = HABITACIONES.find(r => r.id === activeRoomId) || HABITACIONES[0];

  return (
    <section id="habitaciones" className="habitaciones-section">
      <div className="habitaciones-header">
        <span className="habitaciones-subtitle">ALOJAMIENTO EXCLUSIVO</span>
        <h2 className="habitaciones-title">Habitaciones & Suites</h2>
      </div>

      <div className="habitaciones-container">
        <div className="habitaciones-menu">
          {HABITACIONES.map((room) => (
            <button
              key={room.id}
              type="button"
              className={`habitacion-card-btn ${room.id === activeRoomId ? 'is-active' : ''}`}
              onClick={() => setActiveRoomId(room.id)}
              onMouseEnter={() => setActiveRoomId(room.id)}
            >
              <span className="room-category">{room.category}</span>
              <h3 className="room-name">{room.title}</h3>
              <span className="room-price">{room.price}</span>
            </button>
          ))}
        </div>

        <div className="habitaciones-display">
          <div className="display-media">
            <img src={activeRoom.image} alt={activeRoom.title} className="display-img" />
          </div>
          <div className="display-info">
            <span className="display-badge">{activeRoom.capacity}</span>
            <h3 className="display-title">{activeRoom.title}</h3>
            <p className="display-desc">{activeRoom.description}</p>

            <ul className="display-features">
              {activeRoom.features.map((feat, index) => (
                <li key={index}>✓ {feat}</li>
              ))}
            </ul>

            <a href="#reserva" className="btn-reserva-room">Reservar Esta Suite</a>
          </div>
        </div>
      </div>
    </section>
  );
}