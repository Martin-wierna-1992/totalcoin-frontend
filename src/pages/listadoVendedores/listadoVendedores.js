
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import VendedoresList from "./components/vendedoresList";
import VendedorForm from "./components/vendedorForm";
const ListadoVendedores = () => {
  return (
    <Routes>
      <Route index element={<VendedoresList />} />
      <Route path="/new" element={<VendedorForm />} />

    </Routes>
  );
}

export default ListadoVendedores;