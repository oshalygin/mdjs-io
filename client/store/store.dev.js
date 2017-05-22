import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant(),
      createLogger({
        collapsed: true
      })
    ))
  );
}

