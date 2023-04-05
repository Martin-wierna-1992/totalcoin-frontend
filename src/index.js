import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';
import 'moment/locale/es';
import moment from 'moment-timezone';
import { MomentConfig } from './helpers/config';

moment.locale('es');
moment.tz.setDefault(MomentConfig.tz);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={esES}> 
      <App />
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
