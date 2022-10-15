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

export const initialState: PersonsState = {
    persons: [],
    currentPage: 0,
    pageSize: 3,
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
            const oldIds = state.persons.map((p) => p.id)
            // console.log('oldIds', oldIds)
            const newIds = action.payload.persons.map((p) => p.id)
            // console.log('newIds', newIds)
            const personsToDeleteIds = oldIds.filter((id) =>
                newIds.includes(id),
            )
            // console.log('personsToDelete', personsToDeleteIds)
            const oldPersons = state.persons.filter(
                (person) => !personsToDeleteIds.includes(person.id),
            )
            // console.log(oldPersons)

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
                filterClaims: [
                    ...state.filterClaims,
                    action.payload.filterClaim,
                ],
            }
        case DELETE_CLAIM:
            const c = action.payload.filterClaim
            console.log(c)
            return {
                ...state,
                filterClaims: state.filterClaims.filter(
                    (claim) => claim.property !== c.property,
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
