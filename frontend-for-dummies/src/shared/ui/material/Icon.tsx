import React, { FC } from 'react'

export const Icon: FC<{
    readonly type: string
    readonly fontSize?: string
    readonly color?: string
    readonly id?: string
}> = ({ type, fontSize, color = 'black-text', id }) => {
    return (
        <i
            id={id}
            className={`material-icons ${color}`}
            style={{
                fontSize: fontSize ?? '24px',
            }}>
            {type}
        </i>
    )
}
