import * as constants from '../constants/index';
const initState = {
  username: '',
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOGIN:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default reducer;
