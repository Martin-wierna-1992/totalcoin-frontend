import currency from 'currency.js';
import moment from 'moment';

export default class parser {
  static currency = (value, opt = {}) => {
    opt = {
      symbol: '$',
      decimal: ',',
      pattern: '! #',
      negativePattern: '- ! #',
      ...opt
    }
    return currency(value, opt.precision ? { precision: opt.precision } : {}).format(opt);
  }

  static date = (text, format = 'DD/MM/YYYY') => {
    if (!text) { return ''; }
    if (typeof text === 'object') { return moment(text).format(format); }
    return !text.startsWith('0001-01-01') ? moment(text).format(format) : ''
  }

  static datetime = text => {
    if (!text) { return ''; }
    if (typeof text === 'object') { return moment(text).format('DD/MM/YYYY'); }
    return !text.startsWith('0001-01-01') ? moment(text).format('DD/MM/YYYY HH:mm:ss') : ''
  }

  static mask = text => {
    text = text.toString();
    return text ? text.substring(text.length / 2, text.length).padStart(text.length, '*') : '';
  }

  static parseError = text => {
    text = text.toString();
    return text == 'Unauthorized' ? 'Usuario o clave incorrecta'
      : text;
  }

  static parseFileSize = size => {
    if (size > 0) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }
    return size + 'B';
  }
}