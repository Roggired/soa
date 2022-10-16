import { AxiosResponse } from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../shared/api'
import { getAmountSuccess, getPercentageSuccess } from './actions'
import { GetAmountAction, GetPercentageAction } from './actionTypes'

const parser = new XMLParser()

export function* handleGetPercentage(action: GetPercentageAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/demography/nationality/${action.payload.nationality}/percentage/${action.payload.hairColor}`,
        method: 'POST',
        service: 'DEMOGRAPHY',
    })

    const res = parser.parse(response.data)
    yield put(getPercentageSuccess(res.ResponseDouble.payload))
}

export function* handleGetAmount(action: GetAmountAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/demography/hair-color/${action.payload.hairColor}`,
        service: 'DEMOGRAPHY',
        method: 'POST',
    })

    const res = parser.parse(response.data)
    yield put(getAmountSuccess(res.ResponseInteger.payload))
}
