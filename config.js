const APP_NAME = 'BOUTIQ';

// const ENV = 'live';
// const BOUTIQ_API_ROOT = 'https://boutiq-travel.herokuapp.com';
const ENV = 'stage';
const BOUTIQ_API_ROOT = 'https://boutiq-dev.herokuapp.com';
// const ENV = 'dev';
// const BOUTIQ_API_ROOT = 'https://boutiq-dev.herokuapp.com';

const BOUTIQ_API_SUFFIX = '/api/v1';
const BOUTIQ_API = `${BOUTIQ_API_ROOT}${BOUTIQ_API_SUFFIX}`;
const GA = 'UA-92902838-1';
const GTM = 'GTM-KRHC6W3';

export default {
  APP_NAME,
  ENV,
  GA,
  GTM,
  BOUTIQ_API_ROOT,
  BOUTIQ_API_SUFFIX,
  BOUTIQ_API,
};
