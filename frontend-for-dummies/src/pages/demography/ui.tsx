import React, { FC } from 'react'
import { DemographyState } from '../../entities/demography/model'
import { SettingsGroup } from '../../shared/ui'
import { Navbar } from '../ui/NavBar'

type DemographyScreenViewProps = {
    // readonly demographyState: DemographyState
}

export const DemographyScreenView: FC<DemographyScreenViewProps> = (
    {
        // demographyState,
    },
) => {
    return (
        <>
            <Navbar links={[]} />
            <div className="container">
                <SettingsGroup
                    title={'Percentage'}
                    description={
                        'Choose hair color and nationality to check percentage of such people'
                    }>
                    ASDasdasdasdasd
                </SettingsGroup>
            </div>
        </>
    )
}
