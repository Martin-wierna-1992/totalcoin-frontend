import Fetcher from "../helpers/fetcher";

const RolesApi = {
  get: id => {
    let url = 'api/authentication/roles/';
    if(id){ url += id; }
    return Fetcher
      .get(url)
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  },
  save: data => {
    if(!data.id){
      return Fetcher
        .post('api/authentication/roles', data)
        .then(response => { return response.data; })
        .catch(error => { throw error; });
    }
    else{
      return Fetcher
        .put('api/authentication/roles/' + data.id, data)
        .then(response => { return response.data; })
        .catch(error => { throw error; });
    }
  },
  delete: id => {
    return Fetcher
      .delete('api/authentication/roles/' + id, {})
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  },
  habilitar: (id, habilitar) => {
    let url = habilitar ? 'api/authentication/roles/habilitar/' + id : 'api/authentication/roles/deshabilitar/' + id;
    return Fetcher
      .put(url, {})
      .then(response => { return response.data; })
      .catch(error => { throw error; });
  }
}

export default RolesApi;