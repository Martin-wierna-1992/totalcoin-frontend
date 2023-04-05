import React, { useEffect, useState } from "react";
import {  PageHeader } from "antd";
import AppCard from "../../../components/appCard";
import PedidosTableVendedor from "../../../components/pedidosVendedores/pedidosTable";
import VendedoresApi from "../../../api/vendedoresApi";

const ClientesList = props => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () =>{
    const response = await VendedoresApi.get()
    setPedidos(response);
  }

  const deleteCliente = record => {
    console.log('despachado',record)
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Pedidos vendedor"
      />
      <div style={ { padding: 20 } }>
        <PedidosTableVendedor
          pedidos={pedidos}
          onDelete={deleteCliente}
        />
      </div>
    </AppCard>
  );
}

export default ClientesList;