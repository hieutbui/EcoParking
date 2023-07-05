import axios from 'axios';
import axiosMiddleware from './AxiosMiddleware';
const qs = require('qs');

/**
 * @author hieubt
 * @param {'post' | 'get' | 'put' | 'delete'} method
 * @param {String} url
 * @param {*} params
 * @param {*} header
 * @returns {Promise<{result: String, message:String, data: Object}>}
 */
export async function axiosSendRequest(
  method,
  url,
  params = null,
  header = null,
) {
  console.log(
    '\n[Axios ' + method + ']: \n\t url = ',
    url,
    '\n\t params = ',
    JSON.stringify(params),
    '\n\t header = ',
    header,
  );

  let responseData = {
    status: 'error',
    message: 'Không xác định',
    code: 0,
  };

  const config = {
    method,
    url,
  };
  if (header) {
    config.headers = header;
  }

  if (params) {
    if (method === 'get') {
      config.url =
        url +
        '?' +
        qs.stringify(params, {
          arrayFormat: 'indices',
          encode: false,
        });
    } else {
      config.data = params;
    }
  }

  await axios(config)
    .catch(function (error) {
      console.log({ error });
      responseData.message = error.message;
      console.warn('[Axios]', error);
      return { data: responseData };
    })
    .then(response => response.data)
    .then(axiosMiddleware.handleLogResponse)
    .then(axiosMiddleware.handleRequestError)
    .then(data => {
      responseData = data;
    });
  console.log('\n[Axios Response Data]: \n\t', url, '\n\t', responseData, '\n');
  // console.log('\n[Axios Response Data]: \n\t', url, '\n\t', responseData, '\n');
  return responseData;
}

/**
 * set a field for all axios request header
 * @param {*} key
 * @param {*} value
 */
export const setAxiosHeader = (key, value) => {
  axios.defaults.headers.common[key] = value;
  console.log('[Axios]', 'Set default header', { key, value });
};

setAxiosHeader('Accept-Encoding', 'gzip');
setAxiosHeader('Content-Type', 'application/json');
setAxiosHeader('langcode', 'vi');
setAxiosHeader('apisecret', 'UEJ34gtH345DFG45G3ht1');
setAxiosHeader('mode', 'mobile');
setAxiosHeader('deviceinfo', 'android');
setAxiosHeader('appversion', '1.0');
setAxiosHeader('osinfo', 'react-native');
