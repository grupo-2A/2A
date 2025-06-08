import React, { useState, useEffect } from 'react';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    correo: '',
    direccion: '',
    contrasena: '',
    rol: '',
  });

  const [busqueda, setBusqueda] = useState('');

  // Cargar usuarios desde API
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/usuarios');
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data = await res.json();
      setUsuarios(data);
      setUsuariosFiltrados(data); // Inicializa filtrados con todos
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Manejar modificación de usuario
  const handleModificar = async (id, campo, valor) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return;

    const usuarioActualizado = { ...usuario, [campo]: valor };

    try {
      const res = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioActualizado),
      });
      if (!res.ok) throw new Error('Error al actualizar usuario');

      const usuariosActualizados = usuarios.map((u) =>
        u.id === id ? usuarioActualizado : u
      );
      setUsuarios(usuariosActualizados);
      setUsuariosFiltrados(usuariosActualizados);
    } catch (e) {
      alert(e.message);
    }
  };

  // Manejar eliminación de usuario
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;

    try {
      const res = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar usuario');

      const usuariosActualizados = usuarios.filter((u) => u.id !== id);
      setUsuarios(usuariosActualizados);
      setUsuariosFiltrados(usuariosActualizados);
    } catch (e) {
      alert(e.message);
    }
  };

  // Manejar agregar nuevo usuario
  const handleAgregar = async () => {
    if (
      !newUsuario.nombre ||
      !newUsuario.apellido ||
      !newUsuario.correo ||
      !newUsuario.contrasena
    ) {
      alert('Completa nombre, apellido, correo y contraseña');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsuario),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error al agregar usuario');
        return;
      }

      alert('Usuario agregado correctamente');
      setNewUsuario({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        contrasena: '',
        rol: '',
      });

      // Recargar usuarios para actualizar lista
      await cargarUsuarios();
      setBusqueda(''); // Limpiar búsqueda al agregar
    } catch (e) {
      console.error('Error al agregar usuario:', e);
      alert('Error al agregar usuario');
    }
  };

  // Manejar búsqueda
  const manejarBusqueda = () => {
    const texto = busqueda.toLowerCase();
    const filtrados = usuarios.filter(
      (u) =>
        (u.nombre?.toLowerCase() || '').includes(texto) ||
        (u.apellido?.toLowerCase() || '').includes(texto) ||
        (u.cedula?.toLowerCase() || '').includes(texto) ||
        (u.correo?.toLowerCase() || '').includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };

  // Permitir búsqueda con Enter
  const onKeyDownBusqueda = (e) => {
    if (e.key === 'Enter') {
      manejarBusqueda();
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, cédula o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={onKeyDownBusqueda}
          style={{ padding: '5px', width: '300px' }}
        />
        <button
          onClick={manejarBusqueda}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Buscar
        </button>
      </div>

      <table border="1" cellPadding="5" style={{ width: '100%', fontSize: '14px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <input
                  type="text"
                  value={u.nombre}
                  onChange={(e) => handleModificar(u.id, 'nombre', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.apellido}
                  onChange={(e) => handleModificar(u.id, 'apellido', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.cedula}
                  onChange={(e) => handleModificar(u.id, 'cedula', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.telefono}
                  onChange={(e) => handleModificar(u.id, 'telefono', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={u.correo}
                  onChange={(e) => handleModificar(u.id, 'correo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={u.direccion}
                  onChange={(e) => handleModificar(u.id, 'direccion', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={u.rol || ''}
                  onChange={(e) => handleModificar(u.id, 'rol', e.target.value)}
                >
                  <option value="">Seleccione rol</option>
                  <option value="admin">Admin</option>
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar nuevo usuario</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <input
          type="text"
          placeholder="Nombre"
          value={newUsuario.nombre}
          onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newUsuario.apellido}
          onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cédula"
          value={newUsuario.cedula}
          onChange={(e) => setNewUsuario({ ...newUsuario, cedula: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newUsuario.telefono}
          onChange={(e) => setNewUsuario({ ...newUsuario, telefono: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={newUsuario.correo}
          onChange={(e) => setNewUsuario({ ...newUsuario, correo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={newUsuario.direccion}
          onChange={(e) => setNewUsuario({ ...newUsuario, direccion: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUsuario.contrasena}
          onChange={(e) => setNewUsuario({ ...newUsuario, contrasena: e.target.value })}
        />
        <select
          value={newUsuario.rol}
          onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
        >
          <option value="">Seleccione rol</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
        </select>
      </div>
      <button onClick={handleAgregar} style={{ marginTop: '10px' }}>
        Agregar Usuario
      </button>
    </div>
  );
};

export default GestionUsuarios;
