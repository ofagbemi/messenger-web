import { compose } from 'ramda';
import classNames from 'classnames';

import connectModel from 'networking/connectModel';
import ThreadModel from 'messenger/models/ThreadModel';

import Header from './Header';
import ThreadList from './ThreadList';
import styles from './index.scss';


const ThreadsPanel = ({ className, threads }) => (
  <div className={classNames(className, styles.threadsPanel)}>
    <Header />
    <ThreadList threads={threads} />
  </div>
);

export default compose(
  connectModel({
    threads: {
      type: 'query',
      model: ThreadModel,
    },
  })
)(ThreadsPanel);
