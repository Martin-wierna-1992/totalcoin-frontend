import React, { useEffect } from "react";
import { Descriptions, Drawer } from "antd";

const DescItem = Descriptions.Item;

const ProductosView = props => {
  useEffect(() => {
    if(props.visible !== true) { return; }
  }, [props.visible]);

  return (
    <Drawer
      title={`Producto: ${props.producto?.nombre}`}
      placement="right"
      closable={ false }
      onClose={ props.onClose }
      visible={ props.visible }
      width={ 400 }
    >
      <Descriptions size="small" column={ 1 } bordered>
        <DescItem label="Nombre"><b>{ props.producto?.nombre }</b></DescItem>
        <DescItem label="Descripción"><b>{ props.producto?.descripcion }</b></DescItem>
      </Descriptions>
    </Drawer>
  );
}

export default ProductosView;

