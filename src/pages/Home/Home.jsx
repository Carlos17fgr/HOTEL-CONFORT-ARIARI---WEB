import Hero from '../../sections/Hero/Hero';
import Manifiesto from '../../sections/Manifiesto/Manifiesto';
import Hospedajes from '../../sections/Hospedaje/Hospedajes';
import Habitaciones from '../../sections/Habitaciones/Habitaciones';

export default function Home() {
  return (
    <main style={{ overflow: 'hidden', width: '100%' }}>
      <Hero />
      <Manifiesto />
      <Hospedajes />
      <Habitaciones />
    </main>
  );
}