import Global from 'app/constants/Global';
import { baseApiUrl, directionAPIUrl, mapboxToken } from '../../../env.json';
import { axiosSendRequest } from './axios/AxiosSendRequest';

/**
 * @author hieubt
 */
const getAll = async () => {
  return await axiosSendRequest(
    'get',
    `${baseApiUrl}parkings/get-all`,
    {},
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @typedef GetRouteParams
 * @property {number} startLongitude
 * @property {number} startLatitude
 * @property {number} endLongitude
 * @property {number} endLatitude
 * @param {GetRouteParams} param
 */
const getDirection = async ({
  startLongitude,
  startLatitude,
  endLongitude,
  endLatitude,
}) => {
  return axiosSendRequest(
    'get',
    `${directionAPIUrl}/${startLongitude},${startLatitude};${endLongitude},${endLatitude}?access_token=${mapboxToken}&geometries=geojson&alternatives=false&overview=full`,
  );
};

/**
 * @author hieubt
 * @typedef SaveParkingParams
 * @property {string} parkingId
 * @property {string} userId
 * @param {SaveParkingParams} param
 */
const saveParking = async ({ parkingId, userId }) => {
  return axiosSendRequest(
    'post',
    `${baseApiUrl}parkings/save-parking`,
    { parkingId, userId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @typedef UnSaveParkingParams
 * @property {string} parkingId
 * @property {string} userId
 * @param {UnSaveParkingParams} param
 */
const unSaveParking = async ({ parkingId, userId }) => {
  return axiosSendRequest(
    'post',
    `${baseApiUrl}parkings/un-save-parking`,
    { parkingId, userId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @param {{userId: string}} param
 */
const getSavedParkings = async ({ userId }) => {
  return axiosSendRequest(
    'post',
    `${baseApiUrl}parkings/get-saved-parking`,
    { userId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

export default {
  getAll,
  getDirection,
  saveParking,
  unSaveParking,
  getSavedParkings,
};
