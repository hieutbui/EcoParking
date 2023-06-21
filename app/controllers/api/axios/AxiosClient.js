import Global from 'app/constants/Global';
import axios from 'axios';
import queryString from 'query-string';
import { baseApiUrl } from '../../../../env.json';
import Variable from 'app/constants/Variable';

const qs = require('qs');
const sTag = '[AxiosClient]';

/**
 * @type {import('axios').AxiosInstance}
 */
const axiosClient = axios.create({
  baseURL: baseApiUrl,
  headers: {},
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async config => {
    if (Variable.accessToken) {
      _.set(
        config.headers.common,
        'Authorization',
        'Bearer' + Variable.accessToken,
      );
    }
    return config;
  },
  error => {
    console.warn(`${sTag} - ${error}`, 'error');
  },
);

axiosClient.interceptors.request.use(
  async response => {
    if (response && response.data) {
      return { data: response.data, headers: response.headers };
    }
    return response;
  },
  async error => {
    console.log({ error });

    const originalConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry &&
      Global.RefreshToken &&
      Global.RefreshToken.length > 0
    ) {
      console.log(sTag, 'refresh Token');
      originalConfig._retry = true;

      try {
        const data = qs.stringify({
          user_id: Global.UserId,
          refresh_key: Global.RefreshToken,
        });
        const config = {
          method: 'post',
          url: `${baseApiUrl}/users/refreshLogin`,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data,
        };

        try {
          const rs = await axios(config);

          console.log('[Refresh] ret:', rs.data);
          if (rs.data && rs.data.data) {
            Global.RefreshToken = rs.data.data.refreshToken;
            return axiosClient(originalConfig);
          }
        } catch (errorRefresh) {
          if (errorRefresh.response) {
            console.log('[RefreshToken] axios error', error.response.status);
          }
          if (originalConfig._retry) {
            return Promise.reject(errorRefresh);
          }
          return Promise.reject(errorRefresh);
        }
      } catch (_error) {
        console.log('[RefreshToken] error', _error);
        return Promise.reject(_error);
      }
    }
  },
);

export default axiosClient;
