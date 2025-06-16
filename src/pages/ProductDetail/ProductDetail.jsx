import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Footer from '../../components/Footer/Footer';

const Divider = () => <hr className="divider" />;

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleBuy = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === product.nombre);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        name: product.nombre,
        price: product.precio,
        quantity,
        image: product.imagen
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Se añadió ${quantity} unidad(es) de ${product.nombre} al carrito.`);
  };

  if (!product) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="product-detail-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      <div className="header-buttons">
        <button onClick={() => navigate('/allproductos')}>Atrás</button>
        <button onClick={() => navigate('/')}>Volver al Home</button>
        <button onClick={() => navigate('/cart')} className="cart-button">
          <img src="/images/carro.png" alt="Carrito" className="cart-icon" />
        </button>
      </div>

      <h2 className="product-title">DETALLE DEL PRODUCTO</h2>

      <div className="product-detail-content">
        <div className="product-info">
          <h3>Información del producto</h3>
          <p><strong>Nombre:</strong> {product.nombre}</p>
          <p><strong>Detalles:</strong> {product.details || 'No disponibles'}</p>
          <p><strong>Stock:</strong> {product.cantidad > 0 ? `${product.cantidad} unidades` : 'No disponible'}</p>
          <p><strong>Especificaciones:</strong> {product.specs || 'No disponibles'}</p>
        </div>

        <div className="product-card">
          <h3>Vista previa</h3>
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{ width: '300px', height: 'auto', objectFit: 'contain' }}
          />

          <div className="product-summary">
            <span><strong>{product.nombre}</strong></span>
            <span><strong>${product.precio.toLocaleString()}</strong></span>
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
                value={`$${(quantity * product.precio).toLocaleString()}`}
                readOnly
              />
            </label>
          </div>

          <button className="buy-button" onClick={handleBuy}>Agregar al carrito</button>
        </div>
      </div>

      <Divider/>
      <Footer />
    </div>
  );
};

export default ProductDetail;
