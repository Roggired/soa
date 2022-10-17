import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { DemographyState } from '../../entities/demography/model'
import { Button, FlexRow, SettingsGroup, SizedBox } from '../../shared/ui'
import { Navbar } from '../ui/NavBar'

type DemographyScreenViewProps = {
    readonly demographyState: DemographyState
    readonly onPercentageClick: (
        nationality: string,
        hairColor: string,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onAmountClick: (
        hairColor: string,
    ) => MouseEventHandler<HTMLButtonElement>
}

export const DemographyScreenView: FC<DemographyScreenViewProps> = ({
    demographyState,
    onPercentageClick,
    onAmountClick,
}) => {
    const [nationality, setNationality] = useState('')
    const hairColorRef = useRef<HTMLSelectElement>(null)
    const hairColorRef1 = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        M.updateTextFields()
        M.FormSelect.init(document.querySelectorAll('select'))
    }, [])

    return (
        <>
            <Navbar links={[]} />
            <div className="container">
                <SizedBox height={'2rem'} />
                <SettingsGroup
                    title={'Percentage'}
                    description={
                        'Choose hair color and nationality to check percentage of such people'
                    }>
                    <div
                        className="col s12 input-field"
                        style={{ marginTop: '1rem' }}>
                        <input
                            id="nat"
                            type="text"
                            onChange={(e) => setNationality(e.target.value)}
                            value={nationality}
                        />
                        <label htmlFor="nat">Nationality</label>
                    </div>

                    <div className="input-field col s12">
                        <select ref={hairColorRef}>
                            <option value="GREEN">GREEN</option>
                            <option value="RED">RED</option>
                            <option value="YELLOW">YELLOW</option>
                            <option value="ORANGE">ORANGE</option>
                        </select>
                    </div>

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
                                        // @ts-ignore
                                        hairColorRef.current.value,
                                    )(event)
                                }>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {demographyState.percentage
                                    ? demographyState.percentage
                                    : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>

                <SettingsGroup
                    title="By hair color"
                    description="Calculate amount by hair color">
                    <div
                        className="input-field col s12"
                        style={{ marginTop: '1rem' }}>
                        <select ref={hairColorRef1}>
                            <option value="GREEN">GREEN</option>
                            <option value="RED">RED</option>
                            <option value="YELLOW">YELLOW</option>
                            <option value="ORANGE">ORANGE</option>
                        </select>
                    </div>

                    <div className="col s12">
                        <FlexRow alignItems="center">
                            <Button
                                onClick={(event) =>
                                    // @ts-ignore
                                    onAmountClick(hairColorRef1.current.value)(
                                        event,
                                    )
                                }
                                style={{
                                    marginRight: 'auto',
                                    marginBottom: '1rem',
                                }}>
                                Calculate
                            </Button>

                            <span>
                                Result:{' '}
                                {demographyState.amount
                                    ? demographyState.amount
                                    : 'none'}
                            </span>
                        </FlexRow>
                    </div>
                </SettingsGroup>
            </div>
        </>
    )
}
