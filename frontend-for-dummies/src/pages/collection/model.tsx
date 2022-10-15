import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { personModel } from '../../entities/person'
import { Person } from '../../entities/person/lib'
import { CollectionScreenView } from './ui'
import { getPersonsSuccess } from '../../entities/person/model/actions'

export const CollectionScreenContainer = () => {
    const dispatch = useDispatch()
    const personState = useSelector(personModel.selectors.all)
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState(-1)
    const [totalElements, setTotalElements] = useState(-1)
    const [persons, setPersons] = useState<Person[]>([])

    useEffect(() => {
        setCurrentPage(personState.currentPage)
        if (personState.elementsSize !== null) {
            setTotalElements(personState.elementsSize)
        }
    }, [personState])

    useEffect(() => {
        if (currentPage >= 0) {
            // console.log('start', currentPage * personState.pageSize)
            // const start = currentPage * personState.pageSize
            setPersons(
                // personState.persons.slice(start, start + personState.pageSize),
                personState.persons,
            )
        }
    }, [currentPage, personState])

    useEffect(() => {
        dispatch(
            personModel.actions.getPersons(
                personState.pageSize,
                personState.currentPage,
                personState.filterClaims,
            ),
        )
    }, [])

    const onDeleteClick =
        (id: number): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            dispatch(personModel.actions.deletePerson(id, history))
        }

    const onNextPageClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if (personState.pagesTotal) {
            const futurePage = currentPage + 1
            if (futurePage >= personState.pagesTotal) {
                return
            }

            setCurrentPage(futurePage)

            dispatch(
                personModel.actions.getPersons(
                    personState.pageSize,
                    futurePage,
                    personState.filterClaims,
                ),
            )
        }
    }

    const onPreviousPageClick: MouseEventHandler<HTMLButtonElement> = (
        event,
    ) => {
        event.preventDefault()
        if (personState.pagesTotal) {
            const futurePage = currentPage - 1
            if (futurePage < 0) {
                return
            }

            setCurrentPage(futurePage)
            dispatch(
                personModel.actions.getPersons(
                    personState.pageSize,
                    futurePage,
                    personState.filterClaims,
                ),
            )
        }
    }

    return (
        <CollectionScreenView
            currentPage={+currentPage + 1}
            onDeleteClick={onDeleteClick}
            onNextPageClick={onNextPageClick}
            onPreviousPageClick={onPreviousPageClick}
            elementsSize={totalElements}
            persons={persons}
        />
    )
}
