import React from "react";
import { Breadcrumb } from "antd";
import AuthHelper from "../../../../../shared/helpers/authHelper";
import { useLocation } from "react-router";

const BreadItem = Breadcrumb.Item;

const AppBreadcrumb = () => {
  const location = useLocation();

  let routes = location.pathname.split('/').filter(x => isNaN(x));

  if (AuthHelper.isUserAuthenticated()){
    return (
      <Breadcrumb style={ { marginBottom: 16 } }
        separator=">"
      >
        { routes.map(route => <BreadItem key={ route }>{ route.charAt(0).toUpperCase() + route.slice(1) }</BreadItem>) }
      </Breadcrumb>
    );
  }else{
    return null;
  }
}

export default AppBreadcrumb;
