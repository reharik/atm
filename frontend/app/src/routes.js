import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/AppContainer';
import DepositContainer from './containers/DepositContainer';
import WithdrawalContainer from './containers/WithdrawalContainer';
import SelectActionContainer from './containers/SelectActionContainer';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute path="/home" />
    <Route path="/home" component={SelectActionContainer} />
    <Route path="/deposit/:id" component={DepositContainer} />
    <Route path="withdrawal/:id" component={WithdrawalContainer} />
  </Route>
);

export default routes;
