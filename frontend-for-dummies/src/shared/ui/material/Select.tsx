import React, { ChangeEventHandler, FC, useEffect } from 'react'

type SelectProps = {
    readonly label: string
    readonly value: string
    readonly options: string[]
    readonly onChange: ChangeEventHandler<HTMLSelectElement>
    readonly optionLabels?: string[]
    readonly disabled?: boolean
    readonly classNames?: string
}

export const Select = ({
    label,
    onChange,
    options,
    value,
    disabled = false,
    classNames = 'col s6',
    optionLabels = options,
}: SelectProps): JSX.Element => {
    useEffect(() => {
        M.AutoInit()
    }, [])

    return (
        <div className={'input-field ' + classNames}>
            <select value={value} onChange={onChange} disabled={disabled}>
                {options.map((option, index) => (
                    <option value={option}>{optionLabels[index]}</option>
                ))}
            </select>
            <label>{label}</label>
        </div>
    )
}
