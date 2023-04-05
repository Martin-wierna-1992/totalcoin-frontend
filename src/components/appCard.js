import { Card } from 'antd';

const AppCard = props => {
  return (
    <Card
      {...props}
      style={{...props.style, borderRadius: 20}}
    >
      { props.children }
    </Card>
  )
}

export default AppCard;