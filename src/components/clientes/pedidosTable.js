import React, { useEffect, useState } from "react";
import {  Table } from "antd";
import moment from "moment";

const PedidosTable = props => {
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    setPedidosFiltrados(props.pedidos || []);
  }, [props.pedidos]);

  const columns = [
    { title: 'Id', align:'center',dataIndex: 'id', key: 'id' },
    { title: 'Vendedor', dataIndex: 'Vendedor', key: 'vendedor.id',render:(vendedor)=>vendedor.nombre },
    { title: 'Mascota', dataIndex: 'Mascota', key: 'mascota.id',render:(mascota)=>mascota.nombre },
    { title: 'Complementos', align:'center',dataIndex: 'complementos', key: 'complementos' },
    { title: 'Fecha', align:'center' ,dataIndex: 'created_at', key: 'created_at',
      render:(fecha_nacimiento)=>moment(fecha_nacimiento).format("DD-MM-YYYY")
    },
    { title: 'Peso', align:'center',dataIndex: 'peso', key: 'peso' },
  ];

  return (
    <>
      <Table
        size="small"
        columns={ columns } 
        dataSource={ pedidosFiltrados }
        rowKey={ record => record.id }
        pagination={ { hideOnSinglePage: true, pageSize: 10 } }
      />
    </>
  );
}

export default PedidosTable;