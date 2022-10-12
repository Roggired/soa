export interface ErrorAction {
    type: string
    payload: {
        error: number | string
    }
}
