
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import VendedoresList from "./components/clienteMascotasList";

const ClienteMascotas = () => {
  return (
    <Routes>
      <Route index element={<VendedoresList />} />
    </Routes>
  );
}

export default ClienteMascotas;