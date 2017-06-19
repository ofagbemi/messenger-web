import keycode from 'keycode';
import { Map } from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';

import MessageModel from 'messenger/models/MessageModel';

import styles from './index.scss';


@reduxForm({ form: 'message-input' })
@connect(null, {
  createMessage: MessageModel.issueCreate.bind(MessageModel),
  queryMessages: MessageModel.issueQuery.bind(MessageModel),
})
export default class MessageInput extends React.PureComponent {
  submit = async payload => {
    const { body } = payload.toJS();
    if (!body || !body.trim()) return;

    const { thread } = this.props;
    await this.props.createMessage(
      Map({
        body,
        thread_id: thread.id,
      })
    ).meta.promise;

    this.props.change('body', '');

    // refresh message query
    this.props.queryMessages({ thread_id: thread.id });
  }

  handleKeyDown = e => {
    if (keycode(e.keyCode) === 'enter') {
      this.props.handleSubmit(this.submit)();
    }
  }

  render() {
    const { handleSubmit, className } = this.props;
    const classes = classNames(styles.messageInput, className);
    return (
      <form
        className={classes}
        onSubmit={handleSubmit(this.submit)}
      >
        <Field
          component="textarea"
          name="body"
          placeholder="Type a message..."
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}
