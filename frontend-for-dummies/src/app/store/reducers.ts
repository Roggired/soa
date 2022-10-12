import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    admin: adminModel.reducer,
})

export type AppState = ReturnType<typeof rootReducer>
