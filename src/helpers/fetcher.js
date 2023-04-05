import axios from 'axios';
import AuthHelper from './authHelper';
import { notification } from 'antd';
import parser from './parser';

axios.defaults.baseURL = `${window.location.protocol}//${window.location.host}/`;

axios.interceptors.request.use(request => {
  request.headers =
    AuthHelper.isJwtTokenStored()
      ? { ...request.headers, Authorization: `${AuthHelper.getJwtToken()}` }
      : request.headers;
  return request;
});

axios.interceptors.response.use(
  response => {
    if (response.data.ValidationErrors) {
      for (const validationType in response.data.ValidationErrors) {
        const validationMessage = response.data.ValidationErrors[validationType];
        notification.error({ message: 'Error', description: "[Validacion Servidor] " + validationMessage, placement: 'bottomRight' });
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      console.debug(error.response);
      let message;
      try {
        message = typeof error.response.data !== 'object' ? error.response.data
          : error.response.data.error ? error.response.data.error
            : error.response.data.ExceptionMessage ? error.response.data.ExceptionMessage
              : error.response.data.Message ? error.response.data.Message
                : error.response.data.messages ? error.response.data.messages
                  : 'Ocurrio un error...';

        if (typeof message === 'object') {
          message = JSON.stringify(message);
        }
      } catch (e) {
        message = 'Ocurrio un error...';
      }

      message = message.length > 300 ? message.substring(0, 300) + '...' : message;
      message = parser.parseError(message);

      switch (error.response.status) {
        case 401:
          //Para digital ocean - Remover!!
          /*if (error.request?.responseURL?.indexOf('api-digital') > -1) {
            notification.error({ message: 'Error', description: message, placement: 'bottomRight' });
            return Promise.reject(error);
          }*/

          if (window.location?.href?.indexOf('/login') < 0) {
            AuthHelper.logout(() => {
              window.location.replace("/login");
            });
          }
          if (error.config?.url?.indexOf('/login') > -1) {
            notification.error({ message: 'Error', description: 'Usuario o clave incorrectos', placement: 'bottomRight' });
          }
          else {
            notification.error({ message: 'Error', description: 'Sesión expirada', placement: 'bottomRight' });
          }
          break;
        case 404:
          message = "[Endpoint No encontrado] " + error.response.config.baseURL + error.response.config.url;
          notification.error({ message: 'Error', description: message, placement: 'bottomRight' });
          break;
        default:
          notification.error({ message: 'Error', description: message, placement: 'bottomRight' });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default class Fetcher {
  static get(path, callback) {
    return axios.get(path, { callback });
  }
  static getCombos(path,token, callback) {
    return axios.get(path, { callback, headers: { 'Authorization': token } });
  }
  static getClientes(path,token, callback) {
    return axios.get(path, { callback, headers: { 'Authorization': token } });
  }
  static getMascotas(path,token, callback) {
    return axios.get(path, { callback, headers: { 'Authorization': token } });
  }

  static post(path, data = {}, callback) {
    return axios.post(path, data, { callback });
  }

  static postMultipart(path, data = {}, callback) {
    return axios.post(path, data, { callback, headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` } });
  }

  static put(path, data = {}, callback) {
    return axios.put(path, data, { callback });
  }

  static delete(path, callback) {
    return axios.delete(path, { callback });
  }

  static patch(path, data = {}, callback) {
    return axios.patch(path, data, { callback });
  }

  static download(path) {
    return axios({ url: path, method: 'GET', responseType: 'blob' });
  }
}
