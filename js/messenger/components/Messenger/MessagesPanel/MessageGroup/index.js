import Message from './Message';
import styles from './index.scss';

const MessageGroup = ({ messages }) => {
  return (
    <div className={styles.messageGroup}>
      {messages.map(message => <Message message={message} />)}
    </div>
  );
};

export default MessageGroup;
