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
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <button onClick={() => setAdminSection('gestion-productos')}>Gestión de Productos</button>
        <button onClick={() => setAdminSection('gestion-pedidos')}>Gestión de Pedidos</button>
        <button onClick={() => setAdminSection('gestion-usuarios')}>Gestión de Usuarios</button>
        <button onClick={() => setAdminSection('configuracion-tienda')}>Configuración de la Tienda</button>
        <button onClick={() => setAdminSection('seguridad')}>Seguridad</button>
      </aside>

      <main className="admin-content">
        {renderAdminContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
