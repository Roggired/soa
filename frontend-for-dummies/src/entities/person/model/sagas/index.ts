import { all, fork } from 'redux-saga/effects'
import { watchGetAllLabsWithText } from '@entities/lab/model/sagas/watchers'

export function* rootSaga() {
    yield all([fork(watchGetAllLabsWithText)])
}
