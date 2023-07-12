import { baseApiUrl } from '../../../env.json';
import axiosClient from './axios/AxiosClient';
import { axiosSendRequest } from './axios/AxiosSendRequest';
import Global from 'app/constants/Global';

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

/**
 * @author hieubt
 * @typedef UpdateParams
 * @property {string} id
 * @property {string} name
 * @property {Object} file
 * @property {string} email
 * @property {'Male' | 'Female' | 'Other'} gender
 * @property {string} password
 * @property {string} phoneNumber
 * @property {string} address
 * @param {UpdateParams} params
 */
const updateProfile = async params => {
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
    `${baseApiUrl}users/updateProfile`,
    formData,
    {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @param {{userId: string}} params
 */
const getBooking = async params => {
  const { userId } = params;
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}/users/get-booking`,
    { userId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @param {{checkedIn: Date, checkedOut: Date, customerId: string, parkingId: string, carNumber: string}} params
 */
const createNewTicket = async params => {
  const { checkedIn, checkedOut, customerId, parkingId, carNumber } = params;
  return await axiosSendRequest(
    'post',
    `${baseApiUrl}/tickets/create-new-ticket`,
    { checkedIn, checkedOut, customerId, parkingId, carNumber },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

export default {
  login,
  register,
  updateProfile,
  getBooking,
  createNewTicket,
};
