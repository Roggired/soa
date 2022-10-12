import logger from 'redux-logger'

export const createMiddlewares = (
    isDevelopment: boolean,
    initMiddlewares: any[],
): any[] => {
    const middlewares: any[] = initMiddlewares

    if (isDevelopment) {
        middlewares.push(logger)
    }

    return middlewares
}
