// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ClienteView from './ClienteView';
import AdminPanel from './AdminPanel';
import VendedorView from './VendedorView';
import './CartPage.css';

const CartPage = () => {
  const [tab, setTab] = useState('cliente');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) setUsuario(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <div className="container">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      {/* Botones visibles en todas las pestañas */}
      <div className="header-buttons">
        <button onClick={() => navigate('/')}>Volver al Home</button>

        {!usuario ? (
          <button onClick={() => navigate('/login')}>Iniciar sesión</button>
        ) : (
          <>
            <button onClick={handleLogout}>Cerrar sesión</button>
            

          </>
        )}
      </div>
      <div className="bienvenido-text">
  Bienvenido: <strong>{usuario}</strong>
</div>
      {/* Pestañas */}
      <div className="tabs">
  <button
    className={tab === 'administrador' ? 'active' : ''}
    onClick={() => setTab('administrador')}
  >
    Administrador
  </button>
  <button
    className={tab === 'cliente' ? 'active' : ''}
    onClick={() => setTab('cliente')}
  >
    Cliente
  </button>
  <button
    className={tab === 'vendedor' ? 'active' : ''}
    onClick={() => setTab('vendedor')}
  >
    Vendedor
  </button>
</div>

      {/* Vistas por pestaña */}
      {tab === 'cliente' && <ClienteView usuario={usuario} setUsuario={setUsuario} />}
      {tab === 'administrador' && <AdminPanel />}
      {tab === 'vendedor' && <VendedorView />}

      <Footer />
    </div>
  );
};

export default CartPage;
