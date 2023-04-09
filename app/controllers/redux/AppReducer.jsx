import {combineReducers} from 'redux';

const reducers = combineReducers({});

const rootReducers = (state, action) => {
  /* state that need to be reset */
  return reducers(state, action);
};

export default rootReducers;
