import 'babel-core/register';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';
import App from './App';
import './style/main.scss';


ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes />
    </App>
  </Provider>,
  document.getElementById('react-root')
);
