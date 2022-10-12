import React from 'react'
import styled from 'styled-components'

export const Row = styled.div.attrs((props) => ({
    className: addClassname(props.className, 'row'),
}))``

type ColProps = {
    readonly s?: number
    readonly m?: number
    readonly l?: number
    readonly xl?: number
}

export const Col = styled.div.attrs<ColProps>((props) => ({
    className: addClassname(
        props.className,
        generateClassname(props.s, props.m, props.l, props.xl),
    ),
}))<ColProps>``

const generateClassname = (s, m, l, xl): string => {
    let className = 'col'

    className = addIfValid(className, `s${s}`, s)
    className = addIfValid(className, `m${s}`, m)
    className = addIfValid(className, `l${s}`, l)
    className = addIfValid(className, `xl${s}`, xl)

    return className
}

const addClassname = (existed: string, hardcoded: string): string =>
    existed ? `${existed} ${hardcoded}` : hardcoded

const addIfValid = (
    source: string,
    addon: string | null,
    condition: number | undefined,
): string => {
    if (condition) {
        return `${source} ${addon}`
    } else {
        return source
    }
}
