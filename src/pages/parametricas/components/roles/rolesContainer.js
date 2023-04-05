import React from "react";
import { Route, Routes } from "react-router-dom";
import RolesForm from "./components/rolesForm";
import RolesList from "./components/rolesList";

const RolesContainer = () => {
  return (
    <Routes>
      <Route index element={<RolesList />} />
      <Route path="/new" element={<RolesForm />} />
    </Routes>
  );
}

export default RolesContainer;