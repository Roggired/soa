import { takeLatest } from 'redux-saga/effects'
import { sagaTemplates } from '../../../../shared/api'
import {
    createPersonFailure,
    createPersonRequest,
    getPersonsFailure,
    getPersonsRequest,
} from '../actions'
import {
    CREATE_PERSON,
    CreatePersonAction,
    GET_PERSONS,
    GetPersonsAction,
} from '../actionTypes'
import { handleCreatePerson, handleGetPersons } from './workers/getAllLabs'

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

export function* watchCreatePerson() {
    yield takeLatest(
        CREATE_PERSON,
        sagaTemplates.withErrorHandlingAndLoading<CreatePersonAction>(
            handleCreatePerson,
            createPersonRequest,
            createPersonFailure,
        ),
    )
}
