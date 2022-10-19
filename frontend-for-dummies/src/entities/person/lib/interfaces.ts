export enum Color {
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    ORANGE = 'ORANGE',
    RED = 'RED',
}

export interface Location {
    readonly x: number
    readonly y: number
    readonly z: number
    readonly name: string
}

export interface Coordinates {
    readonly x: number
    readonly y: number
}

export interface Person {
    readonly id: number
    readonly name: string
    readonly creationDate: Date
    readonly coordinates: Coordinates
    readonly height: number
    readonly birthday: Date
    readonly eyeColor: Color
    readonly hairColor: Color
    readonly location: Location
    readonly nationality: string
}
