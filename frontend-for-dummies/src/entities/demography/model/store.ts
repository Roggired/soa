import {
    CLEAR_DEMOGRAPHY_ALL_STATE,
    CLEAR_DEMOGRAPHY_STATE,
    DemographyActions,
    GET_AMOUNT_SUCCESS,
    GET_PERCENTAGE_SUCCESS,
} from './actionTypes'

export interface DemographyState {
    readonly percentage: number | null
    readonly amount: number | null
}

export const initialState: DemographyState = {
    percentage: null,
    amount: null,
}

export const reducer = (
    state: DemographyState = initialState,
    action: DemographyActions,
): DemographyState => {
    switch (action.type) {
        case GET_PERCENTAGE_SUCCESS: {
            return {
                ...state,
                percentage: action.payload.percentage,
            }
        }
        case GET_AMOUNT_SUCCESS: {
            return {
                ...state,
                amount: action.payload.amount,
            }
        }
        case CLEAR_DEMOGRAPHY_STATE:
            return {
                ...state,
                percentage: initialState.percentage,
            }
        case CLEAR_DEMOGRAPHY_ALL_STATE:
            return initialState
        default:
            return state
    }
}
