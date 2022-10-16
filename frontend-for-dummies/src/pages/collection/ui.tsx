import React, { FC, MouseEventHandler, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Color, Person } from '../../entities/person/lib'
import { EDITOR } from '../../shared/lib/routing/routes'
import { Button, FlexRow, SizedBox } from '../../shared/ui'
import { Navbar } from '../ui/NavBar'

type CollectionScreenViewProps = {
    readonly currentPage: number
    readonly persons: Person[]
    readonly elementsSize: number
    readonly onDeleteClick: (id: number) => MouseEventHandler<HTMLButtonElement>
    readonly onNextPageClick: MouseEventHandler<HTMLButtonElement>
    readonly onPreviousPageClick: MouseEventHandler<HTMLButtonElement>
}

export const CollectionScreenView: FC<CollectionScreenViewProps> = ({
    currentPage,
    persons,
    elementsSize,
    onDeleteClick,
    onNextPageClick,
    onPreviousPageClick,
}) => {
    const history = useHistory()

    useEffect(() => {
        const elems = document.querySelectorAll('.fixed-action-btn')
        const instances = M.FloatingActionButton.init(elems)
    }, [])

    return (
        <>
            <Navbar links={[]} />
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
                        {persons.map((person, index) => (
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
                                        onClick={(event) => {
                                            event.preventDefault()
                                            history.push({
                                                pathname: EDITOR,
                                                state: {
                                                    person: person,
                                                    mode: 'edit',
                                                },
                                            })
                                        }}>
                                        <i className="material-icons">edit</i>
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            history.push({
                                                pathname: EDITOR,
                                                state: {
                                                    person: person,
                                                    mode: 'view',
                                                },
                                            })
                                        }}
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
            </div>
            <div
                className="fixed-action-btn"
                onClick={(e) => {
                    e.preventDefault()
                    history.push({
                        pathname: EDITOR,
                        state: {
                            person: null,
                            mode: 'new',
                        },
                    })
                }}>
                <a className="btn-floating btn-large">
                    <i className="large material-icons">add</i>
                </a>
                <ul></ul>
            </div>
        </>
    )
}
