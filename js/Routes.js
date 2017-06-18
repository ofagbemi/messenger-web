import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Messenger from './messenger/components/Messenger';


const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={Messenger} />
    </Switch>
  </Router>
);

export default Routes;
