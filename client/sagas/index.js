import { fork, all } from 'redux-saga/effects';

// import auth from './authSagas';
import categories from './categorySagas';

const sagas = [
  // ...auth,
  ...categories
];

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
