import {
    GET_ALL_LABS,
    GET_ALL_LABS_SUCCESS,
    GET_ALL_LABS_WITH_TEXT,
    GET_ALL_LABS_WITH_TEXT_FAILURE,
    GET_ALL_LABS_WITH_TEXT_REQUEST,
    GET_ALL_LABS_WITH_TEXT_SUCCESS,
    GET_LAB_MD,
    GET_LAB_MD_FAILURE,
    GET_LAB_MD_REQUEST,
    GET_LAB_MD_SUCCESS,
    GetAllLabsAction,
    GetAllLabsSuccessAction,
    GetAllLabsWithTextAction,
    GetAllLabsWithTextFailureAction,
    GetAllLabsWithTextRequestAction,
    GetAllLabsWithTextSuccessAction,
    GetLabMDAction,
    GetLabMDFailureAction,
    GetLabMDRequestAction,
    GetLabMDSuccessAction,
} from '@entities/lab/model/actionTypes'
import {
    createActionWithDoubleArgs,
    createActionWithNoArgs,
    createActionWithSingleArg,
    createFailureAction,
} from '@shared/lib/state/actionCreators'
import { Lab } from '@entities/lab/lib'

export const getAllLabs = createActionWithNoArgs<GetAllLabsAction>(GET_ALL_LABS)

export const getAllLabsSuccess = createActionWithSingleArg<
    GetAllLabsSuccessAction,
    Lab[]
>(GET_ALL_LABS_SUCCESS, 'labs')

// =============================================================================

export const getLabMD = createActionWithSingleArg<GetLabMDAction, number>(
    GET_LAB_MD,
    'id',
)

export const getLabMDRequest =
    createActionWithNoArgs<GetLabMDRequestAction>(GET_LAB_MD_REQUEST)

export const getLabMDSuccess = createActionWithDoubleArgs<
    GetLabMDSuccessAction,
    number,
    string
>(GET_LAB_MD_SUCCESS, 'id', 'text')

export const getLabMDFailure =
    createFailureAction<GetLabMDFailureAction>(GET_LAB_MD_FAILURE)

// =============================================================================

export const getAllLabsWithText =
    createActionWithNoArgs<GetAllLabsWithTextAction>(GET_ALL_LABS_WITH_TEXT)

export const getAllLabsWithTextRequest =
    createActionWithNoArgs<GetAllLabsWithTextRequestAction>(
        GET_ALL_LABS_WITH_TEXT_REQUEST,
    )

export const getAllLabsWithTextSuccess =
    createActionWithNoArgs<GetAllLabsWithTextSuccessAction>(
        GET_ALL_LABS_WITH_TEXT_SUCCESS,
    )

export const getAllLabsWithTextFailure =
    createFailureAction<GetAllLabsWithTextFailureAction>(
        GET_ALL_LABS_WITH_TEXT_FAILURE,
    )

// =============================================================================
