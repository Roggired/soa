import { all } from 'redux-saga/effects'
import { personModel } from '../../entities/person'

export function* createRootSaga() {
    yield all([personModel.rootSaga()])
}
