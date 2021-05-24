import {AsyncStorage} from '@react-native-community/async-storage';
import * as constants from '../constants/index';
const initState = {
  score: [],
  timePlayed: 0,
};
const reducer = (state = {...initState}, action) => {
  switch (action.type) {
    case constants.GET_POINT:
      return {...state, score: action.payload};
    case constants.ADD_POINT:
      const tmp = {...state};
      return {
        ...state,
        score: [
          ...tmp.score,
          {name: action.payload.username, score: state.timePlayed},
        ],
      };
    case constants.MINESWEEPER_CHANGE_STATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default reducer;
