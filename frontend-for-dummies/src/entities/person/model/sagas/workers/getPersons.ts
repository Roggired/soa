import { AxiosResponse } from 'axios'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { call, put } from 'redux-saga/effects'
import { apiCaller } from '../../../../../shared/api'
import { Color, Person } from '../../../lib'
import { getPersonsSuccess } from '../../actions'
import { GetPersonsAction } from '../../actionTypes'

const builder = new XMLBuilder({})
const parser = new XMLParser()

export function* handleGetPersons(action: GetPersonsAction) {
    let route: string
    if (action.payload.filterClaims.length === 0) {
        route = `/persons?pageSize=${action.payload.pageSize}&pageIndex=${action.payload.pageIndex}`
    } else {
        route = `/persons?pageSize=${action.payload.pageSize}&pageIndex=${action.payload.pageIndex}`
        action.payload.filterClaims.forEach((f) => {
            route += `&filters=${btoa(JSON.stringify(f))}`
        })
    }

    const response: AxiosResponse = yield call(apiCaller, {
        route,
        method: 'GET',
    })

    const result = parser.parse(response.data)
    const payload = result.ResponsePage.payload

    let persons: Person[]
    if ('content' in payload) {
        if (Array.isArray(payload.content)) {
            persons = payload.content as Person[]
        } else {
            persons = [payload.content as Person]
        }
    } else {
        persons = []
    }

    persons = persons.map((person) => ({
        ...person,
        creationDate: new Date(person.creationDate as unknown as string),
        birthday: new Date(person.birthday as unknown as string),
        eyeColor: Color[person.eyeColor as unknown as keyof typeof Color],
        hairColor: Color[person.hairColor as unknown as keyof typeof Color],
    }))

    yield put(
        getPersonsSuccess(
            persons,
            +payload.pageSize,
            +payload.pageIndex,
            +payload.elementsTotal,
            +payload.pagesTotal,
        ),
    )
}
