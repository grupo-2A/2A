import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import RegisterPage from '../pages/Register/RegisterPage';
import CartPage from '../pages/Cart/CartPage';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import OrderPage from '../pages/Order/OrderPage';
import EditAccountPage from '../pages/EditAccount/EditAccountPage';
import ProductosPage from '../pages/Productos/ProductosPage'; 


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              estiloBotonTexto="boton-texto"
              estiloBotonIcono="boton-icono"
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
        <Route path="/productos" element={<ProductosPage />} />

      </Routes>
    </BrowserRouter>
  );
}
