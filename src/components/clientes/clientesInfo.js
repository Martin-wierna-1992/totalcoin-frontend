import { Descriptions } from "antd";

const DescItem = Descriptions.Item;

const ClientesInfo = props => {
  return (
    <Descriptions size="small" column={ 2 } bordered>
      <DescItem label="Cuit"><b>{ props.cliente?.cuil }</b></DescItem>
      <DescItem label="Nombre"><b>{ props.cliente?.nombre }</b></DescItem>
      <DescItem label="Dirección"><b>{ props.cliente?.direccion }</b></DescItem>
      <DescItem label="Teléfono"><b>{ props.cliente?.telefono }</b></DescItem>
      <DescItem label="Email"><b>{ props.cliente?.email }</b></DescItem>
    </Descriptions>
  );
}

export default ClientesInfo;