import { takeLatest } from 'redux-saga/effects'
import {
    GET_ALL_LABS_WITH_TEXT,
    GetAllLabsAction,
} from '@entities/lab/model/actionTypes'
import { sagaTemplates } from '@shared/api'
import {
    getAllLabsWithTextFailure,
    getAllLabsWithTextRequest,
} from '@entities/lab/model/actions'
import { handleGetAllLabsWithText } from '@entities/lab/model/sagas/workers/getAllLabsWithText'

export function* watchGetAllLabsWithText() {
    yield takeLatest(
        GET_ALL_LABS_WITH_TEXT,
        sagaTemplates.withErrorHandlingAndLoading<GetAllLabsAction>(
            handleGetAllLabsWithText,
            getAllLabsWithTextRequest,
            getAllLabsWithTextFailure,
        ),
    )
}
