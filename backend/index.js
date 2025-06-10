const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/overloot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Modelo de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  contrasena: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta base
app.get('/', (req, res) => {
  res.send('API de Overloot funcionando 🚀');
});

// Registro
app.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: hashedPassword
    });

    await nuevoUsuario.save();

    return res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ success: false, message: 'Error en el registro' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email_or_phone, password } = req.body;

    const usuario = await Usuario.findOne({
      $or: [{ correo: email_or_phone }]
    });

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.contrasena);
    if (!passwordValida) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ success: false, message: 'Error en el login' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
