import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ ocultarCategoriasYContacto }) => {
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

      <nav className="header-buttons" aria-label="Navegación principal">
        {/* Solo mostramos estas opciones si no se debe ocultar */}
        {!ocultarCategoriasYContacto && (
          <>
            <button className="btn-text" onClick={scrollToCategories} aria-label="Ir a categorías">
              CATEGORÍAS
            </button>
            <button className="btn-text" onClick={scrollToBottom} aria-label="Ir a contacto">
              CONTACTO
            </button>
          </>
        )}

        <Link to="/cart" className="btn-icon" aria-label="Ir al carrito">
          <img src="/images/carro.png" alt="Carrito de compras" />
        </Link>

        <Link to="/login" className="btn-icon" aria-label="Iniciar sesión o registrarse">
          <img src="/images/usuario.png" alt="Usuario" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
