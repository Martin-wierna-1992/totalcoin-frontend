import moment from 'moment';
import packageJson from '../../package.json'

let year = moment().format('YYYY');
year = year === '2022' ? year : '2022 - ' + year

export const AppConfig = {
  siteName: 'VETERINARIA',
  footer: `VETERIANRIA - ${packageJson.version} - ${year}`
};

export const FormConfig = {
  DefaultRules: [{required: true, message: 'Por favor ingrese un valor' }],
  DefaultLayout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  },
  DefaultSelectFilter: (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
};

export const MomentConfig = {
  tz: 'America/Argentina/Buenos_Aires',
};