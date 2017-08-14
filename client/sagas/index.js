import { fork, all } from 'redux-saga/effects';

import configuration from './configurationSagas';
import categories from './categorySagas';
import user from './userSagas';

const sagas = [...categories, ...configuration, ...user];

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
