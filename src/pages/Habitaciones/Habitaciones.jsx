import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RoomsHero from './components/RoomsHero';
import RoomsIntro from './components/RoomsIntro';
import RoomsAmenities from './components/RoomsAmenities';
import HabitacionesSection from '../../sections/Habitaciones/Habitaciones';
import RoomsStory from './components/RoomsStory';
import RoomsCTA from './components/RoomsCTA';
import './Habitaciones.css';

export default function Habitaciones() {
  return (
    <div className="habitaciones-page">
      <Navbar />
      <main>
        <RoomsHero />
        <RoomsIntro />
        <HabitacionesSection />
        <RoomsAmenities />
        <RoomsStory />
        <RoomsCTA />
      </main>
      <Footer />
    </div>
  );
}
