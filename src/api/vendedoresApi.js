import Fetcher from "../helpers/fetcher";
import AuthHelper from "../helpers/authHelper";

const VendedoresApi = {
  get: id => {
    let url = '/api/combos/by-vendedor';
    if(id){ url += id; }
    let token = AuthHelper.getJwtToken();
    return Fetcher
      .getCombos(url,token)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  getVendedores: id => {
    let url = '/api/vendedores';
    if(id){ url += id; }
    return Fetcher
      .get(url)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  save: data => {
    let url = '/api/vendedores';
    return Fetcher
      .post(url,data)
      .then((response) => { return response.data; })
      .catch((error) => { throw error; });
  },
  
}

export default VendedoresApi;