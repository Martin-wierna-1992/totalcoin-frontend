import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, notification, Spin } from "antd";
import UsuariosApi from "../../api/usuariosApi";
import { FormConfig } from "../../helpers/config";
import AuthHelper from "../../helpers/authHelper";

const FormItem = Form.Item;

const ChangePassForm = props => {
  const navigate = useNavigate();
  const [user] = useState(AuthHelper.getUser());
  const [working, setWorking] = useState(false);
  const [form] = Form.useForm();

  const onFinish = values => {
    if(values.newpassword !== values.repassword){
      notification.error({ message: 'Error', description: 'Los passwords nuevos deben ser iguales', placement: 'bottomRight' });
      return;
    }
    setWorking(true);
    UsuariosApi.changePassword(user.id, values.password, values.newpassword)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Contraseña modificada correctamente', placement: 'bottomRight' });
        form.resetFields();
        logout();
      })
      .catch(error => setWorking(false));
  };

  const logout = () => {
    AuthHelper.logout(() => navigate("/login"));
  }

  return (
    <Spin spinning={working}>
      <Form
        { ...FormConfig.DefaultLayout }
        name="basic"
        //initialValues={ {remember: true} }
        labelAlign="left"
        onFinish={ onFinish }
        form={form}
      >
        <FormItem label="Clave actual" name="password"
          rules={[
            ...FormConfig.DefaultRules,
            //{min: 6, message: 'La clave debe contener minimo 6 caracteres'}
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem label="Clave nueva" name="newpassword" 
          rules={[
            ...FormConfig.DefaultRules,
            {min: 6, message: 'La clave debe contener minimo 6 caracteres'}
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem label="Repetir clave" name="repassword" 
          rules={[
            ...FormConfig.DefaultRules,
            {min: 6, message: 'La clave debe contener minimo 6 caracteres'}
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem { ...{ wrapperCol: { span: 24 } } } style={{margin: 0}}>
          <Button block type="primary" htmlType="submit" loading={ working }>Cambiar</Button>
        </FormItem>
      </Form>
    </Spin>
  );
};

export default ChangePassForm;
