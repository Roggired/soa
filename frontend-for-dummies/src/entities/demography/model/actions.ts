import {
    GetPercentageAction,
    GET_PERCENTAGE,
    GET_AMOUNT,
    GET_AMOUNT_SUCCESS,
    GET_AMOUNT_REQUEST,
    GET_PERCENTAGE_FAILURE,
    GET_PERCENTAGE_REQUEST,
    GetAmountAction,
    GetAmountFailureAction,
    GET_PERCENTAGE_SUCCESS,
    GetAmountRequestAction,
    GetAmountSuccessAction,
    GetPercentageFailureAction,
    GetPercentageRequestAction,
    GetPercentageSuccessAction,
    GET_AMOUNT_FAILURE,
    ClearDemographyPercentageState,
    CLEAR_DEMOGRAPHY_STATE,
    ClearAllDemographyState,
    CLEAR_DEMOGRAPHY_ALL_STATE,
} from './actionTypes'
import {
    createActionWithDoubleArgs,
    createActionWithNoArgs,
    createActionWithSingleArg,
    createFailureAction,
} from '../../../shared/lib/state/actionCreators'

export const getPercentage = createActionWithDoubleArgs<
    GetPercentageAction,
    string
>(GET_PERCENTAGE, 'nationality', 'hairColor')

export const getPercentageRequest =
    createActionWithNoArgs<GetPercentageRequestAction>(GET_PERCENTAGE_REQUEST)

export const getPercentageSuccess = createActionWithSingleArg<
    GetPercentageSuccessAction,
    number
>(GET_PERCENTAGE_SUCCESS, 'percentage')

export const getPercentageFailure =
    createFailureAction<GetPercentageFailureAction>(GET_PERCENTAGE_FAILURE)

// =============================================================================

export const getAmount = createActionWithSingleArg<GetAmountAction, string>(
    GET_AMOUNT,
    'hairColor',
)

export const getAmountRequest =
    createActionWithNoArgs<GetAmountRequestAction>(GET_AMOUNT_REQUEST)

export const getAmountSuccess = createActionWithSingleArg<
    GetAmountSuccessAction,
    number
>(GET_AMOUNT_SUCCESS, 'amount')

export const getAmountFailure =
    createFailureAction<GetAmountFailureAction>(GET_AMOUNT_FAILURE)

// =============================================================================

export const clearDemographyState =
    createActionWithNoArgs<ClearDemographyPercentageState>(
        CLEAR_DEMOGRAPHY_STATE,
    )

export const clearAllDemographyState =
    createActionWithNoArgs<ClearAllDemographyState>(CLEAR_DEMOGRAPHY_ALL_STATE)
