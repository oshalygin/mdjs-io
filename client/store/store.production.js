import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunkMiddleware, sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
