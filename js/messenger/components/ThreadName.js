import { compose } from 'ramda';
import { connect } from 'react-redux';

import { userIdSelector } from 'auth/redux';
import UserModel from 'auth/models/UserModel';
import connectModel from 'networking/connectModel';


const ThreadName = ({ thread, members, loggedInUserId }) => {
  const displayNames = members
    .sort(m => (m.id === loggedInUserId ? 1 : 0))
    .map(m => m.displayName)
    .join(', ');
  return (
    <span>
      {thread.name || displayNames}
    </span>
  );
};

export default compose(
  connect(state => ({ loggedInUserId: userIdSelector(state) })),
  connectModel({
    members: {
      model: UserModel,
      type: 'query',
      getParams(state, props) {
        return {
          ids: props.thread.members.map(m => m.id).toJS(),
        };
      },
    },
  })
)(ThreadName);
