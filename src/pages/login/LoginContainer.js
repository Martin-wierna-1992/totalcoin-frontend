import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterForm from "./components/loginPage/RegisterForm";

const LoginContainer = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default LoginContainer;
