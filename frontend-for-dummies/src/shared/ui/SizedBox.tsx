import styled from 'styled-components'
import { v4 } from 'uuid'

interface SizedBoxProps {
    readonly height?: string
    readonly width?: string
}

export const SizedBox = styled.div.attrs<SizedBoxProps>((props) => ({
    className: 'sized-box',
    id: 'sized-box-' + v4(),
}))<SizedBoxProps>`
    height: ${(props) => props.height || '100%'};
    width: ${(props) => props.width || '100%'};
`
