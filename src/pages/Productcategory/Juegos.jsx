import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Categorias.css';

// Productos locales con imágenes
const productosLocales = [
  { imagen: '/images/juegos/fifa24.png', nombre: "FIFA 24 PS5" },
];

const Juegos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/productos/');
        const productosFiltrados = res.data.filter(p => Number(p.categoria_id) === 8);

        const productosConImagen = productosFiltrados.map(prod => {
          const local = productosLocales.find(local =>
            local.nombre.trim().toLowerCase() === prod.nombre.trim().toLowerCase()
          );

          return {
            ...prod,
            imagen: local ? local.imagen : null
          };
        });

        setProductos(productosConImagen);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <>
      <Header />
      <main className="categoria-container">
        <h1>Juegos</h1>
        <div className="productos-categoria">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="producto-card">
                <div className="cuadro-morado">
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre} width={120} />
                  ) : (
                    <div style={{ width: 120, height: 120, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '12px', textAlign: 'center', padding: '4px' }}>Imagen no disponible</span>
                    </div>
                  )}
                </div>
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio.toLocaleString()}</p>
                <p>Disponibles: {producto.cantidad}</p>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Juegos;
