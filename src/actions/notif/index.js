import { ERROR_NOTIF, SUCCESS_NOTIF } from "./types";

export const sendSuccessNotif = (message) => ({
  type: SUCCESS_NOTIF,
  payload: message
});

export const sendErrorNotif = (message) => ({
  type: ERROR_NOTIF,
  payload: message
});