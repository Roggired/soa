import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { configureStore } from './store'
import './styles/main.scss'
import 'materialize-css/dist/js/materialize.min'
import { Routing } from '../pages'

const store = configureStore()

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <BrowserRouter basename="/collection">
                <Routing />
            </BrowserRouter>
        </Provider>
    )
}

export default App
