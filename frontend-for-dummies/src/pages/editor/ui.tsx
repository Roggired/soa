import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import { ROOT } from '../../shared/lib/routing/routes'
import { Navbar } from '../ui/NavBar'
import { Button, FlexRow, SizedBox } from '../../shared/ui'
import DateTimePicker from 'react-datetime-picker'
import { Color, Person } from '../../entities/person/lib'

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
    console.log('EditorScreenView', person)
    const history = useHistory()

    const [name, setName] = useState<string>(person.name)
    const [height, setHeight] = useState<number>(person.height)
    const [birthday, setBirthday] = useState(person.birthday)
    const hairColorRef = useRef<HTMLSelectElement>(null)
    const eyeColorRef = useRef<HTMLSelectElement>(null)
    const [nationality, setNationality] = useState<string>(person.nationality)

    const [coorX, setCoorX] = useState<number>(person.coordinates.x)
    const [coorY, setCoorY] = useState<number>(person.coordinates.y)

    const [locX, setLocX] = useState<number>(person.location.x)
    const [locY, setLocY] = useState<number>(person.location.y)
    const [locZ, setLocZ] = useState<number>(person.location.z)
    const [locName, setLocName] = useState<string>(person.location.name)

    useEffect(() => {
        M.updateTextFields()
        const elems = document.querySelectorAll('select')
        const instances = M.FormSelect.init(elems)
    }, [])

    return (
        <>
            <Navbar links={[]} />
            <div className="container">
                <SizedBox height="2rem" />
                <p>Person</p>
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="name"
                                disabled={mode === 'view'}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="height"
                                type="number"
                                disabled={mode === 'view'}
                                value={height}
                                onChange={(event) =>
                                    setHeight(+event.target.value)
                                }
                            />
                            <label htmlFor="height">Height</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s6 valign-wrapper">
                            <span className="col s3">Birthday: </span>
                            <DateTimePicker
                                disabled={mode === 'view'}
                                className="col s9"
                                onChange={setBirthday}
                                value={birthday}
                            />
                        </div>
                        <div className="col s6 input-field">
                            <input
                                id="nationality"
                                type="text"
                                disabled={mode === 'view'}
                                value={nationality}
                                onChange={(event) =>
                                    setNationality(event.target.value)
                                }
                            />
                            <label htmlFor="nationality">Nationality</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <select
                                ref={hairColorRef}
                                disabled={mode === 'view'}>
                                <option
                                    selected={person.hairColor + 1 === 1}
                                    value="1">
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
                                onChange={(e) => setCoorX(+e.target.value)}
                                value={coorX}
                            />
                            <label htmlFor="coorX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="coorY"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setCoorY(+e.target.value)}
                                value={coorY}
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
                                onChange={(e) => setLocX(+e.target.value)}
                                value={locX}
                            />
                            <label htmlFor="locX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locY"
                                disabled={mode === 'view'}
                                type="number"
                                onChange={(e) => setLocY(+e.target.value)}
                                value={locY}
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
                                onChange={(e) => setLocZ(+e.target.value)}
                                value={locZ}
                            />
                            <label htmlFor="z">z</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locName"
                                disabled={mode === 'view'}
                                type="text"
                                onChange={(e) => setLocName(e.target.value)}
                                value={locName}
                            />
                            <label htmlFor="locName">Name</label>
                        </div>
                    </div>

                    <FlexRow>
                        <Button
                            onClick={() => {
                                history.push(ROOT)
                            }}>
                            Close
                        </Button>

                        {mode !== 'view' && (
                            <Button
                                style={{ marginLeft: 'auto' }}
                                onClick={(event) =>
                                    onPersonSubmit({
                                        nationality,
                                        id: person.id,
                                        name,
                                        creationDate: person.creationDate,
                                        coordinates: {
                                            x: coorX,
                                            y: coorY,
                                        },
                                        birthday,
                                        height,
                                        // @ts-ignore
                                        eyeColor:
                                            Color[
                                                // @ts-ignore
                                                +eyeColorRef.current.value - 1
                                            ],
                                        // @ts-ignore
                                        hairColor:
                                            Color[
                                                // @ts-ignore
                                                +hairColorRef.current.value - 1
                                            ].toString(),
                                        location: {
                                            x: locX,
                                            y: locY,
                                            z: locZ,
                                            name: locName,
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
