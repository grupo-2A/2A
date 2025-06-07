import React, { useState } from 'react';

const pedidosMock = [
  { id: 1, cliente: 'Juan', estado: 'Entregado' },
  { id: 2, cliente: 'Ana', estado: 'Pendiente' },
  { id: 3, cliente: 'Luis', estado: 'Devuelto' },
];

const GestionPedidos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');

  const filteredPedidos = pedidosMock.filter(pedido =>
    pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (estadoFilter === '' || pedido.estado === estadoFilter)
  );

  return (
    <div>
      <h2>Gestión de Pedidos</h2>

      <input
        type="text"
        placeholder="Buscar pedido por cliente"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <select value={estadoFilter} onChange={e => setEstadoFilter(e.target.value)}>
        <option value="">Todos los estados</option>
        <option value="Entregado">Entregado</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Devuelto">Devuelto</option>
      </select>

      <table border="1" cellPadding="5" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPedidos;
