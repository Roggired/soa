import { call, select } from 'redux-saga/effects'
import { handleGetAllLabs } from '@entities/lab/model/sagas/workers/getAllLabs'
import { Lab } from '@entities/lab/lib'
import { labModel } from '@entities/lab'
import { handleGetLabMD } from '@entities/lab/model/sagas/workers/getLabMD'
import { getLabMD } from '@entities/lab/model/actions'

export function* handleGetAllLabsWithText() {
    yield call(handleGetAllLabs)

    const labs: Lab[] = yield select(labModel.selectors.labs)
    for (const lab of labs) {
        yield call(handleGetLabMD, getLabMD(lab.id))
    }
}
