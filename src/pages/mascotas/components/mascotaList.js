import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { Button, PageHeader, notification } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AppCard from "../../../components/appCard";
import MascotasTable from "../../../components/mascotas/mascotasTable";
import MascotasApi from "../../../api/mascotasApi";

const MascotaList = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mascotas, setMascotas] = useState([]);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () =>{
    setWorking(true);
    const response = await MascotasApi.get()
    setWorking(false);
    setMascotas(response);
  }

  return (
    <AppCard>
      <PageHeader
        className="site-page-header"
        title="Mis mascotas"
        extra={[
          <Button key="1" type="primary" icon={ <PlusOutlined /> } 
            onClick={ () => navigate(location.pathname + '/new') }>
            Nuevo
          </Button>,
        ]}
      />
      <div style={ { padding: 20 } }>
        <MascotasTable
          mascotas={mascotas}
        />
      </div>
    </AppCard>
  );
}

export default MascotaList;