import ThreadListItem from './Thread';


const Thread = ({ threads }) => (
  <div>
    {threads.map(thread =>
      <ThreadListItem key={thread.id} thread={thread} />
    )}
  </div>
);

export default Thread;
