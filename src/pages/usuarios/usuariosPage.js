
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import UsuariosForm from "./components/usuariosForm";
import UsuariosList from "./components/usuariosList";
 
const UsuariosPage = () => {
  return (
    <Routes>
      <Route index element={<UsuariosList />} />
      <Route path="/new" element={<UsuariosForm />} />
      <Route path="/edit/:id" element={<UsuariosForm />} />
    </Routes>
  );
}

export default UsuariosPage;