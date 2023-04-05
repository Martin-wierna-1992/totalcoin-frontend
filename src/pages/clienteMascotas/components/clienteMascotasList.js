import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Button, PageHeader, notification } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../components/appCard";
import ClienteMascotasTable from "../../../components/clienteMascotasTable/clienteMascotasTable";
import ClientesApi from "../../../api/clientesApi";

const ClienteMascotasList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = () => {
    setWorking(true);
    getData()
  }
  
  const getData = async () =>{
    const response = await ClientesApi.getClientes()
    setPedidos(response);
    setWorking(false);

  }

 
  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Cliente/mascotas"
      />
      <div style={ { padding: 20 } }>
        <ClienteMascotasTable
          vendedor={pedidos}
        />
      </div>
    </AppCard>
  );
}

export default ClienteMascotasList;