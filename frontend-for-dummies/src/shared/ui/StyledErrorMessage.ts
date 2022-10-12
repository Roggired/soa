import styled from 'styled-components'

export const StyledErrorMessage = styled.span.attrs((props) => ({
    className: 'helper-text',
}))`
    color: #bf1650 !important;

    &::before {
        display: inline;
        content: '⚠ ';
    }
`
