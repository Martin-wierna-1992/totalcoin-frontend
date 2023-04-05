import React, { useEffect, useState } from "react";
import { Descriptions, Card, Drawer, Space, Tag } from "antd";
import ChangePassForm from "../usuarios/changePassForm";
import AuthHelper from "../../helpers/authHelper";

const DescItem = Descriptions.Item;

const PerfilView = props => {
  const [user] = useState(AuthHelper.getUser());

  useEffect(() => {
    if(props.visible !== true) { return; }
  }, [props.visible]);

  return (
    <Drawer
      title={`Mi Perfil`}
      placement="right"
      closable={ true }
      onClose={ props.onClose }
      open={ props.visible }
      width={ 400 }
    >
      <Space direction="vertical" style={{width: '100%'}}>
        <Card type="inner" title="Datos" bodyStyle={{padding: 0}}>
          <Descriptions size="small" column={ 1 } bordered>
            <DescItem label="Email"><b>{ user?.email }</b></DescItem>
            <DescItem label="Rol"><Tag color={'blue'}>{ user?.user_role?.nombre }</Tag></DescItem>
          </Descriptions>
        </Card>

        <Card type="inner" title="Cambiar clave">
          <ChangePassForm
            email={user.email}
          />
        </Card>
      </Space>
    </Drawer>
  );
}

export default PerfilView;
