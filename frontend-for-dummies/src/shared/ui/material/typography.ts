import styled from 'styled-components'

export const Text = styled.span<{
    readonly fontWeight?: 'lighter' | 'normal'
}>`
    font-weight: ${(props) => props.fontWeight ?? 'normal'};
`
