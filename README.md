# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
___________________________________________________________________________________________________________________________________________________________________
# OverLoot - Backend de Registro y Login

Este es el backend del proyecto OverLoot, un sistema básico de registro e inicio de sesión de usuarios, desarrollado con **Node.js**, **Express** y **MongoDB**.

## Tecnologías usadas

- Node.js  
- Express  
- MongoDB + Mongoose  
- Bcrypt (encriptación de contraseñas)  
- CORS
- FastAPI
- MySQL
- PostGreSQL
- React + Vite

## Cómo iniciar el proyecto

1. Asegurar de tener MongoDB, MySQL o PostGreSQL corriendo.
2. Clonar este repositorio.
3. Instala las dependencias con:

```bash
npm install
```

4. Inicia el servidor:

```bash
node index.js
```

El backend se ejecutará en `http://localhost:8000`.

## Endpoints disponibles

- `POST /register` - Registrar usuario
- `POST /login` - Iniciar sesión
- `GET /usuarios` - Obtener todos los usuarios
- `PUT /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id` - Eliminar usuario

## Usuario administrador

Este sistema genera un usuario administrador oculto automáticamente.
- Este usuario no se muestra en las consultas públicas de usuarios.

## Seguridad implementada

- Contraseñas encriptadas con bcrypt
- Correos convertidos a minúsculas para evitar duplicados
- Usuario administrador protegido desde el backend

## Estructura principal

```
├── index.js
├── package.json
├── node_modules/
└── README.md
```

---

Desarrollado para OverLoot Ecommerce 
