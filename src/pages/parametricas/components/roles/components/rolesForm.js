import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader, Button, Form, Card, Input, Spin, notification, Row } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import AppCard from "../../../../../components/appCard";
import { FormConfig } from "../../../../../helpers/config";
import RolesApi from "../../../../../api/rolesApi";

const FormItem = Form.Item;

const RolesForm = props => {
  const navigate = useNavigate();
  const [working, setWorking] = useState(false);
  const [form] = Form.useForm();

  const onFinish = values => {
    setWorking(true);

    let data = { 
      ...values 
    }
    
    RolesApi.save(data)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Rol guardado', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ 'Nuevo rol' }
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
              scrollToFirstError
            >
              <FormItem name="nombre" label="Nombre" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

              <FormItem name="descripcion" label="Descripción" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

              <Row justify="end">
                <FormItem>
                  <Button type="primary" htmlType="submit" icon={ <SaveOutlined /> }>Guardar</Button>
                </FormItem>
              </Row>

            </Form>
          </Card>
        </Spin>
      </div>
    </AppCard>
  );
}

export default RolesForm;

