import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { PageHeader, Button, Form, Card, Input, notification, Select, Spin } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import { FormConfig } from "../../../helpers/config";
import AppCard from "../../../components/appCard";
import RolesApi from "../../../api/rolesApi";
import UsuariosApi from "../../../api/usuariosApi";

const FormItem = Form.Item;
const Option = Select.Option;

const UsuariosForm = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usuario, setUsuario] = useState(undefined);
  const [roles, setRoles] = useState([]);
  const [working, setWorking] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadRoles();
    if(location.pathname.includes('edit')){
      loadUsuario(params.id);
    }
  }, []);

  const loadRoles = () => RolesApi.get().then(response => setRoles(response));

  const loadUsuario = id => {
    setWorking(true);
    UsuariosApi.get(id)
      .then((response) => {
        setWorking(false);
        setUsuario(response);
        form.setFieldsValue({ ...response });
      })
      .catch((error) => setWorking(false));
  }

  const onFinish = values => {
    if(values.password !== values.newpassword){
      notification.error({message: 'Error', description: 'Los password deben ser iguales', placement: 'bottomRight'});
      return;
    }

    setWorking(true);

    let data = { 
      id: params.id, 
      ...values 
    }
    
    UsuariosApi.save(data)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Usuario guardado correctamente', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ `${ usuario && usuario.id ? 'Editar usuario' : 'Nuevo usuario'}` }
        /*subTitle="Formulario"*/
        onBack={ () => navigate(-1) }
      />
      <div style={ { padding: 20 } }>
        <Spin spinning={ working }>
          <Card>
            <Form
              { ...FormConfig.DefaultLayout }
              form={ form }
              name="formulario"
              onFinish={ onFinish }
              initialValues={{ ...usuario }}
              scrollToFirstError
            >
              <FormItem name="email" label="Email"
                rules={ [
                  ...FormConfig.DefaultRules,
                  {type: 'email', message: 'Por favor ingrese un email valido'}
                ] }
              >
                <Input />
              </FormItem>

              <FormItem name="id_role" label="Rol" rules={ FormConfig.DefaultRules }>
                <Select showSearch filterOption={ FormConfig.DefaultSelectFilter } autoComplete="none">
                  {roles.map(rol => 
                    <Option key={ rol.id } value={ rol.id }>{ rol.nombre }</Option>
                  )}
                </Select>
              </FormItem>

              {!usuario?.id &&
                <>
                  <FormItem name="password" label="Password" 
                    rules={ [
                      ...FormConfig.DefaultRules,
                      {min: 6, message: 'El password debe tener al menos 6 caracteres'}
                    ] }
                  >
                    <Input.Password />
                  </FormItem>

                  <FormItem name="newpassword" label="Repetir password" 
                    rules={ [
                      ...FormConfig.DefaultRules,
                      {min: 6, message: 'El password debe tener al menos 6 caracteres'}
                    ] }
                  >
                    <Input.Password />
                  </FormItem>
                </>
              }

              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit" icon={ <SaveOutlined /> }>Guardar</Button>
              </FormItem>

            </Form>
          </Card>
        </Spin>
      </div>
    </AppCard>
  );
}

export default UsuariosForm;

