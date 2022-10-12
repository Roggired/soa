import React, { ChangeEventHandler, FC, useEffect } from 'react'

type SelectProps = {
    readonly id: string

    readonly defaultValue: string
    readonly label: string

    readonly onChange?: ChangeEventHandler<HTMLSelectElement>
    children: JSX.Element
}

export const Select: FC<SelectProps> = ({
    id,
    defaultValue,
    label,
    onChange = () => {},
    children,
}) => {
    useEffect(() => {
        const elem = document.getElementById(id)
        M.FormSelect.init(elem as any)
    }, [])

    return (
        <div className="input-field">
            <select id={id} defaultValue="" onChange={onChange}>
                <option value="" disabled>
                    {defaultValue}
                </option>
                {children}
            </select>
            <label>{label}</label>
        </div>
    )
}
