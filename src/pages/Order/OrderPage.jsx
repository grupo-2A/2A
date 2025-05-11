import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { items = [], total = 0 } = state || {};

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Orden enviada correctamente');
    console.log('Datos del formulario:', formData);
    console.log('Productos:', items);
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <h1>DETALLES DEL PEDIDO</h1>
        <button className="volver" onClick={() => navigate('/cart')}>Volver</button>
      </header>

      <div className="order-content">
        <form onSubmit={handleSubmit} className="order-form">
          <label>Nombre:
            <input type="text" name="name" onChange={handleChange} required />
          </label>
          <label>Dirección:
            <input type="text" name="address" onChange={handleChange} required />
          </label>
          <label>Apartamento, Piso, etc. (opcional):
            <input type="text" name="apartment" onChange={handleChange} />
          </label>
          <label>Ciudad:
            <input type="text" name="city" onChange={handleChange} required />
          </label>
          <label>Número de celular:
            <input type="tel" name="phone" onChange={handleChange} required />
          </label>
          <label>Correo Electrónico:
            <input type="email" name="email" onChange={handleChange} required />
          </label>
        </form>

        <div className="order-summary">
          {items.map((item, index) => (
            <div key={index} className="order-item">
              <img src="/images/kurumi.png" alt={item.name} />
              <div>{item.name}</div>
              <div>${(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}

          <p className="order-total"><strong>Total: ${total.toLocaleString()}</strong></p>

          <div className="payment-section">
            <img src="/images/cards.png" alt="cards" style={{ width: '100px' }} />
            <input type="text" name="cardNumber" placeholder="Número de tarjeta" onChange={handleChange} required />
            <input type="text" name="cardName" placeholder="Nombre Titular de la Tarjeta" onChange={handleChange} required />
            <div className="card-details">
              <input type="text" name="expiry" placeholder="MM/AA" onChange={handleChange} required />
              <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required />
            </div>
            <button type="submit" className="pay-button" onClick={handleSubmit}>PAGAR ORDEN</button>
          </div>
        </div>
      </div>

      <footer className="order-footer">
        <div>
          <img src="/images/logo.png" alt="logo" />
          <p>Loot para tu Setup</p>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>Bogotá, Colombia</p>
          <p>overloot@loot.com</p>
          <p>0000-0000-0000</p>
        </div>
        <div>
          <h4>Cuenta</h4>
          <p>Mi cuenta</p>
          <p>Iniciar sesión/Registrarse</p>
          <p>Carrito</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderPage;
