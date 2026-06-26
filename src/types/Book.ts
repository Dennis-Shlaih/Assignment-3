export type status = "to-read" | "reading" | "finished"

export interface Book {
    id: string,
    title: string,
    author: string,
    publishYear?: number,
    coverID?: number
    status: status
    rating?: number | null,
    dateAdded: number
}

