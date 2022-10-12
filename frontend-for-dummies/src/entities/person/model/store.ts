import { Lab } from '@entities/lab/lib/interfaces'
import {
    GET_ALL_LABS_SUCCESS,
    GET_LAB_MD_SUCCESS,
    LabActions,
} from '@entities/lab/model/actionTypes'

export interface LabState {
    labs: Lab[]
}

export const initialState: LabState = {
    labs: [],
}

export const reducer = (
    state: LabState = initialState,
    action: LabActions,
): LabState => {
    switch (action.type) {
        case GET_ALL_LABS_SUCCESS:
            return {
                ...state,
                labs: action.payload.labs.map(
                    (lab) =>
                        <Lab>{
                            ...lab,
                            text: null,
                        },
                ),
            }
        case GET_LAB_MD_SUCCESS:
            return {
                ...state,
                labs: state.labs.map((lab) => {
                    if (lab.id === action.payload.id) {
                        return <Lab>{
                            ...lab,
                            text: action.payload.text,
                        }
                    } else {
                        return lab
                    }
                }),
            }
        default:
            return state
    }
}
