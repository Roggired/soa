import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Navbar } from '../ui/NavBar'
import { Button, SizedBox } from '../../shared/ui'
import DateTimePicker from 'react-datetime-picker'
import { Color, Person } from '../../entities/person/lib'

type EditorScreenViewProps = {
    readonly onPersonSubmit: (
        person: Person,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly person: Person
}

export const EditorScreenView: FC<EditorScreenViewProps> = ({
    onPersonSubmit,
    person,
}) => {
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

    // @ts-ignore
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
                                className="col s9"
                                onChange={setBirthday}
                                value={birthday}
                            />
                        </div>
                        <div className="col s6 input-field">
                            <input
                                id="nationality"
                                type="text"
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
                            <select ref={hairColorRef}>
                                <option selected value="1">
                                    GREEN
                                </option>
                                <option value="2">YELLOW</option>
                                <option value="3">ORANGE</option>
                                <option value="4">RED</option>
                                <option value="5">BLACK</option>
                                <option value="6">BLUE</option>
                                <option value="7">BROWN</option>
                            </select>
                            <label>Hair color</label>
                        </div>

                        <div className="input-field col s6">
                            <select ref={eyeColorRef}>
                                <option selected value="1">
                                    GREEN
                                </option>
                                <option value="2">YELLOW</option>
                                <option value="3">ORANGE</option>
                                <option value="4">RED</option>
                                <option value="5">BLACK</option>
                                <option value="6">BLUE</option>
                                <option value="7">BROWN</option>
                            </select>
                            <label>Eye color</label>
                        </div>
                    </div>

                    <p>Coordinates</p>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="coorX"
                                type="number"
                                onChange={(e) => setCoorX(+e.target.value)}
                                value={coorX}
                            />
                            <label htmlFor="coorX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="coorY"
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
                                type="number"
                                onChange={(e) => setLocX(+e.target.value)}
                                value={locX}
                            />
                            <label htmlFor="locX">x</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locY"
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
                                onChange={(e) => setLocZ(+e.target.value)}
                                value={locZ}
                            />
                            <label htmlFor="z">z</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="locName"
                                type="text"
                                onChange={(e) => setLocName(e.target.value)}
                                value={locName}
                            />
                            <label htmlFor="locName">Name</label>
                        </div>
                    </div>

                    <Button
                        onClick={(event) =>
                            onPersonSubmit({
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
                                eyeColor: Color[+eyeColorRef.current.value],
                                // @ts-ignore
                                hairColor: Color[+hairColorRef.current.value],
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
                    <SizedBox height="3rem" />
                </div>
            </div>
        </>
    )
}
