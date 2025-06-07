import React from 'react';

const ConfiguracionTienda = () => {
  const botones = [
    'Ajustes de Pagos',
    'Envíos',
    'Impuestos',
    'Cupones',
    'Promociones',
  ];

  return (
    <div>
      <h2>Configuración de la Tienda</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {botones.map(boton => (
          <button key={boton} onClick={() => alert(`Configuración: ${boton}`)}>
            {boton}
          </button>
        ))}
      </div>
      {/* Aquí puedes agregar tablas o formularios específicos para cada sección */}
    </div>
  );
};

export default ConfiguracionTienda;
