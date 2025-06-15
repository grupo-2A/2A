import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const API_URL = 'http://localhost:8000';

const AdminPanel = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: 0, precio: 0, categoria_id: '' });

  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editCategoriaNombre, setEditCategoriaNombre] = useState('');

  const [editProductoId, setEditProductoId] = useState(null);
  const [editProducto, setEditProducto] = useState({ nombre: '', cantidad: 0, precio: 0, categoria_id: '' });

  const [filtroProducto, setFiltroProducto] = useState('');

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(`${API_URL}/categorias/`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos/`);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const cargarCategoriaPorId = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/categorias/${id}`);
      setEditCategoriaId(res.data.id);
      setEditCategoriaNombre(res.data.nombre);
    } catch (error) {
      alert('Error al cargar categoría para edición');
    }
  };

  const cargarProductoPorId = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/productos/${id}`);
      setEditProductoId(res.data.id);
      setEditProducto({
        nombre: res.data.nombre,
        cantidad: res.data.cantidad,
        precio: res.data.precio,
        categoria_id: res.data.categoria_id,
      });
    } catch (error) {
      alert('Error al cargar producto para edición');
    }
  };

  const crearCategoria = async () => {
    if (!nuevaCategoria.trim()) return alert('Nombre no puede estar vacío');
    try {
      await axios.post(`${API_URL}/categorias/`, { nombre: nuevaCategoria });
      setNuevaCategoria('');
      obtenerCategorias();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al crear categoría');
    }
  };

  const crearProducto = async () => {
    const { nombre, cantidad, precio, categoria_id } = nuevoProducto;
    if (!nombre.trim() || !categoria_id) return alert('Datos incompletos');
    try {
      await axios.post(`${API_URL}/productos/`, nuevoProducto);
      setNuevoProducto({ nombre: '', cantidad: 0, precio: 0, categoria_id: '' });
      obtenerProductos();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al crear producto');
    }
  };

  const actualizarCategoria = async () => {
    if (!editCategoriaNombre.trim()) return alert('Nombre no puede estar vacío');
    try {
      await axios.put(`${API_URL}/categorias/${editCategoriaId}`, { nombre: editCategoriaNombre });
      setEditCategoriaId(null);
      setEditCategoriaNombre('');
      obtenerCategorias();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al actualizar categoría');
    }
  };

  const actualizarProducto = async () => {
    const { nombre, cantidad, precio, categoria_id } = editProducto;
    if (!nombre.trim() || !categoria_id) return alert('Datos incompletos');
    try {
      await axios.put(`${API_URL}/productos/${editProductoId}`, editProducto);
      setEditProductoId(null);
      setEditProducto({ nombre: '', cantidad: 0, precio: 0, categoria_id: '' });
      obtenerProductos();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al actualizar producto');
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await axios.delete(`${API_URL}/categorias/${id}`);
      obtenerCategorias();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al eliminar categoría');
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await axios.delete(`${API_URL}/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      alert(error.response?.data?.detail || 'Error al eliminar producto');
    }
  };

  const productosFiltrados = productos.filter((prod) => {
    const filtro = filtroProducto.toLowerCase();
    const nombre = prod.nombre.toLowerCase();
    const idStr = prod.id.toString();
    return nombre.includes(filtro) || idStr.includes(filtro);
  });

  return (
    <div className="admin-panel">
      <h1 className="titulo-admin">Panel de Administración</h1>

      {/* CATEGORÍAS */}
      <div className="seccion">
        <h2>Categorías</h2>
        <div className="form-group">
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nueva categoría"
          />
          <button onClick={crearCategoria}>Crear</button>
        </div>
        {editCategoriaId && (
          <div className="form-group edit-form">
            <input
              type="text"
              value={editCategoriaNombre}
              onChange={(e) => setEditCategoriaNombre(e.target.value)}
            />
            <button onClick={actualizarCategoria}>Guardar</button>
            <button onClick={() => setEditCategoriaId(null)} className="btn-cancelar">Cancelar</button>
          </div>
        )}
        <ul>
          {categorias.map((cat) => (
            <li key={cat.id}>
              {cat.nombre}{' '}
              <button onClick={() => cargarCategoriaPorId(cat.id)}>✏️</button>{' '}
              <button className="btn-delete" onClick={() => eliminarCategoria(cat.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCTOS */}
      <div className="seccion">
        <h2>Productos</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Buscar producto por nombre"
            value={filtroProducto}
            onChange={(e) => setFiltroProducto(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={nuevoProducto.cantidad}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) || 0 })}
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) || 0 })}
          />
          <select
            value={nuevoProducto.categoria_id}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria_id: parseInt(e.target.value) })}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <button onClick={crearProducto}>Crear</button>
        </div>
        {editProductoId && (
          <div className="form-group edit-form">
            <input
              type="text"
              value={editProducto.nombre}
              onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
            />
            <input
              type="number"
              value={editProducto.cantidad}
              onChange={(e) => setEditProducto({ ...editProducto, cantidad: parseInt(e.target.value) || 0 })}
            />
            <input
              type="number"
              value={editProducto.precio}
              onChange={(e) => setEditProducto({ ...editProducto, precio: parseFloat(e.target.value) || 0 })}
            />
            <select
              value={editProducto.categoria_id}
              onChange={(e) => setEditProducto({ ...editProducto, categoria_id: parseInt(e.target.value) })}
            >
              <option value="">Seleccione categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
            <button onClick={actualizarProducto}>Guardar</button>
            <button onClick={() => setEditProductoId(null)} className="btn-cancelar">Cancelar</button>
          </div>
        )}
        <ul>
          {productosFiltrados.map((prod) => (
            <li key={prod.id}>
              {prod.nombre} (Cantidad: {prod.cantidad}, Precio: ${prod.precio}) -{' '}
              {categorias.find((c) => c.id === prod.categoria_id)?.nombre || 'Sin categoría'}
              {' '}
              <button onClick={() => cargarProductoPorId(prod.id)}>✏️</button>{' '}
              <button className="btn-delete" onClick={() => eliminarProducto(prod.id)}>🗑️</button>
            </li>
          ))}
          {productosFiltrados.length === 0 && <li>No se encontraron productos.</li>}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;




