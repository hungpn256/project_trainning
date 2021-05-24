import * as constants from '../constants/index';

export const logIn = payload => {
  return {
    type: constants.LOGIN,
    payload,
  };
};
