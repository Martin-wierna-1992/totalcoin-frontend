import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import logo from '../../assets/toro1.png';
import logoCollapsed from '../../assets/toro1.png';
import Icon, { HomeOutlined, UserOutlined, DatabaseOutlined, RocketOutlined } from "@ant-design/icons";
import './AppLeftMenu.scss';
import AuthHelper from '../../../../helpers/authHelper';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { AppRoutes } from '../../../../helpers/consts';

const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

const AppLeftMenu = props => {
  const [user] = useState(AuthHelper.getUser());
  const { windowHeight, windowWidth } = useWindowDimensions();

  function renderMenuItem(item){
    if(item.children?.length > 0){
      return <SubMenu key={ item.key } icon={ <Icon component={ item.icon } /> } title={ item.title }>
        { item.children.map(child => renderMenuItem(child)) }
      </SubMenu>;
    }
    else{
      return <MenuItem key={ item.key } icon={ <Icon component={ item.icon } /> }>
        <Link to={ item.link } /><span>{ item.title }</span>
      </MenuItem>
    }
  }

  return (
    <Sider 
      className="left-menu-main" 
      collapsible 
      collapsed={props.collapsed} 
      collapsedWidth={windowWidth > 600 ? 80 : 0}
      trigger={null}
      breakpoint="lg"
      onBreakpoint={broken => {
        props.setCollapsed(broken);
      }}
    >
      <div className="app-layout-logo" >
        
      </div>

      <Menu 
        theme="dark" 
        defaultSelectedKeys={ ["home"] } 
        mode="inline" 
        onSelect={() => windowWidth <= 600 ? props.setCollapsed(true) : ''}
      >
        {AppRoutes.map(route => 
          route.roles?.length === 0 || route.roles.indexOf(user.role) >= 0 
            ? renderMenuItem(route)
            : null
        )}
      </Menu>
    </Sider>
  );
}

export default AppLeftMenu;
