import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './AppContent.scss';
import AuthHelper from "../../../../helpers/authHelper";
import { AppRoutes } from "../../../../helpers/consts";

const { Content } = Layout;

const AppContent = props => {
  const [routes, setRoutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useState(AuthHelper.getUser());

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/pedidos', { replace: true })
    }
  }, [location, navigate]);

  useEffect(() => {
    let routesAux = getRoutes(AppRoutes);
    setRoutes(routesAux);
  }, []);

  const getRoutes = items => {
    let routesAux = items.filter(x => x.path);

    let itemsWithChildren = items.filter(x => x.children?.length > 0);
    itemsWithChildren.map(item => {
      routesAux = [...routesAux, ...getRoutes(item.children)];
      return item;
    });

    return routesAux;
  }
  return (
    <Content>
      <div style={{ padding: 16 }}>
            <section className="route-section">
              <Routes>
                {routes.map(route => (
                  route.roles?.length === 0 || route.roles.indexOf(user.role) >= 0
                    ? <Route key={route.key} path={route.path} element={route.element} />
                    : null
                ))}
              </Routes>
            </section>
      </div>
    </Content>
  );
}

export default AppContent;