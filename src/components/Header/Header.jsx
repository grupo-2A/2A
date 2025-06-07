import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const scrollToCategories = () => {
    const seccion = document.getElementById('categorias');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    const seccion = document.getElementById('contacto');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <img src="/images/logo.png" alt="Logo Loot para tu Setup" className="header-logo" />

      <button className="btn-text header-group-item" onClick={scrollToCategories} aria-label="Ir a categorías">
        CATEGORÍAS
      </button>
      <button className="btn-text header-group-item" onClick={scrollToBottom} aria-label="Ir a contacto">
        CONTACTO
      </button>

      <Link to="/cart" className="btn-icon header-group-item" aria-label="Ir al carrito">
        <img src="/images/carro.png" alt="Carrito de compras" />
      </Link>

      <Link to="/login" className="btn-icon header-group-item" aria-label="Iniciar sesión o registrarse">
        <img src="/images/usuario.png" alt="Usuario" />
      </Link>
    </header>
  );
};

export default Header;
