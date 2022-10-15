import { combineReducers } from 'redux'
import { demographyModel } from '../../entities/demography'
import { errorModel } from '../../entities/error'
import { loadingModel } from '../../entities/loading'
import { personModel } from '../../entities/person'
import { statsModel } from '../../entities/stats'

export const rootReducer = combineReducers({
    person: personModel.reducer,
    loading: loadingModel.reducer,
    error: errorModel.reducer,
    stats: statsModel.reducer,
    demography: demographyModel.reducer,
})

export type AppState = ReturnType<typeof rootReducer>
