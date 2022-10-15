import React, { MouseEventHandler, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { personModel } from '../../entities/person'
import { CollectionScreenView } from './ui'

export const CollectionScreenContainer = () => {
    const dispatch = useDispatch()
    const personState = useSelector(personModel.selectors.all)
    const history = useHistory()

    useEffect(() => {
        dispatch(personModel.actions.getPersons(10, 0))
    }, [])

    const onDeleteClick =
        (id: number): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            dispatch(personModel.actions.deletePerson(id, history))
        }

    return (
        <CollectionScreenView
            currentPage={+personState.currentPage + 1}
            personState={personState}
            onDeleteClick={onDeleteClick}
        />
    )
}
