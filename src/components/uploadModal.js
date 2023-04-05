import React, { useEffect, useState } from "react";
import { Spin, Modal, Button, Row, Col, notification, Upload } from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';
import FilesTable from "./filesTable";

const UploadModal = props => {
  const [files, setFiles] = useState([]);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if(props.visible === true){ 
      setWorking(false);
      setFiles([]);
    }
  }, [props.visible]);

  const onRemove = id => {
    setFiles(files.filter(f => f.file.uid !== id));
  }

  const beforeUpload = (file, fileList) => {
    setWorking(true);

    let promises = [];
    promises = fileList?.map(file => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = e => resolve({
          id: file.uid, 
          name: file.name,
          file: file,
          image: e.target.result
        });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then(results => {
        setWorking(false);
        setFiles([...files, ...results]);
      })
      .catch(error => setWorking(false));

    return false;
  }

  const handleUpload = () => {
    setWorking(true);

    let promises = [];
    promises = files.map(file => {
      return new Promise((resolve, reject) => {
        let fd = new FormData();
        fd.append('file', file.file);
        fd.append('file_name', file.name);
        fd.append('file_size', file.file.size);
        fd.append('file_type', file.file.type);
        //fd.append('id_mediable', props.entidad.id);

        props.uploadFile(props.entidad.id, fd)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    });

    Promise.all(promises)
      .then(results => {
        setWorking(false);
        props.onUpload();
        notification.success({ message: 'Exito', description: 'Archivos subidos correctamente', placement: 'bottomRight' });
        props.onCancel();
      })
      .catch(error => {
        console.debug(error);
        setWorking(false);
      });
  }

  return (
    <Modal 
      title={ 'Subir contenido' }
      width="60%"
      visible={ props.visible }
      onOk={ handleUpload }
      onCancel={ props.onCancel }
      footer={ [
        <Button key="cancel" onClick={ props.onCancel } disabled={working}>Cancelar</Button>,
        <Button key="accept" type="primary" onClick={ handleUpload } disabled={files.length === 0 || working}>Aceptar</Button>,
      ] }
    >
      <Spin spinning={ working }>
        <Row gutter={ [16, 16] }>
          <Col span={ 24 }>
            <Upload.Dragger 
              name="files"
              multiple={true}
              onRemove={onRemove}
              beforeUpload={beforeUpload}
              fileList={files}
              accept={props.filetypes}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">Haga click o arrastre un archivo para importar</p>
              <p className="ant-upload-hint">Solo se aceptan archivos {props.filetypes}</p>
            </Upload.Dragger>
          </Col>
          { files.length > 0 &&
          <>
            <Col span={ 24 }>
              <FilesTable
                files={ files } 
                showActions={ working === false }
                onDelete={ onRemove }
                onFileNameChange={(id, name) => {
                  let filesAux = [...files];
                  let fileIdx = filesAux.findIndex(f => f.id === id);
                  if(fileIdx > -1){
                    filesAux[fileIdx].name = name;
                  }
                  setFiles(filesAux);
                }}
              />
            </Col>
          </>
          }
        </Row>
        
      </Spin>
    </Modal>
  );
}

export default UploadModal;