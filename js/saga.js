import { fork } from 'redux-saga/effects';

import auth from './auth/saga';
import networking from './networking/saga';


export default function* rootSaga() {
  yield [
    fork(auth),
    fork(networking),
  ];
}
