import { CLEAR_ERRORS, ClearErrorsAction } from './actionTypes'
import { createActionWithNoArgs } from '../../../shared/lib/state/actionCreators'

export const clearErrors =
    createActionWithNoArgs<ClearErrorsAction>(CLEAR_ERRORS)
