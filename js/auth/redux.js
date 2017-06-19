import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

import store from 'store';


const ISSUE_LOGIN = 'sc/ISSUE_LOGIN';
const ISSUE_REGISTER = 'sc/ISSUE_REGISTER';
const RECEIVE_LOGIN = 'sc/RECEIVE_LOGIN';
const CLEAR_AUTH = 'sc/CLEAR_AUTH';

export const accessTokenSelector = state => state.getIn(['auth', 'accessToken']);
export const authPlugin = req => {
  const accessToken = accessTokenSelector(store.getState());
  req.set('Authorization', `Bearer ${accessToken}`);
  return req;
};

const promiseMetaCreator = () => {
  const promiseMeta = {};
  promiseMeta.promise = new Promise((resolve, reject) => {
    promiseMeta.resolve = resolve;
    promiseMeta.reject = reject;
  });
  return promiseMeta;
};

export const issueLogin = createAction(ISSUE_LOGIN, null, promiseMetaCreator);
export const issueRegister = createAction(ISSUE_REGISTER, null, promiseMetaCreator);

export const receiveLogin = createAction(
  RECEIVE_LOGIN,
  payload => ({
    ...payload,
    expiresAt: new Date(Date.now() + (payload.expiresIn * 1000)),
  })
);

export const clearAuth = createAction(CLEAR_AUTH);

export default handleActions({
  [receiveLogin]: {
    next: (state, action) => (
      state.merge(action.payload)
    ),
  },
  [clearAuth]: {
    next: state => state.clear(),
  },
}, Map());
