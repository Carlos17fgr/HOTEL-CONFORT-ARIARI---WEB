import React, { useState, useEffect, useRef } from 'react';
import RoomsHero from '../../components/Rooms/RoomsHero';
import RoomsIntro from '../../components/Rooms/RoomsIntro';
import RoomsStory from '../../components/Rooms/RoomsStory';
import RoomsAmenities from '../../components/Rooms/RoomsAmenities';
import RoomsCTA from '../../components/Rooms/RoomsCTA';
import './Habitaciones.css';

const roomsData = [
  {
    id: 0,
    number: "01",
    shortName: "Estándar",
    label: "Descanso esencial",
    title: "Habitación estándar",
    description: "Un ambiente sereno y funcional para descansar con comodidad, trabajar un momento o prepararte para recorrer el Ariari.",
    image: "/IMG/1_RESERVAS.png",
    alt: "Habitación estándar luminosa del Hotel Confort Ariari",
    features: [
      { key: "Capacidad", value: "1–2 huéspedes" },
      { key: "Descanso", value: "Cama doble" },
      { key: "Incluye", value: "WiFi · TV · Aire acondicionado" }
    ]
  },
  {
    id: 1,
    number: "02",
    shortName: "Doble",
    label: "Comodidad compartida",
    title: "Habitación doble",
    description: "Pensada para familiares, amigos o compañeros de viaje que desean amplitud y una distribución práctica sin perder tranquilidad.",
    image: "/IMG/habitaciones/cuartos.jpg",
    alt: "Habitación doble con ambiente tranquilo",
    features: [
      { key: "Capacidad", value: "2–4 huéspedes" },
      { key: "Descanso", value: "Dos camas" },
      { key: "Ideal para", value: "Familias y grupos pequeños" }
    ]
  },
  {
    id: 2,
    number: "03",
    shortName: "Suite",
    label: "Más espacio, más calma",
    title: "Suite Ariari",
    description: "Una experiencia más amplia para estancias especiales, con zona social, mayor privacidad y espacios que invitan a quedarse un poco más.",
    image: "/IMG/habitaciones/suites.jpg",
    alt: "Suite amplia con sala y zona de descanso",
    features: [
      { key: "Capacidad", value: "2–4 huéspedes" },
      { key: "Ambiente", value: "Habitación + sala" },
      { key: "Perfecta para", value: "Estancias largas y celebraciones" }
    ]
  }
];

export default function Habitaciones() {
  const [activeRoom, setActiveRoom] = useState(0);
  const roomRefs = useRef([]);

  // Algoritmo de detección de habitación más cercana al centro de pantalla (tomado de Seccion_Cuartos_2.js)
  useEffect(() => {
    const handleScroll = () => {
      if (!roomRefs.current.length) return;

      const targetLine = window.innerHeight * 0.55;
      let closestIndex = 0;
      let closestDistance = Infinity;

      roomRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const center = rect.top + rect.height * 0.48;
        const distance = Math.abs(center - targetLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveRoom(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToRoom = (index) => {
    setActiveRoom(index);
    if (roomRefs.current[index]) {
      roomRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="rooms-page">
      <RoomsHero />
      <RoomsIntro rooms={roomsData} activeRoom={activeRoom} onJump={handleJumpToRoom} />
      <RoomsStory rooms={roomsData} activeRoom={activeRoom} setActiveRoom={setActiveRoom} roomRefs={roomRefs} />
      <RoomsAmenities />
      <RoomsCTA />
    </main>
  );
}