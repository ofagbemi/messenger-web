import urlJoin from 'url-join';
import request from 'superagent';
import { delay } from 'redux-saga';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { API_URL } from 'util/constants';

import {
  issueLogin,
  issueRegister,
  receiveLogin,
  clearAuth,
} from './redux';


const AUTH_URL = urlJoin(API_URL, '/auth');
const REGISTER_URL = urlJoin(API_URL, '/register');

function* sendRequest(url, { payload, meta }, receiveFn) {
  let response;
  try {
    response = yield request
      .post(url)
      .send(payload.toJS());
  } catch (err) {
    meta.reject(err);
    yield put(receiveFn(err));
    return;
  }
  const receiveAction = receiveFn(response.body);
  meta.resolve(response.body);
  yield put(receiveAction);
}

function* handleIssueLogin(action) {
  yield call(sendRequest, AUTH_URL, action, receiveLogin);
}

function* handleIssueRegister(action) {
  yield call(sendRequest, REGISTER_URL, action, receiveLogin);
}

function* handleReceiveLogin({ payload }) {
  const { expires_at: expiresAt } = payload;
  if (!expiresAt) return;

  yield call(delay, expiresAt.getTime() - Date.now());
  yield put(clearAuth());
}

export default function* rootSaga() {
  yield [
    fork(takeEvery, issueLogin, handleIssueLogin),
    fork(takeEvery, issueRegister, handleIssueRegister),
    fork(takeEvery, receiveLogin, handleReceiveLogin),
  ];
}
