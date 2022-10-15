import { all, fork } from 'redux-saga/effects'
import { watchCreatePerson, watchGetPersons } from './watchers'

export function* rootSaga() {
    yield all([fork(watchGetPersons), fork(watchCreatePerson)])
}
