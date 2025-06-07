import React from 'react';
import './footer.css';

const Footer = () => (
  <><div id="contacto" className="footer-container">
    <div className="footer-logo-section">
      <img src="/images/logo.png" alt="Ícono" className="footer-logo" />
      <h2 className="footer-title">Loot para tu Setup</h2>
    </div>

    <div className="footer-box">
      <h3 className="contacto-txt">Contacto</h3>
      <p className="contacto-txt">Bogotá, Colombia</p>
      <p className="contacto-txt">overloot@loot.com</p>
      <p className="contacto-txt">0000-0000-0000</p>
    </div>

    <div className="footer-box">
      <h3 className="contacto-txt">Cuenta</h3>
      <p className="contacto-txt">Mi cuenta</p>
      <p className="contacto-txt">Iniciar sesión / Registrarse</p>
      <p className="contacto-txt">Carrito</p>
    </div>


  </div><p className="copyright">Copyright Rimel 2025. Todos los derechos reservados. </p></>
);

export default Footer;
