import Fetcher from "../helpers/fetcher";

const UsuariosApi = {
  get: id => {
    let url = 'api/authentication/usuarios/';
    if(id){ url += id; }
    return Fetcher
      .get(url)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  save: data => {
    if(!data.id){
      return Fetcher
        .post('api/authentication/usuarios', data)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
    else{
      return Fetcher
        .put('api/authentication/usuarios/' + data.id, data)
        .then((response) => { return response.data; })
        .catch((error) => { throw error; });
    }
  },
  delete: id => {
    return Fetcher
      .delete('api/authentication/usuarios/' + id, {})
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  getPermisos: id => {
    return Fetcher
      .get('api/authentication/usuarios/' + id + '/permisos')
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  addPermisos: (idUser, idPermisos) => {
    return Fetcher
      .post('api/authentication/usuarios/' + idUser + '/permisos/' + idPermisos, {})
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  removePermiso: (idUser, idPermiso) => {
    return Fetcher
      .delete('api/authentication/usuarios/' + idUser + '/permisos/' + idPermiso, {})
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  borrarPermisos: (idUser, idSolucion) => {
    return Fetcher
      .delete('api/authentication/usuarios/' + idUser + '/soluciones/' + idSolucion + '/delete-all-permisos', {})
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  changePassword: (idUser, pass, newPass) => {
    let data = {
      password: pass,
      newpassword: newPass
    }
    return Fetcher
      .post('api/authentication/usuarios/' + idUser + '/change-password/', data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

  resetPassword: (idUser, newPass) => {
    let data = {
      newpassword: newPass
    }
    return Fetcher
      .post('api/authentication/usuarios/' + idUser + '/reset-password/', data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
}

export default UsuariosApi;