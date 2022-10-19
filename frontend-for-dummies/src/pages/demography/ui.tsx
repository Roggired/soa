import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { DemographyState } from '../../entities/demography/model'
import { Color } from '../../entities/person/lib'
import {
    Button,
    FlexRow,
    Input,
    Select,
    SettingsGroup,
    SizedBox,
} from '../../shared/ui'
import { Navbar } from '../ui/NavBar'

type DemographyScreenViewProps = {
    readonly demographyState: DemographyState
    readonly onPercentageClick: (
        nationality: string,
        hairColor: Color,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onAmountClick: (
        hairColor: Color,
    ) => MouseEventHandler<HTMLButtonElement>
}

export const DemographyScreenView: FC<DemographyScreenViewProps> = ({
    demographyState,
    onPercentageClick,
    onAmountClick,
}) => {
    const [nationality, setNationality] = useState('')
    const [hairColor, setHairColor] = useState<Color>(Color.GREEN)
    const [byHairColor, setByHairColor] = useState<Color>(Color.GREEN)

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'))
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <SizedBox height={'2rem'} />
                <SettingsGroup
                    title={'Percentage'}
                    description={
                        'Choose hair color and nationality to check percentage of such persons'
                    }>
                    <Input
                        onChange={(e) => setNationality(e.target.value)}
                        value={nationality}
                        label="Nationality"
                        classNames="col s12"
                    />

                    <Select
                        label="Hair color"
                        value={hairColor}
                        options={Object.keys(Color)}
                        onChange={(e) => setHairColor(e.target.value as Color)}
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
                                    onPercentageClick(
                                        nationality,
                                        hairColor,
                                    )(event)
                                }>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {demographyState.percentage !== null
                                    ? demographyState.percentage + ' %'
                                    : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>

                <SettingsGroup
                    title="By hair color"
                    description="Calculate amount by hair color">
                    <Select
                        label="Hair color"
                        value={byHairColor}
                        options={Object.keys(Color)}
                        onChange={(e) =>
                            setByHairColor(e.target.value as Color)
                        }
                        classNames="col s12"
                    />

                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                onClick={(event) =>
                                    onAmountClick(byHairColor)(event)
                                }
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                }}>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {demographyState.amount !== null
                                    ? demographyState.amount + ' persons'
                                    : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>
            </div>
        </>
    )
}
