import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FC,
    FunctionComponent,
} from 'react'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'

type StyleType = 'max-width' | 'center' | 'wrap-content' | 'set-width'

const createStyles = (styleType: StyleType, options: { width: string }) => {
    switch (styleType) {
        case 'wrap-content':
            // in case of anchor buttons, wrapper should have "text-align: center" property
            return {}
        case 'max-width':
            return {
                display: 'block',
            }
        case 'set-width':
            return {
                display: 'block',
                width: options.width,
            }
        case 'center':
            return {
                margin: 'auto',
                width: options.width ?? 'initial',
            }
    }
}

type DeprecatedButtonProps = {
    readonly type?: 'submit' | 'basic'
    readonly styleType?: StyleType
    readonly width?: string
    readonly className?: string
    readonly children: JSX.Element
}

export const DeprecatedButton: FunctionComponent<DeprecatedButtonProps> = ({
    type = 'basic',
    styleType = 'wrap-content',
    width = '2rem',
    className = '',
    children,
}) => {
    const styles = createStyles(styleType, { width })
    const classNames = `waves-effect waves-light btn ${className}`

    return type == 'basic' ? (
        <a className={classNames} style={styles}>
            {children}
        </a>
    ) : (
        <button
            className={classNames}
            type="submit"
            name="action"
            style={styles}>
            {children}
        </button>
    )
}

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

export const ButtonWithLoader: FC<
    {
        readonly isLoading: boolean
    } & ButtonProps
> = ({ isLoading, children, ...props }) => {
    return (
        <Button {...props}>
            {isLoading ? <Loader type={'button'} /> : children}
        </Button>
    )
}

export const DeprecatedButtonWithLoading: FC<
    {
        readonly isLoading: boolean
    } & DeprecatedButtonProps
> = ({ isLoading, children, ...buttonProps }) => {
    return (
        <DeprecatedButton {...buttonProps}>
            {isLoading ? <Loader type={'button'} /> : children}
        </DeprecatedButton>
    )
}

export const LinkButton: FC<{ readonly to: string } & DeprecatedButtonProps> =
    ({
        to,
        styleType = 'wrap-content',
        width = '2rem',
        className = '',
        children,
    }) => {
        const styles = createStyles(styleType, { width })
        const classNames = `waves-effect waves-light btn ${className}`

        return (
            <Link to={to} className={classNames} style={styles}>
                {children}
            </Link>
        )
    }
