
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import MascotaForm from "./components/mascotaForm";
import MascotaList from "./components/mascotaList";
 
const Mascotas = () => {
  return (
    <Routes>
      <Route index element={<MascotaList />} />
      <Route path="/new" element={<MascotaForm />} />
    </Routes>
  );
}

export default Mascotas;