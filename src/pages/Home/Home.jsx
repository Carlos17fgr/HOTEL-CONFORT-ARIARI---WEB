import Hero from "../../sections/Hero/Hero";
import Reserva from "../../sections/Reserva/Reserva";
import Manifiesto from "../../sections/Manifiesto/Manifiesto";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Reserva />
      <Manifiesto />
    </>
  );
}