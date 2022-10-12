import { AxiosResponse } from 'axios'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '@shared/api'
import { getAllLabsSuccess } from '@entities/lab/model/actions'

export function* handleGetAllLabs() {
    const response: AxiosResponse = yield call(apiCaller, {
        method: 'GET',
        route: '/labs',
        addAccessToken: true,
    })

    yield put(getAllLabsSuccess(response.data))
}
