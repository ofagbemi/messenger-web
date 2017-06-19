import { last } from 'ramda';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import ThreadName from 'messenger/components/ThreadName';
import connectModel from 'networking/connectModel';
import MessageModel from 'messenger/models/MessageModel';

import MessageGroup from './MessageGroup';
import MessageInput from './MessageInput';
import styles from './index.scss';


@withRouter
@connectModel({
  messages: {
    model: MessageModel,
    type: 'query',
    getParams: (state, props) => ({
      thread_id: props.thread.id,
    }),
  },
})
export default class MessagesPanel extends React.PureComponent {
  componentDidUpdate() {
    const { messagesRef } = this;
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight - messagesRef.clientHeight;
    }
  }

  storeMessagesRef = ref => {
    this.messagesRef = ref;
  }

  render() {
    const { className, messages, thread } = this.props;
    const groups = [];
    messages.reverse().forEach(message => {
      const group = last(groups);
      if (!group) {
        groups.push([message]);
        return;
      }

      const lastMessage = last(group);
      if (lastMessage.author_id === message.author_id) {
        group.push(message);
      } else {
        groups.push([message]);
      }
    });

    const classes = classNames(className, styles.messagesPanel);
    return (
      <div className={classes}>
        <header className="nav-header">
          <h2><ThreadName thread={thread} /></h2>
        </header>
        <div className={styles.messages} ref={this.storeMessagesRef}>
          {groups.map((group, index) =>
            <MessageGroup key={index} messages={group} />
          )}
        </div>
        <MessageInput thread={thread} />
      </div>
    );
  }
}
