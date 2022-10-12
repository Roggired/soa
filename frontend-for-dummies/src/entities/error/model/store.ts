import { CLEAR_ERRORS, ErrorStateActions } from './actionTypes'

export interface ErrorState {
    readonly [key: string]: null | string | number
}

const getErrorMatches = (actionType: string) =>
    /(.*)_(REQUEST|FAILURE|CLEAR_ERRORS)/.exec(actionType)

export const reducer = (
    state: ErrorState = {},
    action: ErrorStateActions,
): ErrorState => {
    const matches = getErrorMatches(action.type)
    if (!matches) return state

    switch (action.type) {
        case CLEAR_ERRORS:
            return {}
        default:
            const [, requestName, requestStatus] = matches
            return {
                ...state,
                [requestName]:
                    requestStatus === 'FAILURE' ? action.payload.error : null,
            }
    }
}
