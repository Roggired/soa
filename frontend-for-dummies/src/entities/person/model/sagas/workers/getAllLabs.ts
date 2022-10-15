import { AxiosResponse } from 'axios'
import { call, cps, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { createPersonSuccess, getPersonsSuccess } from '../../actions'
import { CreatePersonAction, GetPersonsAction } from '../../actionTypes'
import { Builder, parseString } from 'xml2js'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { Person } from '../../../lib'

const builder = new XMLBuilder({})
const parser = new XMLParser()

export function* handleGetPersons(action: GetPersonsAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: `/persons?pageSize=${action.payload.pageSize}&pageIndex=${action.payload.pageIndex}`,
        method: 'GET',
    })

    const result = parser.parse(response.data)
    const payload = result.responsePage.payload
    console.log(parser.parse(response.data))

    yield put(
        getPersonsSuccess(
            payload.content as Person[],
            +payload.pageSize,
            +payload.pageIndex,
            +payload.elementsTotal,
            +payload.pagesTotal,
        ),
    )
}

const createCreatePersonReq = (person: Person) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
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
</Person>
   `
}

export function* handleCreatePerson(action: CreatePersonAction) {
    const response: AxiosResponse = yield call(apiCaller, {
        route: '/persons',
        method: 'POST',
        data: createCreatePersonReq(action.payload.person),
    })

    const result = parser.parse(response.data)
    console.log(result)
    yield put(createPersonSuccess(result.responsePerson.payload as Person))
}
