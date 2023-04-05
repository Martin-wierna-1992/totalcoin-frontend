import React, { useEffect, useState } from "react";
import {  Space, Table,Checkbox } from "antd";
import * as moment from 'moment'

const PedidosTableVendedor = props => {
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  
  const onChange = (e,record) => {
    var pedido = pedidosFiltrados.filter(obj => obj.id === record)
    console.log(pedido)
  };
  
  useEffect(() => {
    setPedidosFiltrados(props.pedidos || []);
  }, [props.pedidos]);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Vendedor', dataIndex: 'Vendedor', key: 'vendedor.id',render:(vendedor)=>vendedor.nombre },
    { title: 'Mascota', dataIndex: 'Mascota', key: 'mascota.id',render:(mascota)=>mascota.nombre },
    { title: 'Complementos', align: 'center',dataIndex: 'complementos', key: 'complementos' },
    { title: 'Peso', dataIndex: 'peso', align: 'center',key: 'peso' },
    { title: 'Fecha', dataIndex: 'created_at',align: 'center', key: 'created_at',
      render:(created_at)=>moment(created_at).format("DD-MM-YYYY")
    },
    { key: 'actions', align: 'center',title:'Despachado',
      render: (text, record) => {
        return <Space size="small">
          <Checkbox onChange={function(event){ onChange(event,record.id)}}  ></Checkbox>
        </Space>
      }
    }
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

export default PedidosTableVendedor;