import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Card } from "antd";
import { AppstoreOutlined, AuditOutlined, AreaChartOutlined } from '@ant-design/icons'
import './parametricasPage.scss';
import AppCard from "../../../components/appCard";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const ParametricasPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { windowHeight, windowWidth } = useWindowDimensions();

  const parametricas = [
    { key: 'productos', label: 'Productos', url: '/productos', icon: <AppstoreOutlined /> },
    { key: 'roles', label: 'Roles', url: '/roles', icon: <AuditOutlined /> },
    { key: 'permisos', label: 'Permisos', url: '/permisos', icon: <AreaChartOutlined /> },
  ]

  return (
    <AppCard
      style={{padding: 16}}
    >
      { parametricas.map(parametrica => (
        <Card.Grid 
          style={ windowWidth > 600 ? { width: '31%', margin: '1%' } : { width: '99%', margin: '1%' } }
          className="parametrica"
          key={ parametrica.key } 
          onClick={ () => navigate(location.pathname + parametrica.url) }
        >
          { parametrica.icon }
          <p>{ parametrica.label }</p>
        </Card.Grid>))
      }
    </AppCard>
  );
}

export default ParametricasPage;