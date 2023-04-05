import React from "react";
import LoginForm from "./LoginForm";
import logo from '../../assets/toro.png';
import background from '../../assets/bg.jpg';
import './LoginPage.scss';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div style={ { height:'100vh' } }>

      <div className="login-main">
        <div className="logoWrapper">
          <h3>Veterinaria Login</h3>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage;