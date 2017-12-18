import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import local from './index';

const appReducer = combineReducers({
  ...local,
  routing
});

export default appReducer;
