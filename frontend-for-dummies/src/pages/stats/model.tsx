import React, { MouseEventHandler, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Person } from '../../entities/person/lib'
import { statsModel } from '../../entities/stats'
import { EDITOR, editorPathWithId } from '../../shared/lib/routing/routes'
import { failToast } from '../../shared/lib/toasts'
import { StatsScreenView } from './ui'

export const StatsScreenContainer = () => {
    const dispatch = useDispatch()
    const state = useSelector(statsModel.selectors.all)
    const history = useHistory()

    const onSelectByName =
        (namePrefix: string): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            if (namePrefix === '') {
                failToast('Prefix cant be empty')
                dispatch(statsModel.actions.clearSelectedPersonsState())
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
                failToast('Target height cant be less or equal 0')
                dispatch(statsModel.actions.clearTargetHeightState())
                return
            }

            dispatch(statsModel.actions.getUnderHeight(targetHeight))
        }

    const onPersonViewClick =
        (person: Person): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault()
            history.push({
                pathname: editorPathWithId(person.id),
                state: {
                    person: person,
                    mode: 'view',
                },
            })
        }

    return (
        <StatsScreenView
            state={state}
            onPersonViewClick={onPersonViewClick}
            onSelectByName={onSelectByName}
            onMeanHeight={onMeanHeight}
            onUnderAmount={onUnderAmount}
        />
    )
}
