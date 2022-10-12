import { Person } from '../lib'
import {
    CREATE_PERSON_SUCCESS,
    GET_PERSONS_SUCCESS,
    PersonActions,
} from './actionTypes'

export interface PersonsState {
    persons: Person[]
    currentPage: number
    pageSize: number
    elementsSize: number | null
    pagesTotal: number | null
}

export const initialState: PersonsState = {
    persons: [],
    currentPage: 0,
    pageSize: 10,
    elementsSize: null,
    pagesTotal: null,
}

export const reducer = (
    state: PersonsState = initialState,
    action: PersonActions,
): PersonsState => {
    switch (action.type) {
        case GET_PERSONS_SUCCESS:
            return {
                ...state,
                persons: [...state.persons, ...action.payload.persons],
                currentPage: action.payload.pageIndex,
                pageSize: action.payload.persons.length,
                elementsSize: action.payload.elementsTotal,
                pagesTotal: action.payload.pagesTotal,
            }
        default:
            return state
    }
}
