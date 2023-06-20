import { baseApiUrl } from '../../../env.json';
import { axiosSendRequest } from './axios/AxiosSendRequest';

/**
 * @author hieubt
 * @param {string} email
 * @param {string} password
 */
const login = async (email, password) => {
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}/users/login`,
    { email, password },
    null,
  );
};

/**
 * @author hieubt
 * @typedef RegisterParams
 * @property {string} name
 * @property {string} avatar
 * @property {string} email
 * @property {'Male' | 'Female' | 'Other'} gender
 * @property {string} password
 * @property {string} phoneNumber
 * @property {string} address
 * @param {RegisterParams} param
 */
const register = async ({
  name,
  avatar,
  email,
  gender,
  password,
  phoneNumber,
  address,
}) => {
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}/users/register`,
    { name, avatar, email, gender, password, phoneNumber, address },
    null,
  );
};

export default {
  login,
  register,
};
