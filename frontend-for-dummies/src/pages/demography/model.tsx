import React, { MouseEventHandler, useEffect } from 'react'
import { GET_PERCENTAGE } from '../../entities/demography/model/actionTypes'
import { Color } from '../../entities/person/lib'
import { failToast } from '../../shared/lib/toasts'
import { DemographyScreenView } from './ui'
import { useDispatch, useSelector } from 'react-redux'
import { demographyModel } from '../../entities/demography'
import { errorModel } from '../../entities/error'

export const DemographyScreenContainer = () => {
    const state = useSelector(demographyModel.selectors.all)
    const dispatch = useDispatch()
    const error = useSelector(errorModel.selectors.error(GET_PERCENTAGE))

    useEffect(() => {
        dispatch(demographyModel.actions.clearAllDemographyState())
    }, [])

    useEffect(() => {
        if (error) {
            failToast('No persons with such nationality')
            dispatch(errorModel.actions.clearErrors())
            dispatch(demographyModel.actions.clearDemographyState())
        }
    }, [error])

    const onPercentageClick =
        (
            nationality: string,
            hairColor: Color,
        ): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            if (nationality === '') {
                failToast('Please specify nationality')
                return
            }

            dispatch(
                demographyModel.actions.getPercentage(nationality, hairColor),
            )
        }

    const onAmountClick =
        (hairColor: string): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            dispatch(demographyModel.actions.getAmount(hairColor))
        }

    return (
        <DemographyScreenView
            demographyState={state}
            onPercentageClick={onPercentageClick}
            onAmountClick={onAmountClick}
        />
    )
}
