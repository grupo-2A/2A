import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll al tope de la página al cargar
    window.scrollTo(0, 0);
  }, []);

  const product = {
    name: 'Monitor SAMSUNG 24"',
    price: 120000,
    image: '/images/destacados/monitor.png',
    details: 'Monitor de alta definición con diseño sin bordes.',
  };

  const handleBuy = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === product.name);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Se añadió ${quantity} unidad(es) de ${product.name} al carrito.`);
  };

  return (
    <div className="product-detail-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      {/* Botones de navegación */}
      <div className="header-buttons">
        <button onClick={() => navigate('/allproductos')}>Atrás</button>
        <button onClick={() => navigate('/')}>Volver al Home</button>
      </div>

      <h2 className="product-title">DETALLE DEL PRODUCTO</h2>

      <div className="product-detail-content">
        <div className="product-info">
          <h3>Información del producto</h3>
          <p><strong>Nombre:</strong> {product.name}</p>
          <p><strong>Detalles:</strong> {product.details}</p>
          <p><strong>Especificaciones:</strong> {product.specs}</p>
        </div>

        <div className="product-card">
          <h3>Vista previa</h3>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '300px', height: 'auto', objectFit: 'contain' }}
          />

          <div className="product-summary">
            <span><strong>{product.name}</strong></span>
            <span><strong>${product.price.toLocaleString()}</strong></span>
          </div>

          <h3>Comprar</h3>
          <div className="product-inputs">
            <label>
              Cantidad
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
              />
            </label>
            <label>
              Precio Total
              <input 
                type="text" 
                value={`$${(quantity * product.price).toLocaleString()}`} 
                readOnly 
              />
            </label>
          </div>

          <button className="buy-button" onClick={handleBuy}>Agregar al carrito</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-section logo">
          <img src="/images/logo.png" alt="Logo" />
          <p><strong>Loot para tu Setup</strong></p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Bogotá, Colombia</p>
          <p>overloot@loot.com</p>
          <p>0000-0000-0000</p>
        </div>
        <div className="footer-section">
          <h3>Cuenta</h3>
          <p>Mi cuenta</p>
          <p>Iniciar sesión/Registrarse</p>
          <p>Carrito</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
