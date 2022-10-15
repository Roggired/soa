import { ErrorAction } from '../../../shared/lib/state'

export const GET_PERCENTAGE = '@@dem/GET_PERCENTAGE'
export const GET_PERCENTAGE_REQUEST = '@@dem/GET_PERCENTAGE_REQUEST'
export const GET_PERCENTAGE_SUCCESS = '@@dem/GET_PERCENTAGE_SUCCESS'
export const GET_PERCENTAGE_FAILURE = '@@dem/GET_PERCENTAGE_FAILURE'

export interface GetPercentageAction {
    type: typeof GET_PERCENTAGE
    payload: {
        readonly nationality: string
        readonly hairColor: string
    }
}

export interface GetPercentageRequestAction {
    type: typeof GET_PERCENTAGE_REQUEST
}

export interface GetPercentageSuccessAction {
    type: typeof GET_PERCENTAGE_SUCCESS
    payload: {
        readonly percentage: number
    }
}

export interface GetPercentageFailureAction extends ErrorAction {
    type: typeof GET_PERCENTAGE_FAILURE
}

// ==============================================================================

export const GET_AMOUNT = '@@dem/GET_AMOUNT'
export const GET_AMOUNT_REQUEST = '@@dem/GET_AMOUNT_REQUEST'
export const GET_AMOUNT_SUCCESS = '@@dem/GET_AMOUNT_SUCCESS'
export const GET_AMOUNT_FAILURE = '@@dem/GET_AMOUNT_FAILURE'

export interface GetAmountAction {
    type: typeof GET_AMOUNT
    payload: {
        readonly hairColor: string
    }
}

export interface GetAmountRequestAction {
    type: typeof GET_AMOUNT_REQUEST
}

export interface GetAmountSuccessAction {
    type: typeof GET_AMOUNT_SUCCESS
    payload: {
        readonly amount: string
    }
}

export interface GetAmountFailureAction extends ErrorAction {
    type: typeof GET_AMOUNT_FAILURE
}

// ==============================================================================

export type DemographyActions =
    | GetAmountAction
    | GetAmountRequestAction
    | GetAmountSuccessAction
    | GetAmountFailureAction
    | GetPercentageAction
    | GetPercentageRequestAction
    | GetPercentageSuccessAction
    | GetPercentageFailureAction
