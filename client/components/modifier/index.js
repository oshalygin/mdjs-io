import React, { PropTypes } from 'react';
import { Switch, Route } from 'react-router-dom';

import Modifiers from './modifiers';
import ModifierDetail from './modifierDetail';

export const ModifierRouter = ({ match }) => {
  const path = match.path;

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={Modifiers} />
        <Route path={`${path}/:id`} component={ModifierDetail} />
        <Route exact path={`${path}/new`} component={ModifierDetail} />
      </Switch>
    </div>
  );
};

ModifierRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ModifierRouter;
