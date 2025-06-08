const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '999999',
  database: 'overlootdb',
});

// Registro de usuario
app.post('/register', async (req, res) => {
  const {
    nombre,
    apellido,
    cedula,
    telefono,
    correo,
    direccion,
    contrasena,
  } = req.body;

  if (!nombre || !apellido || !cedula || !telefono || !correo || !direccion || !contrasena) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO usuarios (nombre, apellido, cedula, telefono, correo, direccion, contrasena)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      nombre,
      apellido,
      cedula,
      telefono,
      correo,
      direccion,
      hashedPassword,
    ]);

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ success: false, message: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { email_or_phone, password } = req.body;

  if (!email_or_phone || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  try {
    const sql = `
      SELECT * FROM usuarios WHERE correo = ? OR telefono = ? LIMIT 1
    `;
    const [rows] = await pool.query(sql, [email_or_phone, email_or_phone]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.contrasena);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      username: user.nombre,
      role: user.rol
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, apellido, cedula, telefono, correo, direccion, contrasena, rol FROM usuarios'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
});

// Modificar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, telefono, correo, direccion, rol } = req.body;

  try {
    const sql = `
      UPDATE usuarios SET nombre=?, apellido=?, cedula=?, telefono=?, correo=?, direccion=?, rol=?
      WHERE id=?
    `;
    await pool.query(sql, [nombre, apellido, cedula, telefono, correo, direccion, rol, id]);
    res.json({ success: true, message: 'Usuario actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
});

const PORT = 8000;
console.log('Iniciando servidor...');

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
