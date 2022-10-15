import {
    createActionWithDoubleArgs,
    createActionWithNoArgs,
    createActionWithSingleArg,
    createFailureAction,
} from '../../../shared/lib/state/actionCreators'
import { Person } from '../lib'
import {
    CREATE_PERSON,
    CREATE_PERSON_FAILURE,
    CREATE_PERSON_REQUEST,
    CREATE_PERSON_SUCCESS,
    CreatePersonAction,
    CreatePersonFailureAction,
    CreatePersonRequestAction,
    CreatePersonSuccessAction,
    DELETE_PERSON,
    DELETE_PERSON_FAILURE,
    DELETE_PERSON_REQUEST,
    DELETE_PERSON_SUCCESS,
    DeletePersonAction,
    DeletePersonFailureAction,
    DeletePersonRequestAction,
    DeletePersonSuccessAction,
    GET_DEFINITE_PERSON,
    GET_DEFINITE_PERSON_FAILURE,
    GET_DEFINITE_PERSON_REQUEST,
    GET_DEFINITE_PERSON_SUCCESS,
    GET_PERSONS,
    GET_PERSONS_FAILURE,
    GET_PERSONS_REQUEST,
    GET_PERSONS_SUCCESS,
    GetDefinitePersonAction,
    GetDefinitePersonFailureAction,
    GetDefinitePersonRequestAction,
    GetDefinitePersonSuccessAction,
    GetPersonsAction,
    GetPersonsFailureAction,
    GetPersonsRequestAction,
    GetPersonsSuccessAction,
    UPDATE_PERSON,
    UPDATE_PERSON_FAILURE,
    UPDATE_PERSON_REQUEST,
    UPDATE_PERSON_SUCCESS,
    UpdatePersonAction,
    UpdatePersonFailureAction,
    UpdatePersonRequestAction,
    UpdatePersonSuccessAction,
} from './actionTypes'

export const createPerson = createActionWithDoubleArgs<
    CreatePersonAction,
    Person,
    any
>(CREATE_PERSON, 'person', 'history')

export const createPersonRequest =
    createActionWithNoArgs<CreatePersonRequestAction>(CREATE_PERSON_REQUEST)

export const createPersonSuccess =
    createActionWithNoArgs<CreatePersonSuccessAction>(CREATE_PERSON_SUCCESS)

export const createPersonFailure =
    createFailureAction<CreatePersonFailureAction>(CREATE_PERSON_FAILURE)

// =============================================================================

export const deletePerson = createActionWithDoubleArgs<
    DeletePersonAction,
    number,
    any
>(DELETE_PERSON, 'id', 'history')

export const deletePersonRequest =
    createActionWithNoArgs<DeletePersonRequestAction>(DELETE_PERSON_REQUEST)

export const deletePersonSuccess =
    createActionWithNoArgs<DeletePersonSuccessAction>(DELETE_PERSON_SUCCESS)

export const deletePersonFailure =
    createFailureAction<DeletePersonFailureAction>(DELETE_PERSON_FAILURE)

// =============================================================================

export const updatePerson = createActionWithDoubleArgs<
    UpdatePersonAction,
    Person,
    any
>(UPDATE_PERSON, 'person', 'history')

export const updatePersonRequest =
    createActionWithNoArgs<UpdatePersonRequestAction>(UPDATE_PERSON_REQUEST)

export const updatePersonSuccess =
    createActionWithNoArgs<UpdatePersonSuccessAction>(UPDATE_PERSON_SUCCESS)

export const updatePersonFailure =
    createFailureAction<UpdatePersonFailureAction>(UPDATE_PERSON_FAILURE)

// =============================================================================

export const getDefinitePerson = createActionWithSingleArg<
    GetDefinitePersonAction,
    number
>(GET_DEFINITE_PERSON, 'number')

export const getDefinitePersonRequest =
    createActionWithNoArgs<GetDefinitePersonRequestAction>(
        GET_DEFINITE_PERSON_REQUEST,
    )

export const getDefinitePersonSuccess = createActionWithSingleArg<
    GetDefinitePersonSuccessAction,
    Person
>(GET_DEFINITE_PERSON_SUCCESS, 'person')

export const getDefinitePersonFailure =
    createFailureAction<GetDefinitePersonFailureAction>(
        GET_DEFINITE_PERSON_FAILURE,
    )

// =============================================================================

export const getPersons = createActionWithDoubleArgs<GetPersonsAction, number>(
    GET_PERSONS,
    'pageSize',
    'pageIndex',
)

export const getPersonsRequest =
    createActionWithNoArgs<GetPersonsRequestAction>(GET_PERSONS_REQUEST)

export const getPersonsSuccess = (
    persons: Person[],
    pageSize: number,
    pageIndex: number,
    elementsTotal: number,
    pagesTotal: number,
): GetPersonsSuccessAction => ({
    type: GET_PERSONS_SUCCESS,
    payload: {
        pageIndex,
        pageSize,
        pagesTotal,
        elementsTotal,
        persons,
    },
})

export const getPersonsFailure =
    createFailureAction<GetPersonsFailureAction>(GET_PERSONS_FAILURE)

// =============================================================================
