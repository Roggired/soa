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
            const newPersonToAddIds = newIds.filter(
                (id) => !oldIds.includes(id),
            )
            // console.log('newPersonToAddIds', newPersonToAddIds)
            const newPersonsToAdd = action.payload.persons.filter((person) =>
                newPersonToAddIds.includes(person.id),
            )
            console.log(newPersonsToAdd)

            return {
                ...state,
                persons: [...state.persons, ...newPersonsToAdd],
                currentPage: action.payload.pageIndex,
                pageSize: action.payload.persons.length,
                elementsSize: action.payload.elementsTotal,
                pagesTotal: action.payload.pagesTotal,
            }
        default:
            return state
    }
}
