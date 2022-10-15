import { ErrorAction } from '../../../shared/lib/state'
import { Person } from '../lib'
import { FilterClaim } from './store'

export const CREATE_PERSON = '@@persons/CREATE_PERSON'
export const CREATE_PERSON_REQUEST = '@@persons/CREATE_PERSON_REQUEST'
export const CREATE_PERSON_SUCCESS = '@@persons/CREATE_PERSON_SUCCESS'
export const CREATE_PERSON_FAILURE = '@@persons/CREATE_PERSON_FAILURE'

export interface CreatePersonAction {
    type: typeof CREATE_PERSON
    payload: {
        readonly person: Person
        readonly history: any
    }
}

export interface CreatePersonRequestAction {
    type: typeof CREATE_PERSON_REQUEST
}

export interface CreatePersonSuccessAction {
    type: typeof CREATE_PERSON_SUCCESS
}

export interface CreatePersonFailureAction extends ErrorAction {
    type: typeof CREATE_PERSON_FAILURE
}

// ==============================================================================

export const DELETE_PERSON = '@@persons/DELETE_PERSON'
export const DELETE_PERSON_REQUEST = '@@persons/DELETE_PERSON_REQUEST'
export const DELETE_PERSON_SUCCESS = '@@persons/DELETE_PERSON_SUCCESS'
export const DELETE_PERSON_FAILURE = '@@persons/DELETE_PERSON_FAILURE'

export interface DeletePersonAction {
    type: typeof DELETE_PERSON
    payload: {
        readonly id: number
        readonly history: any
    }
}

export interface DeletePersonRequestAction {
    type: typeof DELETE_PERSON_REQUEST
}

export interface DeletePersonSuccessAction {
    type: typeof DELETE_PERSON_SUCCESS
}

export interface DeletePersonFailureAction extends ErrorAction {
    type: typeof DELETE_PERSON_FAILURE
}

// ==============================================================================

export const GET_DEFINITE_PERSON = '@@persons/GET_DEFINITE_PERSON'
export const GET_DEFINITE_PERSON_REQUEST =
    '@@persons/GET_DEFINITE_PERSON_REQUEST'
export const GET_DEFINITE_PERSON_SUCCESS =
    '@@persons/GET_DEFINITE_PERSON_SUCCESS'
export const GET_DEFINITE_PERSON_FAILURE =
    '@@persons/GET_DEFINITE_PERSON_FAILURE'

export interface GetDefinitePersonAction {
    type: typeof GET_DEFINITE_PERSON
    payload: {
        readonly id: number
    }
}

export interface GetDefinitePersonRequestAction {
    type: typeof GET_DEFINITE_PERSON_REQUEST
}

export interface GetDefinitePersonSuccessAction {
    type: typeof GET_DEFINITE_PERSON_SUCCESS
    payload: {
        readonly person: Person
    }
}

export interface GetDefinitePersonFailureAction extends ErrorAction {
    type: typeof GET_DEFINITE_PERSON_FAILURE
}

// ==============================================================================

export const UPDATE_PERSON = '@@persons/UPDATE_PERSON'
export const UPDATE_PERSON_REQUEST = '@@persons/UPDATE_PERSON_REQUEST'
export const UPDATE_PERSON_SUCCESS = '@@persons/UPDATE_PERSON_SUCCESS'
export const UPDATE_PERSON_FAILURE = '@@persons/UPDATE_PERSON_FAILURE'

export interface UpdatePersonAction {
    type: typeof UPDATE_PERSON
    payload: {
        readonly person: Person
        readonly history: any
    }
}

export interface UpdatePersonRequestAction {
    type: typeof UPDATE_PERSON_REQUEST
}

export interface UpdatePersonSuccessAction {
    type: typeof UPDATE_PERSON_SUCCESS
}

export interface UpdatePersonFailureAction extends ErrorAction {
    type: typeof UPDATE_PERSON_FAILURE
}

// ==============================================================================

export const GET_PERSONS = '@@persons/GET_PERSONS'
export const GET_PERSONS_REQUEST = '@@persons/GET_PERSONS_REQUEST'
export const GET_PERSONS_SUCCESS = '@@persons/GET_PERSONS_SUCCESS'
export const GET_PERSONS_FAILURE = '@@persons/GET_PERSONS_FAILURE'

export interface GetPersonsAction {
    type: typeof GET_PERSONS
    payload: {
        readonly pageSize: number
        readonly pageIndex: number
    }
}

export interface GetPersonsRequestAction {
    type: typeof GET_PERSONS_REQUEST
}

export interface GetPersonsSuccessAction {
    type: typeof GET_PERSONS_SUCCESS
    payload: {
        readonly persons: Person[]
        readonly pageSize: number
        readonly pageIndex: number
        readonly elementsTotal: number
        readonly pagesTotal: number
    }
}

export interface GetPersonsFailureAction extends ErrorAction {
    type: typeof GET_PERSONS_FAILURE
}

// ==============================================================================

export const CREATE_CLAIM = '@@persons/CREATE_CLAIM'

export interface CreateClaimAction {
    type: typeof CREATE_CLAIM
    payload: {
        filterClaim: FilterClaim
    }
}

export const DELETE_CLAIM = 'DELETE_CLAIM'

export interface DeleteClaimAction {
    type: typeof DELETE_CLAIM
    payload: {
        filterClaim: FilterClaim
    }
}

// ==============================================================================

export type PersonActions =
    | CreatePersonAction
    | CreatePersonSuccessAction
    | CreatePersonRequestAction
    | CreatePersonFailureAction
    | DeletePersonAction
    | DeletePersonSuccessAction
    | DeletePersonRequestAction
    | DeletePersonFailureAction
    | GetDefinitePersonAction
    | GetDefinitePersonRequestAction
    | GetDefinitePersonSuccessAction
    | GetDefinitePersonFailureAction
    | UpdatePersonAction
    | UpdatePersonRequestAction
    | UpdatePersonSuccessAction
    | UpdatePersonFailureAction
    | GetPersonsAction
    | GetPersonsRequestAction
    | GetPersonsSuccessAction
    | GetPersonsFailureAction
    | CreateClaimAction
    | DeleteClaimAction
