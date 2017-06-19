import 'babel-core/register';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';
import App from './App';
import './style/main.scss';


ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <Provider store={store}>
      <App>
        <Routes />
      </App>
    </Provider>
  </IntlProvider>,
  document.getElementById('react-root')
);
