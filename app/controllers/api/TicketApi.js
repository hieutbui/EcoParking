import { axiosSendRequest } from './axios/AxiosSendRequest';
import { baseApiUrl } from '../../../env.json';
import Global from 'app/constants/Global';

/**
 * @author hieubt
 * @typedef GetSingleTicketParams
 * @property {string} ticketDetailId
 * @param {GetSingleTicketParams} param
 */
const getSingleTicket = ({ ticketDetailId }) => {
  return axiosSendRequest(
    'post',
    `${baseApiUrl}tickets/get-single-ticket`,
    { ticketDetailId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

/**
 * @author hieubt
 * @typedef CancelTicketParams
 * @property {string} ticketDetailId
 * @param {CancelTicketParams} param
 */
const cancelTicket = ({ ticketDetailId }) => {
  return axiosSendRequest(
    'post',
    `${baseApiUrl}tickets/cancel-ticket`,
    { ticketId: ticketDetailId },
    {
      Authorization: `Bearer ${Global.AccessToken}`,
    },
  );
};

export default {
  getSingleTicket,
  cancelTicket,
};
