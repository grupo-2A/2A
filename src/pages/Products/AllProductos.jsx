import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AllProductos.css';

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

// Componente individual para mostrar un producto
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
          // Imagen por defecto o comentario para agregar luego
          <div style={{ width: 120, height: 120, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* TODO: Agregar imagen para este producto */}
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

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/productos/');
        const productosDB = res.data;

        // 1. Mapear productos locales (con imagen)
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

        // 2. Agregar los productos del backend que no están en los locales
        const nombresLocales = productosLocales.map(p => p.nombre.trim().toLowerCase());
        const productosSinImagen = productosDB
          .filter(p => !nombresLocales.includes(p.nombre.trim().toLowerCase()))
          .map(p => ({
            ...p,
            imagen: null // ❗ Aquí se puede luego agregar la ruta de imagen cuando esté disponible
          }));

        // 3. Unir todo y guardar
        setProductos([...productosConImagen, ...productosSinImagen]);
      } catch (error) {
        console.error('Error al obtener productos desde el backend:', error);
        const sinDatos = productosLocales.map(p => ({ ...p, precio: 0, cantidad: 0 }));
        setProductos(sinDatos);
      }
    };

    obtenerProductos();
  }, []);

  // Agrupar productos en filas de 4
  const filasDeProductos = productos.reduce((filas, producto, index) => {
    if (index % 4 === 0) filas.push([]);
    filas[filas.length - 1].push(producto);
    return filas;
  }, []);

  return (
    <>
      <Header />
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


