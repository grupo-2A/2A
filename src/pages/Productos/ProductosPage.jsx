import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductosPage.css'; // Estilos personalizados
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Simulamos una base de datos de productos (puedes reemplazar esto por props o API)
const productos = [
  { id: 1, nombre: 'PC Gamer Nitro', precio: 3500000, categoria: 'pc gamer', imagen: '' },
  { id: 2, nombre: 'Mouse Gamer RGB', precio: 120000, categoria: 'periféricos', imagen: '' },
  { id: 3, nombre: 'Silla Reclinable', precio: 480000, categoria: 'sillas', imagen: '' },
  { id: 4, nombre: 'Figura Goku', precio: 95000, categoria: 'figuras', imagen: '' },
  { id: 5, nombre: 'Tarjeta Gráfica RTX 3060', precio: 1800000, categoria: 'hardware', imagen: '' },
  { id: 6, nombre: 'Audífonos Inalámbricos', precio: 160000, categoria: 'accesorios', imagen: '' },
  { id: 7, nombre: 'PS5 Slim', precio: 2700000, categoria: 'consolas', imagen: '' },
  { id: 8, nombre: 'Juego FIFA 25', precio: 250000, categoria: 'juegos', imagen: '' },
];

const ProductosPages = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaParam = queryParams.get('categoria')?.toLowerCase();

  // Filtrar productos según la categoría en la URL
  const productosFiltrados = categoriaParam
    ? productos.filter(p => p.categoria === categoriaParam)
    : productos;

  return (
    <>
      <Header />

      <main className="productos-page-container">
        <h1 className="titulo-productos">
          {categoriaParam ? `Productos de la categoría: ${categoriaParam}` : 'Todos los productos'}
        </h1>

        <div className="productos-grid">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-precio">${producto.precio.toLocaleString('es-CO')}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductosPages;
