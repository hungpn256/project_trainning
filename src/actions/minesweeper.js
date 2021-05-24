import * as constants from '../constants/index';
export const getPoint = payload => {
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
export const changeState = payload => {
  return {
    type: constants.MINESWEEPER_CHANGE_STATE,
    payload,
  };
};
