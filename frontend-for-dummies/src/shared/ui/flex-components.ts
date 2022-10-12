import styled from 'styled-components'

export const FlexRow = styled.div<{
    justifyContent?: 'center' | 'initial'
    alignItems?: 'normal' | 'center'
    gap?: string
}>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent ?? 'initial'};
    align-items: ${(props) => props.alignItems ?? 'normal'};

    gap: ${(props) => props.gap ?? '0'};
`

export const FlexColumn = styled.div<{
    justifyContent?: 'center' | 'initial'
    alignItems?: 'normal' | 'center'
}>`
    display: flex;
    flex-direction: column;

    justify-content: ${(props) => props.justifyContent ?? 'initial'};
    align-items: ${(props) => props.alignItems ?? 'normal'};
`

export const FlexCenter = styled.div<{
    readonly width?: string
}>`
    margin: auto;
    width: ${(props) => props.width ?? '100%'};

    // to fix centering inline-block components
    text-align: center;
`
