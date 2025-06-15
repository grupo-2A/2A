import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import RegisterPage from '../pages/Register/RegisterPage';
import CartPage from '../pages/Cart/CartPage';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import OrderPage from '../pages/Order/OrderPage';
import EditAccountPage from '../pages/EditAccount/EditAccountPage';
import Admin from '../pages/Admin/AdminPanel';
import AllProductos from '../pages/Products/AllProductos';
import PCgamer from '../pages/Productcategory/PCgamer';
import Perifericos from '../pages/Productcategory/Perifericos';
import Accesorios from '../pages/Productcategory/Accesorios';
import Consolas from '../pages/Productcategory/Consolas';
import Figuras from '../pages/Productcategory/Figuras';
import Hardware from '../pages/Productcategory/Hardware';
import Sillas from '../pages/Productcategory/Sillas';
import Juegos from '../pages/Productcategory/Juegos';



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
        <Route path="/AdminPanel" element={<Admin />} />
        <Route path="/AllProductos" element={<AllProductos />} />
        <Route path="/PCgamer" element={<PCgamer />} />
        <Route path="/Perifericos" element={<Perifericos />} />
        <Route path="/Accesorios" element={<Accesorios />} />
        <Route path="/Consolas" element={<Consolas />} />
        <Route path="/Figuras" element={<Figuras />} />
        <Route path="/Hardware" element={<Hardware/>} />
        <Route path="/Sillas" element={<Sillas />} />
        <Route path="/Juegos" element={<Juegos />} />
      </Routes>
    </BrowserRouter>
  );
}
