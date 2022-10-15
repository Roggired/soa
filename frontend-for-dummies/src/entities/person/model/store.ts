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
        default:
            return state
    }
}
