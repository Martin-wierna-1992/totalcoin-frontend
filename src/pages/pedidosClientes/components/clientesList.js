import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Button, PageHeader } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../components/appCard";
import ClientesApi from "../../../api/clientesApi";
import PedidosTable from "../../../components/clientes/pedidosTable";

const ClientesList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () =>{
    const response = await ClientesApi.get()
    setPedidos(response);
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Pedidos clientes"
        extra={[
          <Button key="1" type="primary" icon={ <PlusOutlined /> } 
            onClick={ () => navigate(location.pathname + '/new') }>
            Nuevo
          </Button>,
        ]}
      />
      <div style={ { padding: 20 } }>
        <PedidosTable
          pedidos={pedidos}
        />
      </div>
    </AppCard>
  );
}

export default ClientesList;