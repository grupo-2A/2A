import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Footer from '../../components/Footer/Footer';

const LoginPage = () => {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [, setRol] = useState(''); // Estado para guardar el rol

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_or_phone: emailOrPhone,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);

        // Guardar el nombre de usuario (ajusta según tu backend)
        const nombreUsuario = data.username || emailOrPhone;
        localStorage.setItem('usuario', nombreUsuario);

        // Guardar el rol recibido desde el backend
        const rolUsuario = data.role; // se espera que el backend envíe el campo 'role'
        if (rolUsuario) {
          localStorage.setItem('rol', rolUsuario);
          setRol(rolUsuario); // Guardar también en estado
        }

        navigate('/cart');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="volverButton">
        Volver al Home
      </button>

      <div className="mainContent">
        <div className="formSection">
          <h2 className="title">INICIAR SESIÓN EN OVERLOOT</h2>
          <p className="subtitle">Ingresa tus datos a continuación</p>

          <input
            className="input"
            placeholder="Correo electrónico o número de teléfono"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="registerText">
            ¿No tienes cuenta?{' '}
            <span className="link" onClick={() => navigate('/registro')}>
              Regístrate
            </span>
          </p>

          <button className="loginButton" onClick={handleLogin}>
            INICIAR SESIÓN
          </button>

          {message && <p className="message">{message}</p>}
        </div>

        <div className="imageSection">
          <img src="/images/icon.png" alt="Caja" className="boxImage" />
          <h1 className="logoText">OVERLOOT</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
