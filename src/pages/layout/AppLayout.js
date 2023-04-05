import React, {useState} from 'react';
import { Layout } from 'antd';
import AppLeftMenu from './components/leftMenu/AppLeftMenu';
import AppHeader from './components/header/AppHeader';
import AppContent from "./components/content/AppContent";
import AppFooter from "./components/footer/AppFooter";
import { BrowserRouter as Router, Navigate, Route, Routes  } from "react-router-dom";
import LoginContainer from '../login/LoginContainer';
import './AppLayout.scss';
import AuthHelper from '../../helpers/authHelper';

const ProtectedRoute = props => {
  if (!AuthHelper.isUserAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/*"
            element={(
              <ProtectedRoute>
                <AppLeftMenu 
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
                <Layout className="app-layout">
                  <AppHeader 
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                  />
                  <AppContent />
                  <AppFooter />
                </Layout>
              </ProtectedRoute>
            )}
          />
          <Route path="/login/*" element={<LoginContainer />} />
          {/*<Route path="/change-password/*" element={<ChangePassContainer />} />*/}
          <Route path="*" element={<Navigate push to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppLayout;