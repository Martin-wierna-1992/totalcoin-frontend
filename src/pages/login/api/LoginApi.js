import AuthHelper from "../../../helpers/authHelper";
import Fetcher from "../../../helpers/fetcher";
import jwt_decode from "jwt-decode";


const LoginApi = {
  login: (email, password) => {
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);

    return Fetcher
      .post('/api/usuarios/authenticate', form)
      .then(
        response => {
        const token = response.data.Jwt;
        const decoded = jwt_decode(token);
        AuthHelper.storeJwtToken(response.data.Jwt);
        AuthHelper.storeUser(decoded);
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  },
}

export default LoginApi;