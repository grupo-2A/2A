import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col logo-col">
        <img src="/images/logo.png" alt="Logo Overloot" className="footer-logo" />
          <p className="footer-slogan"><strong>Loot para tu Setup</strong></p>
        </div>

        <div className="footer-col">
          <p><strong>Contacto</strong></p>
          <p><em>Bogotá, Colombia</em></p>
          <p><em>overloot@loot.com</em></p>
          <p><em>000-000-000-000</em></p>
        </div>

        <div className="footer-col">
          <p><strong>Cuenta</strong></p>
          <p><em>Mi cuenta</em></p>
          <p><em>Iniciar sesión/Registrarse</em></p>
          <p><em>Carrito</em></p>
        </div>
      </div>

      <div className="footer-copy">
        <p>Copyright Rimel 2025. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
