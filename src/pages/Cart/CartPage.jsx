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
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedRol = localStorage.getItem('rol');
    if (storedUser) setUsuario(storedUser);
    if (storedRol) setRol(storedRol);
  }, []);

  // Ajustar pestaña activa si el rol es vendedor y la pestaña es cliente
  useEffect(() => {
    if (rol === 'vendedor' && tab === 'cliente') {
      setTab('vendedor');
    }
  }, [rol, tab]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    setUsuario(null);
    setRol(null);
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
        {rol && <strong>{rol} </strong>}Bienvenido: <strong>{usuario}</strong>
      </div>

      {/* Pestañas */}
      <div className="tabs">
        {/* Mostrar pestaña Administrador solo si rol es 'admin' */}
        {rol === 'admin' && (
          <button
            className={tab === 'administrador' ? 'active' : ''}
            onClick={() => setTab('administrador')}
          >
            Administrador
          </button>
        )}

        {/* Mostrar pestaña Cliente solo si el rol NO es 'vendedor' */}
        {rol !== 'vendedor' && (
          <button
            className={tab === 'cliente' ? 'active' : ''}
            onClick={() => setTab('cliente')}
          >
            Cliente
          </button>
        )}

        {/* Mostrar pestaña Vendedor solo si rol es 'vendedor' */}
        {rol === 'vendedor' && (
          <button
            className={tab === 'vendedor' ? 'active' : ''}
            onClick={() => setTab('vendedor')}
          >
            Vendedor
          </button>
        )}
      </div>

      {/* Vistas por pestaña */}
      {tab === 'cliente' && <ClienteView usuario={usuario} setUsuario={setUsuario} />}
      {tab === 'administrador' && rol === 'admin' && <AdminPanel />}
      {tab === 'vendedor' && rol === 'vendedor' && <VendedorView />}

      <Footer />
    </div>
  );
};

export default CartPage;
