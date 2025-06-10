import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderPage.css';

// Importar Header y Footer reutilizables
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
    <>
      <Header />

      <div className="order-page">
        <div className="order-header">
          <h1>DETALLES DEL PEDIDO</h1>
          <button className="volver" onClick={() => navigate('/cart')}>Volver</button>
        </div>

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
      </div>

      <Footer />
    </>
  );
};

export default OrderPage;
