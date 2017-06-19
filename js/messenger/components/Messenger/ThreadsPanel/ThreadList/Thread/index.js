import { compose } from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import { userIdSelector } from 'auth/redux';
import connectModel from 'networking/connectModel';
import UserModel from 'auth/models/UserModel';
import MessageModel from 'messenger/models/MessageModel';
import ThreadName from 'messenger/components/ThreadName';

import styles from './index.scss';


const Thread = ({ thread, members, messages, loggedInUserId, match }) => {
  const displayMember = (
    members.find(member => member.id !== loggedInUserId) ||
    members.find(member => member.id === loggedInUserId)
  );
  const firstMessage = messages.first();

  const { params: { threadId } } = match;
  const classes = classNames(
    styles.thread,
    { [styles.active]: threadId === thread.id }
  );
  return (
    <NavLink to={`/${thread.id}`} className={classes}>
      <img
        role="presentation"
        alt={displayMember.displayName}
        className={styles.profile}
        src="/public/profile.jpg"
      />
      <div className={styles.body}>
        <h3>
          <ThreadName thread={thread} />
        </h3>
        <div className={classNames('caption', styles.preview)}>
          {firstMessage ? firstMessage.body : null}
        </div>
      </div>
    </NavLink>
  );
};

export default compose(
  withRouter,
  connect(state => ({ loggedInUserId: userIdSelector(state) })),
  connectModel({
    members: {
      type: 'query',
      model: UserModel,
      getParams: (state, props) => ({
        ids: props.thread.members.map(m => m.id).toJS(),
      }),
    },
    messages: {
      type: 'query',
      model: MessageModel,
      getParams: (state, props) => ({
        thread_id: props.thread.id,
      }),
    },
  })
)(Thread);
