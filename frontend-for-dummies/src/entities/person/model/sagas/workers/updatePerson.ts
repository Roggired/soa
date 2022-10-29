import {AxiosResponse} from 'axios'
import {XMLBuilder} from 'fast-xml-parser'
import {call, put} from 'redux-saga/effects'
import {apiCaller} from '../../../../../shared/api'
import {updatePersonSuccess} from '../../actions'
import {UpdatePersonAction} from '../../actionTypes'

const builder = new XMLBuilder({})

export function* handleUpdatePerson(action: UpdatePersonAction) {
    const data = {
        "Person": action.payload.person
    }

    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons/${action.payload.person.id}`,
        method: 'PUT',
        data: builder.build(data),
    })

    yield put(updatePersonSuccess())
    action.payload.onSuccess()
}
