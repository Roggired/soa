import { AxiosResponse } from 'axios'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { getPersonsSuccess } from '../../actions'
import { GetPersonsAction } from '../../actionTypes'

export function* handleGetPersons(action: GetPersonsAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons?pageSize=${action.payload.pageSize}&pageIndex=${action.payload.pageIndex}`,
        method: 'GET',
    })

    console.log(response.data)
    yield put(getPersonsSuccess([], 0, 0, 0, 0))
}
