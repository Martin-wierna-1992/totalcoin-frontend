import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Table, Button, Space, Input, PageHeader } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../../../components/appCard";
import VerButton from "../../../../../components/verButton";
import PermisosView from "./permisosView";
import DeleteButton from "../../../../../components/deleteButton";
import PermisosApi from "../../../../../api/permisosApi";

const PermisosList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [permisos, setPermisos] = useState([]);
  const [permisosFiltradas, setPermisosFiltradas] = useState([]);
  const [working, setWorking] = useState(false);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    loadPermisos();
  }, []);

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Importancia', dataIndex: 'importancia', key: 'importancia' },
    { key: 'actions', align: 'right',
      render: (text, record) => {
        return <Space size="small">
          <VerButton onClick={ () => { setShowItem(true); setCurrentItem(record); } }/>
          <DeleteButton onConfirm={() => deletePermiso(record.id)}/>
        </Space>
      }
    }
  ];

  const loadPermisos = () => {
    setWorking(true);
    PermisosApi.get()
      .then(response => {
        setWorking(false);
        setPermisos(response);
        setPermisosFiltradas(response);
      })
      .catch(error => setWorking(false));
  }

  const deletePermiso = id => {
    setWorking(true);
    PermisosApi.delete(id)
      .then(response => {
        setWorking(false);
        loadPermisos();
      })
      .catch(error => setWorking(false));
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Permisos"
        onBack={ () => navigate(-1) }
        extra={[
          <Button key="1" type="primary" icon={ <PlusOutlined /> } 
            onClick={ () => navigate(location.pathname + '/new') }>
            Nuevo
          </Button>,
        ]}
      />
      <div style={ { padding: 20 } }>
        <div style={ { display: 'flex' } }>
          <Input style={ { width: 200, marginBottom: 8 } }
            placeholder="Buscar" 
            allowClear 
            onChange={ e => { 
              setPermisosFiltradas(permisos.filter(x => x.nombre.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)); 
            } }
            size="small"
          />
        </div>
        <Table
          rowKey={ record => record.id }
          size="small"
          loading={ working }
          columns={ columns } 
          dataSource={ permisosFiltradas.sort((a,b) => a.nombre.localeCompare(b.nombre)) }
          pagination={ { hideOnSinglePage: true, pageSize: 10, showSizeChanger: false } }
        />

        <PermisosView
          visible={ showItem }
          onClose={ () => {
            setShowItem(false);
            setCurrentItem(undefined);
          } }
          permiso={ currentItem }
        />
      </div>
    </AppCard>
  );
}

export default PermisosList;