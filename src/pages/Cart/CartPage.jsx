import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './CartPage.css';

const initialItems = [
  { id: 1, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 2, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
  { id: 3, name: 'Figura de Kurumi', price: 120000, quantity: 1 },
];

const CartPage = () => {
  const [tab, setTab] = useState('cliente');
  const [adminSection, setAdminSection] = useState('gestion-productos');
  const [items, setItems] = useState(initialItems);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) setUsuario(storedUser);
  }, []);

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
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
    navigate('/order', { state: { items, total: subtotal } });
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  const renderAdminContent = () => {
    switch (adminSection) {
      case 'gestion-productos':
        return (
          <div className="admin-content">
            <h2>Gestión de Productos</h2>
            <input type="text" placeholder="Buscar producto..." />
            <div className="admin-buttons">
              <button>Agregar</button>
              <button>Modificar</button>
              <button>Eliminar</button>
              <button>Buscar</button>
            </div>
          </div>
        );
      case 'gestion-pedidos':
        return (
          <div className="admin-content">
            <h2>Gestión de Pedidos</h2>
            <input type="text" placeholder="Buscar pedido..." />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan</td>
                  <td>Pendiente</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'gestion-usuarios':
        return (
          <div className="admin-content">
            <h2>Gestión de Usuarios</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ana</td>
                  <td>ana@example.com</td>
                  <td>
                    <button>Modificar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button>Agregar Usuario</button>
          </div>
        );
      case 'configuracion-tienda':
        return (
          <div className="admin-content">
            <h2>Configuración de la Tienda</h2>
            <button>Ajustes de Pagos</button>
            <button>Envíos</button>
            <button>Impuestos</button>
            <button>Cupones</button>
            <button>Promociones</button>
          </div>
        );
      case 'seguridad':
        return (
          <div className="admin-content">
            <h2>Seguridad</h2>
            <button>Gestión de accesos</button>
            <button>Autenticación</button>
            <button>Protección de datos sensibles</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      <div className="tabs">
        <button onClick={() => setTab('administrador')}>Administrador</button>
        <button onClick={() => setTab('cliente')}>Cliente</button>
        <button onClick={() => setTab('vendedor')}>Vendedor</button>
      </div>

      {tab === 'cliente' && (
        <>
          <h1 className="welcome-message">Bienvenido al carrito</h1>
          <div className="header-buttons">
            <button onClick={() => navigate('/')}>Volver al Home</button>
            {!usuario ? (
              <button onClick={() => navigate('/login')}>Iniciar sesión</button>
            ) : (
              <>
                <button onClick={handleLogout}>Cerrar sesión</button>
                <p>Sesión iniciada como: <strong>{usuario}</strong></p>
              </>
            )}
          </div>

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
              <button onClick={handlePay}>PAGAR</button>
            </div>
          </div>
        </>
      )}

      {tab === 'administrador' && (
        <div className="admin-panel" style={{ display: 'flex', gap: '2rem' }}>
          <div className="admin-sidebar">
            <ul className="admin-menu">
              <li><button onClick={() => setAdminSection('gestion-productos')}>Gestión de Productos</button></li>
              <li><button onClick={() => setAdminSection('gestion-pedidos')}>Gestión de Pedidos</button></li>
              <li><button onClick={() => setAdminSection('gestion-usuarios')}>Gestión de Usuarios</button></li>
              <li><button onClick={() => setAdminSection('configuracion-tienda')}>Configuración de la Tienda</button></li>
              <li><button onClick={() => setAdminSection('seguridad')}>Seguridad</button></li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>{renderAdminContent()}</div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
