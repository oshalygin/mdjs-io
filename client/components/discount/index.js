import React, { PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';

import Discounts from './discounts';
import DiscountDetail from './discountDetail';

export const DiscountRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Discounts} />
        <Route path={`${path}/:id`} component={DiscountDetail} />
        <Route exact path={`${path}/new`} component={DiscountDetail} />
      </Switch>
    </div>
  );
};

DiscountRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DiscountRouter;
