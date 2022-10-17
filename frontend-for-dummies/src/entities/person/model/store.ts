import { Color, Person } from '../lib'
import {
    CREATE_CLAIM,
    DELETE_CLAIM,
    GET_PERSONS_SUCCESS,
    PersonActions,
} from './actionTypes'
import { SET_CURRENT_PAGE } from './actions'

export interface FilterClaim {
    readonly property: string
    readonly filter: string | Color | number | null
    readonly sort: 'ASC' | 'DES' | 'NO'
}

export interface PersonsState {
    persons: Person[]
    currentPage: number
    pageSize: number
    elementsSize: number | null
    pagesTotal: number | null
    filterClaims: FilterClaim[]
}

const INITIAL_PAGE_NUMBER = 0
const PAGE_SIZE = 0

export const initialState: PersonsState = {
    persons: [],
    currentPage: INITIAL_PAGE_NUMBER,
    pageSize: PAGE_SIZE,
    elementsSize: null,
    pagesTotal: null,
    filterClaims: [],
}

export const reducer = (
    state: PersonsState = initialState,
    action: PersonActions,
): PersonsState => {
    switch (action.type) {
        case GET_PERSONS_SUCCESS:
            return {
                ...state,
                persons: [...action.payload.persons],
                currentPage: action.payload.pageIndex,
                pageSize: action.payload.pageSize,
                elementsSize: action.payload.elementsTotal,
                pagesTotal: action.payload.pagesTotal,
            }
        case CREATE_CLAIM:
            return {
                ...state,
                currentPage: 0,
                filterClaims: [
                    ...state.filterClaims,
                    action.payload.filterClaim,
                ],
            }
        case DELETE_CLAIM:
            return {
                ...state,
                currentPage: INITIAL_PAGE_NUMBER,
                filterClaims: state.filterClaims.filter(
                    (claim) =>
                        claim.property !== action.payload.filterClaim.property,
                ),
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page,
            }
        default:
            return state
    }
}
