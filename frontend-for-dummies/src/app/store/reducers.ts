import { combineReducers } from 'redux'
import { errorModel } from '../../entities/error'
import { loadingModel } from '../../entities/loading'
import { personModel } from '../../entities/person'

export const rootReducer = combineReducers({
    person: personModel.reducer,
    loading: loadingModel.reducer,
    error: errorModel.reducer,
})

export type AppState = ReturnType<typeof rootReducer>
