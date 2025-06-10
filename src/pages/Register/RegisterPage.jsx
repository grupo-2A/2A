import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';
import Footer from '../../components/Footer/Footer';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    repetirContrasena: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio';
    if (!formData.contrasena) newErrors.contrasena = 'La contraseña es obligatoria';
    if (formData.contrasena !== formData.repetirContrasena) {
      newErrors.repetirContrasena = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            correo: formData.correo,
            contrasena: formData.contrasena,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert('Registro exitoso!');
          navigate('/login');
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        alert('Error al conectar con el servidor');
        console.error(error);
      }
    }
  };

  return (
    <div className="register-container">
      <button onClick={() => navigate('/')} className="volver-button">
        Volver al Home
      </button>

      <div className="register-content">
        <div className="register-image">
          <img src="/images/logo.png" alt="Loot box" />
        </div>

        <div className="register-form">
          <h2>REGISTRARTE EN OVERLOOT</h2>
          <p><strong>Ingresa tus datos</strong></p>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="error">{errors.nombre}</p>}

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
            />
            {errors.correo && <p className="error">{errors.correo}</p>}

            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
            />
            {errors.contrasena && <p className="error">{errors.contrasena}</p>}

            <input
              type="password"
              name="repetirContrasena"
              placeholder="Repetir contraseña"
              value={formData.repetirContrasena}
              onChange={handleChange}
            />
            {errors.repetirContrasena && <p className="error">{errors.repetirContrasena}</p>}

            <button type="submit" className="register-button">REGISTRARSE</button>
          </form>

          <p className="login-link">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="login-link-color">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
