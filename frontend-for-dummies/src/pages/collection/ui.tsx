import React, { FC, MouseEventHandler, useEffect } from 'react'
import { PersonsState } from '../../entities/person/model'
import { Button, FlexRow, SizedBox } from '../../shared/ui'
import { Navbar } from '../ui/NavBar'
import { useHistory } from 'react-router-dom'
import { EDITOR } from '../../shared/lib/routing/routes'

type CollectionScreenViewProps = {
    readonly personState: PersonsState
    readonly currentPage: number
    readonly onDeleteClick: (id: number) => MouseEventHandler<HTMLButtonElement>
}

export const CollectionScreenView: FC<CollectionScreenViewProps> = ({
    currentPage,
    personState: { persons, pagesTotal, elementsSize, pageSize },
    onDeleteClick,
}) => {
    const history = useHistory()

    useEffect(() => {
        const elems = document.querySelectorAll('.fixed-action-btn')
        const instances = M.FloatingActionButton.init(elems)
    }, [])

    return (
        <>
            <Navbar links={[]} />
            <div className="container">
                <SizedBox height="2rem" />
                <FlexRow>
                    <span style={{ marginRight: 'auto' }}>
                        Total persons: {elementsSize}
                    </span>
                    <span className="valign-wrapper">
                        <i className="material-icons">navigate_before</i>
                        {`${currentPage}`}
                        <i className="material-icons">navigate_next</i>
                    </span>
                </FlexRow>
                <table className="striped centered highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Creation date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => (
                            <tr>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>{person.creationDate.toDateString()}</td>
                                <td>
                                    <Button
                                        style={{ marginRight: '1rem' }}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            history.push({
                                                pathname: EDITOR,
                                                state: {
                                                    id: person.id,
                                                },
                                            })
                                        }}>
                                        <i className="material-icons">edit</i>
                                    </Button>

                                    <Button style={{ marginRight: '1rem' }}>
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
                            id: null,
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
