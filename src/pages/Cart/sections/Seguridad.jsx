import React from 'react';

const Seguridad = () => {
  const botones = [
    'Gestión de Accesos',
    'Autenticación',
    'Protección de Datos Sensibles',
  ];

  return (
    <div>
      <h2>Seguridad</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {botones.map(boton => (
          <button key={boton} onClick={() => alert(`Función: ${boton}`)}>
            {boton}
          </button>
        ))}
      </div>
      {/* Puedes agregar más controles o formularios para cada función */}
    </div>
  );
};

export default Seguridad;
