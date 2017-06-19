import { Map } from 'immutable';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import immutableTransform from 'redux-persist-transform-immutable';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';

import saga from './saga';
import reducer from './reducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  Map(),
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )
);

persistStore(store, {
  storage: localForage,
  transforms: [immutableTransform()],
  whitelist: ['auth'],
});

sagaMiddleware.run(saga);

export default store;
