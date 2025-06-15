import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Footer from '../../components/Footer/Footer';


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
          <p><strong>Especificaciones:</strong> {product.specs || 'No disponibles'}</p>
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
              <div className="cantidad-control">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >−</button>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    setQuantity(isNaN(val) || val < 1 ? 1 : val);
                  }}
                />

                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                >+</button>
              </div>
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

      <Footer />
    
    </div>
  );
};

export default ProductDetail;
