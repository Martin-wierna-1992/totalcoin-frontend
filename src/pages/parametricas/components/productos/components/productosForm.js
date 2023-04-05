import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { PageHeader, Button, Form, Card, Input, notification, Spin } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import { FormConfig } from "../../../../../helpers/config";
import AppCard from "../../../../../components/appCard";
import ProductosApi from "../../../../../api/productosApi";

const FormItem = Form.Item;

const ProductosForm = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [producto, setProducto] = useState(undefined);
  const [working, setWorking] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if(location.pathname.includes('edit')){
      loadProducto(params.id);
    }
  }, []);

  const loadProducto = id => {
    setWorking(true);
    ProductosApi.get(id)
      .then((response) => {
        setWorking(false);
        setProducto(response);
        form.setFieldsValue({ ...response });
      })
      .catch((error) => setWorking(false));
  }

  const onFinish = values => {
    setWorking(true);

    let data = { 
      id: params.id, 
      ...values 
    }
    
    ProductosApi.save(data)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Producto guardado correctamente', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ `${ producto?.id ? 'Editar producto' : 'Nuevo producto'}` }
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
              initialValues={{ ...producto }}
              scrollToFirstError
            >
              <FormItem name="nombre" label="Nombre"rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

              <FormItem name="descripcion" label="Descripcion"rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>

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

export default ProductosForm;

