import { fork, all } from 'redux-saga/effects';

import configuration from './configurationSagas';
import categories from './categorySagas';

const sagas = [...categories, ...configuration];

export default function* root() {
  yield all(sagas.map(saga => fork(saga)));
}
