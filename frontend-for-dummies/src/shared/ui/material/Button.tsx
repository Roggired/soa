import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type ButtonProps = {
    readonly size?: 'btn' | 'btn-small' | 'btn-large'
    readonly flat?: boolean
} & Partial<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const Button: FC<ButtonProps> = ({
    children,
    size = 'btn',
    flat = false,
    ...props
}) => {
    const classNames = `waves-effect waves-light ${size} ${props.className} ${
        flat && 'btn-flat'
    }`

    return (
        <button {...props} className={classNames}>
            {children}
        </button>
    )
}
