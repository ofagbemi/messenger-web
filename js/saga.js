import { fork } from 'redux-saga/effects';

import auth from './auth/saga';


export default function* rootSaga() {
  yield [
    fork(auth),
  ];
}
