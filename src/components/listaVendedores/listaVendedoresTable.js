import React, { useEffect, useState } from "react";
import { Table } from "antd";

const ListaVendedoresTable = props => {
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  
  useEffect(() => {
    setPedidosFiltrados(props.vendedor || []);
  }, [props.vendedor]);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Telefono', dataIndex: 'telefono', key: 'telefono' },
    { title: 'Direccion', dataIndex: 'direccion', key: 'direccion' },
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

export default ListaVendedoresTable;