import { AppState } from '../../../app/store/reducers'

export const all = (state: AppState) => state.error

export const error = (type: string) => (state: AppState) =>
    all(state)[type] ?? null
