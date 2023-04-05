import React from "react";
import { Layout } from "antd";
import AppCard from "../../../../components/appCard";
import { AppConfig } from "../../../../helpers/config";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <AppCard style={{margin: '8px 16px'}} bodyStyle={{padding: '16px 16px'}}>
      <Footer className="app-layout-background" style={{ textAlign: "center", padding: 0 }}>
        <small>{ AppConfig.footer }</small>
      </Footer>
    </AppCard>
  );
}

export default AppFooter;
