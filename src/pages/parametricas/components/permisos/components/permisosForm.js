import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation, useParams } from "react-router-dom";
import { PageHeader, Button, Form, Card, Input, Spin, notification, Checkbox, Row } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import AppCard from "../../../../../components/appCard";
import { FormConfig } from "../../../../../helpers/config";
import PermisosApi from "../../../../../api/permisosApi";

const FormItem = Form.Item;

const PermisosForm = props => {
  const navigate = useNavigate();
  const [working, setWorking] = useState(false);
  const [form] = Form.useForm();

  const onFinish = values => {
    setWorking(true);

    let data = { 
      ...values,
      value: true
    }
    
    PermisosApi.save(data)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Permiso guardado', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ 'Nuevo permiso' }
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

              <FormItem name="label" label="Label" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

              <FormItem name="tooltip" label="Tooltip" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

              <FormItem name="importancia" label="Importancia" rules={ FormConfig.DefaultRules }>
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

export default PermisosForm;

