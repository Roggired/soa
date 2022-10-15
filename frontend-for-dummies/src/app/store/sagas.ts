import { all } from 'redux-saga/effects'
import { demographyModel } from '../../entities/demography'
import { personModel } from '../../entities/person'
import { statsModel } from '../../entities/stats'

export function* createRootSaga() {
    yield all([
        personModel.rootSaga(),
        statsModel.rootSaga(),
        demographyModel.rootSaga(),
    ])
}
