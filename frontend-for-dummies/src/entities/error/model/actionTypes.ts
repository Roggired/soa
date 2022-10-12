import { ErrorAction } from '../../../shared/lib/state'

export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export interface ClearErrorsAction {
    type: typeof CLEAR_ERRORS
    payload: {
        error: never
    }
}

export type ErrorStateActions = ClearErrorsAction | ErrorAction
