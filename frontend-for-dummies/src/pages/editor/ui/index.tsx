import React, {FC, MouseEventHandler, useEffect, useState,} from 'react'
import DateTimePicker from 'react-datetime-picker'
import {Color, Person} from "../../../entities/person/lib";
import {Button, Input, SizedBox} from '../../../shared/ui';
import {Navbar} from "../../ui/NavBar";

type EditorScreenViewProps = {
    readonly onPersonSubmit: (
        person: Person,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly person: Person
    readonly mode: string
}

export const EditorScreenView: FC<EditorScreenViewProps> = ({
                                                                onPersonSubmit,
                                                                person,
                                                                mode,
                                                            }) => {
    const [name, setName] = useState<string>(person.name)
    const [height, setHeight] = useState<number>(person.height)
    const [birthday, setBirthday] = useState<Date>(person.birthday)
    const [hairColor, setHairColor] = useState<Color>(person.hairColor)
    const [eyeColor, setEyeColor] = useState<Color>(person.eyeColor);
    const [nationality, setNationality] = useState<string>(person.nationality)

    const [coordinateX, setCoordinateX] = useState<number>(person.coordinates.x)
    const [coordinateY, setCoordinateY] = useState<number>(person.coordinates.y)

    const [locationX, setLocationX] = useState<number>(person.location.x)
    const [locationY, setLocationY] = useState<number>(person.location.y)
    const [locationZ, setLocationZ] = useState<number>(person.location.z)
    const [locationName, setLocationName] = useState<string>(person.location.name)

    const isDisabled = mode === 'view'

    useEffect(() => {
        M.updateTextFields()
        const elems = document.querySelectorAll('select')
        const instances = M.FormSelect.init(elems)
    }, [])

    return (
        <>
            <Navbar/>
            <div className="container">
                <SizedBox height="2rem"/>
                <p>Person</p>
                <div className="col s12">
                    <div className="row">
                        <Input onChange={e => setName(e.target.value)} value={name} label="Name" disabled={isDisabled}/>
                        <Input onChange={e => setHeight(+e.target.value)} type="number" value={height} label="Height" disabled={isDisabled}/>
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

                        <Input onChange={e => setNationality(e)} value={nationality} label="Nationality" disabled={isDisabled}/>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <select
                                value={hairColor}
                                disabled={isDisabled}>
                                <option
                                    selected={person.hairColor + 1 === 1}
                                    value="">
                                    GREEN
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 2}
                                    value="2">
                                    YELLOW
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 3}
                                    value="3">
                                    ORANGE
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 4}
                                    value="4">
                                    RED
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 5}
                                    value="5">
                                    BLACK
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 6}
                                    value="6">
                                    BLUE
                                </option>
                                <option
                                    selected={person.hairColor + 1 === 7}
                                    value="7">
                                    BROWN
                                </option>
                            </select>
                            <label>Hair color</label>
                        </div>

                        <div className="input-field col s6">
                            <select
                                ref={eyeColorRef}
                                disabled={mode === 'view'}>
                                <option
                                    selected={person.eyeColor + 1 == 1}
                                    value="1">
                                    GREEN
                                </option>
                                <option
                                    value="2"
                                    selected={person.eyeColor + 1 == 2}>
                                    YELLOW
                                </option>
                                <option
                                    value="3"
                                    selected={person.eyeColor + 1 == 3}>
                                    ORANGE
                                </option>
                                <option
                                    value="4"
                                    selected={person.eyeColor + 1 == 4}>
                                    RED
                                </option>
                                <option
                                    value="5"
                                    selected={person.eyeColor + 1 == 5}>
                                    BLACK
                                </option>
                                <option
                                    value="6"
                                    selected={person.eyeColor + 1 == 6}>
                                    BLUE
                                </option>
                                <option
                                    value="7"
                                    selected={person.eyeColor + 1 == 7}>
                                    BROWN
                                </option>
                            </select>
                            <label>Eye color</label>
                        </div>
                    </div>

                    <p>Coordinates</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="coorX"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setCoordinateX(+e.target.value)}
                                value={coordinateX}
                            />
                            <label htmlFor="coorX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="coorY"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setCoordinateY(+e.target.value)}
                                value={coordinateY}
                            />
                            <label htmlFor="coorY">y</label>
                        </div>
                    </div>

                    <p>Location</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="locX"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setLocationX(+e.target.value)}
                                value={locationX}
                            />
                            <label htmlFor="locX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locY"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setLocationY(+e.target.value)}
                                value={locationY}
                            />
                            <label htmlFor="locY">y</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="z"
                                type="number"
                                disabled={mode === 'view'}
                                onChange={(e) => setLocationZ(+e.target.value)}
                                value={locationZ}
                            />
                            <label htmlFor="z">z</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locName"
                                disabled={mode === 'view'}
                                type="text"
                                onChange={(e) => setLocationName(e.target.value)}
                                value={locationName}
                            />
                            <label htmlFor="locName">Name</label>
                        </div>
                    </div>

                    <FlexRow>
                        <Button
                            onClick={() => {
                                history.goBack()
                            }}>
                            Close
                        </Button>

                        {mode !== 'view' && (
                            <Button
                                style={{marginLeft: 'auto'}}
                                onClick={(event) =>
                                    onPersonSubmit({
                                        nationality,
                                        id: person.id,
                                        name,
                                        creationDate: person.creationDate,
                                        coordinates: {
                                            x: coordinateX,
                                            y: coordinateY,
                                        },
                                        birthday,
                                        height,
                                        eyeColor:
                                            Color[
                                            +eyeColorRef.current.value - 1
                                                ],
                                        // @ts-ignore
                                        hairColor:
                                            Color[
                                                // @ts-ignore
                                            +hairColorRef.current.value - 1
                                                ].toString(),
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
                    <SizedBox height="3rem"/>
                </div>
            </div>
        </>
    )
}
