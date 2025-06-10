import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

// Importar Header y Footer
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const product = {
    name: 'Monitor SAMSUNG 24"',
    price: 120000,
    image: '/images/destacados/monitor.png',
    details: 'Monitor de alta definición con diseño sin bordes.',
    specs: 'Resolución: 1920x1080. Tamaño: 24 pulgadas. Conexiones: HDMI, VGA.'
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
    <>
      <Header />

      <div className="product-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          Volver al inicio
        </button>

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
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
