import BookCard from './BookCard.tsx'
import type {Book} from '../types/Book.ts'

interface LibraryListProps {
    libraryList: Book[]
    deleteBook: (id: string) => void
}

function LibraryList({libraryList, deleteBook}: LibraryListProps) {
    return (
        <ul>
            {libraryList.map((book) =>
            <BookCard key={book.id} book={book} onDelete={deleteBook}/>)}
        </ul>
    );
}

export default LibraryList;