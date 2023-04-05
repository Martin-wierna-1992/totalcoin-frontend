
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ClientesList from "./components/clientesList";
 
const PedidosVendores = () => {
  return (
    <Routes>
      <Route index element={<ClientesList />} />
    </Routes>
  );
}

export default PedidosVendores;