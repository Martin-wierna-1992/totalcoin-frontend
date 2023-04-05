export default class Utils {
 
  static generateHash = length => {
    length = length ? length : 10;
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
    let text = "";
    for (let i = 0; i < length; i++) {
      text += charset[Math.floor(Math.random() * charset.length)];
    }
    return text;
  }

  static generateUUID = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}