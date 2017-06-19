import classNames from 'classnames'
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';

import { userIdSelector } from 'auth/redux';
import { DAY_MS, WEEK_MS } from 'util/constants';

import styles from './index.scss';


const MessageGroup = ({ className, message, loggedInUserId }) => {
  const classes = classNames(
    className,
    styles.messageWrapper,
    { [styles.mine]: loggedInUserId === message.author_id }
  );

  const createdAt = new Date(message.created_at);
  const isDayOld = createdAt < Date.now() - DAY_MS;
  const isWeekOld = new Date(message.created_at) < Date.now() - WEEK_MS;
  return (
    <div className={classes}>
      <div className={classNames('caption', styles.date)}>
        <FormattedDate
          value={new Date(message.created_at)}
          weekday={isDayOld ? 'short' : undefined}
          day={isDayOld ? 'numeric' : undefined}
          hour="numeric"
          minute="numeric"
          month={isWeekOld ? 'short' : undefined}
          year={isWeekOld ? 'numeric' : undefined}
        />
      </div>
      <div className={styles.message}>
        {message.body}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    loggedInUserId: userIdSelector(state),
  })
)(MessageGroup);
