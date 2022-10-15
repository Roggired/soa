import React, { FC } from 'react'
import { Navbar } from '../ui/NavBar'

type StatsScreenViewProps = {}

export const StatsScreenView: FC<StatsScreenViewProps> = ({}) => {
    return (
        <>
            <Navbar links={[]} />
            <div className="container"></div>
        </>
    )
}
