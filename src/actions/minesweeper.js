import * as constants from '../constants/index';
export const getPoint = async payload => {
  return {
    type: constants.GET_POINT,
    payload,
  };
};

export const addPoint = payload => {
  return {
    type: constants.ADD_POINT,
    payload,
  };
};
