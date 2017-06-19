import connectModel from 'networking/connectModel';
import UserModel from 'auth/models/UserModel';
import MessageModel from 'messenger/models/MessageModel';


const ThreadListItem = ({ thread, members }) => (
  <div>
    <h3>
      {members.map(member => member.fullName).join(', ')}
    </h3>
  </div>
);

export default connectModel({
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
})(ThreadListItem);
