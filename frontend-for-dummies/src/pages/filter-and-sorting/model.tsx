import React, { MouseEventHandler } from 'react'
import { FilterSortingScreenView } from './ui'
import { useDispatch, useSelector } from 'react-redux'
import { personModel } from '../../entities/person'
import { FilterClaim } from '../../entities/person/model/store'
import { failToast } from '../../shared/lib/toasts'

export const FilterSortingScreenContainer = () => {
    const dispatch = useDispatch()
    const personState = useSelector(personModel.selectors.all)

    const onDeleteClaim =
        (
            prop: string,
            sort: string,
            filter: string | number | null,
        ): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            dispatch(
                personModel.actions.deleteClaim({
                    property: prop,
                    sort,
                    filter,
                } as FilterClaim),
            )
        }

    const onCreateClaim =
        (
            prop: string,
            sort: string,
            filter: string | number | null,
        ): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()

            const addedProps = personState.filterClaims.map((f) => f.property)
            if (addedProps.includes(prop)) {
                failToast('Filter with property ' + prop + ' already exists!')
                return
            }

            if (
                [
                    'PERSON_ID',
                    'COORDINATES_X',
                    'COORDINATES_Y',
                    'PERSON_HEIGHT',
                    'LOCATION_X',
                    'LOCATION_Y',
                    'LOCATION_Z',
                ].includes(prop) &&
                filter &&
                isNaN(+filter)
            ) {
                failToast('Filter by should be a number')
                return
            }

            if (
                ['PERSON_EYE_COLOR', 'PERSON_HAIR_COLOR'].includes(prop) &&
                !['GREEN', 'RED', 'BLACK', 'YELLOW', 'BROWN', 'GREEN'].includes(
                    filter as string,
                )
            ) {
                failToast('Filter by should be a Color')
                return
            }

            let f: string | number | null
            if (filter === null) {
                f = null
            } else if (
                filter === '' &&
                [
                    'PERSON_ID',
                    'COORDINATES_X',
                    'COORDINATES_Y',
                    'PERSON_HEIGHT',
                    'LOCATION_X',
                    'LOCATION_Y',
                    'LOCATION_Z',
                ].includes(prop)
            ) {
                f = null
                // @ts-ignore
            } else if (isNaN(filter)) {
                f = filter
            } else {
                f = +filter
            }

            dispatch(
                personModel.actions.createClaim({
                    property: prop,
                    sort,
                    // @ts-ignore
                    filter: f,
                } as FilterClaim),
            )
        }

    return (
        <FilterSortingScreenView
            filterClaims={personState.filterClaims}
            onCreateClaim={onCreateClaim}
            onDeleteClaim={onDeleteClaim}
        />
    )
}
