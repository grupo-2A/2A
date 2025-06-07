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
  const [activeTab, setActiveTab] = useState('cliente');
  const navigate = useNavigate();

  useEffect(() => {
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
        {/* Logo y bienvenida */}
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="welcome-message">Bienvenido</h1>

        {/* Navegación entre pestañas */}
        <div className="tabs">
          <button onClick={() => setActiveTab('administrador')}>Administrador</button>
          <button onClick={() => setActiveTab('cliente')}>Cliente</button>
          <button onClick={() => setActiveTab('vendedor')}>Vendedor</button>
        </div>

        {/* Botones navegación / sesión */}
        <div className="header-buttons">
          <button className="volver-home-button" onClick={() => navigate('/')}>
            Volver al Home
          </button>

          {!usuario ? (
            <button className="volver-home-button" onClick={() => navigate('/login')}>
              Iniciar sesión
            </button>
          ) : (
            <>
              <button className="volver-home-button" onClick={handleLogout}>
                Cerrar sesión
              </button>
              <p className="usuario-text">
                Sesión iniciada como: <strong>{usuario}</strong>
              </p>
            </>
          )}
        </div>

        {/* Contenido de cada pestaña */}
        {activeTab === 'cliente' && (
          <div className="cart-content">
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
          </div>
        )}

        {activeTab === 'administrador' && (
          <div className="admin-view">
            <h2>Panel de Administrador</h2>
            <p>Contenido exclusivo para administradores.</p>
          </div>
        )}

        {activeTab === 'vendedor' && (
          <div className="seller-view">
            <h2>Panel de Vendedor</h2>
            <p>Contenido exclusivo para vendedores.</p>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default CartPage;
