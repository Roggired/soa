import { all, fork } from 'redux-saga/effects'
import { watchGetPersons } from './watchers'

export function* rootSaga() {
    yield all([fork(watchGetPersons)])
}
