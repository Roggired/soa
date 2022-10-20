import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { personModel } from '../../../entities/person'
import { Color, SortingType } from '../../../entities/person/lib'
import { FilterClaim } from '../../../entities/person/model/store'
import { failToast } from '../../../shared/lib/toasts'
import { FilterClaimCreatorView } from './FilterCliamCreatorView'

const propertyList = [
    'PERSON_ID',
    'PERSON_NAME',
    'COORDINATES_X',
    'COORDINATES_Y',
    'PERSON_EYE_COLOR',
    'PERSON_HAIR_COLOR',
    'PERSON_NATIONALITY',
    'PERSON_HEIGHT',
    'LOCATION_X',
    'LOCATION_Y',
    'LOCATION_Z',
    'LOCATION_NAME',
]

const numberPropsList = [
    'PERSON_ID',
    'COORDINATES_X',
    'COORDINATES_Y',
    'PERSON_HEIGHT',
    'LOCATION_X',
    'LOCATION_Y',
    'LOCATION_Z',
]

const colorPropList = ['PERSON_EYE_COLOR', 'PERSON_HAIR_COLOR']

const sortList = ['NO', 'ASC', 'DES']

const FilterClaimCreatorContainer = (): JSX.Element => {
    const dispatch = useDispatch()
    const filters = useSelector(personModel.selectors.filters)

    const onCreateClaim = (prop: string, filter: string, sort: SortingType) => {
        const addedProps = filters.map((f) => f.property)
        if (addedProps.includes(prop)) {
            failToast('Filter with property ' + prop + ' already exists!')
            return
        }

        if (numberPropsList.includes(prop)) {
            let value: number | null
            if (filter === '') {
                value = null
            } else if (!isNaN(+filter)) {
                value = +filter
            } else {
                failToast('Filter by should be a number')
                return
            }

            dispatch(
                personModel.actions.createClaim({
                    property: prop,
                    sort: sort,
                    filter: value,
                }),
            )
        } else if (colorPropList.includes(prop)) {
            if (Object.keys(Color).includes(filter.toUpperCase())) {
                dispatch(
                    personModel.actions.createClaim({
                        property: prop,
                        sort: sort,
                        filter: filter.toUpperCase(),
                    }),
                )
            } else {
                failToast('Filter by should be a Color')
                return
            }
        } else {
            dispatch(
                personModel.actions.createClaim({
                    property: prop,
                    sort,
                    filter,
                }),
            )
        }
    }

    return (
        <FilterClaimCreatorView
            sortList={sortList}
            propList={propertyList}
            onCreateClick={onCreateClaim}
        />
    )
}

export { FilterClaimCreatorContainer as FilterClaimCreator }
