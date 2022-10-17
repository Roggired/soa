import { AxiosResponse } from 'axios'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { ROOT } from '../../../../../shared/lib/routing/routes'
import { successToast } from '../../../../../shared/lib/toasts'
import { Person } from '../../../lib'
import { updatePersonSuccess } from '../../actions'
import { UpdatePersonAction } from '../../actionTypes'

const createCreatePersonReq = (person: Person) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<Person>
\t<id>${person.id}</id>
\t<name>${person.name}</name>
\t<coordinates>
\t\t<x>${person.coordinates.x}</x>
\t\t<y>${person.coordinates.y}</y>
\t</coordinates>
\t<creationDate>${person.creationDate.toISOString()}</creationDate>
\t<height>${person.height}</height>
\t<birthday>${person.birthday.toISOString()}</birthday>
\t<eyeColor>${person.eyeColor}</eyeColor>
\t<hairColor>${person.hairColor}</hairColor>
\t<location>
\t\t<x>${person.location.x}</x>
\t\t<y>${person.location.y}</y>
\t\t<z>${person.location.z}</z>
\t\t<name>${person.location.name}</name>
\t</location>
\t<nationality>${person.nationality}</nationality>
</Person>`

const builder = new XMLBuilder({})

export function* handleUpdatePerson(action: UpdatePersonAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons/${action.payload.person.id}`,
        method: 'PUT',
        data: createCreatePersonReq(action.payload.person),
    })

    yield put(updatePersonSuccess())
    action.payload.onSuccess()
}
