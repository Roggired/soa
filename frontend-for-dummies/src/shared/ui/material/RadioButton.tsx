import React from 'react'
import styled from 'styled-components'
import { primaryColor } from '../../lib/theme/constants'

type RadioButtonProps = {
    readonly content: string
    readonly options?: {
        readonly isPrechecked?: boolean
        readonly required?: boolean
    }
}

const StyledWrapper = styled.label`
    [type='radio']:checked + span:after,
    [type='radio'].with-gap:checked + span:before,
    [type='radio'].with-gap:checked + span:after {
        border: 2px solid ${primaryColor};
    }

    [type='radio']:checked + span:after,
    [type='radio'].with-gap:checked + span:after {
        background-color: ${primaryColor};
    }
`

export const RadioButton = ({
    content,
    options = { isPrechecked: false, required: false },
}: RadioButtonProps) => (
    <StyledWrapper>
        <input type="radio" className="with-gap" required={options.required} />
        <span>{content}</span>
    </StyledWrapper>
)
