import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './Categorias.css'; // Importa los estilos

// Lista de categorías con su nombre e imagen
const categorias = [
  { label: 'PC Gamer', image: '/images/pcgamer.png' },
  { label: 'Periféricos', image: '/images/perifericos.png' },
  { label: 'Sillas', image: '/images/sillas.png' },
  { label: 'Figuras', image: '/images/figuras.png' },
  { label: 'Hardware', image: '/images/hardware.png' },
  { label: 'Accesorios', image: '/images/acsesorios.png' },
  { label: 'Consolas', image: '/images/consolas.png' },
  { label: 'Juegos', image: '/images/juegos.png' }
];

// Componente individual de botón de categoría
const CategoryButton = ({ label, image }) => (
  <div className="category-button-container">
    <Link to={`/productos?categoria=${encodeURIComponent(label.toLowerCase())}`}>
      <button className="boton-morado">
        <img src={image} alt={label} />
      </button>
    </Link>
    <p className="texto-cte">{label}</p>
  </div>
);

// Componente principal de Categorías que organiza en filas de 4
const Categorias = () => {
  const rows = [];
  for (let i = 0; i < categorias.length; i += 4) {
    rows.push(
      <div key={i} className="categorias-row">
        {categorias.slice(i, i + 4).map((cat, idx) => (
          <CategoryButton key={idx} label={cat.label} image={cat.image} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default Categorias;
