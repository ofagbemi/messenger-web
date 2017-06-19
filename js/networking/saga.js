import request from 'superagent';
import { fork, put, takeEvery } from 'redux-saga/effects';

import { ISSUE_FIND, ISSUE_QUERY, ISSUE_CREATE } from './redux';


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

function* handleCreate(createAction) {
  const { payload, meta } = createAction;
  const {
    model: Model,
    url,
    resolve,
    reject,
  } = meta;

  let response;
  try {
    response = yield request
      .post(url)
      .use(Model.auth)
      .send(payload.toJS());
  } catch (err) {
    reject(err);
  }
  resolve(response.body);
}

export default function* rootSaga() {
  yield [
    fork(takeEvery, [ISSUE_FIND, ISSUE_QUERY], handleFetch),
    fork(takeEvery, ISSUE_CREATE, handleCreate),
  ];
}
