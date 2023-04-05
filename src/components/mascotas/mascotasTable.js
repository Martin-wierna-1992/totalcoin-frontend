import React, { useEffect, useState } from "react";
import {  CheckCircleTwoTone,CloseCircleOutlined} from '@ant-design/icons';
import {  Space, Table } from "antd";
import moment from "moment";

const MascotasTable = props => {
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);

  useEffect(() => {
    setMascotasFiltradas(props.mascotas || []);
  }, [props.mascotas]);

  const columns = [
    { title: 'Peso',align:'center', dataIndex: 'peso', key: 'id' },
    { title: 'Nombre mascota', align:'center',dataIndex: 'nombre', key: 'nombre' },
    { title: 'Tipo de mascota', align:'center',dataIndex: 'tipo', key: 'tipo' },
    { title: 'Fecha nacimiento', align:'center' ,dataIndex: 'fecha_nacimiento', key: 'fecha_nacimiento',
      render:(fecha_nacimiento)=>moment(fecha_nacimiento).format("DD-MM-YYYY")
    },
    { title: 'Castrado', align:'center',key: 'castrado',
      render: (text, record) => {
        return <Space size="small">
          {record.castrado === true ? <CheckCircleTwoTone style={{ fontSize: '20px' }}twoToneColor="#52c41a" />:<CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }}/>}
        </Space>
      }
    }
  ];

  return (
    <>
      <Table
        size="small"
        columns={ columns } 
        dataSource={ mascotasFiltradas }
        rowKey={ record => record.id }
        pagination={ { hideOnSinglePage: true, pageSize: 10 } }
      />
    </>
  );
}

export default MascotasTable;