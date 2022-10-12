import { GetLabMDAction } from '@entities/lab/model/actionTypes'
import { AxiosResponse } from 'axios'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '@shared/api'
import { getLabMDSuccess } from '@entities/lab/model/actions'

export function* handleGetLabMD(action: GetLabMDAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        method: 'GET',
        route: `/labs/text/${action.payload.id}`,
        addAccessToken: true,
        accept: 'text/plain',
    })

    yield put(getLabMDSuccess(action.payload.id, response.data))
}
