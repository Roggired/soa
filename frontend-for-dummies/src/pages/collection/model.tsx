import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { personModel } from '../../entities/person'
import { CollectionScreenView } from './ui'

export const CollectionScreenContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('ASDASD')
        dispatch(personModel.actions.getPersons(10, 0))
    }, [])

    return <CollectionScreenView />
}
