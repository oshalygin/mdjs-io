import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Taxes from './taxes';
import TaxDetail from './taxDetail';

export const TaxRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Taxes} />
        <Route path={`${path}/:id`} component={TaxDetail} />
        <Route exact path={`${path}/new`} component={TaxDetail} />
      </Switch>
    </div>
  );
};

TaxRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TaxRouter;
