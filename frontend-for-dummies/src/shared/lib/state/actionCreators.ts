import { ErrorAction } from './types'

export const createActionWithMultiArgs =
    <R, T>(type: string, ...argNames: string[]) =>
    (...args: T[]): R => {
        const action: any = { type, payload: {} }
        argNames.forEach((arg, index) => {
            action.payload[argNames[index]] = args[index]
        })
        return action as R
    }

export const createActionWithNoArgs =
    <R>(type: string) =>
    (): R =>
        ({
            type,
        } as any as R)

export const createActionWithSingleArg =
    <R, T>(type: string, argName: string) =>
    (arg: T): R =>
        ({
            type,
            payload: {
                [argName]: arg,
            },
        } as any as R)

export const createActionWithDoubleArgs =
    <R, F, S = F>(type: string, firstArgName: string, secondArgName: string) =>
    (firstArg: F, secondArg: S): R =>
        ({
            type,
            payload: {
                [firstArgName]: firstArg,
                [secondArgName]: secondArg,
            },
        } as any as R)

export const createActionWithTripleArgs =
    <R, F, S = F, T = F>(
        type: string,
        firstArgName: string,
        secondArgName: string,
        thirdArgName: string,
    ) =>
    (firstArg: F, secondArg: S, thirdArg: T): R =>
        ({
            type,
            payload: {
                [firstArgName]: firstArg,
                [secondArgName]: secondArg,
                [thirdArgName]: thirdArg,
            },
        } as any as R)

export const createFailureAction =
    <R extends ErrorAction>(type: string) =>
    (error: string | number): R =>
        ({
            type,
            payload: {
                error,
            },
        } as R)
