import React, { PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';

import Items from './Items.jsx';
import ItemDetail from './itemDetail';

export const ItemsRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Items} />
        <Route path={`${path}/:id`} component={ItemDetail} />
        <Route exact path={`${path}/new`} component={ItemDetail} />
      </Switch>
    </div>
  );
};

ItemsRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ItemsRouter;