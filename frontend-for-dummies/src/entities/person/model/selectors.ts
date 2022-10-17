import { AppState } from '../../../app/store/reducers'

export const all = (state: AppState) => state.person

export const persons = (state: AppState) => all(state).persons

export const filters = (state: AppState) => all(state).filterClaims
