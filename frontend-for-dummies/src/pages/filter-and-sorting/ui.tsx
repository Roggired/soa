import React, {
    FC,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Button, FlexRow, SizedBox } from '../../shared/ui'
import { FilterClaim } from '../../entities/person/model/store'
import { useDispatch } from 'react-redux'
import { personModel } from '../../entities/person'
import { Navbar } from '../ui/NavBar'
import { useHistory } from 'react-router-dom'
import { ROOT } from '../../shared/lib/routing/routes'
import { Row } from '../../shared/ui/material/material-wrappers'

type FilterSortingScreenViewProps = {
    readonly filterClaims: FilterClaim[]
    readonly onCreateClaim: (
        prop: string,
        sort: string,
        filter: string | number | null,
    ) => MouseEventHandler<HTMLButtonElement>
    readonly onDeleteClaim: (
        prop: string,
        sort: string,
        filter: string | number | null,
    ) => MouseEventHandler<HTMLButtonElement>
}

export const FilterSortingScreenView: FC<FilterSortingScreenViewProps> = ({
    filterClaims,
    onDeleteClaim,
    onCreateClaim,
}) => {
    const dispatch = useDispatch()
    const history = useHistory()

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
                            <option selected value="PERSON_ID">
                                ID
                            </option>
                            <option value="PERSON_NAME">Name</option>
                            <option value="COORDINATES_X">Coordinates x</option>
                            <option value="COORDINATES_Y">Coordinates y</option>
                            <option value="PERSON_HEIGHT">Height</option>
                            <option value="PERSON_EYE_COLOR">Eye color</option>
                            <option value="PERSON_HAIR_COLOR">
                                Hair color
                            </option>
                            <option value="PERSON_NATIONALITY">
                                Nationality
                            </option>
                            <option value="LOCATION_X">Location x</option>
                            <option value="LOCATION_Y">Location y</option>
                            <option value="LOCATION_Z">Location z</option>
                            <option value="LOCATION_NAME">Location name</option>
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
                            onClick={(event) =>
                                onCreateClaim(
                                    // @ts-ignore
                                    propRef.current.value,
                                    // @ts-ignore
                                    sortRef.current.value,
                                    filter,
                                )(event)
                            }>
                            <i className="material-icons">add</i>
                        </Button>
                    </div>
                </div>

                <SizedBox height="2rem" />
                <p>Applied filters:</p>
                {filterClaims.map((filterClaim) => (
                    <div className="row valign-wrapper">
                        <div className=" col s3">
                            Property: <i>{filterClaim.property}</i>
                        </div>

                        <div className="col s4">
                            Filtered by:{' '}
                            <i>
                                {filterClaim.filter
                                    ? filterClaim.filter
                                    : 'none'}
                            </i>
                        </div>

                        <div className=" col s3">
                            Applied sorting: <i>{filterClaim.sort}</i>
                        </div>

                        <div className="col s2">
                            <Button
                                onClick={onDeleteClaim(
                                    filterClaim.property,
                                    filterClaim.sort,
                                    filterClaim.filter,
                                )}>
                                <i className="material-icons">delete</i>
                            </Button>
                        </div>
                    </div>
                ))}
                <FlexRow justifyContent="center">
                    <Button onClick={() => history.push(ROOT)}>
                        Apply filter claims
                    </Button>
                </FlexRow>
            </div>
        </>
    )
}
