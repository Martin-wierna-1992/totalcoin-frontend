import React from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const DeleteButton = props => {
  return (
    <Popconfirm 
      placement="topRight" 
      title={ props.title ? props.title : '¿Está seguro?' } 
      onConfirm={ props.onConfirm } 
      okText={ props.okText ? props.okText : 'Eliminar' } 
      cancelText="No"
    >
      <Tooltip 
        title={ props.btnTitle ? props.btnTitle : 'Eliminar' } 
        placement="top">
        <Button 
          shape="circle" 
          size="small" 
          type={ props.btnType ? props.btnType : 'danger' } 
          icon={ props.icon ? props.icon : <DeleteOutlined /> }
        />
      </Tooltip>
    </Popconfirm>
  );
}

export default DeleteButton;