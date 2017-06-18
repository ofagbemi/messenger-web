import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import auth from './auth/redux';


export default combineReducers({
  auth,
  form,
});
