import { all, fork, takeLatest } from 'redux-saga/effects'
import { sagaTemplates } from '../../../shared/api'
import { getPersonsFailure } from '../../person/model/actions'
import {
    watchCreatePerson,
    watchDeletePerson,
    watchGetPersons,
    watchUpdatePerson,
} from '../../person/model/sagas/watchers'
import {
    getAmountFailure,
    getAmountRequest,
    getPercentageRequest,
} from './actions'
import {
    GET_AMOUNT,
    GET_PERCENTAGE,
    GetAmountAction,
    GetPercentageAction,
} from './actionTypes'
import { handleGetAmount, handleGetPercentage } from './workers'

export function* watchGetPercentage() {
    yield takeLatest(
        GET_PERCENTAGE,
        sagaTemplates.withErrorHandlingAndLoading<GetPercentageAction>(
            handleGetPercentage,
            getPercentageRequest,
            getPersonsFailure,
        ),
    )
}

export function* watchGetAmount() {
    yield takeLatest(
        GET_AMOUNT,
        sagaTemplates.withErrorHandlingAndLoading<GetAmountAction>(
            handleGetAmount,
            getAmountRequest,
            getAmountFailure,
        ),
    )
}

export function* rootSaga() {
    yield all([fork(watchGetAmount), fork(watchGetPercentage)])
}
