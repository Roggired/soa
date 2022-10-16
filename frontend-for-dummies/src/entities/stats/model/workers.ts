import { AxiosResponse } from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../shared/api'
import { Person } from '../../person/lib'
import {
    getMeanHeightSuccess,
    getUnderHeight,
    getUnderHeightSuccess,
    selectPersonsSuccess,
} from './actions'
import {
    GetMeanHeightAction,
    GetUnderHeightAction,
    SelectPersonsAction,
} from './actionTypes'

const parser = new XMLParser()

export function* handleSelectPersons(action: SelectPersonsAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons/statistics/name/select?namePrefix=${action.payload.namePrefix}`,
        method: 'POST',
    })

    console.log(parser.parse(response.data))
    const res = parser.parse(response.data).ResponseListPerson

    let persons: Person[]
    if ('payload' in res) {
        if (Array.isArray(res.payload)) {
            persons = res.payload as Person[]
        } else {
            persons = [res.payload as Person]
        }
    } else {
        persons = []
    }
    yield put(selectPersonsSuccess(persons))
}

export function* handleGetMeanHeight(action: GetMeanHeightAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: '/persons/statistics/height/mean',
        method: 'POST',
    })

    const res = parser.parse(response.data)
    yield put(getMeanHeightSuccess(res.ResponseDouble.payload))
}

export function* handleGetUnderHeight(action: GetUnderHeightAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons/statistics/height/under/amount?targetHeight=${action.payload.targetHeight}`,
        method: 'POST',
    })

    const res = parser.parse(response.data)
    yield put(getUnderHeightSuccess(res.ResponseInteger.payload))
}
