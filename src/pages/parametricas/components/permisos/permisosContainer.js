import React from "react";
import { Route, Routes } from "react-router-dom";
import PermisosForm from "./components/permisosForm";
import PermisosList from "./components/permisosList";

const PermisosContainer = () => {
  return (
    <Routes>
      <Route index element={<PermisosList />} />
      <Route path="/new" element={<PermisosForm />} />
    </Routes>
  );
}

export default PermisosContainer;