import { compose } from 'ramda';
import { connect } from 'react-redux';

import Login from '../components/Login';
import { accessTokenSelector } from '../redux';


const requireLogin = WrappedComponent => props => (
  props.accessToken
    ? <WrappedComponent {...props} />
    : <Login />
);

export default compose(
  connect(state => ({ accessToken: accessTokenSelector(state) })),
  requireLogin
);
