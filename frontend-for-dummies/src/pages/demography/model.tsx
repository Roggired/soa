import React from 'react'
import { DemographyScreenView } from './ui'
import { useSelector } from 'react-redux'
import { demographyModel } from '../../entities/demography'

export const DemographyScreenContainer = () => {
    const state = useSelector(demographyModel.selectors.all)
    return <DemographyScreenView />
}
