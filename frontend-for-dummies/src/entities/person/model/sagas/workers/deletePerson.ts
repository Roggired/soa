import { AxiosResponse } from 'axios'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { successToast } from '../../../../../shared/lib/toasts'
import { deletePersonSuccess } from '../../actions'
import { DeletePersonAction } from '../../actionTypes'

export function* handleDeletePerson(action: DeletePersonAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons/${action.payload.id}`,
        method: 'DELETE',
    })

    yield put(deletePersonSuccess())
    action.payload.onSuccess()
}
