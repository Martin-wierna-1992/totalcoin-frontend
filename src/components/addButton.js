import React from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const AddButton = props => {
  return (
    <Tooltip 
      title={ props.btnTitle ? props.btnTitle : 'Agregar' } 
      placement="top">
      <Button 
        shape="circle"
        size="small" 
        type={ props.btnType } 
        icon={ props.icon ? props.icon : <PlusOutlined /> }
        onClick={ props.onClick }
      />
    </Tooltip>
  );
}

export default AddButton;