import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const scrollToCategories = () => {
    const seccion = document.getElementById('categorias');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    const seccion = document.getElementById('contacto');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUsuarioClick = () => {
    const usuario = localStorage.getItem('usuarioLogueado');
    if (usuario) {
      navigate('/edit-account');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <Link to="/" aria-label="Volver al inicio">
        <img src="/images/logo.png" alt="Logo Overloot" className="header-logo" />
      </Link>

      <nav className="header-buttons" aria-label="Navegación principal">
        <button className="btn-text" onClick={scrollToCategories} aria-label="Ir a categorías">
          CATEGORÍAS
        </button>
        <button className="btn-text" onClick={scrollToBottom} aria-label="Ir a contacto">
          CONTACTO
        </button>

        <Link to="/cart" className="btn-icon" aria-label="Ir al carrito">
          <img src="/images/carro.png" alt="Carrito de compras" />
        </Link>

        <button onClick={handleUsuarioClick} className="btn-icon" aria-label="Cuenta de usuario">
          <img src="/images/usuario.png" alt="Usuario" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
