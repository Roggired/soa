import React, { MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { personModel } from '../../entities/person'
import { SortingType } from '../../entities/person/lib'
import { FilterClaim } from '../../entities/person/model/store'
import { ROOT } from '../../shared/lib/routing/routes'
import { FilterSortingScreenView } from './ui'

export const FilterSortingScreenContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const personState = useSelector(personModel.selectors.all)

    const onDeleteClaim = (
        prop: string,
        sort: SortingType,
        filter: string | number | null,
    ) => {
        dispatch(
            personModel.actions.deleteClaim({
                property: prop,
                sort,
                filter,
            }),
        )
    }

    const onApplyFiltersClick = () => {
        history.push(ROOT)
    }

    return (
        <FilterSortingScreenView
            filterClaims={personState.filterClaims}
            onDeleteClaim={onDeleteClaim}
            onApplyFilterClaims={onApplyFiltersClick}
        />
    )
}
