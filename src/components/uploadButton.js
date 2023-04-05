import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';
import UploadModal from "./uploadModal";

const UploadButton = props => {
  const [showModal, setShowModal] = useState(false);

  const renderButton = () => {
    return (
      <Button 
        shape={props.fullMode ? "default" : "circle"}
        size="small" 
        type={ props.btnType } 
        icon={ props.icon ? props.icon : <CloudUploadOutlined style={{color: '#f15e21'}} /> }
        onClick={ props.onClick ? props.onClick : () => setShowModal(true) }
      >
        {props.fullMode ? 'Subir' : ''}
      </Button>
    );
  }

  return (
    <>
      {props.fullMode
        ? renderButton()
        : <Tooltip 
          title={ props.btnTitle ? props.btnTitle : 'Subir contenido' } 
          placement="top"
        >
          {renderButton()}
        </Tooltip>}

        <UploadModal
          open={showModal}
          onCancel={() => setShowModal(false)}
          filetypes={props.filetypes}
          uploadFile={props.uploadFile}
          onUpload={props.onUpload}
          entidad={props.entidad}
          //working={props.working}
        />
    </>
  );
}

export default UploadButton;