import { takeLatest } from 'redux-saga/effects'
import { sagaTemplates } from '../../../../shared/api'
import {
    createPersonFailure,
    createPersonRequest,
    deletePersonFailure,
    deletePersonRequest,
    getPersonsFailure,
    getPersonsRequest,
    updatePersonFailure,
    updatePersonRequest,
} from '../actions'
import {
    CREATE_PERSON,
    CreatePersonAction,
    DELETE_PERSON,
    DeletePersonAction,
    GET_PERSONS,
    GetPersonsAction,
    UPDATE_PERSON,
    UpdatePersonAction,
} from '../actionTypes'
import { handleCreatePerson } from './workers/createPerson'
import { handleDeletePerson } from './workers/deletePerson'
import { handleGetPersons } from './workers/getPersons'
import { handleUpdatePerson } from './workers/updatePerson'

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

export function* watchUpdatePerson() {
    yield takeLatest(
        UPDATE_PERSON,
        sagaTemplates.withErrorHandlingAndLoading<UpdatePersonAction>(
            handleUpdatePerson,
            updatePersonRequest,
            updatePersonFailure,
        ),
    )
}

export function* watchDeletePerson() {
    yield takeLatest(
        DELETE_PERSON,
        sagaTemplates.withErrorHandlingAndLoading<DeletePersonAction>(
            handleDeletePerson,
            deletePersonRequest,
            deletePersonFailure,
        ),
    )
}
