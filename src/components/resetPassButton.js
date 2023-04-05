import React from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { RedoOutlined } from '@ant-design/icons';

const ResetPassButton = props => {
  return (
    <Popconfirm 
      placement="topRight" 
      title={ props.title ? props.title : '¿Está seguro?' } 
      onConfirm={ props.onConfirm } 
      okText={ props.okText ? props.okText : 'Resetear clave' } 
      cancelText="No"
    >
      <Tooltip 
        title={ props.btnTitle ? props.btnTitle : 'Resetear clave' } 
        placement="top">
        <Button 
          shape="circle" 
          size="small" 
          type={ props.btnType ? props.btnType : 'primary' } 
          icon={ props.icon ? props.icon : <RedoOutlined /> }
        />
      </Tooltip>
    </Popconfirm>
  );
}

export default ResetPassButton;