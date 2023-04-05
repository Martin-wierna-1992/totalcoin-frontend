
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ClientesForm from "./components/clientesForm";
import ClientesList from "./components/clientesList";
 
const Pedidos = () => {
  return (
    <Routes>
      <Route index element={<ClientesList />} />
      <Route path="/new" element={<ClientesForm />} />
    </Routes>
  );
}

export default Pedidos;