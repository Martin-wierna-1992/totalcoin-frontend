import Fetcher from "../helpers/fetcher";

const PermisosApi = {
  get: id => {
    let url = 'api/authentication/permisos/';
    if(id){ url += id; }
    return Fetcher
      .get(url)
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  },
  save: data => {
    if(!data.id){
      return Fetcher
        .post('api/authentication/permisos', data)
        .then(response => { return response.data; })
        .catch(error => { throw error; });
    }
    else{
      return Fetcher
        .put('api/authentication/permisos/' + data.id, data)
        .then(response => { return response.data; })
        .catch(error => { throw error; });
    }
  },
  delete: id => {
    return Fetcher
      .delete('api/authentication/permisos/' + id, {})
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  },
  habilitar: (id, habilitar) => {
    let url = habilitar ? 'api/authentication/permisos/habilitar/' + id : 'api/authentication/permisos/deshabilitar/' + id;
    return Fetcher
      .put(url, {})
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  }
}

export default PermisosApi;