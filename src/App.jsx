import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Acá vamos a ir agregando el resto de las secciones a medida que las migremos */}
    </>
  );
}

export default App;