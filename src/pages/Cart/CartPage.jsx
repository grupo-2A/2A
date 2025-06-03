import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CartPage.css';
import Footer from '../../components/Footer/Footer';

const initialItems = [
  { id: 1, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 2, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 3, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
];

const CartPage = () => {
  const [items, setItems] = useState(initialItems);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el usuario del localStorage al cargar la página
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <>
      <div className="container">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="welcome-message">Bienvenido al carrito</h1>

        {/* Mostrar usuario si está logueado */}
        {usuario ? (
          <div className="usuario-info">
            <p>Sesión iniciada como: <strong>{usuario}</strong></p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')}>Iniciar sesión</button>
        )}

        <button className="volver-home-button" onClick={() => navigate('/')}>
          Volver al Home
        </button>

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

        <div className="cart-summary">
          <h3>Total del carrito</h3>
          <p>Subtotal: <strong>${subtotal.toLocaleString()}</strong></p>
          <p>Envío: <strong>Gratis</strong></p>
          <p>Total: <strong>${subtotal.toLocaleString()}</strong></p>
          <button className="pay-button" onClick={handlePay}>
            PAGAR
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CartPage;
