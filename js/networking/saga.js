import request from 'superagent';
import { fork, put, takeEvery } from 'redux-saga/effects';

import { ISSUE_FIND, ISSUE_QUERY } from './redux';


function* handleFetch(fetchAction) {
  const {
    model: Model,
    url,
    receiveFn,
    resolve,
    reject,
  } = fetchAction.meta;
  let response;
  try {
    response = yield request.get(url).use(Model.auth);
  } catch (err) {
    reject(err);
    return yield put(receiveFn(err, fetchAction));
  }

  const receiveAction = receiveFn(response.body, fetchAction);
  resolve(response.body);
  return yield put(receiveAction);
}

export default function* rootSaga() {
  yield [
    fork(takeEvery, [ISSUE_FIND, ISSUE_QUERY], handleFetch),
  ];
}
