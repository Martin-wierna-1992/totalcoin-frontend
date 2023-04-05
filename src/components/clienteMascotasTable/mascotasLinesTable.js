import React from "react";
import { Table } from "antd";

const MascotasLinesTable = props => {
  let columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre',align:'center' },
    { title: 'Peso', dataIndex: 'peso', key: 'peso' ,align:'center'},
    { title: 'Animal', dataIndex: 'tipo', key: 'tipo' ,align:'center'},
  ];
  return (
    <Table
      rowKey={record => record.id}
      size="small"
      columns={columns}
      dataSource={props.lines}
      pagination={{ hideOnSinglePage: true, pageSize: 10, showSizeChanger: false }}
    />
  );
}

export default MascotasLinesTable;