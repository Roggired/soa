import { Action } from 'redux'
import { put } from 'redux-saga/effects'

export function* handleError(
    error: any,
    failureAction: (error: string | number) => Action,
    options?: {
        responseFailureCallback: (error: any) => void
    },
) {
    if (error.response) {
        // Request made and server responded
        // console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.response)

        yield options?.responseFailureCallback(error)
        yield put(failureAction(error.response.status))
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
        yield put(failureAction(error.request))
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Unexpected error', error.message)
        yield put(failureAction('Unexpected error'))
    }
}
