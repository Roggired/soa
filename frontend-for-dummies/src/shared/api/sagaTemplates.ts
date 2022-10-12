import { Action } from 'redux'
import { put } from 'redux-saga/effects'
import { handleError } from './errorHandler'

export const withErrorHandlingAndLoading = <A>(
    saga: (action: A) => void,
    requestAction: () => Action,
    failureAction: (error: string | number) => Action,
    options?: {
        responseFailureCallback: (error: any) => void
    },
) =>
    function* (action: A) {
        try {
            yield put(requestAction())
            yield saga(action)
        } catch (error) {
            yield handleError(error, failureAction, options)
        }
    }
