import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, notification } from "antd";
import LoginApi from '../../api/LoginApi';
import './LoginPage.scss';
import { FormConfig } from "../../../../helpers/config";
import AuthHelper from '../../../../helpers/authHelper';
import { useLocation } from "react-router";

const FormItem = Form.Item;
const RegisterForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [working, setWorking] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);


  const onFinish = (values) => {
    setWorking(true);
    navigate(-1)
    /* LoginApi.login(values.email, values. password)
      .then(response => {
        setWorking(false);
        navigate("/", { replace: true });
      })
      .catch(error => { setWorking(false); }); */
  };

 
  return (
    <div style={ { height:'100vh' } }>

      <div className="login-main">
        <div className="logoWrapper">
          <h3>REGISTRARSE</h3>
        </div>
        <Form
      { ...FormConfig.DefaultLayout }
      name="basic"
      initialValues={ {remember: true} }
      labelAlign="left"
      onFinish={ onFinish }
    >
      <FormItem label="Email" name="email"
        rules={ [
          ...FormConfig.DefaultRules,
          {type: 'email', message: 'Por favor ingrese un email válido' }
        ] }
      >
        <Input />
      </FormItem>
      <FormItem label="Password" name="password" rules={ FormConfig.DefaultRules }>
        <Input.Password />
      </FormItem>

      <FormItem { ...{ wrapperCol: { span: 24 } } }>
        <Button block type="primary" htmlType="submit" loading={ working }>ENVIAR DATOS</Button>
      </FormItem>
    </Form>
      </div>
    </div>
    
  );
};

export default RegisterForm;
