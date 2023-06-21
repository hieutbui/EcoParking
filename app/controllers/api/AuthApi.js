import { baseApiUrl } from '../../../env.json';
import axiosClient from './axios/AxiosClient';
import { axiosSendRequest } from './axios/AxiosSendRequest';

/**
 * @author hieubt
 * @param {string} email
 * @param {string} password
 */
const login = async (email, password) => {
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}users/login`,
    { email, password },
    null,
  );
};

/**
 * @author hieubt
 * @typedef RegisterParams
 * @property {string} name
 * @property {Object} file
 * @property {string} email
 * @property {'Male' | 'Female' | 'Other'} gender
 * @property {string} password
 * @property {string} phoneNumber
 * @property {string} address
 * @param {RegisterParams} params
 */
const register = async params => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(params)) {
    if (key === 'file') {
      const localUri = value;
      const filename = localUri?.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
      formData.append('file', { uri: localUri, name: filename, type });
    }
    formData.append(key, value);
  }
  formData.append('role', 2);
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}users/register`,
    formData,
    {
      'content-type': 'multipart/form-data',
    },
  );
};

export default {
  login,
  register,
};
