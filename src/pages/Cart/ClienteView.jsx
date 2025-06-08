import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CartPage.css';

// Productos iniciales (mock)
const initialItems = [
  { id: 1, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 2, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 3, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
];

const ClienteView = ({ usuario }) => {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  // Actualizar cantidad de un producto
  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Calcular total
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Acción al pagar
  const handlePay = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para continuar con el pago.');
      navigate('/login');
      return;
    }

    navigate('/order', {
      state: {
        items,
        total: subtotal,
      },
    });
  };

  return (
    <div className="cart-content">
      <h1 className="welcome-message">Bienvenido al carrito</h1>

      {/* Contenedor flex para items y resumen */}
      <div className="cart-main" style={{ display: 'flex', gap: '2rem' }}>
        <div className="cart-items" style={{ flex: 2 }}>
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

        <div className="cart-summary" style={{ flex: 1 }}>
          <h3>Total del carrito</h3>
          <p>Subtotal: <strong>${subtotal.toLocaleString()}</strong></p>
          <p>Envío: <strong>Gratis</strong></p>
          <p>Total: <strong>${subtotal.toLocaleString()}</strong></p>
          <button className="pay-button" onClick={handlePay}>PAGAR</button>
        </div>
      </div>
    </div>
  );
};

export default ClienteView;

