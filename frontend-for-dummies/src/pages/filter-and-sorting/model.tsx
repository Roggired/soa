import React from 'react'
import { FilterSortingScreenView } from './ui'
import { useDispatch, useSelector } from 'react-redux'
import { personModel } from '../../entities/person'

export const FilterSortingScreenContainer = () => {
    const dispatch = useDispatch()
    const personState = useSelector(personModel.selectors.all)

    return <FilterSortingScreenView filterClaims={personState.filterClaims} />
}
