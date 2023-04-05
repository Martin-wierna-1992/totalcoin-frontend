import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { PageHeader, Button, Form, Card, Input, notification, Spin, InputNumber,Checkbox,DatePicker } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import ClientesApi from "../../../api/clientesApi";
import AppCard from "../../../components/appCard";
import { FormConfig } from "../../../helpers/config";
import moment from "moment";
import VendedoresApi from "../../../api/vendedoresApi";

const FormItem = Form.Item;

const VendedorForm = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [cliente, setCliente] = useState(undefined);
  const [working, setWorking] = useState(false);
  const [date, setDate] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if(location.pathname.includes('edit')){
      loadCliente(params.id);
    }
  }, []);

  const loadCliente = id => {
    setWorking(true);
    ClientesApi.get(id)
      .then((response) => {
        setWorking(false);
        setCliente(response);
        form.setFieldsValue({ ...response });
      })
      .catch((error) => setWorking(false));
  }

  const onFinish = values => {
    setWorking(true);

    /* let data = { 
      id: params.id,
      date:date,
      ...values 
    }
    console.log("value form",data) */

    
    VendedoresApi.save(values)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Vendedor guardado correctamente', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };
  const onchangeDate =(date,dateString)=>{
    setDate(dateString)
  }
  const dateFormat = "YYYY/MM/DD";

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ `${ cliente?.id ? 'Editar Vendedor' : 'Nuevo vendedor'}` }
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
              initialValues={{ ...cliente }}
              scrollToFirstError
            >
              <FormItem name="nombre" label="Nombre completo" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>
              <FormItem name="direccion" label="Direccion" rules={ FormConfig.DefaultRules }>
                <Input />
              </FormItem>
              <FormItem name="telefono" label="Telefono" rules={ FormConfig.DefaultRules }>
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

export default VendedorForm;

