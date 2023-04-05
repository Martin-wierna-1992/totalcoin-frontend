import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Table, Tag, Button, Space, Input, PageHeader, notification } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import UsuariosView from './usuariosView';
import AppCard from "../../../components/appCard";
import DeleteButton from "../../../components/deleteButton";
import VerButton from "../../../components/verButton";
import EditButton from "../../../components/editButton";
import UsuariosApi from "../../../api/usuariosApi";
import ResetPassButton from "../../../components/resetPassButton";
import AuthHelper from "../../../helpers/authHelper";

const UsuariosList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState(AuthHelper.getUser());
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [working, setWorking] = useState(false);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [showItem, setShowItem] = useState(false);
  //const [showAddSolucionModal, setShowAddSolucionModal] = useState(false);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role',
      render : (text, record) => <Tag color={ 'blue' } key={ record.role.id }>{ record.role.nombre }</Tag>
    },
    { key: 'actions', align: 'right',
      render: (text, record) => {
        return <Space size="small">
          <VerButton onClick={() => { setShowItem(true); setCurrentItem(record); }}/>
          <EditButton onClick={() => navigate(location.pathname + '/edit/' + record.id)}/>
          {user.id !== record.id && <ResetPassButton title="¿Cambiar clave a '123'?" onConfirm={() => resetPassword(record)}/>}
          <DeleteButton title="¿Está seguro de querer eliminar el usuario?" onConfirm={ () => deleteUsuario(record) }/>
        </Space>
      }
    }
  ];

  const loadUsuarios = () => {
    setWorking(true);
    UsuariosApi.get()
      .then(response => {
        setWorking(false);
        setUsuarios(response);
        setUsuariosFiltrados(response);
      })
      .catch(error => setWorking(false));
  }

  const deleteUsuario = record => {
    setWorking(true);
    UsuariosApi.delete(record.id)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Usuario eliminado correctamente', placement: 'bottomRight' });
        loadUsuarios();
      })
      .catch(error => setWorking(false));
  }

  const resetPassword = record => {
    setWorking(true);
    UsuariosApi.resetPassword(record.id, '123')
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Contraseña modificada correctamente', placement: 'bottomRight' });
        loadUsuarios();
      })
      .catch(error => setWorking(false));
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Usuarios"
        //subTitle="Listado"
        extra={[
          <Button key="1" type="primary" icon={ <PlusOutlined /> } 
            onClick={ () => navigate(location.pathname + '/new') }>
            Nuevo
          </Button>,
        ]}
      />
      <div style={ { padding: 20 } }>
        <div style={ { display: 'flex' } }>
          <Input 
          style={ { width: 200, marginBottom: 8 } }
            placeholder="Buscar" 
            allowClear 
            onChange={ e => { 
              setUsuariosFiltrados(usuarios.filter(x => x.email.indexOf(e.target.value) > -1)); 
            } }
            size="small"
          />
        </div>
        <Table
          size="small"
          loading={ working }
          columns={ columns } 
          dataSource={ usuariosFiltrados.sort((a,b) => a.email.localeCompare(b.email)) }
          rowKey={ record => record.id }
          pagination={ { hideOnSinglePage: true, pageSize: 10 } }
        />

        <UsuariosView
          visible={ showItem }
          onClose={ () => {
            setShowItem(false);
            setCurrentItem(undefined);
          } }
          usuario={ currentItem }
        />
      </div>
    </AppCard>
  );
}

export default UsuariosList;