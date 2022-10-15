import { Color, Person } from '../lib'
import {
    CREATE_CLAIM,
    DELETE_CLAIM,
    GET_PERSONS_SUCCESS,
    PersonActions,
} from './actionTypes'

export interface FilterClaim {
    readonly prop: string
    readonly filter: string | Color | number
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
                persons: [...oldPersons, ...action.payload.persons],
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
            return {
                ...state,
                filterClaims: state.filterClaims.filter(
                    (claim) =>
                        claim.filter === c.filter &&
                        claim.sort === c.sort &&
                        claim.prop === c.prop,
                ),
            }
        default:
            return state
    }
}
