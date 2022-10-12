import styled from 'styled-components'

export const Sidebar = styled.div<{
    readonly width?: number
    readonly justifyContent?: 'center'
}>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.justifyContent ?? 'center'};

    width: ${(props) => `${props.width ?? 30}%`};
`

export const Content = styled.main.attrs((props) => ({
    className: props.className ? `${props.className} container` : 'container',
}))``
