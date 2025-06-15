import React, { useState, useEffect } from 'react';
import { FaFire, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Productos from '../../components/Productos';
import Categorias from '../../components/Categorias';

import './HomePage.css';

const Divider = () => <hr className="divider" />;

const HomePage = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/inicio.png',
    '/images/inicio2.png',
    '/images/inicio3.png'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [images.length]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main>
        {/* Slider de imágenes */}
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

      {/* Ícono flotante de WhatsApp */}
      <a
        href="https://wa.me/573185305185?text=Bienvenido%20a%20Overloot%2C%20potencia%20tu%20setup%20con%20la%20mejor%20tecnol%C3%B3gica%20gamer.%20%C2%BFEn%20qu%C3%A9%20le%20podemos%20colaborar%3F"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Overloot"
      >
        <FaWhatsapp />
      </a>
    </>
  );
};

export default HomePage;
