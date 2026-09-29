import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../sections/Hero/Hero';
import Manifiesto from '../../sections/Manifiesto/Manifiesto';
import Habitaciones from '../../sections/Habitaciones/Habitaciones';
import Reserva from '../../sections/Reservas/Reservas';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifiesto />
        <Habitaciones />
        <Reserva />
      </main>
    </>
  );
}