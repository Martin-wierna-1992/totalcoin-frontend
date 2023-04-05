import React from "react";
import { Descriptions, Card, Drawer } from "antd";

const DescItem = Descriptions.Item;

const PermisosView = props => {
  return (
    <Drawer
      title={`Permiso: ${props.permiso?.nombre}`}
      placement="right"
      closable={ false }
      onClose={ props.onClose }
      visible={ props.visible }
      width={ 550 }
    >
      <Card>
        <Descriptions bordered size="small" column={ 1 }>
          <DescItem label="Nombre"><b>{ props.permiso?.nombre }</b></DescItem>
          <DescItem label="Importancia"><b>{ props.permiso?.importancia }</b></DescItem>
          <DescItem label="Label"><b>{ props.permiso?.label }</b></DescItem>
          <DescItem label="Tooltip"><b>{ props.permiso?.tooltip }</b></DescItem>
        </Descriptions>
      </Card>
    </Drawer>
  );
}

export default PermisosView;
