import { AppState } from '../../../app/store/reducers'

export const all = (state: AppState) => state.loading

export const isLoading = (type: string) => (state: AppState) =>
    all(state)[type] ?? null
