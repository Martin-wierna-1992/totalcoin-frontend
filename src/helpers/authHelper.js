import jwtDecode from 'jwt-decode';

/* eslint class-methods-use-this: 0 */

class AuthHelper {
  static isUserAuthenticated() {
    return sessionStorage.jwtToken ? true : false;
  }

  static logout = (callback = () => {}) => {
    AuthHelper.removeJwtToken();
    callback();
  };

  static isJwtTokenStored() {
    return sessionStorage.jwtToken ? true : false;
  }

  static getJwtToken() {
    return AuthHelper.isJwtTokenStored() ? sessionStorage.jwtToken : null;
  }
  static getJwtTokenSession() {
    return sessionStorage.getItem("jwtToken");
  }

  static storeJwtToken(jwtToken) {
    if (jwtToken.indexOf("Bearer ") >= 0) {
      jwtToken = jwtToken.replace("Bearer ", "");
    }
    sessionStorage.setItem("jwtToken", jwtToken);
    return null;
  }

  static removeJwtToken() {
    sessionStorage.removeItem("jwtToken");
    return null;
  }

  static storeUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    return null;
  }

  static removeUser() {
    sessionStorage.removeItem("user");
    return null;
  }

  static getUser() {
    return JSON.parse(sessionStorage.user);
  }
}
export default AuthHelper;
