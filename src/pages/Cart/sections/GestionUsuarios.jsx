import React, { useState } from 'react';

// Mock usuarios; luego se puede reemplazar con llamada a API o DB real
const initialUsuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@mail.com' },
  { id: 2, nombre: 'Ana', email: 'ana@mail.com' },
];

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [newUsuario, setNewUsuario] = useState({ nombre: '', email: '' });

  const handleAgregar = () => {
    if (!newUsuario.nombre || !newUsuario.email) {
      alert('Completa nombre y email');
      return;
    }
    const nuevo = { id: Date.now(), ...newUsuario };
    setUsuarios([...usuarios, nuevo]);
    setNewUsuario({ nombre: '', email: '' });
  };

  const handleEliminar = id => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const handleModificar = (id, campo, valor) => {
    setUsuarios(
      usuarios.map(u => (u.id === id ? { ...u, [campo]: valor } : u))
    );
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <input
                  type="text"
                  value={u.nombre}
                  onChange={e => handleModificar(u.id, 'nombre', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={u.email}
                  onChange={e => handleModificar(u.id, 'email', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleEliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar nuevo usuario</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={newUsuario.nombre}
        onChange={e => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUsuario.email}
        onChange={e => setNewUsuario({ ...newUsuario, email: e.target.value })}
      />
      <button onClick={handleAgregar}>Agregar Usuario</button>
    </div>
  );
};

export default GestionUsuarios;
