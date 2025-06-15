import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productos.css'; // Importa los estilos CSS

// Productos locales con imágenes
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

// Tarjeta individual del producto
const ProductCard = ({ producto }) => {
  const navigate = useNavigate();
  const { nombre, imagen, precio, cantidad } = producto;

  let textoStock;
  if (cantidad > 10) {
    textoStock = "Disponible";
  } else if (cantidad > 0 && cantidad <= 10) {
    textoStock = `Quedan ${cantidad} unidad${cantidad > 1 ? 'es' : ''}`;
  } else {
    textoStock = "No hay stock";
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="cuadro-morado">
        <img
          src={imagen}
          alt={nombre}
          width={120} 
        />
      </div>
      <p className="texto-producto">{nombre}</p>
      <p className="texto-precio">${precio.toLocaleString('es-CO')}</p>
      <p className="texto-stock">{textoStock}</p>
      <button
        className="boton-comprar"
        onClick={() => navigate('/product')}
        aria-label="Comprar"
      >
        Comprar
      </button>
    </div>
  );
};

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/productos/')
      .then(res => {
        const productosDB = res.data;

        // Mapear productos locales con sus datos del backend por nombre
        const combinados = productosLocales.map(local => {
          const encontrado = productosDB.find(p =>
            p.nombre.trim().toLowerCase() === local.nombre.trim().toLowerCase()
          );

          return {
            ...local,
            precio: encontrado ? encontrado.precio : 0,
            cantidad: encontrado ? encontrado.cantidad : 0
          };
        });

        setProductos(combinados);
      })
      .catch(err => {
        console.error("Error al cargar productos desde el backend:", err);
        const sinDatos = productosLocales.map(p => ({ ...p, precio: 0, cantidad: 0 }));
        setProductos(sinDatos);
      });
  }, []);

  // Mostrar productos en filas de 4
  return (
    <div>
      {productos.reduce((rows, producto, index) => {
        if (index % 4 === 0) rows.push([]);
        rows[rows.length - 1].push(producto);
        return rows;
      }, []).map((fila, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          {fila.map((p, index) => <ProductCard key={index} producto={p} />)}
        </div>
      ))}
    </div>
  );
};
export default Productos;
