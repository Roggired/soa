import React, { ChangeEventHandler } from 'react'
import { v4 } from 'uuid'

type InputProps = {
    readonly onChange: ChangeEventHandler<HTMLInputElement>
    readonly value: string | number
    readonly label: string
    readonly type?: 'text' | 'number'
    readonly disabled?: boolean
    readonly classNames?: string
}

export const Input = ({
    label,
    onChange,
    value,
    disabled = false,
    type = 'text',
    classNames = 'col s6',
}: InputProps): JSX.Element => {
    const id = v4()
    return (
        <div className={'input-field ' + classNames}>
            <input
                id={id}
                disabled={disabled}
                type={type}
                onChange={onChange}
                value={value}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
