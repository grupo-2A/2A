import React, { useState } from 'react';

const GestionProductos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuscar = () => {
    alert(`Buscar producto: ${searchTerm}`);
  };

  const handleAgregar = () => {
    alert('Agregar producto');
  };

  const handleModificar = () => {
    alert('Modificar producto');
  };

  const handleEliminar = () => {
    alert('Eliminar producto');
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>
      <button onClick={handleAgregar}>Agregar</button>
      <button onClick={handleModificar}>Modificar</button>
      <button onClick={handleEliminar}>Eliminar</button>
    </div>
  );
};

export default GestionProductos;
