import React, { useEffect, useState } from "react";
import { Tag, Descriptions, Card, Drawer } from "antd";

const DescItem = Descriptions.Item;

const UsuariosView = props => {
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if(props.visible !== true) { return; }
  }, [props.visible]);

  return (
    <Drawer
      title={`Usuario ${props.usuario?.email}`}
      placement="right"
      closable={ false }
      onClose={ props.onClose }
      visible={ props.visible }
      width={ 400 }
    >
      <Card>
        <Descriptions size="small" column={ 1 }>
          <DescItem label="Email"><b>{ props.usuario?.email }</b></DescItem>
          <DescItem label="Rol"><Tag color={ 'blue' }>{ props.usuario?.role?.nombre }</Tag></DescItem>
        </Descriptions>
      </Card>
    </Drawer>
  );
}

export default UsuariosView;

