import React from "react";
import { Descriptions, Card, Drawer } from "antd";

const DescItem = Descriptions.Item;

const RolesView = props => {
  return (
    <Drawer
      title={`Rol: ${props.rol?.nombre}`}
      placement="right"
      closable={ false }
      onClose={ props.onClose }
      visible={ props.visible }
      width={ 400 }
    >
      <Card>
        <Descriptions bordered size="small" column={ 1 }>
          <DescItem label="Nombre"><b>{ props.rol?.nombre }</b></DescItem>
          <DescItem label="Descripción"><b>{ props.rol?.descripcion }</b></DescItem>
        </Descriptions>
      </Card>
    </Drawer>
  );
}

export default RolesView;
