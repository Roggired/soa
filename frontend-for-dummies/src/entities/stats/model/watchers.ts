import { all, fork, takeLatest } from 'redux-saga/effects'
import { sagaTemplates } from '../../../shared/api'
import {
    getMeanHeight,
    getMeanHeightFailure,
    getMeanHeightRequest,
    getUnderHeight,
    getUnderHeightFailure,
    getUnderHeightRequest,
    selectPersonsFailure,
    selectPersonsRequest,
} from './actions'
import {
    GET_MEAN_HEIGHT,
    GET_UNDER_HEIGHT,
    GetMeanHeightAction,
    GetUnderHeightAction,
    SELECT_PERSONS,
    SelectPersonsAction,
} from './actionTypes'
import {
    handleGetMeanHeight,
    handleGetUnderHeight,
    handleSelectPersons,
} from './workers'

export function* rootSaga() {
    yield all([
        fork(watchGetMeanHeight),
        fork(watchGetUnderHeight),
        fork(watchSelectPersons),
    ])
}

export function* watchGetUnderHeight() {
    yield takeLatest(
        GET_UNDER_HEIGHT,
        sagaTemplates.withErrorHandlingAndLoading<GetUnderHeightAction>(
            handleGetUnderHeight,
            getUnderHeightRequest,
            getUnderHeightFailure,
        ),
    )
}

export function* watchGetMeanHeight() {
    yield takeLatest(
        GET_MEAN_HEIGHT,
        sagaTemplates.withErrorHandlingAndLoading<GetMeanHeightAction>(
            handleGetMeanHeight,
            getMeanHeightRequest,
            getMeanHeightFailure,
        ),
    )
}

export function* watchSelectPersons() {
    yield takeLatest(
        SELECT_PERSONS,
        sagaTemplates.withErrorHandlingAndLoading<SelectPersonsAction>(
            handleSelectPersons,
            selectPersonsRequest,
            selectPersonsFailure,
        ),
    )
}
