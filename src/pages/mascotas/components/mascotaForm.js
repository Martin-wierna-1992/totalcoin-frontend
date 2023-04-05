import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { PageHeader, Button, Form, Card, Input, notification, Spin, InputNumber,Checkbox,DatePicker,Select } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import ClientesApi from "../../../api/clientesApi";
import AppCard from "../../../components/appCard";
import { FormConfig } from "../../../helpers/config";
import AuthHelper from "../../../helpers/authHelper";
import moment from "moment";
import MascotasApi from "../../../api/mascotasApi";

const FormItem = Form.Item;

const MascotaForm = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [cliente, setCliente] = useState(undefined);
  const [castrado, setCastrado] = useState(false);
  const [working, setWorking] = useState(false);
  const [date, setDate] = useState('');
  const [form] = Form.useForm();
  const tipoAnimal = [
    { value: 'GATO', label: 'GATO' },
    { value: 'PERRO', label: 'PERRO' },
  ]
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

    let data = { 
      cliente_id: AuthHelper.getUser().entityID,
      fecha_nacimiento:new Date(date),
      castrado:castrado,
      ...values 
    }
    console.log("value form",data)

    
    MascotasApi.save(data)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Mascota guardado correctamente', placement: 'bottomRight' });
        navigate(-1);
      })
      .catch(error => setWorking(false));
  };
  const onchangeDate =(date,dateString)=>{
    setDate(dateString)
  }
  const check =(value)=>{
    setCastrado(value.target.checked)
  }

  const dateFormat = "YYYY/MM/DD";
  console.log("AuthHelper.getUser()",)
  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title={ `${ cliente?.id ? 'Editar Mascota' : 'Nueva mascota'}` }
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
                <Input style={{ width: 180 }}/>
              </FormItem>
              <FormItem name="tipo" label="Tipo de mascota" rules={ FormConfig.DefaultRules }>
                <Select
                  placeholder="Seleccione un animal"
                  style={{ width: 180 }}
                  options={tipoAnimal}
                />
              </FormItem>

              <FormItem name="peso" label="Peso" rules={ FormConfig.DefaultRules }>
                <InputNumber  style={{ width: 180 }} />
              </FormItem>
              
              <FormItem label="Fecha nacimiento" rules={ FormConfig.DefaultRules }  >
                <DatePicker  style={{ width: 180 }}  onChange={onchangeDate}/>
              </FormItem>
              
              <FormItem name="castrado" label="Castrado" valuePropName="checked">
                <Checkbox onChange={check} ></Checkbox>
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

export default MascotaForm;

