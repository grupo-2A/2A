import React, { useState } from 'react';
import GestionProductos from './sections/GestionProductos';
import GestionPedidos from './sections/GestionPedidos';
import GestionUsuarios from './sections/GestionUsuarios';
import ConfiguracionTienda from './sections/ConfiguracionTienda';
import Seguridad from './sections/Seguridad';

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
    <div
      className="admin-panel"
      style={{
        display: 'flex',
        flexDirection: 'row', // fila para botones y contenido lado a lado
        gap: '20px',
        alignItems: 'flex-start', // alinea arriba
        padding: '20px',
      }}
    >
      <div
        className="admin-buttons"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '220px',
        }}
      >
        <button onClick={() => setAdminSection('gestion-productos')}>
          Gestión de Productos
        </button>
        <button onClick={() => setAdminSection('gestion-pedidos')}>
          Gestión de Pedidos
        </button>
        <button onClick={() => setAdminSection('gestion-usuarios')}>
          Gestión de Usuarios
        </button>
        <button onClick={() => setAdminSection('configuracion-tienda')}>
          Configuración de la Tienda
        </button>
        <button onClick={() => setAdminSection('seguridad')}>
          Seguridad
        </button>
      </div>

      <div
        className="admin-content"
        style={{
          flex: 1, // ocupa el espacio restante
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          minHeight: '300px',
        }}
      >
        {renderAdminContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
