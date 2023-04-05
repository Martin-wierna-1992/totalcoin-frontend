import Fetcher from "../helpers/fetcher";
import AuthHelper from "../helpers/authHelper";
const ClientesApi = {
  get: id => {
    let url = '/api/combos';
    if(id){ url += id; }
    return Fetcher
      .get(url)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  getClientes: id => {
    let url = '/api/clientes';
    let token = AuthHelper.getJwtTokenSession()
    return Fetcher
      .getClientes(url,token)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  save: data => {
    if(!data.id){
      return Fetcher
        .post('api/aldebarancore/clientes', data)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
    else{
      return Fetcher
        .put('api/aldebarancore/clientes/' + data.id, data)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
  },
  delete: id => {
    return Fetcher
      .delete('api/aldebarancore/clientes/' + id, {})
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  saveContacto: (id, contacto) => {
    if(!contacto.id){
      return Fetcher
        .post('api/aldebarancore/clientes/' + id + '/contactos/', contacto)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
    else{
      return Fetcher
        .put('api/aldebarancore/clientes/' + id + '/contactos/' + contacto.id, contacto)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
  },
  deleteContacto: (id, id_contacto) => {
    let url = 'api/aldebarancore/clientes/' + id + '/contactos/' + id_contacto;
    return Fetcher
      .delete(url)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  asignarProducto: (id, data) => {
    let url = 'api/aldebarancore/clientes/' + id + '/asignar-producto';
    return Fetcher
      .post(url, data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  quitarProducto: (id, data) => {
    let url = 'api/aldebarancore/clientes/' + id + '/quitar-producto';
    return Fetcher
      .post(url, data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  uploadFile: (id, data) => {
    return Fetcher
      .post('api/aldebarancore/clientes/' + id + '/asignar-media', data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  deleteFile: (id, id_media) => {
    return Fetcher
      .delete('api/aldebarancore/clientes/' + id + '/media/' + id_media,)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  agregarObservacion: (id, data) => {
    return Fetcher
      .post('api/aldebarancore/clientes/' + id + '/agregar-observacion', data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  deleteObservacion: (id, id_obs) => {
    return Fetcher
      .delete('api/aldebarancore/clientes/' + id + '/observacion/' + id_obs,)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
}

export default ClientesApi;