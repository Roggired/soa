import { ErrorAction } from '../../../shared/lib/state'
import { Person } from '../../person/lib'

export const SELECT_PERSONS = '@@stats/SELECT_PERSONS'
export const SELECT_PERSONS_REQUEST = '@@stats/SELECT_PERSONS_REQUEST'
export const SELECT_PERSONS_SUCCESS = '@@stats/SELECT_PERSONS_SUCCESS'
export const SELECT_PERSONS_FAILURE = '@@stats/SELECT_PERSONS_FAILURE'

export interface SelectPersonsAction {
    type: typeof SELECT_PERSONS
    payload: {
        readonly namePrefix: string
    }
}

export interface SelectPersonsRequestAction {
    type: typeof SELECT_PERSONS_REQUEST
}

export interface SelectPersonsSuccessAction {
    type: typeof SELECT_PERSONS_SUCCESS
    payload: {
        readonly persons: Person[]
    }
}

export interface SelectPersonsFailureAction extends ErrorAction {
    type: typeof SELECT_PERSONS_FAILURE
}

// ==============================================================================

export const GET_MEAN_HEIGHT = '@@stats/GET_MEAN_HEIGHT'
export const GET_MEAN_HEIGHT_REQUEST = '@@stats/GET_MEAN_HEIGHT_REQUEST'
export const GET_MEAN_HEIGHT_SUCCESS = '@@stats/GET_MEAN_HEIGHT_SUCCESS'
export const GET_MEAN_HEIGHT_FAILURE = '@@stats/GET_MEAN_HEIGHT_FAILURE'

export interface GetMeanHeightAction {
    type: typeof GET_MEAN_HEIGHT
}

export interface GetMeanHeightRequestAction {
    type: typeof GET_MEAN_HEIGHT_REQUEST
}

export interface GetMeanHeightSuccessAction {
    type: typeof GET_MEAN_HEIGHT_SUCCESS
    payload: {
        readonly meanHeight: number
    }
}

export interface GetMeanHeightFailureAction extends ErrorAction {
    type: typeof GET_MEAN_HEIGHT_FAILURE
}

// ==============================================================================

export const GET_UNDER_HEIGHT = '@@stats/GET_UNDER_HEIGHT'
export const GET_UNDER_HEIGHT_REQUEST = '@@stats/GET_UNDER_HEIGHT_REQUEST'
export const GET_UNDER_HEIGHT_SUCCESS = '@@stats/GET_UNDER_HEIGHT_SUCCESS'
export const GET_UNDER_HEIGHT_FAILURE = '@@stats/GET_UNDER_HEIGHT_FAILURE'

export interface GetUnderHeightAction {
    type: typeof GET_UNDER_HEIGHT
    payload: {
        readonly targetHeight: number
    }
}

export interface GetUnderHeightRequestAction {
    type: typeof GET_UNDER_HEIGHT_REQUEST
}

export interface GetUnderHeightSuccessAction {
    type: typeof GET_UNDER_HEIGHT_SUCCESS
    payload: {
        readonly underHeightAmount: number
    }
}

export interface GetUnderHeightFailureAction extends ErrorAction {
    type: typeof GET_UNDER_HEIGHT_FAILURE
}

// ==============================================================================

export const CLEAR_SELECTED_PERSONS_STATS_STATE = 'CLEAR_ALL_STATS_STATE'

export interface ClearSelectedPersonsState {
    type: typeof CLEAR_SELECTED_PERSONS_STATS_STATE
}

export const CLEAR_UNDER_HEIGHT_STATE = 'CLEAR_UNDER_HEIGHT_STATE'

export interface ClearUnderHeightState {
    type: typeof CLEAR_UNDER_HEIGHT_STATE
}

export type StatsActions =
    | SelectPersonsAction
    | SelectPersonsRequestAction
    | SelectPersonsSuccessAction
    | SelectPersonsFailureAction
    | GetMeanHeightAction
    | GetMeanHeightRequestAction
    | GetMeanHeightSuccessAction
    | GetMeanHeightFailureAction
    | GetUnderHeightAction
    | GetUnderHeightRequestAction
    | GetUnderHeightSuccessAction
    | GetUnderHeightFailureAction
    | ClearSelectedPersonsState
    | ClearUnderHeightState
