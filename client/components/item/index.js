import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Items from './items';
import ItemDetail from './itemDetail';

export const ItemRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Items} />x
        <Route path={`${path}/:id`} component={ItemDetail} />
        <Route exact path={`${path}/new`} component={ItemDetail} />
      </Switch>
    </div>
  );
};

ItemRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ItemRouter;
