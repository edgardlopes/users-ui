export interface Page<T>{
    content: T[]
    totalPages: number
    last: boolean
    size: number
    number: number,
    numberOfElements: number,
    first: boolean
    empty: boolean
}