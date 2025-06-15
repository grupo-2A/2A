import React, { useState, useEffect } from 'react';
import { FaFire } from 'react-icons/fa'; // Icono de fuego para productos destacados
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegación
import Header from '../../components/Header/Header'; // Componente de encabezado
import Footer from '../../components/Footer/Footer'; // Componente de pie de página
import Productos from '../../components/Productos'; // Componente que muestra productos
import Categorias from '../../components/Categorias'; // Componente que muestra categorías

// Importar estilos externos
import './HomePage.css';

// Componente simple que renderiza una línea divisoria (hr) con clase CSS "divider"
const Divider = () => <hr className="divider" />;

const HomePage = () => {
  const navigate = useNavigate(); // Hook para navegación

  // Estado para controlar la visibilidad del botón "scroll to top"
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Array con las rutas de las imágenes que quieres rotar
  const images = [
    '/images/inicio.png',
    '/images/inicio2.png',
    '/images/inicio3.png'
  ];

  // Estado para la imagen actual (índice)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cambiar imagen automáticamente cada 4 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  // Manejo del scroll para mostrar botón "scroll to top"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const irATodosLosProductos = () => {
    navigate('/AllProductos'); 
  };

  // Función para hacer scroll suave hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main>
        {/* Slider de imágenes con puntos de navegación */}
        <section className="hero-image-container" style={{ textAlign: 'center' }}>
          <img
            src={images[currentImageIndex]}
            alt={`Imagen ${currentImageIndex + 1}`}
            className="hero-image"
          />
          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                aria-label={`Ir a la imagen ${index + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentImageIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </section>

        <Divider />

        <section className="featured-products-header">
          <div className="featured-products-title">
            <FaFire className="fire-icon" />
            <h2>Productos Destacados</h2>
          </div>
          <button
            className="boton-ver-mas"
            onClick={irATodosLosProductos}
            aria-label="Ver más productos"
          >
            Ver más
          </button>
        </section>

        <Productos />

        <Divider />

        <section className="categories-section" id="categorias">
          <h2 className="texto-categoria">Categorías</h2>
          <Categorias />
        </section>

        <section className="frame-image-container">
          <img
            src="/images/frame.png"
            alt="Decoración visual"
            className="frame-image"
          />
        </section>
      </main>

      <Footer />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default HomePage;
