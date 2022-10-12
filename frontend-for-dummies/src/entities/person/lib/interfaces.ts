enum Color {
    GREEN,
    YELLOW,
    ORANGE,
    RED,
    BLACK,
    BLUE,
    BROWN,
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
    readonly text: string
    readonly coordinates: Coordinates
    readonly height: string
    readonly birthday: Date
    readonly eyeColor: Color
    readonly hairColor: Color
    readonly location: Location
}
