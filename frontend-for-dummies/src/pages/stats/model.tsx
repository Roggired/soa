import React, { MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statsModel } from '../../entities/stats'
import { failToast } from '../../shared/lib/toasts'
import { StatsScreenView } from './ui'

export const StatsScreenContainer = () => {
    const dispatch = useDispatch()
    const state = useSelector(statsModel.selectors.all)

    const onSelectByName =
        (namePrefix: string): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            if (namePrefix === '') {
                failToast('Prefix cant be empty')
                return
            }

            dispatch(statsModel.actions.selectPersons(namePrefix))
        }

    const onMeanHeight: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        dispatch(statsModel.actions.getMeanHeight())
    }

    const onUnderAmount =
        (targetHeight: number): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()

            if (targetHeight <= 0) {
                failToast('targetHeight cant be less or equal 0')
                return
            }

            dispatch(statsModel.actions.getUnderHeight(targetHeight))
        }

    return (
        <StatsScreenView
            state={state}
            onSelectByName={onSelectByName}
            onMeanHeight={onMeanHeight}
            onUnderAmount={onUnderAmount}
        />
    )
}
