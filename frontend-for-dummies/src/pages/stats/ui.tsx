import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StatsState } from '../../entities/stats/model'
import { EDITOR } from '../../shared/lib/routing/routes'
import { Button, FlexRow, SettingsGroup, SizedBox } from '../../shared/ui'
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
}

export const StatsScreenView: FC<StatsScreenViewProps> = ({
    state,
    onSelectByName,
    onUnderAmount,
    onMeanHeight,
}) => {
    const [namePrefix, setNamePrefix] = useState('')
    const [targetHeight, setTargetHeight] = useState<number>(0)

    const history = useHistory()

    useEffect(() => {
        M.updateTextFields()
        const elems = document.querySelectorAll('select')
        const instances = M.FormSelect.init(elems)
    }, [])

    return (
        <>
            <Navbar links={[]} />
            <div className="container">
                <SizedBox height={'2rem'} />

                <SettingsGroup
                    title={'Mean height'}
                    description={'Calculate mean height'}>
                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                    marginTop: '1rem',
                                }}
                                onClick={(event) => onMeanHeight(event)}>
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
                    <div
                        className="col s12 input-field"
                        style={{ marginTop: '1rem' }}>
                        <input
                            id="targetHeight"
                            type="number"
                            onChange={(e) => setTargetHeight(+e.target.value)}
                            value={targetHeight}
                        />
                        <label htmlFor="targetHeight">Target height</label>
                    </div>

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
                                {state.underHeightAmount
                                    ? state.underHeightAmount
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
                    <div
                        className="col s12 input-field"
                        style={{ marginTop: '1rem' }}>
                        <input
                            id="select"
                            type="text"
                            onChange={(e) => setNamePrefix(e.target.value)}
                            value={namePrefix}
                        />
                        <label htmlFor="select">Name prefix</label>
                    </div>

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

                            <span>Result: {state.persons.length}</span>
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
                                            onClick={() => {
                                                history.push({
                                                    pathname: EDITOR,
                                                    state: {
                                                        person: person,
                                                        mode: 'view',
                                                    },
                                                })
                                            }}>
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
