import { withRouter } from 'react-router';

import requireLogin from 'auth/hoc/requireLogin';
import connectModel from 'networking/connectModel';
import ThreadModel from 'messenger/models/ThreadModel';

import ThreadsPanel from './ThreadsPanel';
import MessagesPanel from './MessagesPanel';
import styles from './index.scss';


@withRouter
@requireLogin
@connectModel({
  threads: {
    model: ThreadModel,
    type: 'query',
  },
})
export default class Messenger extends React.PureComponent {
  componentWillMount() {
    const { threads, history, match: { params: { threadId } } } = this.props;

    if (threads.size && !threadId) {
      history.push(`/${threads.first().id}`);
    }
  }

  render() {
    const { threads, match: { params: { threadId } } } = this.props;
    const thread = threadId
      ? threads.find(t => t.id === threadId)
      : threads.first();
    return (
      <div className={styles.messenger}>
        <ThreadsPanel className={styles.threadsPanel} />
        <MessagesPanel className={styles.messagesPanel} thread={thread} />
      </div>
    );
  }
}
