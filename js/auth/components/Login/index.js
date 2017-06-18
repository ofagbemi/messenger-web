import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form/immutable';

import { issueLogin, issueRegister } from '../../redux';
import styles from './index.scss';


class Login extends React.Component {
  login = payload =>
    this.props.login(payload).meta.promise;

  register = payload =>
    this.props.register(payload).meta.promise;

  render() {
    const { location, handleSubmit, submitting } = this.props;
    const inRegisterMode = location.hash === '#register';
    return (
      <div className={styles.login}>
        <form onSubmit={handleSubmit(inRegisterMode ? this.register : this.login)}>
          <h1>StreetCode Messenger</h1>
          <p className={styles.getStarted}>
            Sign {inRegisterMode ? 'up' : 'in'} to get started.
          </p>
          {inRegisterMode && (
            <div className={styles.inputRow}>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
                required
              />
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
          )}
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
            required
          />
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            required
          />
          {inRegisterMode && (
            <Field
              name="confirm"
              component="input"
              type="password"
              placeholder="Confirm Password"
              required
            />
          )}
          <button disabled={submitting}>
            {inRegisterMode ? 'Sign Up' : 'Sign In'}
          </button>
          {
            inRegisterMode
              ? <p>Already have an account? <a href="#login">Sign in</a>.</p>
              : <p>Don’t have an account? <a href="#register">Sign up</a>.</p>
          }
        </form>
      </div>
    );
  }
}

export default compose(
  withRouter,
  reduxForm({ form: 'login' }),
  connect(null, { login: issueLogin, register: issueRegister })
)(Login);
