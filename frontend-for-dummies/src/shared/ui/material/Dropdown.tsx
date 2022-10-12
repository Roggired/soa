import React, { FC, useEffect } from 'react'
import { v4 } from 'uuid'
import { DeprecatedButton } from './Button'

type DropdownProps = {
    readonly values: string[]
    readonly content: string
}

export const Dropdown: FC<DropdownProps> = ({ values, content }) => {
    const id = v4()

    useEffect(() => {
        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
    }, [])

    return (
        <>
            <DeprecatedButton className="dropdown-trigger" data-target={id}>
                {content}
            </DeprecatedButton>

            <ul id={id} className="dropdown-content">
                {values.map((value, index) => (
                    <li key={index}>
                        <a>{value}</a>
                    </li>
                ))}
            </ul>
        </>
    )
}
