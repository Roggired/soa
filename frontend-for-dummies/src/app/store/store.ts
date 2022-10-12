import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createMiddlewares } from './middlewares'
import { AppState, rootReducer } from './reducers'
import { createRootSaga } from './sagas'
import { adminModel } from '@entities/user/admin'

const initState: AppState = {
    admin: adminModel.initialState,
}

export const configureStore = (
    initialState: AppState = initState,
): Store<AppState> => {
    const sagaMiddleware = createSagaMiddleware()

    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    // TODO Env set to true
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...createMiddlewares(true, [sagaMiddleware])),
        ),
    )

    sagaMiddleware.run(createRootSaga)

    return store
}
