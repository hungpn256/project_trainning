import {combineReducers} from 'redux';
import minesweeper from './minesweeper';
import auth from './auth';

const rootReducer = combineReducers({
  minesweeper,
  auth,
});
export default rootReducer;
