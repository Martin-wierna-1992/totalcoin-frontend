import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Table, Button, Space, Input, PageHeader } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../../../components/appCard";
import VerButton from "../../../../../components/verButton";
import RolesView from "./rolesView";
import DeleteButton from "../../../../../components/deleteButton";
import RolesApi from "../../../../../api/rolesApi";

const RolesList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roles, setRoles] = useState([]);
  const [rolesFiltradas, setRolesFiltradas] = useState([]);
  const [working, setWorking] = useState(false);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
    { key: 'actions', align: 'right',
      render: (text, record) => {
        return <Space size="small">
          <VerButton onClick={ () => { setShowItem(true); setCurrentItem(record); } }/>
          <DeleteButton onConfirm={() => deleteRole(record.id)}/>
        </Space>
      }
    }
  ];

  const loadRoles = () => {
    setWorking(true);
    RolesApi.get()
      .then(response => {
        setWorking(false);
        setRoles(response);
        setRolesFiltradas(response);
      })
      .catch(error => setWorking(false));
  }

  const deleteRole = id => {
    setWorking(true);
    RolesApi.delete(id)
      .then(response => {
        setWorking(false);
        loadRoles();
      })
      .catch(error => setWorking(false));
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Roles"
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
              setRolesFiltradas(roles.filter(x => x.nombre.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)); 
            } }
            size="small"
          />
        </div>
        <Table
          rowKey={ record => record.id }
          size="small"
          loading={ working }
          columns={ columns } 
          dataSource={ rolesFiltradas.sort((a,b) => a.nombre.localeCompare(b.nombre)) }
          pagination={ { hideOnSinglePage: true, pageSize: 10, showSizeChanger: false } }
        />

        <RolesView
          visible={ showItem }
          onClose={ () => {
            setShowItem(false);
            setCurrentItem(undefined);
          } }
          rol={ currentItem }
        />
      </div>
    </AppCard>
  );
}

export default RolesList;