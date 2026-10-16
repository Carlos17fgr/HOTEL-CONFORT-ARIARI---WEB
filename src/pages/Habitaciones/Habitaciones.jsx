import './Habitaciones.css';

export default function Habitaciones() {
  return (
    <section className="habitaciones-lux-section">
      <div className="habitaciones-lux-overlay"></div>

      <div className="habitaciones-lux-container">
        <div className="habitaciones-lux-header">
          <span className="habitaciones-lux-eyebrow">ALOJAMIENTO EXCLUSIVO</span>
          <h2 className="habitaciones-lux-title">Habitaciones</h2>
        </div>

        <div className="habitaciones-lux-grid">
          <div className="habitaciones-lux-item">
            <div className="habitaciones-lux-wrapper">
              <h3 className="habitaciones-lux-item-title">Cuartos</h3>
              <div className="habitaciones-lux-line"></div>
            </div>
            <p className="habitaciones-lux-desc">
              Espacios acogedores y modernos diseñados para un descanso placentero y fresco.
            </p>
          </div>

          <div className="habitaciones-lux-item">
            <div className="habitaciones-lux-wrapper">
              <h3 className="habitaciones-lux-item-title">Suites</h3>
              <div className="habitaciones-lux-line"></div>
            </div>
            <p className="habitaciones-lux-desc">
              Máxima amplitud, exclusividad y confort superior para experiencias memorables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}