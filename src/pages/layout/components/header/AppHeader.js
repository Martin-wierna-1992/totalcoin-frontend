import React, { useState } from 'react';
import { Layout, Button, Row, Col, Popover, Tooltip, Divider, Space } from 'antd';
import { useNavigate } from "react-router";
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import './AppHeader.scss';
import AuthHelper from '../../../../helpers/authHelper';
import AppCard from '../../../../components/appCard';
import { AppConfig } from '../../../../helpers/config';
import PerfilView from '../../../../components/perfil/perfilView';


const { Header } = Layout;

const AppHeader = props => {
  const navigate = useNavigate();
  const [user] = useState(AuthHelper.getUser());
  const [popOpen, setPopOpen] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);

  const logout = () => {
    AuthHelper.logout(() => navigate("/login"));
  }

  const isTestEnv = () => {
    return window.location?.hostname?.indexOf('test') > -1 || window.location?.hostname?.indexOf('localhost') > -1
  }

  return (
    <AppCard className={`app-header-container ${(isTestEnv() ? 'test' : '')}`} bodyStyle={{padding: '0 16px'}}>
      <Header className={`app-header ${(isTestEnv() ? 'test' : '')}`}>
        <Row>
          <Col span={12}>
            <div>
              {props.collapsed 
                ? <MenuUnfoldOutlined className="header-icon" style={{marginRight: 4}} onClick={() => props.setCollapsed(false)}/> 
                : <MenuFoldOutlined className="header-icon" style={{marginRight: 4}} onClick={() => props.setCollapsed(true)}/>}
                <span className="header-title">{
                  `${AppConfig.siteName} 
                  ${(isTestEnv() ? `- ${AuthHelper.getUser().role}` : '')}
                  ${(user?.reparticion_nombre?.length > 0 ? ' - ' + user.reparticion_nombre : '')}`
                }</span>
            </div>
           </Col>

          <Col span={12} style={ { textAlign: 'right' } }>
            <Space size="large">
              <small>{user?.email}</small>

              <Popover 
                open={popOpen}
                onOpenChange={visible => setPopOpen(visible)}
                placement="bottomRight"
                content={ 
                  <Space direction='vertical' style={{minWidth: 200}}>
                    <h4>{user?.email}</h4>
                    <Divider style={{margin: '8px 0'}} />
                    <Button block type="text" onClick={ logout }>Salir</Button>
                  </Space>
                } 
                trigger="click"
              >
                <Tooltip title={ /*user*/ "Menu" } placement="left">
                  <Avatar 
                    className={`header-avatar ${(isTestEnv() ? 'test' : '')}`}
                    size="large" 
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              </Popover>
            </Space>
          </Col>

        </Row>

        <PerfilView
          visible={showPerfil}
          onClose={()=> setShowPerfil(false)}
        />
      </Header>
    </AppCard>
  );
}

export default AppHeader;
