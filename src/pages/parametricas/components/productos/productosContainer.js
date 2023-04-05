
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ProductosForm from "./components/productosForm";
import ProductosList from "./components/productosList";
 
const ProductosContainer = () => {
  return (
    <Routes>
      <Route index element={<ProductosList />} />
      <Route path="/new" element={<ProductosForm />} />
      <Route path="/edit/:id" element={<ProductosForm />} />
    </Routes>
  );
}

export default ProductosContainer;