import React, { MouseEventHandler, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Color, Person } from '../../../entities/person/lib'
import { FilterClaim } from '../../../entities/person/model/store'
import { EDITOR } from '../../../shared/lib/routing/routes'
import { Button, FlexColumn, FlexRow, SizedBox } from '../../../shared/ui'
import { Navbar } from '../../ui/NavBar'
import { AppliedFilters } from './AppliedFilters'

type CollectionScreenViewProps = {
    readonly currentPage: number
    readonly persons: Person[]
    readonly elementsSize: number
    readonly filters: FilterClaim[]
    readonly onDeleteClick: (id: number) => MouseEventHandler<HTMLButtonElement>
    readonly onPersonEdit: (person: Person) => void
    readonly onPersonView: (person: Person) => void
    readonly onNewPersonClick: () => void
    readonly onNextPageClick: MouseEventHandler<HTMLButtonElement>
    readonly onPreviousPageClick: MouseEventHandler<HTMLButtonElement>
}

export const CollectionScreenView = ({
    currentPage,
    persons,
    elementsSize,
    onDeleteClick,
    onNextPageClick,
    onPreviousPageClick,
    onNewPersonClick,
    onPersonEdit,
    onPersonView,
    filters,
}: CollectionScreenViewProps): JSX.Element => {
    useEffect(() => {
        M.FloatingActionButton.init(
            document.querySelectorAll('.fixed-action-btn'),
        )
    }, [])

    return (
        <>
            <Navbar />
            <div className="container" style={{ width: '90%' }}>
                <SizedBox height="2rem" />
                <FlexRow>
                    <span style={{ marginRight: 'auto' }}>
                        Total persons: {elementsSize}
                    </span>
                    <span className="valign-wrapper">
                        <i
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            className="material-icons"
                            onClick={onPreviousPageClick}>
                            navigate_before
                        </i>
                        {`${currentPage}`}
                        <i
                            className="material-icons"
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={onNextPageClick}>
                            navigate_next
                        </i>
                    </span>
                </FlexRow>
                <table className="striped centered highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Creation date</th>
                            <th>Coord X</th>
                            <th>Coord Y</th>
                            <th>Height</th>
                            <th>Eye color</th>
                            <th>Hair color</th>
                            <th>Loc X</th>
                            <th>Loc Y</th>
                            <th>Loc Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => (
                            <tr>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>{person.creationDate.toDateString()}</td>
                                <td>{person.coordinates.x}</td>
                                <td>{person.coordinates.y}</td>
                                <td>{person.height}</td>
                                <td>{Color[person.eyeColor]}</td>
                                <td>{Color[person.hairColor]}</td>
                                <td>{person.location.x}</td>
                                <td>{person.location.y}</td>
                                <td>{person.location.name}</td>
                                <td>
                                    <Button
                                        style={{ marginRight: '1px' }}
                                        onClick={() => onPersonEdit(person)}>
                                        <i className="material-icons">edit</i>
                                    </Button>

                                    <Button
                                        onClick={() => onPersonView(person)}
                                        style={{ marginRight: '1px' }}>
                                        <i className="material-icons">more</i>
                                    </Button>

                                    <Button onClick={onDeleteClick(person.id)}>
                                        <i className="material-icons">delete</i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <SizedBox height="2rem" />
                <FlexColumn justifyContent="center" alignItems="center">
                    {filters.length !== 0 && (
                        <AppliedFilters filters={filters} />
                    )}
                </FlexColumn>
            </div>

            <div
                className="fixed-action-btn"
                onClick={() => onNewPersonClick()}>
                <a className="btn-floating btn-large">
                    <i className="large material-icons">add</i>
                </a>
                <ul></ul>
            </div>
        </>
    )
}
