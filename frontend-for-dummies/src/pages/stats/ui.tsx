import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Person } from '../../entities/person/lib'
import { StatsState } from '../../entities/stats/model'
import { EDITOR } from '../../shared/lib/routing/routes'
import {
    Button,
    FlexRow,
    Input,
    SettingsGroup,
    SizedBox,
} from '../../shared/ui'
import { Navbar } from '../ui/NavBar'

type StatsScreenViewProps = {
    readonly state: StatsState
    readonly onSelectByName: (
        namePrefix: string,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onMeanHeight: MouseEventHandler<HTMLButtonElement>
    readonly onUnderAmount: (
        targetHeight: number,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onPersonViewClick: (
        person: Person,
    ) => MouseEventHandler<HTMLButtonElement>
}

export const StatsScreenView = ({
    state,
    onSelectByName,
    onUnderAmount,
    onMeanHeight,
    onPersonViewClick,
}: StatsScreenViewProps): JSX.Element => {
    const [namePrefix, setNamePrefix] = useState<string>('')
    const [targetHeight, setTargetHeight] = useState<number>(0)

    useEffect(() => {
        M.AutoInit()
        M.updateTextFields()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <SizedBox height={'2rem'} />

                <SettingsGroup
                    title={'Mean height'}
                    description={'Calculate mean height by all persons'}>
                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                    marginTop: '1rem',
                                }}
                                onClick={onMeanHeight}>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {state.meanHeight ? state.meanHeight : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>

                <SettingsGroup
                    title={'Under height amount'}
                    description={
                        'Enter height and calculate amount of persons'
                    }>
                    <Input
                        onChange={(e) => setTargetHeight(+e.target.value)}
                        value={targetHeight}
                        label={'Target height'}
                        type="number"
                        classNames="col s12"
                    />

                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                }}
                                onClick={(event) =>
                                    onUnderAmount(targetHeight)(event)
                                }>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {state.underHeightAmount != null
                                    ? state.underHeightAmount + ' persons'
                                    : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>

                <SettingsGroup
                    title={'Select by name'}
                    description={
                        'Choose name prefix and check all persons with it'
                    }>
                    <Input
                        onChange={(e) => setNamePrefix(e.target.value)}
                        value={namePrefix}
                        label="Name prefix"
                        classNames="col s12"
                    />

                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                }}
                                onClick={(event) =>
                                    onSelectByName(namePrefix)(event)
                                }>
                                Calculate
                            </Button>

                            <span>Result: {state.persons.length} persons</span>
                        </FlexRow>
                    </div>

                    <table className="col s12 striped centered highlight">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.persons.map((person) => (
                                <tr>
                                    <td>{person.id}</td>
                                    <td>{person.name}</td>
                                    <td>
                                        <Button
                                            onClick={onPersonViewClick(person)}>
                                            <i className="material-icons">
                                                more
                                            </i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </SettingsGroup>

                <SizedBox height={'2rem'} />
            </div>
        </>
    )
}
