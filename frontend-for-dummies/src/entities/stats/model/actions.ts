import {
    createActionWithNoArgs,
    createActionWithSingleArg,
    createFailureAction,
} from '../../../shared/lib/state/actionCreators'
import { Person } from '../../person/lib'
import {
    GET_MEAN_HEIGHT,
    GET_UNDER_HEIGHT,
    SELECT_PERSONS,
    SelectPersonsAction,
    SELECT_PERSONS_REQUEST,
    SelectPersonsRequestAction,
    SELECT_PERSONS_SUCCESS,
    SelectPersonsFailureAction,
    SelectPersonsSuccessAction,
    SELECT_PERSONS_FAILURE,
    StatsActions,
    GET_MEAN_HEIGHT_SUCCESS,
    GetMeanHeightSuccessAction,
    GetUnderHeightSuccessAction,
    GET_UNDER_HEIGHT_SUCCESS,
    GetMeanHeightFailureAction,
    GetMeanHeightRequestAction,
    GetUnderHeightAction,
    GetUnderHeightFailureAction,
    GetUnderHeightRequestAction,
    GetMeanHeightAction,
    GET_UNDER_HEIGHT_REQUEST,
    GET_UNDER_HEIGHT_FAILURE,
    GET_MEAN_HEIGHT_REQUEST,
    GET_MEAN_HEIGHT_FAILURE,
} from './actionTypes'

export const selectPersons = createActionWithSingleArg<
    SelectPersonsAction,
    string
>(SELECT_PERSONS, 'namePrefix')

export const selectPersonsRequest =
    createActionWithNoArgs<SelectPersonsRequestAction>(SELECT_PERSONS_REQUEST)

export const selectPersonsSuccess = createActionWithSingleArg<
    SelectPersonsSuccessAction,
    Person[]
>(SELECT_PERSONS_SUCCESS, 'persons')

export const selectPersonsFailure =
    createFailureAction<SelectPersonsFailureAction>(SELECT_PERSONS_FAILURE)

// =============================================================================

export const getMeanHeight =
    createActionWithNoArgs<GetMeanHeightAction>(GET_MEAN_HEIGHT)

export const getMeanHeightRequest =
    createActionWithNoArgs<GetMeanHeightRequestAction>(GET_MEAN_HEIGHT_REQUEST)

export const getMeanHeightSuccess = createActionWithSingleArg<
    GetMeanHeightSuccessAction,
    number
>(GET_MEAN_HEIGHT_SUCCESS, 'meanHeight')

export const getMeanHeightFailure =
    createFailureAction<GetMeanHeightFailureAction>(GET_MEAN_HEIGHT_FAILURE)

// =============================================================================

export const getUnderHeight = createActionWithSingleArg<
    GetUnderHeightAction,
    number
>(GET_UNDER_HEIGHT, 'targetHeight')

export const getUnderHeightRequest =
    createActionWithNoArgs<GetUnderHeightRequestAction>(
        GET_UNDER_HEIGHT_REQUEST,
    )

export const getUnderHeightSuccess = createActionWithSingleArg<
    GetUnderHeightSuccessAction,
    number
>(GET_UNDER_HEIGHT_SUCCESS, 'underHeightAmount')

export const getUnderHeightFailure =
    createFailureAction<GetUnderHeightFailureAction>(GET_UNDER_HEIGHT_FAILURE)

// =============================================================================
