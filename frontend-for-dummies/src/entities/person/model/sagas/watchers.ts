import { takeLatest } from 'redux-saga/effects'
import { sagaTemplates } from '../../../../shared/api'
import { getPersonsFailure, getPersonsRequest } from '../actions'
import { GET_PERSONS, GetPersonsAction } from '../actionTypes'
import { handleGetPersons } from './workers/getAllLabs'

export function* watchGetPersons() {
    yield takeLatest(
        GET_PERSONS,
        sagaTemplates.withErrorHandlingAndLoading<GetPersonsAction>(
            handleGetPersons,
            getPersonsRequest,
            getPersonsFailure,
        ),
    )
}
