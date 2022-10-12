import { ErrorAction } from '@shared/lib/state'
import { Lab } from '@entities/lab/lib'

export const GET_ALL_LABS = 'GET_ALL_LABS'
export const GET_ALL_LABS_REQUEST = 'GET_ALL_LABS_REQUEST'
export const GET_ALL_LABS_SUCCESS = 'GET_ALL_LABS_SUCCESS'
export const GET_ALL_LABS_FAILURE = 'GET_ALL_LABS_FAILURE'

export interface GetAllLabsAction {
    type: typeof GET_ALL_LABS
}

export interface GetAllLabsSuccessAction {
    type: typeof GET_ALL_LABS_SUCCESS
    payload: {
        labs: Lab[]
    }
}

// ==============================================================================

export const GET_LAB_MD = 'GET_LAB_MD'
export const GET_LAB_MD_REQUEST = 'GET_LAB_MD_REQUEST'
export const GET_LAB_MD_SUCCESS = 'GET_LAB_MD_SUCCESS'
export const GET_LAB_MD_FAILURE = 'GET_LAB_MD_FAILURE'

export interface GetLabMDAction {
    type: typeof GET_LAB_MD
    payload: {
        id: number
    }
}

export interface GetLabMDRequestAction {
    type: typeof GET_LAB_MD_REQUEST
}

export interface GetLabMDSuccessAction {
    type: typeof GET_LAB_MD_SUCCESS
    payload: {
        id: number
        text: string
    }
}

export interface GetLabMDFailureAction extends ErrorAction {
    type: typeof GET_LAB_MD_FAILURE
}

// ==============================================================================

export const GET_ALL_LABS_WITH_TEXT = 'GET_ALL_LABS_WITH_TEXT'
export const GET_ALL_LABS_WITH_TEXT_REQUEST = 'GET_ALL_LABS_WITH_TEXT_REQUEST'
export const GET_ALL_LABS_WITH_TEXT_SUCCESS = 'GET_ALL_LABS_WITH_TEXT_SUCCESS'
export const GET_ALL_LABS_WITH_TEXT_FAILURE = 'GET_ALL_LABS_WITH_TEXT_FAILURE'

export interface GetAllLabsWithTextAction {
    type: typeof GET_ALL_LABS_WITH_TEXT
}

export interface GetAllLabsWithTextRequestAction {
    type: typeof GET_ALL_LABS_WITH_TEXT_REQUEST
}

export interface GetAllLabsWithTextSuccessAction {
    type: typeof GET_ALL_LABS_WITH_TEXT_SUCCESS
}

export interface GetAllLabsWithTextFailureAction extends ErrorAction {
    type: typeof GET_ALL_LABS_WITH_TEXT_FAILURE
}

// ==============================================================================

export type LabActions =
    | GetLabMDAction
    | GetLabMDSuccessAction
    | GetLabMDRequestAction
    | GetLabMDFailureAction
    | GetAllLabsAction
    | GetAllLabsSuccessAction
    | GetAllLabsWithTextAction
    | GetAllLabsWithTextFailureAction
    | GetAllLabsWithTextSuccessAction
    | GetAllLabsWithTextRequestAction
