import Hero from '../../sections/Hero/Hero';
import Reserva from '../../sections/Reservas/Reservas';
import Manifiesto from '../../sections/Manifiesto/Manifiesto';

export default function Home() {
  return (
    <main style={{ overflow: 'hidden', width: '100%' }}>
      <Hero />
      <Reserva />
      <Manifiesto />
    </main>
  );
}