import React from "react";
import { Button, Tooltip } from "antd";
import { EyeOutlined } from '@ant-design/icons';

const VerButton = props => {
  return (
    <Tooltip 
      title={ props.btnTitle ? props.btnTitle : 'Ver' } 
      placement="top">
      <Button 
        shape="circle" 
        size="small" 
        //type={ props.btnType ? props.btnType : 'primary' } 
        icon={ props.icon ? props.icon : <EyeOutlined /> }
        onClick={ props.onClick }
      />
    </Tooltip>
  );
}

export default VerButton;