import { all, fork } from 'redux-saga/effects'
import {
    watchCreatePerson,
    watchDeletePerson,
    watchGetPersons,
    watchUpdatePerson,
} from './watchers'

export function* rootSaga() {
    yield all([
        fork(watchGetPersons),
        fork(watchCreatePerson),
        fork(watchDeletePerson),
        fork(watchUpdatePerson),
    ])
}
