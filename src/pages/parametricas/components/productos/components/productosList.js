import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Button, PageHeader, notification, Input, Table, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import VerButton from "../../../../../components/verButton";
import EditButton from "../../../../../components/editButton";
import DeleteButton from "../../../../../components/deleteButton";
import AppCard from "../../../../../components/appCard";
import ProductosApi from "../../../../../api/productosApi";

const ProductosList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [showItem, setShowItem] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    loadProductos();
  }, []);

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
    { key: 'actions', align: 'right',
      render: (text, record) => {
        return <Space size="small">
          <VerButton onClick={() => {setShowItem(true); setCurrentItem(record);}}/>
          <EditButton onClick={() => navigate(location.pathname + '/edit/' + record.id)}/>
          <DeleteButton onConfirm={() => deleteProducto(record)}/>
        </Space>
      }
    }
  ];

  const loadProductos = () => {
    setWorking(true);
    ProductosApi.get()
      .then(response => {
        setWorking(false);
        setProductos(response);
        setProductosFiltrados(response);
      })
      .catch(error => setWorking(false));
  }

  const deleteProducto = record => {
    setWorking(true);
    ProductosApi.delete(record.id)
      .then(response => {
        setWorking(false);
        notification.success({ message: 'Exito', description: 'Producto eliminado correctamente', placement: 'bottomRight' });
        loadProductos();
      })
      .catch(error => setWorking(false));
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Productos"
        //subTitle="Listado"
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
          <Input
          style={ { width: 200, marginBottom: 8 } }
            placeholder="Buscar" 
            allowClear 
            onChange={ e => { 
              setProductosFiltrados(productos.filter(x => x.nombre.indexOf(e.target.value) > -1)); 
            } }
            size="small"
          />
        </div>
        <Table
          size="small"
          loading={ working }
          columns={ columns } 
          dataSource={ productosFiltrados.sort((a,b) => a.nombre.localeCompare(b.nombre)) }
          rowKey={ record => record.id }
          pagination={ { hideOnSinglePage: true, pageSize: 10 } }
        />
       
      </div>
    </AppCard>
  );
}

export default ProductosList;