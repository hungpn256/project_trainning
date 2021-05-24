import {AsyncStorage} from '@react-native-community/async-storage';
import * as constants from '../constants/index';
const initState = {
  score: [],
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case constants.GET_POINT:
      return {...state, point: AsyncStorage.getItem('score')};
    case constants.ADD_POINT:
      console.log(action.payload);
      const tmp = {...state};
      return {...state, score: [...tmp.score, action.payload]};
    default:
      return state;
  }
};
export default reducer;
