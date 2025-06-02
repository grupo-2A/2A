import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CartPage.css';
import Footer from '../../components/Footer/Footer'; // Componente de pie de página

// Datos iniciales del carrito
const initialItems = [
  { id: 1, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 2, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 3, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
];

const CartPage = () => {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  // Actualiza la cantidad de un ítem, asegurando mínimo 1
  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Calcula el subtotal del carrito
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Maneja la acción de pagar y navega a la página de orden
  const handlePay = () => {
    navigate('/order', {
      state: {
        items,
        total: subtotal,
      },
    });
  };

  return (
    <>
      <div className="container">
        {/* Header */}
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="welcome-message">Bienvenido al carrito</h1>
        <button className="volver-home-button" onClick={() => navigate('/')}>
          Volver al Home
        </button>

        {/* Contenido del carrito */}
        <h2>CARRITO</h2>
        <div className="cart-items">
          {items.map(item => (
            <div className="cart-item" key={item.id}>
              <img src="/images/kurumi.png" alt={item.name} />
              <span>{item.name}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, 1)}>▲</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, -1)}>▼</button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h3>Total del carrito</h3>
          <p>
            Subtotal: <strong>${subtotal.toLocaleString()}</strong>
          </p>
          <p>
            Envío: <strong>Gratis</strong>
          </p>
          <p>
            Total: <strong>${subtotal.toLocaleString()}</strong>
          </p>
          <button className="pay-button" onClick={handlePay}>
            PAGAR
          </button>
        </div>

        {/* Pie de página */}
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
                                    
