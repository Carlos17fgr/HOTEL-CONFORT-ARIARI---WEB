import React, { useState, useEffect, useRef } from "react";
import "./Login.css";

// Enlaces del Header
const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Conócenos", href: "/nosotros" },
  { label: "Habitaciones", href: "/habitaciones" },
  { label: "Reservas", href: "/reservas" },
  { label: "Servicios", href: "/servicios" },
  { label: "Gastronomía", href: "/gastronomia" },
  { label: "Bicicletas", href: "/bicis" },
  { label: "Contacto", href: "/contacto" },
  { label: "Acceso", href: "/login", isCurrent: true },
];

export default function Login() {
  // Estados del Formulario
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ text: "", type: "" });

  // Estados del Header
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Scroll del Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY.current;
      setIsScrolled(currentScrollY > 24);

      if (currentScrollY <= 90 || isMobileOpen || isDesktopHovered) {
        setIsHidden(false);
      } else if (delta > 7) {
        setIsHidden(true);
      } else if (delta < -5) {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileOpen, isDesktopHovered]);

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id === "loginEmail" ? "email" : id === "loginPassword" ? "password" : "rememberMe"]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setAuthMessage({ text: "Ingresa tu correo y contraseña para continuar.", type: "error" });
      return;
    }

    setIsLoading(true);
    setAuthMessage({ text: "", type: "" });

    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      setAuthMessage({
        text: "¡Inicio de sesión exitoso! Redirigiendo...",
        type: "success",
      });
    }, 1200);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = prompt("Ingresa tu correo para restablecer la contraseña:");
    if (email) {
      alert(`Hemos enviado un enlace de recuperación a: ${email}`);
    }
  };

  return (
    <div className="auth-body auth-login">
      {/* HEADER COMPLETO */}
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isHidden ? "is-hidden" : ""}`}>
        <div className="header-shell">
          <div
            className={`desktop-menu ${isDesktopHovered ? "is-open" : ""}`}
            onMouseEnter={() => setIsDesktopHovered(true)}
            onMouseLeave={() => setIsDesktopHovered(false)}
          >
            <button className="menu-lines" type="button" aria-label="Abrir navegación">
              <span></span>
              <span></span>
            </button>
            <nav className="desktop-navigation">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={link.isCurrent ? "is-current" : ""}
                  style={{ "--item": idx }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <a href="/" className="header-brand">
            <img src="/IMG/logos/logo-hca-premium.png" alt="Hotel Confort Ariari" className="header-logo" />
          </a>

          <a className="header-booking" href="/reservas">
            <span>Reservar</span>
            <span aria-hidden="true">↗</span>
          </a>

          <button className="mobile-menu-button" type="button" onClick={() => setIsMobileOpen(true)}>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={`mobile-navigation ${isMobileOpen ? "is-open" : ""}`}>
          <div className="mobile-navigation-top">
            <img src="/IMG/logos/logo-hca-premium.png" alt="Logo" className="mobile-navigation-logo" />
            <button className="mobile-close" type="button" onClick={() => setIsMobileOpen(false)}>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="mobile-navigation-links">
            {NAV_LINKS.map((link, idx) => (
              <a key={link.label} href={link.href} onClick={() => setIsMobileOpen(false)}>
                <span>{`0${idx + 1}`}</span>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* CONTENEDOR DEL LOGIN */}
      <main className="auth-main">
        <section className="auth-frame" aria-labelledby="loginTitle">
          {/* Lado izquierdo visual */}
          <div className="auth-visual" style={{ "--auth-img": "url('/IMG/1.png')" }}>
            <div className="auth-visual-content">
              <span className="auth-eyebrow">Acceso privado</span>
              <h2>Bienvenido <em>de nuevo</em></h2>
              <p>
                Accede al sistema del Hotel Confort Ariari para consultar reservas,
                historial de estadías y servicios preparados para tu visita.
              </p>
            </div>
          </div>

          {/* Lado derecho formulario */}
          <div className="auth-panel">
            <div className="auth-top-actions">
              <button type="button">
                <span aria-hidden="true">◎</span> Español
              </button>
              <a href="/contacto">
                <span aria-hidden="true">☏</span> Soporte
              </a>
            </div>

            <form className="auth-card" id="loginForm" onSubmit={handleSubmit} noValidate>
              <img src="/IMG/logos/logo-hca-premium.png" alt="Hotel Confort Ariari" className="auth-logo" />
              <h1 id="loginTitle">Iniciar sesión</h1>
              <p className="auth-subtitle">Ingresa tus credenciales para continuar.</p>

              <div className="auth-field-group">
                <div className="auth-field">
                  <label htmlFor="loginEmail">Correo electrónico</label>
                  <div className="auth-control">
                    <i aria-hidden="true">✉</i>
                    <input
                      id="loginEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="Correo electrónico"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="loginPassword">Contraseña</label>
                  <div className="auth-control">
                    <i aria-hidden="true">▣</i>
                    <input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Contraseña"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="auth-password-toggle"
                      type="button"
                      aria-label="Mostrar u ocultar contraseña"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="auth-options">
                <label className="auth-check">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={handleChange}
                  />
                  Recordarme
                </label>
                <a className="auth-link" href="#olvido" onClick={handleForgotPassword}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button className="auth-submit" type="submit" disabled={isLoading}>
                <span>{isLoading ? "Ingresando..." : "Ingresar"}</span>
                <span aria-hidden="true">→</span>
              </button>

              {authMessage.text && (
                <p className={`auth-message ${authMessage.type === "error" ? "is-error" : "is-success"}`}>
                  {authMessage.text}
                </p>
              )}

              <div className="auth-divider">
                <span>o</span>
              </div>

              <a className="auth-secondary" href="/">
                <span aria-hidden="true">◎</span> Volver al sitio web
              </a>

              <p className="auth-switch">
                ¿No tienes cuenta? <a className="auth-link" href="/registro">Crear cuenta</a>
              </p>
            </form>
          </div>
        </section>

        <p className="auth-footer-min">
          <span>✦</span>© 2026 Hotel Confort Ariari. Todos los derechos reservados.
        </p>
      </main>
    </div>
  );
}