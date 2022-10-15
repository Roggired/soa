import React, { FC } from 'react'
import { Navbar } from '../ui/NavBar'

type DemographyScreenViewProps = {}

export const DemographyScreenView: FC<DemographyScreenViewProps> = ({}) => {
    return (
        <>
            <Navbar links={[]} />
            <div className="container"></div>
        </>
    )
}
