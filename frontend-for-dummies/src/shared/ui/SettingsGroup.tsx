import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Materialize } from '.'
import { Col } from './material/material-wrappers'

type SettingsGroupProps = {
    readonly title: string
    readonly description: string
}

const Title = styled.span`
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.64rem;
    line-height: 110%;
`

const Description = styled.p`
    font-weight: 300;
    font-size: 1.1rem;
    color: #888;
`

const StyledContent = styled(Col).attrs((props) => ({
    className: 'z-depth-1',
}))`
    margin-bottom: 50px;
    padding: 0;
    border-radius: 10px;

    .setting {
        margin: 1rem;
    }
`

export const SettingsGroup: FC<PropsWithChildren<SettingsGroupProps>> = ({
    children,
    title,
    description,
}) => {
    return (
        <Materialize.Row>
            <Materialize.Col s={4}>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </Materialize.Col>
            <StyledContent s={8}>{children}</StyledContent>
        </Materialize.Row>
    )
}
