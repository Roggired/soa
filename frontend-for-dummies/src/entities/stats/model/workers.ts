import { AxiosResponse } from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../shared/api'
import { getMeanHeightSuccess, selectPersonsSuccess } from './actions'
import {
    GetMeanHeightAction,
    GetUnderHeightAction,
    SelectPersonsAction,
} from './actionTypes'

const parser = new XMLParser()

export function* handleSelectPersons(action: SelectPersonsAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/statistics/name/select?namePrefix=${action.payload.namePrefix}`,
        method: 'POST',
    })

    console.log(parser.parse(response.data))
    // yield put(selectPersonsSuccess())
}

export function* handleGetMeanHeight(action: GetMeanHeightAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: '/statistics/height/mean',
        method: 'POST',
    })

    console.log(parser.parse(response.data))
    // yield put(getMeanHeightSuccess())
}

export function* handleGetUnderHeight(action: GetUnderHeightAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/statistics/height/under/amount?targetHeight=${action.payload.targetHeight}`,
        method: 'POST',
    })

    console.log(parser.parse(response.data))
    // yield put(getMeanHeightSuccess())
}
