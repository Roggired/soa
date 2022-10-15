import React, { MouseEventHandler, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { personModel } from '../../entities/person'
import { EditorScreenView } from './ui'
import { useLocation } from 'react-router-dom'
import { Color, Person } from '../../entities/person/lib'
import { failToast } from '../../shared/lib/toasts'

const emptyPerson = (): Person => ({
    id: 0,
    name: '',
    creationDate: new Date(),
    height: 0,
    birthday: new Date(),
    eyeColor: Color.GREEN,
    hairColor: Color.GREEN,
    nationality: '',
    location: {
        x: 0,
        y: 0,
        z: 0,
        name: '',
    },
    coordinates: {
        x: 0,
        y: 0,
    },
})

export const EditorScreenContainer = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    // @ts-ignore
    // const passedId = location?.state
    const person = emptyPerson()

    const onPersonSubmit = (
        person: Person,
    ): MouseEventHandler<HTMLButtonElement> => {
        return (event) => {
            event.preventDefault()
            console.log(person)

            if (person.name == '') {
                failToast('Name cannot be blank!')
                return
            }

            if (new Date() < person.birthday) {
                failToast('Birthday cant be greater than that day!')
                return
            }

            if (person.height <= 0) {
                failToast('Height should be greater then 0')
                return
            }

            if (person.coordinates.y <= -348) {
                failToast('Coordinates x should be > -348')
                return
            }

            if (person.location.name == '') {
                failToast('Location name could not be blank')
                return
            }

            dispatch(personModel.actions.createPerson(person))
        }
    }

    return <EditorScreenView person={person} onPersonSubmit={onPersonSubmit} />
}
