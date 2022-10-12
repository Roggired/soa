import { all } from 'redux-saga/effects'

export function* createRootSaga() {
    yield all([adminModel.rootSaga()])
}
