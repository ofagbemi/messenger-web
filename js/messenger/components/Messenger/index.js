import requireLogin from 'auth/hoc/requireLogin';

import ThreadsPanel from './ThreadsPanel';
import MessagesPanel from './MessagesPanel';
import styles from './index.scss';

export default requireLogin(() => (
  <div className={styles.messenger}>
    <ThreadsPanel className={styles.threadsPanel} />
    <MessagesPanel className={styles.messagesPanel} />
  </div>
));
