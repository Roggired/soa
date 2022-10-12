import { AppState } from '@app/store/reducers'

export const all = (state: AppState) => state.labs

export const labs = (state: AppState) => all(state).labs
