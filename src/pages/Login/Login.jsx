import React, { useState } from "react";
import "./Login.css";

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
              <img src="/images/logo/logo-hca-premium.png" alt="Hotel Confort Ariari" className="auth-logo" />
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