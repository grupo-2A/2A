import React, { useState } from 'react';
import GestionProductos from './sections/GestionProductos';
import GestionPedidos from './sections/GestionPedidos';
import GestionUsuarios from './sections/GestionUsuarios';
import ConfiguracionTienda from './sections/ConfiguracionTienda';
import Seguridad from './sections/Seguridad';

import './AdminPanel.css';

const AdminPanel = () => {
  const [adminSection, setAdminSection] = useState('gestion-productos');

  const renderAdminContent = () => {
    switch (adminSection) {
      case 'gestion-productos':
        return <GestionProductos />;
      case 'gestion-pedidos':
        return <GestionPedidos />;
      case 'gestion-usuarios':
        return <GestionUsuarios />;
      case 'configuracion-tienda':
        return <ConfiguracionTienda />;
      case 'seguridad':
        return <Seguridad />;
      default:
        return <GestionProductos />;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-buttons admin-menu">
        <button
          className={adminSection === 'gestion-productos' ? 'active' : ''}
          onClick={() => setAdminSection('gestion-productos')}
        >
          Gestión de Productos
        </button>
        <button
          className={adminSection === 'gestion-pedidos' ? 'active' : ''}
          onClick={() => setAdminSection('gestion-pedidos')}
        >
          Gestión de Pedidos
        </button>
        <button
          className={adminSection === 'gestion-usuarios' ? 'active' : ''}
          onClick={() => setAdminSection('gestion-usuarios')}
        >
          Gestión de Usuarios
        </button>
        <button
          className={adminSection === 'configuracion-tienda' ? 'active' : ''}
          onClick={() => setAdminSection('configuracion-tienda')}
        >
          Configuración de la Tienda
        </button>
        <button
          className={adminSection === 'seguridad' ? 'active' : ''}
          onClick={() => setAdminSection('seguridad')}
        >
          Seguridad
        </button>
      </div>

      <div className="admin-content">{renderAdminContent()}</div>
    </div>
  );
};

export default AdminPanel;
