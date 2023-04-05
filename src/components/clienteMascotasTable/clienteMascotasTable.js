import React, { useEffect, useState } from "react";
import { Table} from "antd";
import MascotasLinesTable from "./mascotasLinesTable";

const ClienteMascotasTable = props => {
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    setPedidosFiltrados(props.vendedor || []);
  }, [props.vendedor]);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Telefono', dataIndex: 'telefono', key: 'telefono' },
    { title: 'Direccion', dataIndex: 'direccion', key: 'direccion'},
  ];
  return (
    <>
    <Table
      rowKey={record => record.id}
      size="small"
      columns={columns}
      dataSource={pedidosFiltrados}
      pagination={{ hideOnSinglePage: true, pageSize: 10, showSizeChanger: false }}
      scroll={{ x: '50vw' }}
      expandRowByClick={true}
      expandable={{
      expandedRowRender: record => (
        <>
           <MascotasLinesTable
            lines={record.Mascota}
            hideActions
          />
        </>
          ),
          rowExpandable: record => record.name !== "Not Expandable"
        }}
    />
      
    </> 
  );
}

export default ClienteMascotasTable;