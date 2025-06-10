import React, { useState } from 'react';
import './EditAccountPage.css';

// Importar componentes reutilizables
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const EditAccountPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert('Cambios aplicados correctamente');
    console.log(formData);
  };

  return (
    <>
      <Header />

      <div className="edit-account-page">
        <a href="/" className="volver">VOLVER</a>

        <h2 className="edit-title">EDITA TU CUENTA</h2>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-row">
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Apellidos" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Dirección" onChange={handleChange} required />
          </div>
          <h4 style={{ color: 'white', textAlign: 'center' }}>Cambiar Contraseña</h4>
          <div className="form-row">
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" onChange={handleChange} />
          </div>

          <button type="submit" className="apply-button">APLICAR CAMBIOS</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditAccountPage;
