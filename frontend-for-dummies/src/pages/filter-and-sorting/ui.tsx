import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Button, SizedBox } from '../../shared/ui'
import { FilterClaim } from '../../entities/person/model/store'
import { useDispatch } from 'react-redux'
import { personModel } from '../../entities/person'
import { Navbar } from '../ui/NavBar'

type FilterSortingScreenViewProps = {
    readonly filterClaims: FilterClaim[]
    /*readonly createClaim: (
        prop: string,
        sort: string,
        filter: string | number,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onDeleteClaim: (
        prop: string,
        sort: string,
        filter: string | number,
    ) => MouseEventHandler<HTMLButtonElement>*/
}

export const FilterSortingScreenView: FC<FilterSortingScreenViewProps> = ({
    filterClaims,
}) => {
    const dispatch = useDispatch()

    const propRef = useRef<HTMLSelectElement>(null)
    const sortRef = useRef<HTMLSelectElement>(null)
    const [filter, setFilter] = useState<string | number>('')

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
                <div className="row valign-wrapper">
                    <div className="input-field col s3">
                        <select ref={propRef}>
                            <option selected value="person.id">
                                ID
                            </option>
                            <option value="person.name">Name</option>
                            <option value="coordinates.x">Coordinates x</option>
                            <option value="coordinates.y">Coordinates y</option>
                            <option value="person.height">Height</option>
                            <option value="person.birthday">Birthday</option>
                            <option value="person.eye_color">Eye color</option>
                            <option value="person.hair_color">
                                Hair color
                            </option>
                            <option value="person.nationality">
                                Nationality
                            </option>
                            <option value="location.x">Location x</option>
                            <option value="location.y">Location y</option>
                            <option value="location.z">Location z</option>
                            <option value="location.name">Location name</option>
                        </select>
                    </div>

                    <div className="col s4 input-field">
                        <input
                            id="filter"
                            type="text"
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                        />
                        <label htmlFor="filter">Filter by</label>
                    </div>

                    <div className="input-field col s3">
                        <select ref={sortRef}>
                            <option selected value="NO">
                                No
                            </option>
                            <option value="ASC">Ascending</option>
                            <option value="DES">Descending</option>
                        </select>
                    </div>

                    <div className="col s2">
                        <Button
                            onClick={() =>
                                dispatch(
                                    personModel.actions.createClaim({
                                        filter,
                                        // @ts-ignore
                                        prop: propRef.current.value,
                                        // @ts-ignore
                                        sort: sortRef.current.value,
                                    } as FilterClaim),
                                )
                            }>
                            <i className="material-icons">add</i>
                        </Button>
                    </div>
                </div>

                <SizedBox height="2rem" />
                {filterClaims.map((filterClaim) => (
                    <div className="row valign-wrapper">
                        <div className="input-field col s3">
                            <select value={filterClaim.prop} disabled>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="col s4 input-field">
                            <input
                                id="filter"
                                type="text"
                                disabled
                                value={filterClaim.filter}
                            />
                            <label htmlFor="filter">Filter by</label>
                        </div>

                        <div className="input-field col s3">
                            <select value={filterClaim.sort} disabled>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="col s2">
                            <Button>
                                <i className="material-icons">delete</i>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
