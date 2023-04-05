import React, { useContext, useEffect } from 'react';
import { Form, Input, Table } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import parser from '../helpers/parser';
import DeleteButton from './deleteButton';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({record, dataIndex, editable, rules, children, onFileNameChange, ...restProps}) => {
  const form = useContext(EditableContext);

  useEffect(() => {
    if(dataIndex){
      form.setFieldsValue({[dataIndex]: record[dataIndex],});
    }
  }, [form, record, dataIndex]);

  const handleBlur = () => {
    form.validateFields().then(values => {
      onFileNameChange(record.id, values);
    });
  }

  return (
    <td {...restProps}>
      { editable
      ? <Form.Item name={dataIndex}>
        <Input onBlur={handleBlur}/>
      </Form.Item>
      : children }
    </td>
  );
};

const FilesTable = props => {
  const columns = [
    { title: '', dataIndex: '', align:'center', width: '5%',
      render: text => <LinkOutlined />
    },
    { title: 'Nombre',  dataIndex: 'name', editable: false },
    { title: 'Tamaño',  dataIndex: ['file', 'size'], width: '20%', align:'center',
      render: text => <span>{ parser.parseFileSize(text) }</span>
    },
    { title: 'Tipo', dataIndex: ['file', 'type'], width: '20%', align:'center' },
    { title: 'Imagen', dataIndex: 'image', width: '20%', align:'center',
      render: (text, record) => record.file?.type?.indexOf('image') > -1 
        ? <img alt="img" src={record.image} height={50} width={50}/>
        : ''
    },
    { title: '', dataIndex: '', align:'center', width: '5%',
      render: (text, record) => {
        return props.showActions === true
        ? <DeleteButton btnType="danger" hideConfirm={ true } onConfirm={ () => props.onDelete(record.file.uid) }/>
        : ''
      }
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        editable: col.editable,
        rules: col.rules,
        onFileNameChange: props.onFileNameChange
      }),
    };
  });

  return (
    <Table
      rowKey={record => record.file?.uid}
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      }}
      columns={mergedColumns}
      dataSource={props.files}
      pagination={{hideOnSinglePage: true, pageSize: 5, showSizeChanger: false}}
      size="small"
    />
  );
}

export default FilesTable;