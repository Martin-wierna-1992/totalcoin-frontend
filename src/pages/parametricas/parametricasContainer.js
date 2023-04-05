import React from "react";
import { Route, Routes } from "react-router-dom";
import RolesContainer from "./components/roles/rolesContainer";
import ParametricasPage from "./components/parametricasPage";
import PermisosContainer from "./components/permisos/permisosContainer";
import ProductosContainer from "./components/productos/productosContainer";

const ParametricasContainer = props => {
  return (
    <Routes>
      <Route index element={<ParametricasPage />} />
      <Route path="/productos/*" element={<ProductosContainer />} />
      <Route path="/roles/*" element={<RolesContainer />} />
      <Route path="/permisos/*" element={<PermisosContainer />} />
    </Routes>
  );
}

export default ParametricasContainer;
