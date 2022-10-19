import React, { ChangeEventHandler, FC, useEffect } from 'react'

type SelectProps = {
    readonly label: string
    readonly onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const Select = ({
    label,
    onChange = () => {},
}: SelectProps) => {
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
