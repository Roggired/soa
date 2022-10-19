import React from 'react'
import styled from 'styled-components'

export const Row = styled.div.attrs((props) => ({
    className: addClassname(props.className as string, 'row'),
}))``

type ColProps = {
    readonly s?: number
    readonly m?: number
    readonly l?: number
    readonly xl?: number
}

export const Col = styled.div.attrs<ColProps>((props) => ({
    className: addClassname(
        props.className as string,
        generateClassname(
            props.s as number,
            props.m as number,
            props.l as number,
            props.xl as number,
        ),
    ),
}))<ColProps>``

const generateClassname = (
    s: number,
    m: number,
    l: number,
    xl: number,
): string => {
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
