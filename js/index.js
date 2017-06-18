import 'babel-core/register';
import 'babel-polyfill';

import { Map } from 'immutable';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import immutableTransform from 'redux-persist-transform-immutable';
import localForage from 'localforage';

import reducer from './redux';
import saga from './saga';
import Routes from './Routes';
import App from './App';
import './style/main.scss';


const sagaMiddleware = createSagaMiddleware();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(
  reducer,
  Map(),
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )
);

sagaMiddleware.run(saga);
persistStore(store, {
  storage: localForage,
  transforms: [immutableTransform()],
  blacklist: ['form'],
});

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes />
    </App>
  </Provider>,
  document.getElementById('react-root')
);
