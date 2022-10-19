import React, {ChangeEventHandler} from "react";
import {randomUUID} from "crypto";

type InputProps = {
    readonly onChange: ChangeEventHandler<HTMLInputElement>
    readonly value: string | number
    readonly label: string
    readonly type?: 'text' | 'number'
    readonly disabled?: boolean
}

export const Input = ({disabled = false, label, onChange, value, type = 'text'}: InputProps): JSX.Element => {
    const id = randomUUID()
    return <div className="input-field col s6">
        <input
            id={id}
            disabled={disabled}
            type={type}
            onChange={onChange}
            value={value}
        />
        <label htmlFor={id}>{label}</label>
    </div>;
}