import { Person } from '../../person/lib'
import {
    CLEAR_ALL_STATS_STATE,
    GET_MEAN_HEIGHT_SUCCESS,
    GET_UNDER_HEIGHT_SUCCESS,
    SELECT_PERSONS_SUCCESS,
    StatsActions,
} from './actionTypes'

export interface StatsState {
    readonly persons: Person[]
    readonly meanHeight: number | null
    readonly underHeightAmount: number | null
}

export const initialState: StatsState = {
    persons: [],
    meanHeight: null,
    underHeightAmount: null,
}

export const reducer = (
    state: StatsState = initialState,
    action: StatsActions,
): StatsState => {
    switch (action.type) {
        case GET_UNDER_HEIGHT_SUCCESS:
            return {
                ...state,
                underHeightAmount: action.payload.underHeightAmount,
            }
        case GET_MEAN_HEIGHT_SUCCESS:
            return {
                ...state,
                meanHeight: action.payload.meanHeight,
            }
        case SELECT_PERSONS_SUCCESS:
            return {
                ...state,
                persons: action.payload.persons,
            }
        case CLEAR_ALL_STATS_STATE:
            return initialState
        default:
            return state
    }
}
