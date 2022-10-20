import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { Color, Person } from '../../../entities/person/lib'
import { Button, FlexRow, Input, Select, SizedBox } from '../../../shared/ui'
import { Navbar } from '../../ui/NavBar'

type EditorScreenViewProps = {
    readonly onPersonSubmit: (
        person: Person,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onBackButtonClick: MouseEventHandler<HTMLButtonElement>
    readonly person: Person
    readonly mode: string
}

export const EditorScreenView = ({
    onBackButtonClick,
    onPersonSubmit,
    person,
    mode,
}: EditorScreenViewProps): JSX.Element => {
    const isDisabled = mode === 'view'

    const [name, setName] = useState<string>(person.name)
    const [height, setHeight] = useState<number>(person.height)
    const [birthday, setBirthday] = useState<Date>(person.birthday)
    const [hairColor, setHairColor] = useState<Color>(person.hairColor)
    const [eyeColor, setEyeColor] = useState<Color>(person.eyeColor)
    const [nationality, setNationality] = useState<string>(person.nationality)

    const [coordinateX, setCoordinateX] = useState<number>(person.coordinates.x)
    const [coordinateY, setCoordinateY] = useState<number>(person.coordinates.y)

    const [locationX, setLocationX] = useState<number>(person.location.x)
    const [locationY, setLocationY] = useState<number>(person.location.y)
    const [locationZ, setLocationZ] = useState<number>(person.location.z)
    const [locationName, setLocationName] = useState<string>(
        person.location.name,
    )

    useEffect(() => {
        M.updateTextFields()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <SizedBox height="2rem" />
                <p>Person</p>
                <div className="col s12">
                    <div className="row">
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            label="Name"
                            disabled={isDisabled}
                        />
                        <Input
                            onChange={(e) => setHeight(+e.target.value)}
                            type="number"
                            value={height}
                            label="Height"
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="row">
                        <div className="col s6 valign-wrapper">
                            <span className="col s3">Birthday: </span>
                            <DateTimePicker
                                disabled={isDisabled}
                                className="col s9"
                                onChange={setBirthday}
                                value={birthday}
                            />
                        </div>

                        <Input
                            onChange={(e) => setNationality(e.target.value)}
                            value={nationality}
                            label="Nationality"
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="row">
                        <Select
                            label="Hair color"
                            value={hairColor.toString()}
                            options={Object.keys(Color)}
                            disabled={isDisabled}
                            onChange={(e) =>
                                setHairColor(e.target.value as Color)
                            }
                        />
                        <Select
                            label="Eye color"
                            value={eyeColor.toString()}
                            options={Object.keys(Color)}
                            disabled={isDisabled}
                            onChange={(e) =>
                                setEyeColor(e.target.value as Color)
                            }
                        />
                    </div>

                    <p>Coordinates</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="coorX"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) =>
                                    setCoordinateX(+e.target.value)
                                }
                                value={coordinateX}
                            />
                            <label htmlFor="coorX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="coorY"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) =>
                                    setCoordinateY(+e.target.value)
                                }
                                value={coordinateY}
                            />
                            <label htmlFor="coorY">y</label>
                        </div>
                    </div>

                    <p>Location</p>
                    <div className="row">
                        <Input
                            onChange={(e) => setLocationX(+e.target.value)}
                            value={locationX}
                            label="x"
                            type="number"
                            disabled={isDisabled}
                        />
                        <Input
                            onChange={(e) => setLocationY(+e.target.value)}
                            value={locationY}
                            label="y"
                            type="number"
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="row">
                        <Input
                            onChange={(e) => setLocationZ(+e.target.value)}
                            value={locationZ}
                            label="z"
                            type="number"
                            disabled={isDisabled}
                        />
                        <Input
                            onChange={(e) => setLocationName(e.target.value)}
                            value={locationName}
                            label="Name"
                            disabled={isDisabled}
                        />
                    </div>

                    <FlexRow>
                        <Button onClick={onBackButtonClick}>Close</Button>

                        {!isDisabled && (
                            <Button
                                style={{ marginLeft: 'auto' }}
                                onClick={(event) =>
                                    onPersonSubmit({
                                        id: person.id,
                                        nationality,
                                        name,
                                        creationDate: person.creationDate,
                                        coordinates: {
                                            x: coordinateX,
                                            y: coordinateY,
                                        },
                                        birthday,
                                        height,
                                        eyeColor,
                                        hairColor,
                                        location: {
                                            x: locationX,
                                            y: locationY,
                                            z: locationZ,
                                            name: locationName,
                                        },
                                    })(event)
                                }>
                                Submit
                            </Button>
                        )}
                    </FlexRow>
                    <SizedBox height="3rem" />
                </div>
            </div>
        </>
    )
}
