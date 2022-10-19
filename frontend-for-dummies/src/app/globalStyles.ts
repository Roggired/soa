import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  body {
    min-height: 100vh;
    font-family: "Roboto", sans-serif;
    min-width: 100%;

    background-color: #f4f4f4;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

export default GlobalStyles
