import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import './AllProductos.css';
import { useNavigate } from 'react-router-dom';

const productosLocales = [
  { imagen: '/images/destacados/fifa.png', nombre: "PS5 EA sports FC 25" },
  { imagen: '/images/destacados/monitor.png', nombre: "Monitor Samsung 24 Pulgadas" },
  { imagen: '/images/destacados/portatil.png', nombre: "Portátil Lenovo 15.6 " },
  { imagen: '/images/destacados/sillaof.png', nombre: "Silla de oficina" },
  { imagen: '/images/destacados/esfera.png', nombre: "Esferas del Dragón DBZ" },
  { imagen: '/images/destacados/zoro.png', nombre: "Funko Pop! One Piece - Roronoa" },
  { imagen: '/images/destacados/game.png', nombre: "Reproductor MP5 Genérico" },
  { imagen: '/images/destacados/tarjeta.png', nombre: "Tarjeta Grafica GT210" }
];

const ProductCard = ({ producto }) => {
  const { nombre, imagen, precio = 0, cantidad = 0 } = producto;

  const textoStock =
    cantidad > 10
      ? 'Disponible'
      : cantidad > 0
      ? `Quedan ${cantidad} unidad${cantidad > 1 ? 'es' : ''}`
      : 'No hay stock';

  return (
    <div className="producto-card">
      <div className="cuadro-morado">
        {imagen ? (
          <img src={imagen} alt={nombre} width={120} />
        ) : (
          <div style={{ width: 120, height: 120, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', textAlign: 'center', padding: '4px' }}>Imagen no disponible</span>
          </div>
        )}
      </div>
      <p className="texto-producto">{nombre}</p>
      <p className="texto-precio">${precio.toLocaleString('es-CO')}</p>
      <p className="texto-stock">{textoStock}</p>
      <button className="boton-comprar">Comprar</button>
    </div>
  );
};

const AllProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll al tope de la página al cargar
    window.scrollTo(0, 0);

    const obtenerProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/productos/');
        const productosDB = res.data;

        const productosConImagen = productosLocales.map(local => {
          const match = productosDB.find(p =>
            p.nombre.trim().toLowerCase() === local.nombre.trim().toLowerCase()
          );
          return {
            ...local,
            precio: match ? match.precio : 0,
            cantidad: match ? match.cantidad : 0
          };
        });

        const nombresLocales = productosLocales.map(p => p.nombre.trim().toLowerCase());
        const productosSinImagen = productosDB
          .filter(p => !nombresLocales.includes(p.nombre.trim().toLowerCase()))
          .map(p => ({
            ...p,
            imagen: null
          }));

        setProductos([...productosConImagen, ...productosSinImagen]);
      } catch (error) {
        console.error('Error al obtener productos desde el backend:', error);
        const sinDatos = productosLocales.map(p => ({ ...p, precio: 0, cantidad: 0 }));
        setProductos(sinDatos);
      }
    };

    obtenerProductos();
  }, []);

  // Filtrado básico por nombre
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const filasDeProductos = productosFiltrados.reduce((filas, producto, index) => {
    if (index % 4 === 0) filas.push([]);
    filas[filas.length - 1].push(producto);
    return filas;
  }, []);

  return (
    <>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      
      <div className="header-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/')}>Volver al Home</button>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={() => {}} style={{ padding: '6px 10px' }}>Buscar</button>
      </div>

      <main className="all-productos-container">
        <h1>Todos los Productos</h1>
        {filasDeProductos.map((fila, i) => (
          <div key={i} className="fila-productos">
            {fila.map((producto, j) => (
              <ProductCard key={j} producto={producto} />
            ))}
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default AllProductos;
