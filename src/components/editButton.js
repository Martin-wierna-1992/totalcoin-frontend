import React from "react";
import { Button, Tooltip } from "antd";
import { EditTwoTone } from '@ant-design/icons';

const EditButton = props => {
  const renderButton = () => {
    return (
      <Button 
        shape={props.fullMode ? "default" : "circle"}
        size="small" 
        type={ props.btnType } 
        icon={ props.icon ? props.icon : <EditTwoTone twoToneColor="#f15e21" /> }
        onClick={ props.onClick }
      >
        {props.fullMode ? 'Editar' : ''}
      </Button>
    );
  }

  return (
    props.fullMode
      ? renderButton()
      : <Tooltip 
        title={ props.btnTitle ? props.btnTitle : 'Editar' } 
        placement="top"
      >
        {renderButton()}
      </Tooltip>
  );
}

export default EditButton;