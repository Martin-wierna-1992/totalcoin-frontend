import Fetcher from "../helpers/fetcher";
import AuthHelper from "../helpers/authHelper";
const MascotasApi = {
  get: id => {
    let url = '/api/mascotas';
    let token = AuthHelper.getJwtToken()
    if(id){ url += id; }
    return Fetcher
      .getMascotas(url,token)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  save: data => {
    let url = '/api/mascotas';
    return Fetcher
      .post(url,data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },

}
export default MascotasApi;