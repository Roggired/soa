import React, { ChangeEventHandler, FC, MouseEventHandler } from 'react'

type CheckBoxProps = {
    readonly content: string
    readonly id: string
    readonly checked?: boolean
    readonly onClick?: MouseEventHandler<HTMLInputElement>
    readonly onChange?: ChangeEventHandler<HTMLInputElement>
}

export const CheckBox: FC<CheckBoxProps> = ({
    content,
    checked,
    onClick = () => {},
    onChange = () => {},
    id,
}) => {
    return (
        <label>
            <input
                id={id}
                type="checkbox"
                className="filled-in"
                checked={checked}
                onClick={onClick}
                onChange={onChange}
            />
            <span>{content}</span>
        </label>
    )
}
