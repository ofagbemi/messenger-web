import classNames from 'classnames';

import styles from './index.scss';


export default ({ className }) => (
  <div className={classNames(className, styles.messagesPanel)}>
    messages
  </div>
);
