import { AxiosResponse } from 'axios'
import { XMLBuilder } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { createPersonSuccess } from '../../actions'
import { CreatePersonAction } from '../../actionTypes'

const builder = new XMLBuilder({})

export function* handleCreatePerson(action: CreatePersonAction) {
    const data = {
        "Person": action.payload.person
    }

    const response: AxiosResponse = yield call(apiCaller, {
        route: '/persons',
        method: 'POST',
        data: builder.build(data),
    })

    yield put(createPersonSuccess())
    action.payload.onSuccess()
}
