import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Button, PageHeader } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../components/appCard";
import ListaVendedoresTable from "../../../components/listaVendedores/listaVendedoresTable";
import VendedoresApi from "../../../api/vendedoresApi";

const VendedoresList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () =>{
    const response = await VendedoresApi.getVendedores()
    setPedidos(response);
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Vendedores"
        extra={[
          <Button key="1" type="primary" icon={ <PlusOutlined /> } 
            onClick={ () => navigate(location.pathname + '/new') }>
            Nuevo
          </Button>,
        ]}
      />
      <div style={ { padding: 20 } }>
        <ListaVendedoresTable
          vendedor={pedidos}
        />
      </div>
    </AppCard>
  );
}

export default VendedoresList;