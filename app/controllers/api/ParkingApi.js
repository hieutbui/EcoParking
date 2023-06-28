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

export default {
  getAll,
  getDirection,
};
