import React, { PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';

import Categories from './categories';
import CategoryDetail from './categoryDetail';

export const CategoryRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Categories} />
        <Route path={`${path}/:id`} component={CategoryDetail} />
        <Route exact path={`${path}/new`} component={CategoryDetail} />
      </Switch>
    </div>
  );
};

CategoryRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CategoryRouter;
